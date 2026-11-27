# Professional portfolio content

Branch: `codex/cinematic-portfolio-motion`

## 2026-11-28 - Resume experience and recommendation cards

### Changed
- Added all Resume bullets to Arya Noble (5), 4TITU (3) and Apple Developer Academy (3), preserving wording and figures while removing PDF line-wrap spacing. Widya Robotics uses all three bullets supplied by the owner because this entry is absent from the current public resume PDF.
- Added two LinkedIn recommendation excerpts with names, professional headlines, working relationships and June 27, 2023 dates. Added a footer link to the Recommendations section.
- Recommendations appear directly below Education as two cards on desktop and one column on mobile. The introductory sentence was removed at the owner's request. Experience dates sit alongside the role heading on desktop and below it on mobile.
- Narrowed timeline layout selectors to direct children so contribution bullets remain regular lists.

### Sources and interpretation
- `public/resume.pdf`: all 11 work bullets across Arya Noble, 4TITU and Apple Developer Academy, including the CV's reported metrics. No independent live validation of these metrics is claimed.
- Owner-provided Widya Robotics text: vehicle-counting backend architecture saved 5% computation time; three key client meetings and presentation including the Head of Technology; automatic-gate recognition research improved accuracy by 2×; relabeling 1,000 images and camera optimization improved face-detection accuracy by 2%. No unspecified baselines or measurement periods were invented.
- Owner-provided LinkedIn screenshot: Guntur Wahyu Ramadhan and Hajran Azbytama. Quotes preserve complete visible sentences. Hajran's text hidden behind “more” was not reconstructed; the outdated undergraduate paragraph was not quoted. Original recommendation dates and working relationships remain visible.
- Direct LinkedIn viewing reached a login wall. Professional headlines are transcribed from the supplied screenshot, not independently verified as current titles.

### Stayed the same
- Existing published URLs, full case studies, downloads, private-page exclusions, static Astro output and quality thresholds.
- Projects retain their existing title, description and image layout; the Role/Contribution/Outcome blocks were removed at the owner's request.
- Existing uncommitted dev.to additions are preserved.

### Verification
- Astro check: passes with zero errors/warnings and one existing hint in a standalone personal page.
- Build and all four static SEO tests pass.
- All 11 Resume-based bullets match the PDF text after whitespace normalization; Widya Robotics uses the three owner-supplied bullets.
- Final browser suite: 55/55 pass, covering all configured widths in both themes, axe accessibility, navigation, downloads, Resume highlights, recommendation attribution/dates/source links, desktop/mobile card layout, and absence of project summary blocks. Used installed Playwright Chromium with the temporary config selecting it and the correct preview working directory.
- Final Lighthouse: all assertions pass across seven routes and 21 mobile lab runs. Median SEO, accessibility and best practices are 100 on every route; performance is 97–99. This run's report URLs use port 51404, with artifacts in `.lighthouseci/reports/`.
- Inspected saved desktop and mobile recommendation screenshots; cards align in two columns on desktop and stack without overflow on mobile.
- No deployment or LinkedIn account edits performed.
