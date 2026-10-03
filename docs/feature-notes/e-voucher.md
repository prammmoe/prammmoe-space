# E-Voucher Implementation Notes

Branch: `adjustment/old-design-light`

## 2026-10-03 - Free Matcha vouchers

### Changed

- Added the hidden `/e-voucher/` page with three keyboard-accessible envelope choices for vouchers 001–003.
- Added the supplied voucher artwork under `public/images/e-vouchers/`, with WhatsApp redemption and per-voucher PNG download actions.
- Added a non-blocking star easter egg, focus styling, dialog dismissal, responsive layouts, and reduced-motion behavior.
- Excluded the route from the generated sitemap and applied no-index metadata.
- Added native Node tests that verify the three voucher contracts and search exclusion.

### Stayed The Same

- Main navigation remains unchanged; the voucher page is accessible only from its direct URL.
- Redemption remains a manual WhatsApp handoff, without browser-based redeemed-state tracking or a backend.

### Verification

- `node --test test/e-voucher.test.mjs`
- `npm run check` (0 errors; existing unrelated hint in `matcha-round-the-globe.astro` remains)
- `npm run build`
- Browser spot-check was not run because permission to start the local development server was declined.

## 2026-10-03 - Secret letter reveal

### Changed

- Reworked the landing page as a neutral sealed-letter experience with ivory paper, charcoal ink, and a terracotta wax-seal accent.
- Removed all pre-reveal references to matcha; the supplied voucher artwork remains the reveal after a note opens.
- Added a single 500 ms click-triggered envelope-opening sequence that locks competing choices before the voucher dialog appears.
- Kept reduced-motion behavior immediate and retained keyboard focus restoration after the dialog closes.
- Replaced the star easter-egg copy with a neutral hidden-note message and recorded the approved visual audit at `anti-slop/audit-001-2026-10-03.md`.

### Verification

- `node --test test/e-voucher.test.mjs`
- `npm run check` (0 errors; existing unrelated hint in `matcha-round-the-globe.astro` remains)
- `npm run build`
