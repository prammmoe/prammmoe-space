# Happy Birthday Nana Implementation Notes

Branch: `adjustment/old-design-light`

## 2026-09-20 - Secret birthday page

### Changed
- Added the standalone `/happy-birthday-nana/` Pink Y2K birthday page with animated CSS balloons, hearts, glitter, marquee, and reduced-motion support.
- Excluded the page from the generated sitemap and added no-index metadata.
- Added an opt-in browser-synthesized birthday loop behind the page music button.

### Stayed The Same
- Existing public navigation, footer, and shared page layout remain unchanged.

### Bugs And Fixes
- Bug: Pixabay denied automated download of the selected track with HTTP 403.
  Fix: used a local browser-synthesized melody so no unverified third-party media is bundled.

### Verification
- `npm run check`
- `npm run build`
- Confirmed the built page has no-index metadata and is absent from the sitemap.

## 2026-09-20 - Full-screen balloons and louder music

### Changed
- Replaced unsupported CSS balloon-position calculations with Astro-generated positions for 34 background and 14 foreground balloons.
- Raised oscillator gain to `0.8` and routed it through a browser compressor to keep the louder loop controlled.

### Verification
- `npm run check`
- `npm run build`

## 2026-09-20 - Voucher 001 banner

### Changed
- Added a retro banner identifying voucher 001 as the way Nana reached the hidden birthday page.
