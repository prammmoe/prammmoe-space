# Personal search SEO implementation notes

Branch: `codex/cinematic-portfolio-motion`

## 2026-11-28 - Personal identity and canonical domain

### Changed
- Astro canonical origin, robots sitemap, schema IDs, Open Graph and Twitter URLs now use `https://prammmoe.com`.
- Profile copy connects Pramuditha Muhammad Ikhwan, Prammmoe, Ikhwan Pramuditha and Pram to software engineering and iOS development. Existing career and social-profile sources are preserved.
- Person, WebSite, homepage ProfilePage and article BlogPosting share stable IDs. Articles display linked author bylines. Homepage directly links professional writing, iOS portfolio and services.
- Regenerated the social PNG from the updated SVG with the new brand/domain. Portrait receives high fetch priority.
- Restored the homepage's documented featured-article filter and featured the existing Apple App Attest guide, keeping the three newest curated engineering articles prominent.
- Added a noindex 404 page, domain-independent private sitemap exclusions, and documented actual Nginx 404 responses/alias redirects.
- Added `test:seo` covering all published sitemap pages, private exclusions, identity and authorship; included it in CI and the verify script. Updated browser SEO expectations.
- Audit, action plan and launch guidance are in root `FULL-AUDIT-REPORT.md`, root `ACTION-PLAN.md`, and `docs/seo-launch.md`.

### Stayed the same
- Existing URLs, career/education facts, PDFs, case studies, themes, interactions and intentional private-page noindex policies.
- Existing CI deployment conditions and Lighthouse quality thresholds.

### Bugs and fixes
- SEO origin still referred to the previous `.space` domain; all generated primary SEO signals now use `.com`.
- The documented server setup used a homepage fallback for unknown paths; corrected documentation and supplied a 404 artifact. Active Nginx configuration was not inspected or changed.

### Verification
- Astro check and build pass. Four static SEO tests pass; whitespace check passes.
- Final Lighthouse: 21 mobile lab runs across seven configured routes, all assertions pass. Median SEO/accessibility/best practices are 100 on every route; performance 97–99. Final report URLs use port 63394, distinguishing them from previous local runs.
- Final browser suite: 54/54 pass using installed Playwright Chromium and a temporary config selecting it with the existing preview working directory. Initial environment/config failures are documented in the audit.
- First completed browser run was 53/54 and exposed the pre-existing featured-writing mismatch; source behavior was corrected without weakening its test. Full browser and Lighthouse verification passed after this change.
- Public DNS fetch failed in this environment. Production headers, redirects, indexing, rankings and field Core Web Vitals remain unverified.
- Skill installed at `/Users/prammmoe/.codex/skills/seo`; no push, deployment, server changes, DNS changes or Search Console submission performed.
