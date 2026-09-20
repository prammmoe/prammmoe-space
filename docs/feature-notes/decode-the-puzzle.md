# Decode the Puzzle Implementation Notes

Branch: `adjustment/old-design-light`

## 2026-09-20 - Hidden symbol room

### Changed
- Added hidden `/decode-the-puzzle/` puzzle room with five keyboard-accessible memory objects.
- Each discovery fills one fixed `4EVER` lock slot; all five unlock the final “I LOVE YOU FOREVER” message and a replay control.
- Added no-index metadata and sitemap exclusion for the route.

### Stayed The Same
- The page has no public navigation link and no background music.
- Reduced-motion visitors receive immediate, static state changes.

### Verification
- `npm run check` passed with no errors.
- `npm run build` passed; the generated route has no-index metadata and is omitted from the sitemap.

## 2026-09-20 - Midnight Archive Rework

### Changed
- Replaced the automatic five-symbol sequence with five recovered tiles carrying Roman-numeral shelf marks.
- The ledger now gives the self-contained reverse-archive clue; Nana selects and places tiles, then validates the order with the wax seal.
- Wrong arrangements clear only the slots. Found evidence remains available, and the final reveal occurs only after the correct `4EVER` order.
- Rebuilt the room as a charcoal, walnut, aged-paper archive with CSS Polaroid, clock, ticket, matcha cup, and pressed-paper star.

### Design decisions
- The ledger is the sole elevated surface so the next interaction remains clear; artifacts stay on the desk plane as physical evidence.
- Charcoal, walnut, and paper establish the archive material; muted crimson is reserved for the seal and validation focus.
- Motion only confirms inspection, placement, rejection, and unlock. Reduced-motion removes those transitions.

### Verification
- `npm run check` completed with 0 errors. The existing unrelated hint in the matcha page remains.
- `npm run build` completed and generated `/decode-the-puzzle/`.
- A generated-output and source scan found no Pandora text, and the sitemap exclusion remains configured in `astro.config.mjs`.

## 2026-09-20 - Caesar Archive Cipher

### Changed
- Replaced the direct `4EVER` solution with encrypted records: `K`, `S`, `U`, `GX`, and `FS`.
- Added a second seal stage that accepts only the decoded phrase `FOREVER`.
- Added recoverable failures and progressive cipher hints after the first and third failed validations.

## 2026-09-20 - Supplied artifact artwork

### Changed
- Added the supplied Polaroid, clock, ticket, star, and red-pin PNG assets under `public/images/forever-archive/`.
- Replaced the CSS object drawings on the archive desk with those assets; the red pin now replaces the matcha cup.

## 2026-09-20 - Route rename

### Changed
- Renamed the hidden puzzle route from `/forever-for-nana/` to `/decode-the-puzzle/`.
- Moved its page and implementation notes to match the new route, and kept the new route excluded from the sitemap.
