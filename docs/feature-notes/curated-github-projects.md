# Curated public GitHub projects

Branch: `codex/cinematic-portfolio-motion`

## 2026-11-28 - Public repository curation on Projects

### Changed
- Reviewed the 77 public repositories returned by GitHub search for `user:prammmoe is:public fork:true`, including metadata for every result, 27 candidate READMEs, and selected source trees/files.
- Added 9 curated cards inside the existing Other Projects section, after the PicSweep and Nyaris Terkenal previews. There is one Other Projects heading, with a link to the full repository list. Each card has a factual description, technology summary and direct repository link. SnapPop also links to the website declared in GitHub metadata.
- Underlined project titles are the GitHub links, including PicSweep and Nyaris Terkenal. Separate View on GitHub buttons are omitted from Other Projects; Nyaris Terkenal's image still opens its demo. Paintee's existing case-study page gains its public code link, representing 12 distinct public repositories without duplicating these projects in the grid.
- Excluded JASTIPin CMS, This Portfolio, FlightMate, Metric and PicTrim at the owner's request.
- Used a static typed data file and server-rendered Astro component. No visitor-side GitHub API calls, credentials, star counts, or auto-generated case-study pages.
- Retained the existing project layout, screenshots, published slugs, homepage selection and the owner's preference to omit Role/Contribution/Outcome blocks.
- Added Projects to the existing three-run mobile Lighthouse configuration without weakening any thresholds.
- Corrected the pre-existing H1-to-H3 heading jump on Projects. ProjectList uses H2 for the standalone project listing and retains H3 beneath Home's Projects H2; class-based title styles preserve the appearance.

### Selection criteria
Prefer original, substantive projects with a clear purpose supported by documentation or source, complementing the existing case studies. Exclude forks without established individual contributions, empty repositories, profile/policy content, exercises, redundant variants, and repositories whose contribution or results need clearer documentation. GitHub's non-fork flag alone is insufficient: the CVAT and YOLO copies retain upstream documentation and are not presented as original work.

Public source availability is not an open-source license claim. No independent build, runtime, security, hardware-compatibility, or production-readiness audit of the selected applications was performed.

### Evidence for the selection
- Jokoson: README documents the native JSON viewer, parser, history, search and platform support.
- Iris: Package.swift, Sources/Architecture.md and docs/feature-notes/iris-v0-1-core-inspector.md establish the URLProtocol-based inspector and SwiftUI console.
- Iris CLI: README documents Rust, SQLite, todos, logs and Git workflows.
- Cubbl: README and app/src/main/cpp establish Android tower-stacking gameplay, a native C++ runtime and Box2D integration.
- FreeUtang: Group-3-FC's Group3Fc/Design/Strings.swift identifies Freeutang; Group3FcApp.swift and module paths establish SwiftData borrower/debt models and payment flows. It is explicitly described as a team project.
- Congrate: README describes UIKit, Core Data and gratitude prompts. Marked as a prototype; no App Store release is claimed.
- PadLab: README and source tree document browser gamepad diagnostics, IndexedDB reports, exports and comparison. No physical hardware verification is claimed.
- SnapPop: src/app/page.tsx and src/app/photo-booth.ts establish camera capture, filters, frame templates and strip exports. Its template README alone was not used as feature evidence.
- CCTV Crawler: README documents Python/OpenCV traffic-camera collection and location-based output.
- PicSweep: README; Nyaris Terkenal: README and repository homepage; Paintee: public source tree and existing case study.

Evidence is from https://github.com/prammmoe/<repository> at review time. External viewing of the SnapPop and portfolio websites was unavailable through the web tool in this session; this is not evidence that those sites are down. SnapPop's Website link is sourced from the repository's homepage field.

### Inventory decisions

