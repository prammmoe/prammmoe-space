# Personal search SEO audit

Date: 2026-11-27. Target: https://prammmoe.com. Scope: personal portfolio and branded/professional searches.

## Audit summary

Scope: homepage identity audit with site-wide metadata, published blog authorship, sitemap and server-documentation review. Evidence is from this repository and its generated static output. Overall SEO score: insufficient production data. No ranking, traffic, indexing, Knowledge Panel or field performance improvement is claimed.

Top issues before changes: `.space` remained the canonical origin; profile aliases and article bylines were incomplete; the documented Nginx fallback could serve the homepage for missing URLs. Top opportunities: consolidate domain signals, connect existing professional identities, and submit the released site through Search Console.

## Findings

| Area | Severity | Confidence | Finding and evidence | Impact | Fix/status |
| --- | --- | --- | --- | --- | --- |
| Canonical origin | Warning | Confirmed in source | Original Astro site, Base fallback and robots sitemap used `.space`. | Search engines receive a preferred domain different from the requested `.com`. | Changed canonical, sitemap, schema IDs and social URLs to `.com`; 20 generated sitemap entries checked. Requires deployment. |
| Personal identity | Warning | Confirmed in source | Original Person had no alternateName; homepage introduction only identified Pram. | Weaker explicit association between full name, handle, alternate name and profession. | Visible aliases and iOS role; Person alternateName; homepage ProfilePage linked to Person; WebSite name Prammmoe; six existing social profiles linked with sameAs. |
| Article authorship | Warning | Confirmed in source | Article headers previously displayed a date without an author. | Readers and crawlers had less visible evidence connecting writing to its author. | Linked full-name bylines; BlogPosting references the same Person, WebPage, language and actual publication dates. All seven published blog articles checked. |
| Social metadata | Warning | Confirmed in source | Twitter card omitted explicit title/image; social-card artwork displayed `.space`. | Inconsistent identity in shared previews. | Explicit Twitter metadata and updated SVG/PNG artwork. |
| Missing URLs | Warning | Likely on production | README recommended `try_files $uri $uri/ /index.html`; actual Nginx config is unknown. | If applied, arbitrary missing URLs could serve homepage content as HTTP 200, a soft-404 risk. | Added noindex `404.html` and documented `=404`/error_page configuration. Server deployment and response checks remain necessary. |
| Private pages | Pass | Confirmed locally | Five standalone personal pages retain noindex and are absent from the generated sitemap; 404 is excluded. | Keeps intentional private-content exclusions intact. | Domain-independent sitemap pathname filter plus regression tests. |
| Internal links | Pass | Confirmed locally | Homepage now links directly to writing, iOS portfolio and development services with descriptive anchors. Existing footer already linked public sections. | Improves discovery and context for professional content. | Added relevant homepage links without duplicate keyword pages. |
| Images | Pass | Confirmed in source | Existing Astro optimized portrait has dimensions and eager loading; added high fetch priority. | Helps browser prioritize the visible portrait without claiming a measured CWV gain. | Existing image pipeline preserved. |
| Content evidence | Pass | Confirmed in source | Real career/education history, six profile links, existing iOS case studies and engineering articles. | Provides first-hand professional evidence. | Retained source-supported claims; avoided fabricated metrics, employers or keyword-stuffed pages. |
| Indexing, rankings, redirects, CWV | Info | Hypothesis / unknown | No Search Console, CrUX or production response evidence. Public fetch failed DNS resolution here. | Actual index coverage and search performance cannot be assessed. | Follow the launch and measurement guide. |

## Prioritized action plan

1. Release the verified build on `.com`, then check actual status codes and canonical URLs.
2. Configure owned aliases to redirect to matching `.com` paths and serve true 404 responses.
3. Verify Search Console, submit the `.com` sitemap, inspect/request key URLs, and use Change of Address if migrating an indexed `.space` site.
4. Update existing external profile website links and maintain first-hand engineering articles/case studies.
5. Compare query groups and indexing over consecutive 28-day windows. The broad word `Pram` has ambiguous intent; prioritize full-name and name + profession searches.

## Verification

- `npm run check`: passes with zero errors/warnings and one existing hint in a standalone personal page.
- `npm run build`: passes; 26 static pages, including a 404 artifact.
- `npm run test:seo`: four tests pass, covering all 20 sitemap URLs, five private-page exclusions, 404 exclusion/noindex, profile identity, and seven articles' authorship/dates/language.
- `git diff --check`: passes.
- Skill `finding_verifier.py`: five submitted findings retained, no duplicates; source in `docs/seo-findings.json`.
- Final Lighthouse run completed on 2026-11-28 with all assertions passing: seven configured routes, three mobile lab runs each. Every route's median SEO, accessibility and best-practices score is 100. Median performance: homepage 99, blog listing 99, SSE article 99, curated iOS portfolio 99, ERHA Buddy 98, Rooted DBT 98, SLNG 97. Evidence: this run's `http://localhost:63394/` reports in `.lighthouseci/reports/`. These are local lab measurements, not production CrUX or Google rankings.
- Final browser suite: 54/54 tests pass, including responsive layouts, both themes, axe accessibility, keyboard flows, PDFs, link targets and new SEO checks. Used the existing configuration with Chromium selected and preview working directory explicitly set in `/tmp/prammmoe-seo-playwright.config.ts`. No assertions or thresholds were weakened.
- The first completed browser run exposed an existing homepage curation failure (53/54 passed). The homepage now respects its documented featured-article filter, and the existing App Attest article is featured. Homepage writing is App Attest, HMAC and SSE; other articles remain in the blog archive. The full browser suite and all 21 Lighthouse runs were repeated on the final build.

## Unknowns and environment limitations

- Direct public fetch could not resolve `prammmoe.com`, including the retry outside the sandbox. Browser-based web retrieval also failed. This is an environment limitation, not evidence that the site is down or not indexed.
- Initial Playwright run was blocked by sandbox port restrictions; an unrestricted retry then could not launch because Google Chrome was absent. Chromium installation was initiated for a further verification attempt.
- Initial Lighthouse healthcheck could not find Chrome. This was resolved by installing Chromium and passing its executable through `CHROME_PATH`; the completed run passed all existing assertions.
- Skill `parse_html.py` requires BeautifulSoup, absent in the default Python environment. Its lightweight schema validator reports missing top-level @type on an otherwise valid JSON-LD @graph container; this is a validator limitation. The output tests validate typed graph nodes and references directly instead of changing valid markup to satisfy that warning.
- Skill readability analysis ran, but it concatenates navigation, lists and technical names; its reading-grade estimate is not treated as evidence of a ranking issue.
- Skill references carry dates older than 90 days; Google ProfilePage, article and domain-move documentation was checked live for relevant guidance.
- DNS, HTTPS, server redirects, Search Console verification/submission and external profile edits were not performed. Local changes have not been deployed.

## Primary references

- [Google canonical consolidation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google domain moves](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [ProfilePage guidance](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Article guidance](https://developers.google.com/search/docs/appearance/structured-data/article)
