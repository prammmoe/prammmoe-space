# Medium-style Blog Layout Implementation Notes

Branch: `main`

## 2026-08-26 - Medium-style Blog layout

### Changed
- Applied a shared, constrained reading layout and long-form typography to Blog article pages.
- Added cover/dek presentation, a standalone Einstein figure, and KaTeX rendering for Markdown math.

### Stayed The Same
- Existing Blog metadata and article content remain unchanged apart from moving the Einstein image above its sentence.

### Verification
- `npm run check` and `npm run build` pass; generated article HTML includes KaTeX output and the standalone Einstein figure.

## 2026-08-26 - Tafakkur illustration

### Changed
- Added a credited, wide contextual image immediately before the article's tafakkur section.

## 2026-08-26 - Einstein portrait size

### Changed
- Increased the standalone Einstein portrait to a 14rem maximum width.

## 2026-08-26 - Gravity equation explanation

### Changed
- Added a concise explanation of each variable in Newton's gravity equation and its inverse-square relationship.