| Public repository | Decision |
| --- | --- |
| [prammmoee](https://github.com/prammmoe/prammmoee) | Not selected: archived |
| [yolov9-94-map](https://github.com/prammmoe/yolov9-94-map) | Not selected: upstream README; custom contribution/results need documentation |
| [basic-android-kotlin-compose-training-reply-app](https://github.com/prammmoe/basic-android-kotlin-compose-training-reply-app) | Not selected: fork; individual contribution not established |
| [temp_conversion](https://github.com/prammmoe/temp_conversion) | Not selected: exercise, coursework or supporting experiment |
| [web-final-docker](https://github.com/prammmoe/web-final-docker) | Not selected: exercise, coursework or supporting experiment |
| [PicTrim](https://github.com/prammmoe/PicTrim) | Not selected: excluded by owner |
| [first-contributions](https://github.com/prammmoe/first-contributions) | Not selected: fork; individual contribution not established |
| [todoapp-kotlin](https://github.com/prammmoe/todoapp-kotlin) | Not selected: exercise, coursework or supporting experiment |
| [Piutang](https://github.com/prammmoe/Piutang) | Not selected: overlapping product or earlier portfolio coverage |
| [paintee-web](https://github.com/prammmoe/paintee-web) | Not selected: overlapping product or earlier portfolio coverage |
| [cookie-eater](https://github.com/prammmoe/cookie-eater) | Not selected: limited project-specific documentation in this review |
| [snap-pop](https://github.com/prammmoe/snap-pop) | Selected card |
| [JastipinCMS](https://github.com/prammmoe/JastipinCMS) | Not selected: excluded by owner |
| [prammmoe](https://github.com/prammmoe/prammmoe) | Not selected: profile, legacy portfolio or policy content |
| [split-bill](https://github.com/prammmoe/split-bill) | Not selected: limited project-specific documentation in this review |
| [practice-it](https://github.com/prammmoe/practice-it) | Not selected: fork; individual contribution not established |
| [mcca-sem3](https://github.com/prammmoe/mcca-sem3) | Not selected: exercise, coursework or supporting experiment |
| [graph-theory](https://github.com/prammmoe/graph-theory) | Not selected: fork; individual contribution not established |
| [Group-3-FC](https://github.com/prammmoe/Group-3-FC) | Selected card |
| [Test-GitHub](https://github.com/prammmoe/Test-GitHub) | Not selected: exercise, coursework or supporting experiment |
| [ARFaceTracking](https://github.com/prammmoe/ARFaceTracking) | Not selected: limited project-specific documentation in this review |
| [cvat](https://github.com/prammmoe/cvat) | Not selected: fork; individual contribution not established |
| [padlab](https://github.com/prammmoe/padlab) | Selected card |
| [trashure-ai](https://github.com/prammmoe/trashure-ai) | Not selected: fork; individual contribution not established |
| [prammmoe-cvat](https://github.com/prammmoe/prammmoe-cvat) | Not selected: upstream README; custom contribution/results need documentation |
| [web-final-backup](https://github.com/prammmoe/web-final-backup) | Not selected: exercise, coursework or supporting experiment |
| [JuaraAndroid](https://github.com/prammmoe/JuaraAndroid) | Not selected: exercise, coursework or supporting experiment |
| [pramskee](https://github.com/prammmoe/pramskee) | Not selected: profile, legacy portfolio or policy content |
| [paintee-privacy](https://github.com/prammmoe/paintee-privacy) | Not selected: profile, legacy portfolio or policy content |
| [WEB222](https://github.com/prammmoe/WEB222) | Not selected: exercise, coursework or supporting experiment |
| [indonesia-district](https://github.com/prammmoe/indonesia-district) | Not selected: fork; individual contribution not established |
| [yolov9](https://github.com/prammmoe/yolov9) | Not selected: fork; individual contribution not established |
| [cat-dog-classifier](https://github.com/prammmoe/cat-dog-classifier) | Not selected: limited project-specific documentation in this review |
| [paintee-app](https://github.com/prammmoe/paintee-app) | Linked in existing project |
| [nyaris-terkenal](https://github.com/prammmoe/nyaris-terkenal) | Linked in existing project |
| [iris-cli](https://github.com/prammmoe/iris-cli) | Selected card |
| [sorting-doubly-linked-list](https://github.com/prammmoe/sorting-doubly-linked-list) | Not selected: fork; individual contribution not established |
| [PicSweep](https://github.com/prammmoe/PicSweep) | Linked in existing project |
| [cubbl](https://github.com/prammmoe/cubbl) | Selected card |
| [WEB222-1](https://github.com/prammmoe/WEB222-1) | Not selected: fork; individual contribution not established |
| [Potteryish](https://github.com/prammmoe/Potteryish) | Not selected: overlapping product or earlier portfolio coverage |
| [jokoson](https://github.com/prammmoe/jokoson) | Selected card |
| [inventory-app-backend](https://github.com/prammmoe/inventory-app-backend) | Not selected: limited project-specific documentation in this review |
| [first-contributions-2](https://github.com/prammmoe/first-contributions-2) | Not selected: fork; individual contribution not established |
| [web-design-final](https://github.com/prammmoe/web-design-final) | Not selected: overlapping product or earlier portfolio coverage |
| [flightmate-backend](https://github.com/prammmoe/flightmate-backend) | Not selected: excluded by owner |
| [FLEX](https://github.com/prammmoe/FLEX) | Not selected: fork; individual contribution not established |
| [Tugas-VB](https://github.com/prammmoe/Tugas-VB) | Not selected: exercise, coursework or supporting experiment |
| [data-transformation](https://github.com/prammmoe/data-transformation) | Not selected: exercise, coursework or supporting experiment |
| [pramleetcode](https://github.com/prammmoe/pramleetcode) | Not selected: exercise, coursework or supporting experiment |
| [iris](https://github.com/prammmoe/iris) | Selected card |
| [logistic-regression](https://github.com/prammmoe/logistic-regression) | Not selected: exercise, coursework or supporting experiment |
| [batikan-mobile](https://github.com/prammmoe/batikan-mobile) | Not selected: limited project-specific documentation in this review |
| [spacex-go](https://github.com/prammmoe/spacex-go) | Not selected: fork; individual contribution not established |
| [test-commit-xcode](https://github.com/prammmoe/test-commit-xcode) | Not selected: empty or placeholder |
| [Techsmith-DSA](https://github.com/prammmoe/Techsmith-DSA) | Not selected: exercise, coursework or supporting experiment |
| [congrate](https://github.com/prammmoe/congrate) | Selected card |
| [SimplexMethod](https://github.com/prammmoe/SimplexMethod) | Not selected: fork; individual contribution not established |
| [merauke-regency-map-geojson](https://github.com/prammmoe/merauke-regency-map-geojson) | Not selected: limited project-specific documentation in this review |
| [tuya-rest-api](https://github.com/prammmoe/tuya-rest-api) | Not selected: fork; individual contribution not established |
| [SedekahQR](https://github.com/prammmoe/SedekahQR) | Not selected: empty or placeholder |
| [TI-mobile-prog-23](https://github.com/prammmoe/TI-mobile-prog-23) | Not selected: exercise, coursework or supporting experiment |
| [free-programming-books](https://github.com/prammmoe/free-programming-books) | Not selected: fork; individual contribution not established |
| [prammmoe.github.io](https://github.com/prammmoe/prammmoe.github.io) | Not selected: profile, legacy portfolio or policy content |
| [Movie-API](https://github.com/prammmoe/Movie-API) | Not selected: limited project-specific documentation in this review |
| [Metric](https://github.com/prammmoe/Metric) | Not selected: excluded by owner |
| [flightmate-frontend](https://github.com/prammmoe/flightmate-frontend) | Not selected: excluded by owner |
| [itscanteen-dev](https://github.com/prammmoe/itscanteen-dev) | Not selected: fork; individual contribution not established |
| [toodledo](https://github.com/prammmoe/toodledo) | Not selected: empty or placeholder |
| [web-final-2023](https://github.com/prammmoe/web-final-2023) | Not selected: overlapping product or earlier portfolio coverage |
| [yolov9-vehicle-detection](https://github.com/prammmoe/yolov9-vehicle-detection) | Not selected: upstream README; custom contribution/results need documentation |
| [cctv-crawler](https://github.com/prammmoe/cctv-crawler) | Selected card |
| [donut](https://github.com/prammmoe/donut) | Not selected: fork; individual contribution not established |
| [waka-readme-stats](https://github.com/prammmoe/waka-readme-stats) | Not selected: fork; individual contribution not established |
| [prammmoe-space](https://github.com/prammmoe/prammmoe-space) | Not selected: excluded by owner |
| [rag-text-classifier](https://github.com/prammmoe/rag-text-classifier) | Not selected: limited project-specific documentation in this review |
| [prak4-datmin-fixed](https://github.com/prammmoe/prak4-datmin-fixed) | Not selected: exercise, coursework or supporting experiment |

### Verification
- Astro check and build pass; four existing static SEO tests pass.
- Final full browser suite: 56/56 pass. Coverage checks static availability without JavaScript, distinct repository title links, underlining, excluded projects/forks/placeholders, existing project code links, responsive screenshots in both themes, heading structure and keyboard navigation.
- Final focused Projects Lighthouse run: three mobile lab runs pass the unchanged assertions. Median performance 99, accessibility 100, best practices 100 and SEO 100. Final report URLs use port 49474 in `.lighthouseci/reports/`. A temporary config selects only the changed Projects route; committed CI configuration now checks all eight representative routes.
- The initial Projects accessibility score of 98 exposed the existing skipped heading level. Corrected the semantic hierarchy rather than changing thresholds; the final score is 100.
- Inspected desktop/light and mobile/dark screenshots of Other Projects and verified the title links visually. Existing two project previews remain above the nine curated cards.
- No GitHub repository changes, push or deployment performed.

