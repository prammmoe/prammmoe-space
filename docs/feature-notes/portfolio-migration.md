# Portfolio PDF to HTML

## Source and scope

- Source: the user-supplied `portfolio (2).pdf`, 41 pages. Its SHA-256 is `177f0fa8cda69940dffa74bb67a7e35541703faed98f2527a05fead203a2e043`, matching the existing `public/portfolio.pdf` exactly.
- Read the PDF text layer and rendered every page. Visually transcribed the embedded App Store statistics, Rooted DBT code examples, and additional project descriptions whose text was absent from the PDF text layer.
- Migrated the authored narrative and meaningful chart/code content into readable HTML; screenshots, illustrations, UI labels within mockups, and QR graphics remain visual material for the user's later image supply. No image placeholders or fabricated destinations added.
- Copy is edited for grammar and web reading while preserving scope, outcomes, measurement qualifications, technology names, roles, and dates.
- New page dates are web publication dates, not claims about when the projects began or finished.

## Page coverage

| PDF pages | Web destination | Content |
| --- | --- | --- |
| 1–3 | `/projects/curated-works-2025/` | Identity, positioning, selected-work period, professional and educational background |
| 4–13 | `/projects/erha-buddy/` | Production context and all nine contributions: registration, Flash Sale, SSE, HMAC, App Attest, Calculate Order, checkout, Home, Referral |
| 14–22 | `/projects/slng/` | Problem, contextual data model, entry points, motion, testing, Go migration, analytics, technology stack |
| 23–24 | `/projects/slng/` | Historical App Store metrics and release context, including territory/source/device breakdowns and retention limitation |
| 25–31 | `/projects/paintee/` | Problem, continuous AR session, voice control, focused flow, stack, release context |
| 32–36 | `/projects/rooted-dbt/` | Routing, generic lesson structures, both illustrated usage examples, reuse, key learnings |
| 37–40 | `/projects/curated-works-2025/` | Dialogua, Miruu, FreeUtang descriptions and iOS Developer roles |
| 41 | `/projects/curated-works-2025/` | Closing positioning, role availability, LinkedIn/GitHub/Medium, phone |

## Decisions and compatibility

- Reused Projects rather than adding competing Writing/Articles categories. The existing portfolio URL is the overview; four new case-study pages provide direct links from Projects. ERHA Buddy and SLNG lead the homepage's selected work, with a direct Read portfolio link beside the PDF download.
- Kept all existing published URLs, the older non-iOS gallery, the PDF download, and standalone personal pages. The old iOS gallery's content is replaced with accessible HTML and links to the new studies.
- Text-only rows use full available width. Native collapsible section navigation gives long studies anchor links without client JavaScript.
- App Store numbers are explicitly historical, and the screenshot does not show a year. Visible territory rows are identified as partial; no missing territory numbers were invented.
- ERHA's 98.1% figure remains checkout **intent**, quarter-over-quarter, with contribution rather than sole attribution. Calculate Order's 89% remains the largest observed reduction.
- Source regression test was observed failing against the old built portfolio title before implementation.

## Verification

- `npm run verify` passed: Astro check with zero errors/warnings (one pre-existing hint on the standalone matcha page), static build with 22 pages, all 23 browser tests, and all Lighthouse assertions.
- The 17-route browser matrix passes at 320, 375, 768, 1024, and 1440 px in light and dark; no page overflow or runtime errors. Axe found no serious/critical issues in either theme.
- Migration tests confirm case-study links, nine ERHA contributions and their qualified results, historical App Store values and retention limitation, both generic code examples, and keyboard-operated section anchors.
- Reviewed desktop/mobile screenshots in both themes and the native browser reading layout/accessibility tree. Previews are under `test-results/portfolio-capture-readable-portfolio-previews/`.
- All seven Lighthouse routes (`/`, `/blog/`, SSE article, portfolio overview, ERHA Buddy, SLNG, Rooted DBT) had three mobile runs each. All four category medians were **100** for every route. Saved 21 reports under `.lighthouseci/reports/`.
- Independent source and code review found no concrete omissions or inaccuracies in the migrated narrative, numbers, roles, dates, code, or navigation.
- `git diff --check` passed. No commit, push, or production deployment performed.

## Delivery gate

- Content PASS: full authored narrative mapped by PDF page; raster statistics/code/descriptions manually checked; no invented claims or link destinations.
- Interface PASS: native section navigation works with keyboard, text-only rows use full width, and there are no decorative image placeholders.
- Accessibility PASS for the new HTML content: semantic headings, readable code/tables, focus states, both themes, and axe checks on the full public route inventory. The older non-iOS image gallery remains outside this migration.
- Quality PASS: check/build, 23 browser tests, independent source review, and seven-route Lighthouse medians all passed without weakening thresholds. Editorial Energy 1 / Rhythm 1 / Motion 1 retained.

