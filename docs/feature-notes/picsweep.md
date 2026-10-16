# PicSweep Implementation Notes

Branch: `main`

## 2026-10-16 - Add PicSweep to Other Projects

### Changed
- Added PicSweep as the second horizontal project card with the user's exact Android app description.
- Included all five supplied screenshots in a compact, uncropped preview strip. Each thumbnail links to an optimized full-size WebP image.
- Used existing theme colors and card typography; the preview matches Nyaris Terkenal's aspect ratio so titles align.
- Kept the title as plain text because no application/store URL was supplied.
- Updated the existing slider test for two cards and added coverage for PicSweep screenshots, full-size links, mobile scrolling, keyboard reachability, and both themes.

### Stayed The Same
- Nyaris Terkenal's destination and copy, homepage projects, collection schema, and case study routes.

### Verification
- Astro check passed with zero errors or warnings and the existing Matcha page hint.
- Static build passed with 22 pages and optimized thumbnails/full-size images.
- All 34 browser tests passed, including five viewport widths in both themes, axe, two-card slider behavior, all five thumbnails/full-size image responses, keyboard access to PicSweep on mobile, and full-size image navigation.
- Reviewed mobile light and desktop dark screenshots; both projects retain aligned previews and readable descriptions. `git diff --check` passed.

### Anti Slop Delivery Gate
- Hard gate PASS: both themes pass axe; no horizontal page overflow at five widths; real supplied images, working full-size destinations, and keyboard-reachable cards verified.
- Purpose gate PASS: the five-screen strip shows the supplied app flow within one project card; existing theme surface distinguishes the portrait screenshots without cropping or adding motion.
- Liveliness PASS: ENERGY 1 / RHYTHM 2 / MOTION 1; actual project previews anchor each card, with existing spacing and typography preserved.
- Craftsmanship PASS: desktop/mobile previews reviewed, all 34 tests pass, and no fake application/store destination was introduced.

## 2026-10-16 - Poker-style screenshot deck

### Changed
- Replaced the five-thumbnail strip with one full portrait screenshot in front and layered screenshots behind it.
- Added swipe/drag, previous/next buttons, a live position counter, and arrow-key navigation. The front card swings aside and returns behind the next card over two transform-only phases (130 ms out, 170 ms back).
- Interrupted animations retain their current transforms before retargeting; short or cancelled gestures return the card to the stack. Only the active screenshot is interactive or exposed to assistive technology.
- Reduced motion and keyboard navigation switch screenshots immediately. Without JavaScript, all five screenshots remain available in a single-column list with full-size links.
- Kept Other Projects' outer horizontal slider and the approved project descriptions.

### Verification
- Astro check and build passed; reviewed desktop dark/mobile light screenshots of the stacked layout.
- Initial browser run passed 34 of 35 checks, including five viewport widths, both themes, and axe. The idle check also counted the existing infinite Zelda cursor animation on the hovered button; runtime keyframes confirmed it was a cursor animation. Scoped that assertion to transform animations so it checks card motion directly.
- Final Astro check and build passed; all 35 browser tests passed, including repeated navigation, pointer swipe without accidental link navigation, five-card wraparound, keyboard access, no-JavaScript fallback, reduced motion, both themes, and five viewport widths.

### Anti Slop Delivery Gate
- Hard gate PASS: both themes pass axe; five widths avoid page overflow; only the active card is focusable; existing real screenshot destinations work.
- Purpose gate PASS: card rotation, translation, stacking, and subtle shadows implement the requested physical deck; no automatic rotation or added dependency.
- Liveliness PASS: ENERGY 1 / RHYTHM 2 / MOTION 2; one large screenshot is the focal point, and the rear layers explain the available collection.
- Craftsmanship PASS: desktop/mobile stack screenshots reviewed, all 35 tests passed, and reduced-motion/keyboard changes avoid movement. `git diff --check` passed.
