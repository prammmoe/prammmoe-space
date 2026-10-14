# Freelance Services and Contact Implementation Notes

Branch: `revamp/v4.0.0`

## 2026-10-15 - Homepage freelance services and contact

### Changed
- Added Services after Education, followed by Contact Me as the last homepage section before the footer.
- Added four English service descriptions for native iOS apps/MVPs, integrations, maintenance/releases, and web development.
- Reused the profile Upwork URL, existing section/button styles, and light/dark theme tokens.
- Added a mailto action with the subject “Freelance project inquiry” and a selectable email address that wraps on narrow screens.

### Stayed The Same
- Shared layout and other pages; the revamp homepage needs no extra layout slot.
- Original main-branch changes are saved in the stash named `Preserve main homepage services and local masthead before revamp switch`.

### Verification
- `npm run check`: exit 0; no errors or warnings, one pre-existing Matcha page hint.
- `npm run build`: exit 0; 22 pages generated.
- Updated the existing homepage browser assertion for the new headings, four services, and exact mailto destination.
- Browser checks were not run: local server permission was declined earlier in this task.

## 2026-10-15 - Black services and contact card

### Changed
- Grouped Services and Contact Me in one black card with rounded corners and an internal divider.
- Scoped light text, muted descriptions, borders, and focus/hover colors to the card for readable contrast in both page themes.
- Made Send email a light button and reduced card padding on mobile.

### Verification
- `npm run check` and `npm run build`: exit 0; the pre-existing Matcha hint remains.
- `git diff --check`: passed.
- Browser preview unavailable: no local server running; prior server permission remains declined.

## 2026-10-15 - Premium card, controlled gradient, and social footer

### Changed
- Added a two-column Services/Contact card above 760px, stacked on smaller screens, with a 20px radius, layered charcoal surface, and restrained elevation.
- Added a 20-second rotating sage gradient confined to the border. It draws attention to the freelance inquiry area while leaving text stationary and readable.
- Added Pause/Resume controls and automatic pauses outside the viewport, in inactive tabs, and with reduced motion. Without JavaScript the border remains static.
- Added the shared “Let’s connect” footer with six labelled, 52px icon links using existing profile URLs, local SVGs, and the existing GitHub asset.
- Retained Media/Music and copyright; removed duplicate social text links and their obsolete CSS.
- Visual direction: ENERGY 2 / RHYTHM 2 / MOTION 2. The gradient and shadow distinguish one conversion card; brand icons identify actual profile destinations.

### Bugs And Fixes
- The existing navigation test searched for an outdated ERHA project title. Updated both assertions to the actual title already present in HEAD without changing project content.

### Verification
- Astro check and build passed; one pre-existing Matcha hint remains.
- Full browser suite passed: 32 tests, including all five viewport widths in both themes and axe checks.
- Reviewed card and footer screenshots on desktop/mobile.
- Two targeted final checks passed for visibility events, reduced motion, and fresh card/footer screenshots.
- Lighthouse: 21 runs across seven routes; median scores of 100 for Performance, Accessibility, Best Practices, and SEO on every audited route. Chrome was provided through `CHROME_PATH` because automatic discovery failed.
- Final `npm run check`, `npm run build`, and `git diff --check` passed.

### Anti Slop Delivery Gate
- Hard gate PASS: browser checks cover all five widths in both themes, keyboard access, real destinations, no-JavaScript behavior, and axe with no serious/critical violations. No new claims, testimonials, or statistics were introduced.
- Purpose gate PASS: the sage border motion and restrained shadow emphasize the single freelance inquiry card; local monochrome brand marks identify six real profiles. No decorative badges, grids, or generic feature icons were added.
- Liveliness PASS: ENERGY 2 / RHYTHM 2 / MOTION 2; the contact headline is the focal point, two-column composition separates services from the inquiry, and the existing sage accent appears at the card edge.
- Craftsmanship PASS: desktop/mobile screenshots reviewed, pause/resume and reduced motion tested, themes retain readable contrast, and Lighthouse thresholds remain unchanged.

## 2026-10-15 - Automatic gradient across the card surface

### Changed
- Made the dark inner surface translucent so the rotating sage gradient is visible across the card as well as its border.
- Removed the Pause/Resume button and manual pause state at the user's request.
- Removed “View my Upwork profile” from Services; the existing footer Upwork icon remains.
- Kept automatic pauses outside the viewport, in hidden tabs, and with reduced motion. Text remains static under a dark contrast layer.

### Verification
- Astro check and build passed; the existing Matcha hint remains.
- Updated the browser test to verify actual animated transform changes and the absence of both removed controls.
- Full browser suite passed: 32 tests, including actual gradient motion, removed controls, five viewport widths in both themes, and axe.
- Desktop card screenshot reviewed; text remains readable over the animated surface. `git diff --check` passed.
- Anti Slop gate PASS: gradient is confined to the one freelance card, motion controls were removed by explicit user request, automatic motion safeguards remain, and real links/content are preserved.

## 2026-10-15 - Left-to-right skeleton-style shimmer

### Changed
- Replaced the rotating conic gradient with a soft horizontal sage highlight that translates left to right across the card every 4.5 seconds.
- The highlight starts and ends outside the card to avoid a visible reset. The dark overlay keeps text readable.
- Existing viewport/tab visibility and reduced-motion safeguards remain; removed controls stay absent.

### Verification
- Astro check and build passed with the existing Matcha hint.
- Added a browser assertion that the shimmer's horizontal translation increases and its animation is `card-shimmer`.
- Three targeted browser checks passed: left-to-right motion and safeguards, desktop/mobile screenshots in both themes, and axe across public pages in both themes.
- `git diff --check` passed. Anti Slop gate PASS: one user-requested decorative shimmer, static readable text, and existing real destinations unchanged.

## 2026-10-15 - Remove footer personal-note links

- Removed Media and Music links and their navigation container from the shared footer.
- Kept the social profile icons and copyright; the Media and Music pages remain available at their existing routes.
- Build passed; generated HTML assertions confirmed the links are absent from all 20 pages using the footer. `git diff --check` passed.

## 2026-10-15 - Data annotation and YOLO services

- Added Data annotation for image/object labelling and dataset preparation.
- Added Computer vision & YOLO training for dataset preparation, object detection training, and model evaluation.
- Expanded the services introduction and homepage assertion to cover all six service categories.
- Build passed; generated HTML assertions verified all six service categories, including both additions. `git diff --check` passed.

## 2026-10-15 - Two-column services with contact below

- Changed the six service entries to a two-column, three-row grid on desktop; mobile retains one column below 761px.
- Moved Contact Me to a full-width bottom row with a horizontal divider.
- Expanded the contact headline width and restored the email action/address to a wrapping horizontal row.
- Build and `git diff --check` passed. All 13 targeted browser checks passed, covering six service entries, five widths in both themes, screenshots, and axe.
- Desktop screenshot reviewed: Services uses two columns and Contact Me spans the bottom row. Anti Slop gate PASS for the scoped layout change.