## 2026-10-14: Project covers and ERHA screenshots

Added the supplied 21 ERHA Buddy device screenshots to the registration, Flash Sale, checkout, Home, and referral narratives. Screenshots retain their full aspect ratio, appear in two columns on larger screens and one column on narrow phones, and use descriptive alt text and Astro-generated lazy-loaded WebP assets. No gallery script or carousel dependency.

Every public project now has a cover on its listing and detail page. ERHA Buddy, SLNG, Paintee, Rooted DBT, and the overview use full-page 1600 px PDF snapshots from pages 4, 14, 25, 32, and 1; the older portfolio retains its existing cover. Expanded the shared project list's asset lookup to include these covers.

Astro check/build and all 26 browser tests passed, including both-theme axe, all viewport sizes, and image/cover assertions. Screenshot verification scrolls to load every lazy image before capture.

Lighthouse rerun: all assertions passed across 7 pages and 21 mobile runs (three per page); reports saved in `.lighthouseci/reports`. Full ERHA desktop screenshot reviewed after all 21 images loaded; the focused screenshot test passed again.

## 2026-10-14: Swipe screenshot galleries

Replaced the tall screenshot grids with horizontal native scroll-snap galleries. Mobile shows a next-slide preview and supports touch swipe; desktop adds previous/next buttons, visible-range counts, and captions drawn from the existing descriptive alt text. Each feature remains a separate named gallery. No autoplay or carousel dependency. Keyboard supports Left/Right/Home/End, controls disable at boundaries, and reduced motion scrolls instantly. Without JavaScript, the named focusable scroll area and native scrollbar remain usable.

Astro check/build and all 27 browser tests passed, including native touch gesture, arrow controls, keyboard navigation, overflow across five viewport sizes in both themes, and axe. Full loaded desktop/mobile previews regenerated.

## 2026-10-14: Remove visible gallery controls

Removed the position counter and previous/next buttons at the user’s request. Native swipe, scrollbar, captions, and keyboard Left/Right/Home/End remain available. Removed the unused scroll observer and control styles.

## 2026-10-14: SLNG screenshots

Added all 10 user-supplied SLNG screenshots in five narrative groups: onboarding/input under the problem statement, contextual translation/examples/dictionary under modeling nuance, iMessage keyboard and explanation under conversation entry points, expressive radial treatment under motion, and listening/processing under user-feedback-driven voice input. Reused native swipe galleries without counters or buttons. A one-image gallery now receives the same caption and accessible region treatment. Existing facts and historical App Store metrics were preserved.

Astro check/build, diff whitespace check, and all 28 browser tests passed, including image loading, correct grouping, keyboard gallery navigation, responsive overflow checks, and axe in both themes. Desktop/mobile previews regenerated.

## 2026-10-14: Small galleries and screenshot popup

One screenshot uses an image-and-caption composition on desktop; two screenshots use a centered, balanced pair. Both stack on narrow mobile screens and no longer use a full-width empty carousel panel. Galleries with three or more screenshots retain swipe and keyboard navigation.

Clicking an image or View full size opens a native modal dialog in the current page. Close button, Escape, and backdrop click dismiss it; native modal focus containment and restoration preserve keyboard usability. Added no dependencies. Popup images load only when opened.

Astro check/build and all 30 browser tests passed, including one/two-image responsive layout, full-size image routes, popup opening/dismissal/focus restoration, swipe, and both-theme axe. Mobile and desktop popup screenshots captured.

## 2026-10-14: Table styling

Updated content tables with neutral shaded headers, subtle alternating rows, horizontal separators, rounded outline, and accented values using tabular numerals. Kept semantic table markup, full-width columns, and text wrapping on narrow screens. Shared styling applies to portfolio and article tables in both themes. Build and all 30 browser tests passed, including axe and five viewport widths in both themes.

## 2026-10-14: Rooted DBT screenshots

Added all nine supplied device screenshots in three narrative groups: quiz, preview, Wise Mind, and reflection under dynamic routing; mindfulness and distress tolerance beside the generic component examples; About DBT, emotion regulation, and interpersonal effectiveness under view reuse. Reused the ERHA Buddy gallery pattern, including descriptive captions, native swipe, keyboard navigation, balanced two-image layout, and full-size screenshot popup. Existing text, shared components, and styles are preserved.

