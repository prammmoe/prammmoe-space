# Cinematic Portfolio Motion

Branch: `codex/cinematic-portfolio-motion`

## 2026-10-21

### Changes
- Added portfolio-only motion tokens, staggered entrances, one-time 24 px reveals, desktop image parallax bounded to ±12 px, thumbnail hover, and button press feedback. Titles remain visible throughout entrance.
- Parallax uses separate image wrappers, observes visible images, batches reads before writes in one animation frame, and stops for reduced motion, mobile layouts, hidden tabs, and page suspension.
- Added native 200 ms cross-document view transitions with ordinary navigation as the fallback. Theme colors transition only after an explicit toggle; screenshot dialogs use native discrete transitions with 240 ms entry and 160 ms exit.
- Kept the existing screenshot deck gestures and keyboard controls; animation interruption ignores animations already canceled by a previous update.
- Added `motion={false}` to the shared layout. All blog articles opt out of entrances, scroll reveals, parallax, and page transitions, as requested; the blog listing remains animated.
- Standalone birthday, wishes, puzzle, matcha, and voucher pages retain the original 800 ms / 8 px reveal. No dependencies or assets added.

### Implementation findings
- Completing a reveal on mouse focus can move a link between pointer down and pointer up, canceling its click. Both the focus handler and its CSS fallback now reserve instant reveals for keyboard-visible focus in cinematic pages; anchor navigation still reveals immediately.

### Verification
- Browser coverage includes motion scope, every published blog article, bounded parallax, runtime reduced-motion changes, missing IntersectionObserver, theme persistence, rapid deck clicks, dialog focus, history restoration, and legacy standalone reveals.
- `npm run check` and `npm run build` passed. The existing Matcha `destinationData` diagnostic remains a hint; no source errors or warnings.
- All 48 Playwright tests passed, including axe checks in both themes and responsive coverage at 320, 375, 768, 1024, and 1440 px.
- `npm run audit:lighthouse` passed all existing assertions across seven URLs, three runs each. Thresholds were preserved: performance ≥95, accessibility 100, best practices ≥95, SEO 100.
- Reviewed homepage screenshots on desktop/mobile in both themes and the screenshot-gallery transition trace. `git diff --check` passed.

### Browser behavior
- Page transitions and dialog entry/exit enhance native navigation and dialog semantics where supported; unsupported browsers keep their native behavior.
- Blog article pages explicitly disable motion. The shared theme control and existing cursor behavior remain available while reading.

## 2026-11-17

- Added a homepage-only ASCII Christmas animation between the theme control and profile for 17 November 2026 through 31 January 2027 in Jakarta. Canvas renders the staged tree, garland, ornaments, star, gifts, and snow.
- The panel reaches both viewport edges and scales from 340 to 540 px tall. Motion pauses offscreen or in a hidden tab and shows a still frame for reduced motion. Playwright covers the dates, layout, and motion behavior.
- Increased glyph density, added layered gold garland and shaded gifts, and rotated the full scene geometry together. The homepage title stays readable below the taller seasonal panel.
- The collapsed panel opens on scroll near the top of the page. Eight colored gift boxes join the rotating scene.
- Dark mode is the default across the shared layout. The page and tree share a deep blue base, and near snowflakes fall faster than the flakes behind the tree.

## 2026-11-27 - Footer Christmas tree

- Moved the homepage seasonal tree into an after-footer layout slot, aligned to the right with a maximum width of 360 px and height of 340 px.
- Reveal now waits until the footer area reaches the viewport. Seasonal dates and motion controls are preserved.
- Removed the Cubbl Privacy Policy link from the footer; the policy route remains available directly.
- Updated browser coverage for footer placement, responsive width, and the removed link.
- Verification: Astro check and production build passed; `git diff --check` passed. Browser verification requires permission to start the local preview server outside the sandbox.

## 2026-11-27 - Separate Services page

- Moved all six service descriptions from the homepage to `/services/`, using the shared layout and a responsive two-column list that stacks on mobile.
- Updated footer navigation to the new route and added email and homepage contact links on the Services page.
- Kept Contact me on the homepage and removed the divider and service-specific styles left behind by the move.
- Updated route, navigation, service content, and anchor tests for the new page.
- Verification: Astro check and production build passed; built HTML checks confirmed the new route, all six offerings, navigation, contact links, and removal from home. Browser tests could not launch because the configured Google Chrome executable is unavailable.

## 2026-11-27 - Android development service

- Added Android development alongside iOS on the Services page, with the user-provided Batikan GitHub link as a work example.
- Updated the introduction, search description, and service-content test for seven offerings.
- Verification: Astro check, production build, built HTML assertions for Android content and the Batikan link, and `git diff --check` passed. Browser tests remain unavailable because the configured Chrome executable is missing.

## 2026-11-27 - Remove Android work reference

- Removed the GitHub reference from the Android service description and its link assertion; the Android service remains listed.
- Verification: inspected the updated description and ran `git diff --check`.

## 2026-11-27 - ASCII Christmas parade

- Expanded the footer scene while keeping the rotating Christmas tree on the lower right. Added a snowy village, snowman, overhead colored lights, twinkling stars, and denser snowfall.
- Added a detailed ASCII Santa with separate hat, face, beard, coat, gift sack, sleigh bowl, brass trim, and curled runners. Four articulated reindeer have branched antlers, harness bells, and a continuous rein.
- A wide waving banner uses large five-row ASCII lettering for “tis the season”. The entire procession travels left to right, exits completely, then re-enters from the left without reversing direction.
- Reduced motion renders the complete procession as a still frame. Offscreen and background-tab pausing remain in place. Removed the pause/play button at the user's request.
- Replaced the small house outlines with two layers of detailed houses: colored front and side walls, snow roofs, icicles, brick chimneys, drifting smoke, warm mullioned windows, wreaths, porch steps, festive lights, and fences.
- Verification: Astro check, production build, and all three Christmas browser tests passed using the installed Brave executable through a temporary configuration. Captured desktop/mobile browser screenshots. Renderer assertions verified finite glyph coordinates, changing frames, rightward travel, and wraparound. `git diff --check` passed.

## 2026-11-27 - Hide Christmas art in light mode

- Hide the entire Christmas scene in light mode without reserving space beneath the footer; dark mode restores it. The existing visibility observer pauses rendering while the scene is hidden.
- Updated browser coverage for theme switching, animation suspension in light mode, and loading with a saved light theme.
- Verification: Astro check, production build, `git diff --check`, and all four Christmas browser tests passed, including theme switching and saved light-mode preference.
