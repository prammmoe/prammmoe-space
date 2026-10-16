# Nyaris Terkenal Implementation Notes

Branch: `main`

## 2026-10-16 - Other Projects slider

### Changed
- Added Other Projects below the existing case studies on `/projects/` with Nyaris Terkenal, the supplied screenshot, and the approved one-sentence English description. The section name supports projects beyond websites, as requested.
- Both the preview and title link directly to the live website in the same tab.
- Used Astro Image for responsive WebP previews at 320, 640, and 880 pixels, preserving the screenshot's original aspect ratio.
- Arranged project cards in a native horizontal scroll-snap list, up to 360 pixels wide and fitting narrow screens. There is currently one real project; additional cards can scroll when the list exceeds the viewport.
- Reused the existing section spacing, theme tokens, and keyboard focus styles; no extra JavaScript or dependency.
- Added a browser check for image loading, optimized image output, both destinations, keyboard focus, desktop/mobile screenshots in both themes, and homepage exclusion.

### Stayed The Same
- Homepage featured projects, project collection schema, case study routes, and the existing five-cover assertion remain unchanged.

### Verification
- Astro check passed with zero errors or warnings and the existing Matcha page hint.
- Static build passed with 22 pages; no new case study route.
- Updated slider version passed all 33 browser tests, including five viewport widths in both themes, axe checks, image loading, both external destinations (with a test response), and visible keyboard focus.
- Reviewed the slider screenshots on desktop in dark mode and mobile in light mode. `git diff --check` passed.

### Anti Slop Delivery Gate
- Hard gate PASS: five widths without page overflow, both themes pass axe, preview/title destinations and keyboard focus verified; no fabricated projects or claims.
- Purpose gate PASS: native horizontal scrolling and snap support browsing project cards; existing typography, spacing, and theme tokens retained, with no extra animation or dependency.
- Liveliness PASS: ENERGY 1 / RHYTHM 2 / MOTION 1; the supplied project preview is the focal point, and existing section rules and spacing distinguish this collection from case studies.
- Craftsmanship PASS: responsive desktop/mobile screenshots reviewed; optimized image loads, both links work, and the existing five-cover case study assertion passes.
