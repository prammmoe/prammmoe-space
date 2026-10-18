# Font and Theme Switch Implementation Notes

Branch: `main`

## 2026-10-18 - Reduce project thumbnails slightly

- Reduced desktop project thumbnails and their grid columns from 288px to 240px after user feedback; retained 112px mobile thumbnails.
- Verification: production build and `git diff --check` passed.

## 2026-10-18 - Larger project thumbnails

- Increased project list thumbnails from 144px to 288px on desktop and from 88px to 112px on mobile; updated the matching grid columns. Applies to the homepage and projects listing.
- Increased generated image dimensions to 576×324 for sharp rendering at double pixel density while retaining the 16:9 aspect ratio and lazy loading.
- Verification: production build, `git diff --check`, and all 11 responsive-layout/screenshot checks passed across 320–1440px in both themes.

## 2026-10-18 - Widen layout again

- Increased the shared page shell maximum width from 1120px to 1280px at the user's request.
- Verification: production build, `git diff --check`, and all 10 responsive layout checks across 320–1440px in both themes passed.

## 2026-10-18 - Wider main layout

- Increased the shared page shell maximum width from 920px to 1120px, retaining centered alignment and 20px horizontal padding. Article reading widths remain unchanged.
- Verification: production build and `git diff --check` passed; all 11 responsive-layout and screenshot checks passed across 320–1440px in both themes.

## 2026-10-18 - White Services and Contact me headings

- Set only Services and Contact me headings to `#fff` in both themes, overriding the general blue section heading colors.
- Verification: production build and `git diff --check` passed; generated CSS includes the scoped white heading selectors.

## 2026-10-18 - Toggle-only header

- Removed the Pram wordmark, Home/Projects/Writing navbar, and header divider; kept the theme toggle aligned to the right on desktop and mobile.
- Removed unused navbar styles. Existing All projects and All writing section links still open their listings.
- Updated existing browser checks to navigate through the section links, including keyboard and JavaScript-disabled coverage.
- Verification: Astro check (zero errors/warnings, one existing hint), production build, and all 22 site/cursor browser tests passed. Desktop/mobile previews captured in both themes; mobile dark header visually checked; `git diff --check` passed.

## 2026-10-18 - Softer blue for dark mode

- Set the seven homepage section headings to the lighter blue `#70b5ff` in dark mode, preserving `#007bff` in light mode.
- Verification: production build and `git diff --check` passed; Chrome confirmed all seven heading colors in both themes.

## 2026-10-18 - Blue homepage section headings

- Set all seven homepage section headings (Projects, Writing, Experience, Tech stack, Education, Services, Contact me) to the user-requested `#007bff`, scoped to the homepage.
- Removed the Contact me color override so it follows the same heading color.
- Verification: production build passed; Chrome confirmed all seven computed heading colors equal `rgb(0, 123, 255)` in light and dark themes; `git diff --check` passed.

## 2026-10-18 - Bundle supplied Apercu fonts

### Changed
- Copied the six user-supplied OTF files into `public/fonts/apercu/` and registered Apercu at weights 400, 500, and 700 in normal and italic styles, using `font-display: swap`.
- The existing requested font stack now loads bundled Apercu rather than relying on a locally installed copy.

### Verification
- `npm run build` and `git diff --check`: passed.
- Chrome loaded all six font faces successfully. DevTools confirmed the introduction renders with the custom Apercu font.
- Both themes fit viewports from 320 to 1440 px, with no browser errors. Captured desktop preview for visual inspection.

## 2026-10-18 - Requested font stack and theme switch reference

### Changed
- Set the shared portfolio body font to `Apercu, "Source Sans Pro", system, system-ui, -apple-system, "system-ui", Roboto, Helvetica, Arial, sans-serif`. Apercu and Source Sans Pro font files are not bundled; browsers use the available fallback.
- Restyled the existing theme button to show an outlined sun, gray track with a white thumb, and crescent moon, following the supplied second image at header scale (132 × 44 px overall).
- Both icons remain visible; the thumb moves right in dark mode. Added `aria-pressed` and limited the transition to users without reduced motion enabled.
- Updated the existing theme test for the new dimensions and exposed state.

### Stayed The Same
- Default light theme, saved preference, storage synchronization, keyboard activation, and hiding the control without JavaScript.
- Standalone custom pages retain their own typography; code blocks retain their monospace font.

### Verification
- `npm run check`: zero errors or warnings, one existing hint in `matcha-round-the-globe.astro`.
- `npm run build`: passed.
- `npx playwright test tests/site.spec.ts tests/cursors.spec.ts --workers=2`: 22 passed, including keyboard activation, theme persistence, 320–1440 px layouts, both themes, axe accessibility, and custom cursor behavior.
- Visually inspected generated mobile light and desktop dark header screenshots against the reference.
- `git diff --check`: passed.

### Design Review
- Direction: existing minimal portfolio, restrained typography and motion (energy 1 / rhythm 1 / motion 1). Font and sun/track/moon arrangement explicitly requested by the user.
- Hard gate PASS: changed controls work with mouse and keyboard; both themes and mobile layouts pass browser tests and axe.
- Purpose gate PASS: sun and moon describe theme choices; gray track and white thumb follow the reference. No extra visual techniques or content introduced.
- Liveliness PASS: existing page hierarchy, spacing, accent, and identity preserved; the requested font stack supplies the typographic direction.
- Craftsmanship PASS: screenshot review confirms the switch arrangement; build and browser checks pass. No new claims or template sections.