Astro check passed with zero errors/warnings and one existing hint; static build passed and generated nine lazy-loaded WebP screenshots. All 30 browser tests passed, including image loading, five viewport widths in both themes, gallery interactions, and axe. Reviewed regenerated Rooted DBT desktop/mobile previews; diff whitespace check passed.

Design gate: Hard gate PASS (supplied assets, descriptive alt text, image loading, responsive and axe checks); Purpose gate PASS (existing gallery places evidence beside the corresponding narrative); Liveliness PASS (existing editorial Energy 1 / Rhythm 1 / Motion 1, screenshots as section focal points); Craftsmanship PASS (check/build, 30 browser tests, and inspected previews). No new styling or dependencies.

## 2026-10-14: DBT code images and Paintee visual narrative

Added the two supplied DBT code images beside their matching selectable Swift examples. Added all 15 Paintee assets: onboarding/tutorial, four real painting images, two Voice Control images, six sequential application screens, and the technology strip. Placement follows PDF pages 26–30; onboarding/tutorial extend the introduction using the supplied artwork.

Design: preserve the editorial shell and native screenshot popup; stagger the introductory pair on desktop, stack it on mobile, and number the six-step storyboard with yellow caption rules drawn from Paintee's interface. The accent connects the sequence without recoloring the rest of the portfolio. Energy 2 / Rhythm 2 / Motion 1 for Paintee evidence; no decorative animation or dependency added.

Astro check/build passed and all 30 browser tests passed. After restoring the interrupted DBT image insertion, rebuilt and reran the 13 relevant image, responsive, axe, and preview checks successfully. Added Paintee to the existing desktop/mobile preview capture; inspected Paintee desktop/light and mobile/dark plus the final DBT preview. Whitespace check passed.

Design gate: Hard gate PASS (all supplied assets load, responsive checks at five widths and both-theme axe pass); Purpose gate PASS (PDF section placement, introductory stagger, numbered yellow storyboard rules connect actual painting steps); Liveliness PASS (Paintee Energy 2 / Rhythm 2 / Motion 1, screenshots anchor each section); Craftsmanship PASS (build, browser checks, and visual preview review). Shared gallery interactions remain unchanged.

## 2026-10-14: Remove overview from Projects list

Removed the iOS Engineering Portfolio overview row from the Projects listing at the user's request. Its existing page and Read portfolio link remain accessible. Updated the listing assertion to five project covers and check that the overview row is absent.

Verification: static build, targeted browser listing/cover test, and diff whitespace check passed.

## 2026-10-14: Remove Read portfolio links

Removed Read portfolio from the homepage Projects section and Projects listing at the user's request. Download portfolio remains available.

Verification: static build and whitespace check passed; checked both built pages for absence of Read portfolio and presence of Download portfolio.

## 2026-10-14: Minimal image controls

At user request, View full size appears only for one-image groups; images remain clickable in every group. Removed the popup Close button and its unused styles. Native Escape and backdrop click still close the dialog, with an accessible dismissal description. Check/build passed.

## 2026-10-14: SLNG engineering charts

Added the two supplied dashboard images: the single load-test snapshot under the Go backend narrative and the November 20–December 17, 2025 event-analytics snapshot under feature usage. Wide charts use full-width images and captions instead of the portrait screenshot composition, retaining popup access. Preserved the existing portfolio performance claims; the test image is explicitly a single snapshot. Astro check/build and 13 relevant browser tests passed, covering image loading, both-theme axe, all five viewport sizes, and refreshed portfolio screenshots.

## 2026-10-14: SLNG technology stack image

Inserted the user-provided technology stack graphic under Technology stack, retaining the HTML technology list. Uses optimized lazy-loaded WebP, full-width presentation, descriptive alt text, and existing popup access.

## 2026-10-14: App Store metrics source image

Added the supplied App Store Connect dashboard before the accessible metrics table. The existing historical-period and missing-year qualifications remain. Uses full-width optimized WebP with lazy loading, descriptive alt text, and the existing popup.

## 2026-10-14: ERHA Buddy App Store link

Added the user-supplied, verified Apple App Store URL to ERHA Buddy’s header actions with the label View on App Store. Optional validated appStore field supports store links independently from Live demo.

## 2026-10-14: ERHA Buddy App Store campaign banner

Presented the verified store link as a restrained campaign banner after the project cover: ERHA Buddy identity, iPhone availability, factual skincare/treatment/appointment summary, and View on App Store action. Uses theme tokens with a small orange brand accent, adapts vertically on mobile, and replaces the duplicate header store link.

## 2026-10-16: Remove Projects introduction

Removed the introductory sentence below the Projects heading at the user's request. Static build and `git diff --check` passed.
