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
