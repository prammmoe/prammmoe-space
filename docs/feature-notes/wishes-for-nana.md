# Wishes For Nana Implementation Notes

Branch: `adjustment/old-design-light`

## 2026-09-20 - Voucher 002 wish player

### Changed
- Added the private `/wishes-for-nana/` voucher page with 200 locally defined, shuffled wishes for Nana.
- Added a silver-blue skeuomorphic wish player, left-to-right wish transitions, and a loud retro oscillator with a compressor.
- Excluded the route from the generated sitemap and supplied no-index metadata.

### Stayed The Same
- Existing pages, navigation, and voucher 001 remain unchanged.

### Verification
- `npm run check`
- `npm run build`

## 2026-09-20 - Dynamic ticker styling

### Bugs And Fixes
- Bug: JavaScript-created ticker rows did not receive Astro-scoped CSS, leaving all wishes static and wrapped.
  Fix: made the ticker-row selector global within the scoped ticker container so the animation and one-line layout apply after creation.

## 2026-09-20 - English wishes and Akad audio

### Changed
- Replaced the runtime wish data with 200 unique English messages for Nana.
- Added the supplied `Payung Teduh Akad Music Video.mp3` as the page's looping local audio and replaced the oscillator controls with native audio playback.

### Verification
- `npm run check`
- `npm run build`
- Confirmed the built voucher page contains no Indonesian wish text and includes the local MP3 asset.

## 2026-09-20 - All wishes menu

### Changed
- Added an `Open all wishes` menu action that opens a skeuomorphic dialog containing the complete 200-wish list.

## 2026-09-20 - Varied English wish openings

### Changed
- Replaced the repeated 25-opening pattern with 200 original English openings, then dispersed the existing eight closings across the new list.

### Verification
- `npm run check`
- `npm run build`
- The 200-wish assertion rejected the initial 204 entries, then passed after the list was corrected to exactly 200.

## 2026-09-20 - Wish library spacing

### Bugs And Fixes
- Bug: Native ordered-list markers overlapped text in the two-column all-wishes dialog.
  Fix: replaced the external markers with fixed-width CSS counters and added horizontal and vertical grid gaps.

## 2026-09-20 - Hide wish counter

### Changed
- Removed the visible current-wish counter from the main player display while preserving the shuffled sequence.
- Confirmed the built page has no-index metadata and is absent from the sitemap.

## 2026-09-20 - Background wish tickers and autoplay fallback

### Changed
- Added five independently shuffled, left-to-right background wish tickers behind the player.
- Added an autoplay attempt for the retro oscillator and a first-interaction fallback when the browser blocks it.

### Verification
- `npm run check`
- `npm run build`
