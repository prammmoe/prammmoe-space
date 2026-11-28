# Research & Publications

Branch: `codex/cinematic-portfolio-motion`

## 2026-11-28 — Journal publication and GEMASTIK paper

### Changed
- Added a home section after Writing, a footer link, and `/research/` with full coauthor credits.
- Journal metadata and publication date follow the [publisher record](https://journal.uny.ac.id/publications/jiety/article/view/4086): published 18 November 2026, Vol. 4 No. 1. The issue label says March; the publication date remains the publisher's explicit date. No DOI was supplied or invented.
- Added ScholarlyArticle structured data for the journal publication, linked to the existing Person identity.
- Embedded the original five-page Indonesian GEMASTIK PDF with separate open and download links. No PDF viewer dependency.
- Finalist designation follows the user's statement and the official GEMASTIK 2024 qualifying announcement listing Hashtag 000000 / UNY / Rubens Juristanto under Data Mining. Per the user's follow-up, the announcement link is omitted from the site. This is a finalist claim, with no medal or winner claim.
- PDF author credits follow the visible byline; template PDF metadata and placeholder journal footer were not treated as publication metadata.
- Original PDF copied byte-for-byte from `Gemastik_Hastag_000000-2.pdf`. SHA-256: `9693197d19cfd8a1092b659769e23dc4827e74909e99d403aed9159589f6934d`.
- Added the research route to browser coverage and Lighthouse configuration; tests cover authorship, finalist status, embedded PDF URL, served bytes, and download behavior.

### Verification
- Source PDF first page visually inspected after rendering with Poppler.
- Astro check: 0 errors, 0 warnings, one existing hint in the unrelated Matcha page.
- Static build and all four SEO tests passed.
- All 57 browser tests passed, including responsive widths 320–1440 px and axe checks in both themes.
- After removing the announcement link, rebuilt the site, reran all four SEO tests, and passed the focused research browser test including an explicit check that the link is absent.
- Lighthouse passed all unchanged thresholds on Home and Research, three mobile runs per route (six total).
- Changes are local; no deployment performed.
