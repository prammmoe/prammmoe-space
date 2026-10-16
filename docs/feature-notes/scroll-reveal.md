# Scroll Reveal Implementation Notes

Branch: `main`

## 2026-10-16 - Subtle site-wide scroll reveal

### Changed
- Added one shared ScrollReveal component to the portfolio layout and all five standalone pages.
- Reveals content blocks once when they enter the viewport, fading in over 800 ms with 8 px of upward movement. Initially visible content stays immediately readable.
- Uses one IntersectionObserver per page, unobserving completed blocks; no scroll event loop or added dependency.
- Selects outer content blocks to avoid nested fades, and keeps screenshot deck/gallery internals under their existing interaction controls.
- Keyboard focus and anchor jumps reveal their targets immediately. Reduced motion, print, disabled JavaScript, or absent IntersectionObserver keep content readable.

### Verification
- Astro check and static build passed; the existing Matcha page hint remains.
- Build inspection confirmed all 22 generated HTML pages include the shared reveal script.
- All 38 browser tests passed, including reveal-once behavior and duration, keyboard/anchor access, reduced motion (initial and preference changes), printing, no-JavaScript fallback, axe in both themes, five viewport widths, and the existing card deck/gallery controls.
- Updated the two static preview capture tests to use reduced motion so screenshots show settled content instead of pending reveal blocks. The dedicated reveal behavior test still runs with motion enabled and captures its fully revealed block.
- All three affected preview/reveal tests passed again after that adjustment. Reviewed the settled mobile light and desktop dark screenshots; `git diff --check` passed.

### Anti Slop Delivery Gate
- Hard gate PASS: 38 browser tests cover both themes, five viewport widths, axe, real interactions, and readable keyboard/no-JavaScript/reduced-motion states; no new claims or assets.
- Purpose gate PASS: the user-requested 800 ms fade and 8 px translation introduce content during downward scrolling. No blur, parallax, layout animation, or additional dependency.
- Liveliness PASS: ENERGY 1 / RHYTHM 2 / MOTION 2; existing typography and section structure remain, with one-time motion on content blocks rather than nested elements.
- Craftsmanship PASS: all 22 built pages contain the feature, static preview screenshots were reviewed after settling, and focused elements/anchor targets reveal immediately.
