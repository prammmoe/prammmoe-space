---
title: "Securing API Requests with HMAC in Swift"
description: "Build an HMAC-SHA256 request signing layer with CryptoKit, Alamofire, and Moya, from canonical requests to server verification."
pubDate: 2026-10-11
featured: true
tags: ["Swift", "iOS", "Security", "CryptoKit", "Networking"]
coverImage: "/blog/hmac.jpeg"
---

When an iOS app communicates with an API, HTTPS is the first layer of protection. It encrypts traffic in transit and helps the client verify that it is connected to the expected server.

Sometimes an API needs another guarantee: the server should be able to verify that a request was created by a client that knows a shared secret, and that the request was not modified after it was signed. This is where HMAC request signing can help.

In this article, we will build a generic HMAC-SHA256 signing layer for a Swift application using:

- Swift and `Foundation`
- `CryptoKit` for hashing and HMAC
- Alamofire’s `RequestInterceptor`
- Moya’s provider abstraction

All URLs, keys, endpoint names, and values in this article are examples. Replace them with values defined by your own API contract.

## What HMAC provides

HMAC stands for Hash-based Message Authentication Code. It combines a cryptographic hash function with a secret key:

```text
HMAC(secret, message) -> authentication code
```

The client and server both know the secret. The client signs a request, and the server independently calculates the expected signature. If the values match, the server can establish that:

1. The request was produced by someone with access to the secret.
2. The signed parts of the request were not changed in transit.

HMAC does not encrypt the request. It does not hide the URL, headers, or body. HTTPS is still required.

It also does not automatically prevent replay attacks. An attacker who captures a valid signed request might try to send it again. A timestamp and nonce, combined with server-side replay checks, address that problem.

## Start with a precise signing contract

The most important part of HMAC signing is not calling the cryptographic API. It is agreeing on exactly what bytes the client and server will sign.

For this example, the canonical request is five lines separated by a single newline:

```text
HTTP_METHOD
PERCENT_ENCODED_PATH_AND_QUERY
TIMESTAMP
NONCE
SHA256_HEX_OF_BODY
```

For example, a request might be represented conceptually as:

```text
POST
/v1/orders?include=summary
1710000000000
7f8c5c36-4bd1-4f4f-9a7f-3f55a9f2ef10
<lowercase SHA-256 digest of the exact body bytes>
```

The final signature is:

```text
HMAC-SHA256(sharedSecret, canonicalRequest)
```

The result can be encoded as lowercase hexadecimal and sent in a request header.

The protocol should define all of the following explicitly:

- Whether the method is uppercase.
- Whether the path is raw or percent-encoded.
- Whether the query string is included.
- Whether a path prefix is removed before signing.
- Whether the timestamp is in seconds or milliseconds.
- How the nonce is generated and how long it can be reused.
- Whether the body digest is hexadecimal, Base64, uppercase, or lowercase.
- Which character encoding is used for text before hashing.
- Which headers carry the timestamp, nonce, and signature.

If either side makes a different choice, every signature will fail even though both implementations use HMAC correctly.

## Build the signature with CryptoKit

The first type has no knowledge of Alamofire or Moya. It only turns request values into a signature. Keeping this logic independent makes it easier to test.

```swift
import CryptoKit
import Foundation

struct HMACSigner {
    static func sha256Hex(_ data: Data) -> String {
        SHA256.hash(data: data)
            .map { String(format: "%02x", $0) }
            .joined()
    }

    static func canonicalRequest(
        method: String,
        encodedPathAndQuery: String,
        timestamp: String,
        nonce: String,
        body: Data
    ) -> String {
        [
            method.uppercased(),
            encodedPathAndQuery,
            timestamp,
            nonce,
            sha256Hex(body)
        ]
        .joined(separator: "\n")
    }

    static func signature(
        method: String,
        encodedPathAndQuery: String,
        timestamp: String,
        nonce: String,
        body: Data,
        secret: String
    ) -> String {
        let canonical = canonicalRequest(
            method: method,
            encodedPathAndQuery: encodedPathAndQuery,
            timestamp: timestamp,
            nonce: nonce,
            body: body
        )
        let key = SymmetricKey(data: Data(secret.utf8))
        let code = HMAC<SHA256>.authenticationCode(
            for: Data(canonical.utf8),
            using: key
        )
        return code
            .map { String(format: "%02x", $0) }
            .joined()
    }
}
```

