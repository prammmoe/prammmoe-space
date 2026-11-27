# Personal search SEO action plan

| Priority | Action | Impact / effort | Status / dependency |
| --- | --- | --- | --- |
| P0 | Use `.com` in canonical, sitemap, robots and schema | High / low | Implemented and verified in build; needs deployment. |
| P0 | Redirect owned `.space`/www aliases to equivalent `.com` URLs | High / medium | Concrete Nginx guidance in `docs/seo-launch.md`; requires server and TLS access. |
| P0 | Verify `.com` Search Console and submit sitemap | High / low | Requires owner account/DNS verification after `.com` works. No submission claimed. |
| P1 | Associate real name, aliases, iOS profession and social identities | High / low | Implemented visible copy, profile schema and sameAs links. |
| P1 | Link articles to author profile | Medium / low | Implemented visible bylines and unified BlogPosting identity. |
| P1 | Keep previews consistent with the preferred domain | Medium / low | Updated metadata and SVG/PNG social artwork. |
| P1 | Serve real 404 responses | Medium / low | Added static noindex 404; server configuration remains to apply. |
| P1 | Enforce SEO output checks in CI | Medium / low | Added four static tests; runs after build and before deployment. Browser tests also updated. |
| P2 | Point external profiles to `.com` | Medium / low | Owner account edits required; use existing real profiles. |
| P2 | Extend real case studies and first-hand iOS articles | Strategic / ongoing | Use documented roles/decisions/outcomes; link related work. Avoid duplicate alias pages. |
| P2 | Measure full-name and professional query groups | Strategic / ongoing | Establish Search Console baseline after release, then compare 28-day windows. |

Full execution steps, URL checks, query groups and primary Google references: [SEO launch guide](docs/seo-launch.md).

Ranking first is an objective, not an outcome established by these changes. `Prammmoe` capitalization does not require separate pages. `Pram` alone is a broad experiment; no ranking guarantee or numeric traffic forecast is made.
