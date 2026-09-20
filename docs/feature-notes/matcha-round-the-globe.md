# Matcha Globe Wishes Implementation Notes

Branch: `adjustment/old-design-light`

## 2026-09-20 - Voucher 003 matcha globe

### Changed
- Added the hidden `/matcha-round-the-globe/` Frutiger Aero matcha-café wish page with 63 unique destinations, Google Maps searches, editorial references, a searchable full list, and shuffled non-repeating playback.
- Added the supplied Matcha With The Sun MP3 as a looping native audio asset with autoplay and first-interaction fallback.
- Excluded the new hidden route from the sitemap and applied no-index metadata.
- Reworked the scene around the supplied Frutiger Aero skyline asset; removed all editorial-source UI and music controls while preserving Google Maps links and continuous audio looping.
- Removed the rotating destination counter from the foreground wish card.
- Switched the page to a local Myriad/Apple-style font stack and disabled smoothing for a more period-authentic web rendering.

### Stayed The Same
- Public navigation remains unchanged; the page is available only from its direct path.
- Reduced-motion visitors receive static visuals and no automatic audio or wish rotation.

### Verification
- `npm run check` passed with no errors.
- `npm run build` passed; the generated route includes no-index metadata, the sitemap excludes it, and the MP3 is emitted as a public asset.