There are two hashes here, and they have different purposes:

1. SHA-256 hashes the body. The body digest becomes part of the canonical request.
2. HMAC-SHA256 authenticates the entire canonical request with the shared secret.

Hashing the body separately is useful because the canonical string remains compact even when the request contains a large JSON document or an image upload.

## Canonicalize the URL carefully

The signature must use the same path and query representation that the server uses. `URLComponents.percentEncodedPath` and `percentEncodedQuery` preserve the encoded form instead of reconstructing the URL from decoded values.

```swift
import Foundation

enum RequestCanonicalization {
    static func encodedPathAndQuery(from components: URLComponents) -> String {
        let path = components.percentEncodedPath
        guard let query = components.percentEncodedQuery else {
            return path
        }
        return "\(path)?\(query)"
    }
}
```

If the API contract says that a shared prefix is not part of the signature, apply that rule in this one function. For example, an API might transport requests under `/api/` but define the signed path as `/v1/resource`. The client and server must make the same transformation.

Do not sort, decode, re-encode, or otherwise normalize the query string unless the protocol explicitly requires it. Even a small change in escaping or parameter order changes the signature.

## Sign requests at the networking boundary

Signing each request manually at every call site is error-prone. It is easy to forget a request, sign the wrong body, or use a different timestamp format.

Alamofire’s `RequestInterceptor` gives us one place to adapt outgoing requests immediately before they are sent.

```swift
import Alamofire
import Foundation

struct HMACSigningPolicy {
    static func shouldSign(url: URL, approvedHost: String?) -> Bool {
        guard
            let components = URLComponents(url: url, resolvingAgainstBaseURL: false),
            let approvedHost = approvedHost?.lowercased(),
            let requestHost = components.host?.lowercased(),
            requestHost == approvedHost
        else {
            return false
        }
        // Keep provider-specific exclusions in configuration, not in the signer.
        let excludedPrefixes = ["/external/", "/third-party/"]
        return !excludedPrefixes.contains {
            components.percentEncodedPath.hasPrefix($0)
        }
    }
}

final class HMACRequestInterceptor: RequestInterceptor, @unchecked Sendable {
    private let approvedHostProvider: () -> String?
    private let secretProvider: () -> String
    private let timestampProvider: () -> String
    private let nonceProvider: () -> String
    init(
        approvedHostProvider: @escaping () -> String?,
        secretProvider: @escaping () -> String,
        timestampProvider: @escaping () -> String = {
            String(Int64(Date().timeIntervalSince1970 * 1_000))
        },
        nonceProvider: @escaping () -> String = {
            UUID().uuidString.lowercased()
        }
    ) {
        self.approvedHostProvider = approvedHostProvider
        self.secretProvider = secretProvider
        self.timestampProvider = timestampProvider
        self.nonceProvider = nonceProvider
    }

    func adapt(
        _ urlRequest: URLRequest,
        for session: Session,
        completion: @escaping @Sendable (
            Result<URLRequest, any Error>
        ) -> Void
    ) {
        guard
            let url = urlRequest.url,
            HMACSigningPolicy.shouldSign(
                url: url,
                approvedHost: approvedHostProvider()
            ),
            let components = URLComponents(
                url: url,
                resolvingAgainstBaseURL: false
            )
        else {
            completion(.success(urlRequest))
            return
        }
        let timestamp = timestampProvider()
        let nonce = nonceProvider()
        let method = urlRequest.httpMethod ?? "GET"
        let body = urlRequest.httpBody ?? Data()
        let pathAndQuery = RequestCanonicalization
            .encodedPathAndQuery(from: components)
        var signedRequest = urlRequest
        signedRequest.setValue(timestamp, forHTTPHeaderField: "X-Timestamp")
        signedRequest.setValue(nonce, forHTTPHeaderField: "X-Nonce")
        signedRequest.setValue(
            HMACSigner.signature(
                method: method,
                encodedPathAndQuery: pathAndQuery,
                timestamp: timestamp,
                nonce: nonce,
                body: body,
                secret: secretProvider()
            ),
            forHTTPHeaderField: "X-Signature"
        )
        completion(.success(signedRequest))
    }
}
```

