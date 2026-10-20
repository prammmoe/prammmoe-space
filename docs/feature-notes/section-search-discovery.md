# Section Search Discovery and Copyright

Branch: `main`

## 2026-10-20 - Link portfolio sections for visitors and crawlers

### Changed
- Added visible, server-rendered footer navigation to Projects, Writing, Experience, Tech stack, Education, Services, and Contact me.
- Added stable `projects`, `experience`, and `education` section IDs on Home; retained the existing section IDs.
- Set the shared footer copyright to the exact fixed text `© 2026 Prammmoe`.
- Added browser coverage for footer links, cross-page anchor navigation with the keyboard, and copyright across published portfolio pages.

### Stayed The Same
- Existing canonical URLs, sitemap generation, page titles, and structured data remain intact.
- The five standalone personal pages remain excluded from the sitemap and retain their noindex directives.

### SEO Decision
- Followed [Google's sitelinks guidance](https://developers.google.com/search/docs/appearance/sitelinks): logical site structure, relevant headings, and concise crawlable internal links.
- Sitelinks are selected automatically by Google; there is no markup that forces their appearance. No indexing submission or deployment was performed.
- After deployment, Google must recrawl the affected pages. The owner can request Home indexing through Search Console and submit the existing `https://prammmoe.space/sitemap-index.xml` sitemap.

### Verification
- Confirmed footer section navigation was missing in the original built HTML.
- `npm run check`, `npm run build`, and `git diff --check` passed; the existing standalone matcha `destinationData` hint remains.
- Verified seven crawlable footer links, valid destinations, and exact copyright across all 17 built portfolio pages.
- Full `npm test` passed: 40 tests, including footer keyboard navigation, five viewport sizes, both themes, axe, and sitemap/draft exclusion checks.
- Visually inspected the generated mobile light and desktop dark footer screenshots; links wrap cleanly and the requested copyright is visible.
