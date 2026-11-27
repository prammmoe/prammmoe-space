# SEO launch and measurement

Target canonical origin: `https://prammmoe.com`. Changes in this checkout do not update DNS, Nginx, public pages, or Search Console by themselves.

## Release and domain consolidation

1. Run `npm run verify` with a supported browser. The existing CI deploys only after checks pass on `main`.
2. Ensure DNS for `prammmoe.com` points to the serving host and HTTPS works. Check both IPv4 and IPv6 if both record types exist.
3. Serve the new build on `prammmoe.com` and configure each owned alias (`www.prammmoe.com`, `prammmoe.space`, and `www.prammmoe.space` if used) to redirect permanently to the same path on `.com`. Retain redirects at least a year. Do not redirect every old URL to the homepage.
4. Provision valid TLS certificates for every HTTPS hostname before enabling HTTPS redirects. Keep the current canonical host's certificate directives. Add the following location directives to its server block:

```nginx
root /var/www/portfolio/current;
index index.html;
location / {
    try_files $uri $uri/ =404;
}
error_page 404 /404.html;
location = /404.html { internal; }
```

Example HTTP redirect block, only for hostnames you control and use:

```nginx
server {
    listen 80;
    server_name prammmoe.com www.prammmoe.com prammmoe.space www.prammmoe.space;
    return 301 https://prammmoe.com$request_uri;
}
```

For each alias's existing HTTPS server block, retain its valid certificate settings and replace its content-serving locations with `return 301 https://prammmoe.com$request_uri;`. The primary `prammmoe.com` HTTPS block must serve files, not redirect to itself. Test with `nginx -t` before reloading. These are reviewable snippets; no server configuration was changed by this task.

## Public release checks

```sh
curl -I https://prammmoe.com/
curl -I https://prammmoe.com/services/
curl -I https://prammmoe.com/this-page-does-not-exist/
curl -I https://prammmoe.space/blog/securing-api-requests-with-hmac-in-swift/
curl -fsS https://prammmoe.com/robots.txt
curl -fsS https://prammmoe.com/sitemap-index.xml
```

Expect 200 for real pages, 404 for the missing page, and a 301/308 alias redirect to the matching `.com` path. Inspect the homepage HTML to confirm the canonical, schema IDs and social images use `.com`. Check the five personal pages retain `noindex`; robots.txt must allow their retrieval so Google can see that directive. The new 404 file only produces correct HTTP behavior once Nginx uses the configuration above.

## Google Search Console and Bing

1. Add and verify the `prammmoe.com` Domain property using the DNS TXT value supplied by Search Console. Never invent a verification token.
2. Submit `https://prammmoe.com/sitemap-index.xml` in Sitemaps.
3. Use URL Inspection on the homepage, services page, iOS portfolio and key iOS articles. Run the live test, then request indexing once for each important URL.
4. If `.space` was previously indexed, verify its property too. Once permanent redirects are active, submit Change of Address from the old property where applicable.
5. Validate ProfilePage and BlogPosting in Google's Rich Results Test. Correct structured data does not guarantee a rich result or Knowledge Panel.
6. Optionally verify in Bing Webmaster Tools and submit the same sitemap. Regular sitemap submission is sufficient here; Google's Indexing API is not intended for portfolio pages.

## Identity and content

Update website fields on your existing LinkedIn, GitHub, Medium, Instagram and Upwork profiles to `https://prammmoe.com/`. Use the same real name and Prammmoe handle where appropriate. Those account edits were not performed in this task.

Keep the homepage as the primary answer for the full name and aliases. Use `/services/` for service intent and `/projects/curated-works-2025/` plus real case studies for engineering evidence. Do not create separate near-identical pages for every spelling or capitalization. No artificial backlink purchases or fabricated credentials are needed.

Expand existing case studies with publishable engineering decisions, your role, constraints, and measurable outcomes you can substantiate. Continue first-hand articles about Swift, UIKit, SwiftUI, App Attest and production iOS work. Avoid publishing employer/private data. Link relevant articles to the related case study and vice versa when the relationship exists.

## Measurement

Record the release date and compare Search Console Performance over consecutive 28-day windows. Filter by country/device when interpreting positions. Track impressions, clicks, CTR, average position, indexed pages, and Google's selected canonical.

Query groups:

- Primary identity: `Pramuditha Muhammad Ikhwan`, `Ikhwan Pramuditha`, `Prammmoe` (capitalization does not warrant separate pages).
- Professional: `Pram iOS Dev`, `Pram iOS Developer`, `Pram Software Engineer`, `Prammmoe Swift`, and name + UIKit/SwiftUI.
- Broad experiment: `Pram`, with much less specific intent and competition outside software engineering.

Check results weekly after release; assess trends over several weeks instead of interpreting a single personalized search. No ranking target is guaranteed. An indexing request is a request, not proof of indexing.

## Primary references

- [Google site moves](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [Canonical consolidation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