The interceptor does four important things:

1. It signs only requests belonging to the approved API host.
2. It creates one timestamp and one nonce for the request.
3. It hashes `httpBody` exactly as it exists at interception time.
4. It places the same timestamp and nonce used during signing into the headers.

The header names are part of the API contract. `X-Timestamp`, `X-Nonce`, and `X-Signature` are generic examples; use the names agreed with the server.

## Integrate the interceptor with Moya

If an application uses a network abstraction layer like Moya, centralize provider construction so every provider uses the signed Alamofire session by default.

```swift
import Alamofire
import Moya

enum NetworkSessionFactory {
    static func makeSignedSession(
        approvedHost: String,
        secret: @escaping () -> String
    ) -> Session {
        let interceptor = HMACRequestInterceptor(
            approvedHostProvider: { approvedHost },
            secretProvider: secret
        )
        return Session(interceptor: interceptor)
    }
}

enum APIProviderFactory {
    static func makeProvider<T: TargetType>(
        session: Session,
        plugins: [PluginType] = []
    ) -> MoyaProvider<T> {
        MoyaProvider<T>(session: session, plugins: plugins)
    }
}
```

Application code can then create one session and reuse it across providers:

```swift
let session = NetworkSessionFactory.makeSignedSession(
    approvedHost: "api.example.com",
    secret: { "API_SHARED_SECRET" }
)

let provider = APIProviderFactory.makeProvider<ExampleService>(
    session: session
)
```

In a real application, do not hard-code `API_SHARED_SECRET` in a source file. The example is intentionally a placeholder. More importantly, remember that any secret shipped inside a mobile application can eventually be extracted by a determined attacker. HMAC in a mobile client is therefore best viewed as one layer in a broader defense-in-depth strategy, not as proof that a request came from an uncompromised app.

## The body must be the exact body that is sent

The most common implementation mistake is signing one representation and sending another.

For an empty request, use zero bytes:

```swift
let body = Data()
```

For JSON, serialize the object first and sign those exact bytes:

```swift
let body = try JSONSerialization.data(
    withJSONObject: ["status": "active"],
    options: []
)
```

Do not sign a pretty-printed or differently ordered JSON string if the networking layer later serializes another representation.

The same rule applies to URL-encoded bodies. Sign the final encoded bytes, not the original dictionary.

Multipart requests require extra care. A multipart body contains boundaries, line endings, field names, filenames, content types, and file bytes. All of those bytes affect the digest. Build the multipart body once, use that `Data` as the request body, and sign the same `Data` that will be transmitted.

```swift
let multipartBody = MultipartBuilder.build(parts: parts)

var request = URLRequest(url: URL(string: "https://api.example.com/v1/upload")!)
request.httpMethod = "POST"
request.httpBody = multipartBody
request.setValue(
    "multipart/form-data; boundary=example-boundary",
    forHTTPHeaderField: "Content-Type"
)
```

If a library streams the body instead of placing it in `httpBody`, the interceptor must be designed to access the exact stream bytes or the request abstraction must provide a deterministic body representation. Otherwise the signer may hash an empty body while the server receives a file.

## Server-side verification

The server should treat the client-provided signature as untrusted input. A typical verification flow is:

1. Read the method, encoded path and query, timestamp, nonce, and raw body bytes.
2. Validate that the timestamp is within the allowed clock-skew window.
3. Check that the nonce has not already been used for the relevant identity and time window.
4. Rebuild the canonical request using the server’s own parsing and normalization rules.
5. Calculate HMAC-SHA256 with the server-side secret.
6. Compare the received and expected signatures using a constant-time comparison.
7. Continue with normal authentication and authorization checks.

Pseudocode:

```text
if timestamp is outside allowed_window:
    reject

if nonce was already used:
    reject

canonical = method + "\\n" + pathAndQuery + "\\n" + timestamp
          + "\\n" + nonce + "\\n" + sha256Hex(rawBody)

expected = hmacSha256Hex(serverSecret, canonical)

if !constantTimeEquals(receivedSignature, expected):
    reject

store nonce as used
accept request
```

