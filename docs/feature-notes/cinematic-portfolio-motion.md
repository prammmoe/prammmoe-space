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
