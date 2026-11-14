---
title: "Did That Request Really Come from Your iOS App? A Practical Guide to Apple App Attest"
description: "Register an App Attest key, sign a voucher checkout request in Swift, and verify the assertion on your backend."
pubDate: 2026-11-14
lang: "en"
tags: ["iOS", "Security", "iOS App Development", "Networking", "Apple App Attest"]
coverImage: "/blog/apple-app-attest/cover.jpeg"
coverCredit: "Messy scribble font by me"
---

When an iOS app sends an authenticated API request, the backend can use the bearer token to identify the user’s session. Some operations need a second check. Can the backend verify that a key registered to a genuine instance of the app signed the request?

App Attest gives the backend a way to check that.

In this article, we’ll use App Attest to protect the request that recalculates the checkout total when a user applies a voucher. We’ll call this operation the checkout calculation.

Here are the three Apple frameworks we’ll use.

- `DeviceCheck` to generate keys, attest them, and create assertions.
- `CryptoKit` to hash the data passed to App Attest.
- `Foundation` to build the checkout calculation request with the exact body bytes used for verification.

The checkout calculation uses illustrative field and header names.

## What App Attest provides

App Attest has two steps. The app registers a key with the backend through attestation, then uses that key to sign requests through assertions.

- Attestation is how the backend establishes trust in an App Attest key. The app asks Apple to attest the key and sends the result to its own backend. After verification, the backend has a public key it can use later.
- An assertion is what the app makes when it has some request data to sign. The backend checks it with the public key it already registered.

The app holds on to a key ID. The private key stays in the Secure Enclave, and the app asks the framework to use it through that ID. For a signed-in flow like this example, Apple recommends a separate key ID for each account on the device. [Establishing your app’s integrity](https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity)

<figure class="article-figure">
  <img src="/blog/apple-app-attest/data-flow.webp" alt="Sequence diagram showing key registration with Apple App Attest and backend verification of a signed checkout request." loading="lazy" decoding="async" />
  <figcaption>App Attest data flow for key registration and a signed checkout request.</figcaption>
</figure>

## Start with a precise verification contract

The verification contract defines what the app and backend hash for each operation. The example uses two challenges and two different inputs.

Expose a backend endpoint that issues a fresh, short-lived challenge before key registration or a protected checkout calculation. Bind each challenge to its intended operation and the authenticated account.

A challenge is single-use. Once a request claims it, the client must fetch a new challenge for its next attempt, whether the first request succeeds, returns an error, or times out. Claim the challenge atomically so concurrent requests cannot both use it.

<figure class="article-figure">
  <img src="/blog/apple-app-attest/verification-contract.webp" alt="Comparison of the data that the app hashes and the backend verifies for key registration and checkout assertions." loading="lazy" decoding="async" />
  <figcaption>What the app hashes and the backend verifies during registration and checkout.</figcaption>
</figure>

The two columns in the middle are easy to conflate. The registration endpoint uses the challenge to check the attestation. For checkout, the server reconstructs the signed input from the request method, path and query, challenge header, and a hash of the raw body.

## Check whether App Attest is available