The server should not compare signatures with a normal early-exit string comparison when an attacker can observe timing differences. Use a constant-time comparison function provided by the server platform or a well-maintained cryptographic library.

HMAC verification does not replace user authentication or authorization. A correctly signed request still needs to be checked against the authenticated user’s permissions.

## Testing the protocol

Because the signer is a pure value transformation, deterministic tests are straightforward. Inject fixed timestamp and nonce providers into the interceptor, and use a known test secret.

```swift
import XCTest
@testable import ExampleApp

final class HMACSignerTests: XCTestCase {
    func testSignatureIsDeterministic() {
        let body = Data(#"{"amount":42}"#.utf8)
        let result = HMACSigner.signature(
            method: "post",
            encodedPathAndQuery: "/v1/orders?include=summary",
            timestamp: "1710000000000",
            nonce: "fixed-test-nonce",
            body: body,
            secret: "test-only-secret"
        )
        XCTAssertEqual(result.count, 64)
        XCTAssertTrue(result.allSatisfy { $0.isHexDigit })
    }

    func testEmptyBodyIsStillHashed() {
        let digest = HMACSigner.sha256Hex(Data())
        XCTAssertEqual(
            digest,
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
        )
    }

    func testQueryStringIsPreserved() {
        let first = HMACSigner.signature(
            method: "GET",
            encodedPathAndQuery: "/v1/items?page=1",
            timestamp: "1710000000000",
            nonce: "nonce-a",
            body: Data(),
            secret: "test-only-secret"
        )
        let second = HMACSigner.signature(
            method: "GET",
            encodedPathAndQuery: "/v1/items?page=2",
            timestamp: "1710000000000",
            nonce: "nonce-a",
            body: Data(),
            secret: "test-only-secret"
        )
        XCTAssertNotEqual(first, second)
    }
}
```

The expected full signature in a contract test should come from an independently implemented reference, such as a server test or a small command-line tool. Testing a Swift implementation against another copy of the same Swift algorithm can reproduce the same mistake on both sides.

At minimum, test these cases:

- A fixed request produces a stable signature.
- Changing one byte of the body changes the signature.
- Changing the method changes the signature.
- Changing path escaping changes the signature.
- Changing query parameters changes the signature.
- Empty bodies hash as zero bytes.
- Multipart boundaries and line endings are included in the body digest.
- Requests to external hosts receive no HMAC headers.
- Reused nonces are rejected by the server.
- Expired timestamps are rejected by the server.
- Client and server canonicalization mismatches produce a clear diagnostic.

## Debugging without leaking secrets

When signatures fail, log safe diagnostics rather than the shared secret or sensitive request body. Useful temporary fields include:

- HTTP method
- Encoded path and query
- Timestamp
- Nonce
- Body byte count
- Body SHA-256 digest
- Canonical string with newlines visibly escaped
- Signature length and encoding format

Do not log the secret, the complete authorization token, personal data, payment data, or an unredacted multipart payload. Remove verbose signing logs before releasing the application.

## Security checklist

Before shipping an HMAC protocol, verify the following:

- HTTPS is enforced.
- The signed path and query use a precisely documented representation.
- The body digest is computed from the exact transmitted bytes.
- The method is normalized consistently.
- Timestamps use one agreed unit and format.
- The server enforces a clock-skew window.
- Nonces are unique and cannot be reused within that window.
- Signature comparison is constant-time.
- The server performs normal authentication and authorization.
- Signing is limited to approved hosts and intended API routes.
- Secrets are not written to logs or committed to source control.
- Secrets can be rotated without requiring a client update where possible.
- The team understands that a secret embedded in a mobile app is recoverable.

## Closing thoughts

The cryptographic call is only a few lines of Swift. The difficult part is the protocol around it: canonicalization, exact body bytes, replay protection, key management, and consistent behavior between client and server.

A clean implementation separates those concerns into three layers:

1. A pure signer that builds the canonical request and calculates HMAC-SHA256.
2. A request interceptor that supplies runtime metadata and attaches headers.
3. A centralized networking factory that ensures requests use the interceptor consistently.

That structure keeps the application code simple while making the security-sensitive behavior testable and visible in one place.