Before generating a key, check `DCAppAttestService.shared.isSupported`. That tells you whether the service is available to your app on the current device. [Apple’s isSupported reference](https://developer.apple.com/documentation/devicecheck/dcappattestservice/issupported)

```swift
import DeviceCheck
let service = DCAppAttestService.shared

if service.isSupported {
    // Generate and attest the key.
} else {
    // Follow your backend’s policy for unsupported devices.
}
```

Use the iOS Simulator to exercise the unsupported path. Use a supported physical device to test key registration and assertion verification end to end.

The SDK declares `DCAppAttestService` from iOS and iPadOS 14, tvOS 15, watchOS 9, and macOS 11. Those are API availability versions. Apple introduced App Attest support for eligible native Mac apps in macOS 27. Check `isSupported` at runtime to account for the device and app type.

## Register an App Attest key

1. Check `DCAppAttestService.shared.isSupported` before starting registration.
2. Load the registered key ID for the signed-in account. If there is one, continue to assertion generation.
3. If there is no pending key ID, call `generateKey()` and track the returned ID as pending.
4. Fetch a registration challenge from the backend, decode it, and hash the challenge bytes with SHA-256.
5. Call `attestKey(_:clientDataHash:)` using the pending key ID and the challenge digest.
6. Send the attestation, key ID, and challenge reference to the backend. Mark the key as registered only after the backend confirms verification.

When the caller has a pending key ID and a Base64-encoded registration challenge, it passes both to the helper below. The helper decodes the challenge and hashes the resulting bytes before calling attestKey.

```swift
import CryptoKit
import DeviceCheck
import Foundation

enum AppAttestExampleError: Error {
    case invalidChallengeEncoding
}

func makeAttestation(
    pendingKeyID: String,
    challengeBase64: String
) async throws -> Data {
    guard let challenge = Data(base64Encoded: challengeBase64) else {
        throw AppAttestExampleError.invalidChallengeEncoding
    }
    let challengeHash = Data(SHA256.hash(data: challenge))

    return try await DCAppAttestService.shared.attestKey(
        pendingKeyID,
        clientDataHash: challengeHash
    )
}
```

The app sends the key ID and attestation object to its backend, along with whatever reference the backend uses to look up the challenge. The backend verifies the attestation against that challenge and the expected app identity, then stores the public key. At this point, the app can mark the key ID as registered locally.

A key can exist on the device while registration is still pending. If the app times out waiting for the registration response, the backend may have accepted the key already. A registration API that can report the outcome lets the app reconcile its state before generating another key.

## Verify the attestation on the server

The registration endpoint starts with a challenge record it issued for the authenticated account. That record gives the server the original challenge bytes, the intended operation, and an expiry. The server claims the challenge atomically before verifying the attestation, then writes a trusted key record only after verification succeeds.

1. Decode the CBOR object and check its App Attest format. Validate the credential certificate and its chain against Apple’s App Attest root.
2. Recreate the digest from the stored challenge. Hash the authenticator data followed by that digest, then compare the result with the nonce in the credential certificate’s App Attest extension.
3. Check that the credential ID and the hash of the certificate’s public key correspond to the submitted key ID. Check the RP ID against the expected App ID, the initial counter against zero, and the AAGUID against the configured environment. Apply Apple’s validation-category and bundle-version checks for the supported clients.
4. Commit the verified public key for that account and device, and initialize its counter. Keep development and production records separate. Apple also describes independently verifying and storing the attestation receipt for fraud assessment.

These steps summarize the trust checks. The certificate parsing rules, public-key encoding, and expected field values are specified in Apple’s server-side guide. [Validating apps that connect to your server](https://developer.apple.com/documentation/devicecheck/validating-apps-that-connect-to-your-server)

## Build the assertion with DeviceCheck and CryptoKit

Once the key is registered, the app fetches a challenge for the checkout calculation. It encodes the body, hashes its bytes, and includes that hash in a fixed JSON structure with the method, path and query, and challenge. It hashes that structure and passes the digest to `generateAssertion()`.

The JSON body contains the cart ID and voucher code. The app sends the challenge in `Example-Proof-Challenge` and the proof in `Example-App-Proof`. Decoding the proof header from Base64 gives a JSON object with `keyId` and a Base64-encoded assertion.

```swift
struct CheckoutCalculation: Encodable {
    let cartID: String
    let voucherCode: String
}

func makeVoucherQuoteRequest(
    endpoint: URL,
    checkout: CheckoutCalculation,
    challenge: String,
    registeredKeyID: String
) async throws -> URLRequest {
    let body = try JSONEncoder().encode(checkout)
    let bodyHash = Data(SHA256.hash(data: body)).base64EncodedString()
    let clientData = try makeSignedInput(
        endpoint: endpoint, challenge: challenge, bodyHash: bodyHash
    )
    let assertion = try await DCAppAttestService.shared.generateAssertion(
        registeredKeyID,
        clientDataHash: Data(SHA256.hash(data: clientData))
    )
    let proof = ["keyId": registeredKeyID, "assertion": assertion.base64EncodedString()]
    let encodedProof = try JSONEncoder().encode(proof).base64EncodedString()

    var request = URLRequest(url: endpoint)
    request.httpMethod = "POST"
    request.httpBody = body
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue(challenge, forHTTPHeaderField: "Example-Proof-Challenge")
    request.setValue(encodedProof, forHTTPHeaderField: "Example-App-Proof")

    return request
}

private func makeSignedInput(
    endpoint: URL, challenge: String, bodyHash: String
) throws -> Data {
    guard let url = URLComponents(url: endpoint, resolvingAgainstBaseURL: false) else {
        throw URLError(.badURL)
    }
    let pathAndQuery = url.percentEncodedQuery.map {
        url.percentEncodedPath + "?" + $0
    } ?? url.percentEncodedPath
    let encoder = JSONEncoder()
    encoder.outputFormatting = [.sortedKeys, .withoutEscapingSlashes]

    return try encoder.encode([
        "bodyHash": bodyHash,
        "challenge": challenge,
        "method": "POST",
        "path": pathAndQuery
    ])
}
```

The header names here are specific to this API example. The bearer token still goes on the request through the app’s usual authentication flow. When the voucher changes, the app fetches a fresh challenge and generates another assertion with the same registered key. [Apple’s assertion API](https://developer.apple.com/documentation/devicecheck/dcappattestservice/generateassertion(_:clientdatahash:completionhandler:))

Here’s what the request looks like on the wire. The URL and values shown here are examples.

```http
POST /calculate HTTP/1.1
Host: api.example.com
Authorization: Bearer <access-token>
Content-Type: application/json
Content-Length: 44
Example-Proof-Challenge: <server-challenge>
Example-App-Proof: <base64-encoded-proof-json>

{"cartID":"cart-123","voucherCode":"SAVE10"}
```

## Hash the exact body that is sent

A Swift struct describes the fields in the payload. Verification depends on the bytes produced by the encoder.

These two JSON objects have the same values.

```json
{"cartID":"cart-123","voucherCode":"SAVE10","challenge":"example"}
```

```json
{"voucherCode":"SAVE10","challenge":"example","cartID":"cart-123"}
```

If the app hashes the first and the backend re-encodes it as the second, the hashes differ. Even changing the whitespace would be enough. That’s why the sample assigns the same `Data` to `httpBody` after hashing it. The backend can use the incoming body bytes for verification and read the challenge from its header. Rebuilding the JSON from a decoded object adds a second serialization step where the two sides can drift.

## Generate assertions at the networking boundary

The checkout screen has the voucher text and the cart ID. The networking layer has the encoded body about to go over the wire. Keeping assertion generation close to that final encoding makes it easier to trace the bytes from the encoder to the request.

## Verify the assertion on the server

The framework produces an assertion on the device. The backend checks whether that assertion belongs with the request it received. Before verifying the proof, it atomically claims the unexpired challenge issued for this account and operation. An error after that point leaves the challenge spent.

1. Resolve the registered public key using the key ID and the authenticated account. A key belonging to a different account fails this lookup.
2. Decode the assertion’s CBOR and read its signature and authenticator data. Recreate the signed input from the method, path and query, challenge header, and the Base64-encoded SHA-256 hash of the raw request body. Hash that input to recompute clientDataHash. Follow Apple’s signature verification procedure using the stored key and the digest of the authenticator data concatenated with `clientDataHash`.
3. Check the expected RP ID and the validation-category and bundle-version fields described by Apple. The counter must exceed the stored value, or zero on the first assertion.
4. Confirm that the signed input binds the assertion to the challenge claimed for this request.
5. Record the accepted counter. The checkout calculation handler can then check cart ownership and voucher eligibility before recalculating the total. [Apple’s assertion validation procedure](https://developer.apple.com/documentation/devicecheck/validating-apps-that-connect-to-your-server)

Two copies of a request can reach different backend workers at nearly the same time. If both read the challenge as unused before either marks it used, both can make their decision from the same old state. An atomic challenge claim prevents reuse. An atomic compare-and-update on the stored counter prevents concurrent requests from accepting stale counter values.

## Handle DeviceCheck errors by operation

A DeviceCheck error comes from the Apple framework. An expired challenge returned by the checkout calculation endpoint and a timeout sending the request are different failures. Keeping those separate lets the app choose whether to retry a native call, refresh a challenge, or surface an error.

The Swift classifier checks the error domain before interpreting a numeric code. Other frameworks can use the same numbers for unrelated errors.

```swift
func deviceCheckCode(for error: Error) -> DCError.Code? {
    let underlyingError = error as NSError
    guard underlyingError.domain == DCError.errorDomain else {
        return nil
    }
    return DCError.Code(rawValue: underlyingError.code)
}
```

<figure class="article-figure">
  <img src="/blog/apple-app-attest/devicecheck-errors.webp" alt="DeviceCheck error handling table for App Attest operations." loading="lazy" decoding="async" />
  <figcaption>How to handle DeviceCheck errors by operation.</figcaption>
</figure>

Apple defines the error codes and documents retrying an unavailable attestation with the same key. [DeviceCheck error reference](https://developer.apple.com/documentation/devicecheck/dcerror-swift.struct) · [Apple’s attestation retry guidance](https://developer.apple.com/documentation/devicecheck/attestkey(_:clientdatahash:completionhandler:))

<figure class="article-figure">
  <img src="/blog/apple-app-attest/devicecheck-documentation.webp" alt="Reference screenshot of Apple’s DeviceCheck error documentation." loading="lazy" decoding="async" />
  <figcaption>DeviceCheck Error Documentation</figcaption>
</figure>

A backend rejection has its own recovery rules. An expired checkout calculation challenge can be replaced and the request signed again if the calculation is still needed. An invalid signature or app-identity mismatch should fail the protected operation. A rejected proof never turns into an unsigned retry. If a timeout leaves the registration outcome unknown, the app can reconcile the pending key with the backend before it starts over.

## Handle registration, concurrency, and retries

### Two requests can need the same registration

Say the checkout screen opens and starts loading the total. Before that finishes, the user applies a voucher. If both calls find no registered key, each can start its own registration. Both calls can wait for the same in-flight registration for that account. In Swift, an actor can store that task before awaiting its result. An actor can run another call while the first one is suspended, so simply putting an async method inside an actor still leaves room for duplicate work.

### The order on the device can differ from the order on the server

Assertions have a counter, and the backend tracks the last value it accepted. If two requests using the same key are in flight, the one with the higher counter can arrive first. The earlier assertion can then fail the backend’s counter check even though both came from the same app.

Sharing the registration task prevents duplicate registration. Serializing assertion generation still leaves requests free to arrive out of order. In this checkout example, the app can process one calculation per key at a time, from generating the assertion through receiving the response. The screen applies the result only if it matches the voucher currently shown.

### A timeout leaves two sides with different information

A timeout can occur before the server receives a request or after it accepts one. A new calculation attempt uses a fresh challenge and assertion. Operations that create an order or charge a payment also need an idempotency strategy so the backend can recognize repeated attempts at the same operation.

Registration has its own version of this problem. If Apple’s attestation service returns `serverUnavailable`, Apple documents retrying later with the same key. The caller keeps the pending key ID so it can reuse that key on a later attempt.

## The device and environment are part of the setup

The Simulator can exercise unsupported-device handling. End-to-end verification uses a supported physical device with the correct entitlement and a backend configured for the same App Attest environment. Switching accounts and reinstalling the app exercise the paths that select or register a key. [App Attest environment](https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.devicecheck.appattest-environment)

## What’s inside the App Attest CBOR?

CBOR stands for Concise Binary Object Representation. Like JSON, it can represent maps, arrays, and strings. It also has a byte string type, so App Attest can store signatures and other binary values directly. Base64 is the text encoding that lets this example carry those bytes in an HTTP header. [CBOR specification](https://www.rfc-editor.org/rfc/rfc8949.html)

For a checkout request, Base64-decode `Example-App-Proof` and parse the resulting JSON. Use `keyId` to look up the registered public key. Base64-decode the `assertion` field, then pass those bytes to a CBOR decoder. The top-level map contains two byte strings.

- **signature** is the signature the backend verifies with the registered public key.
- **authenticatorData** begins with the 32-byte hash of the App ID, one byte of flags, and a four-byte counter. The flags indicate whether extension data follows. The challenge comes from Example-Proof-Challenge and goes into the reconstructed client data.

During registration, the decoded attestation has a different shape. The top-level `fmt` identifies the format. The `attStmt` map carries the certificate chain and receipt. The `authData` byte string carries authenticator data, including the attested credential data. [Apple’s server validation guide](https://developer.apple.com/documentation/devicecheck/validating-apps-that-connect-to-your-server)

```text
Attestation object (CBOR map)
├── fmt = "apple-appattest"
├── attStmt (CBOR map)
│   ├── x5c (array of DER-encoded X.509 certificates)
│   │   ├── [0] Credential certificate (leaf)
│   │   └── [1] Intermediate signing certificate
│   └── receipt (byte string)
└── authData (byte string)
    ├── rpIdHash (32 bytes)
    ├── flags (1 byte)
    ├── signCount (4 bytes, big-endian)
    ├── attestedCredentialData
    │   ├── aaguid (16 bytes)
    │   ├── credentialIdLength (2 bytes, big-endian)
    │   ├── credentialId (credentialIdLength bytes)
    │   └── credentialPublicKey (CBOR-encoded COSE key)
    └── extensions (CBOR map, when indicated by flags)
        ├── apple_validation_category_01 (UInt32)
        └── apple_bundle_version_01 (string)
```

The server validates the leaf and intermediate certificates against Apple’s App Attest root. The leaf contains the public key the backend stores after verification. The receipt can be used in a separate request to Apple for a fraud risk metric.

The RP ID hash is the SHA-256 hash of the App ID. The flags indicate whether credential data or extensions follow. The counter starts at zero at registration and increases as the key generates assertions. The AAGUID identifies the App Attest environment. The credential ID matches the decoded key ID, and the credential data also carries a public key in COSE format.

Starting with iOS 27, the extensions carry the app’s launch validation category and bundle version (`CFBundleVersion`). The same extension map can also appear in an assertion’s `authenticatorData`.

## Check your backend parser on iOS 26 and iOS 27

On iOS 27 and later, Apple appends a CBOR extensions map to authenticator data in both attestations and assertions. It adds `apple_validation_category_01` for the app’s launch validation category and `apple_bundle_version_01` for its build version. When the flags indicate extensions are present, parse and validate those values using Apple’s guidance. The iOS 26 format predates these extensions.

If your assertion parser expects authenticator data to be exactly 37 bytes, a valid iOS 27 assertion can fail. Read the fixed fields, parse the extension data when indicated, and keep the complete original authenticatorData bytes for signature verification. Try registration and a protected request on physical devices running each OS version before shipping.

## Verification before shipping

A successful checkout calculation exercises the happy path. The following cases also cover how the backend responds to proofs it should reject.

<figure class="article-figure">
  <img src="/blog/apple-app-attest/verification-checklist.webp" alt="Pre-release verification checklist for successful and rejected App Attest requests." loading="lazy" decoding="async" />
  <figcaption>App Attest verification checklist before shipping.</figcaption>
</figure>

## Debug verification failures without logging the payload

Key generation, registration, assertion generation, and server verification can all look like the same checkout error on screen. Identifying the failed stage narrows the investigation.

The stage, request correlation ID, body byte count, and error category help locate a failure. For a mismatch reproduced with test data, comparing the app’s digest with the backend’s can reveal whether both sides hashed the same bytes. Matching digests shift the investigation to the challenge, key lookup, and counter checks. The raw body, bearer token, and proof objects stay out of the logs.

## Closing thoughts

Registration and assertion generation have different lifecycles. Tracking pending registration separately from a verified key makes it easier to coordinate concurrent requests and recover from timeouts.

The bytes are part of the contract. Two JSON objects can mean the same thing to checkout and produce different hashes. Keeping a single encoded body makes it possible to trace the bytes from assertion generation to the outgoing request.

The backend determines whether the proof is valid. Changing one field in a test request still leaves valid JSON that checkout could process. The backend should reject it because the assertion was generated for different bytes.

[Original article on Medium](https://medium.com/@prammmoe/did-that-request-really-come-from-your-ios-app-a-practical-guide-to-apple-app-attest-4e8536033c02)
