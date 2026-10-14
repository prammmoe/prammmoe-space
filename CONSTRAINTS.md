# Website quality contract

- Keep Astro static output; no client framework or animation library for the portfolio shell.
- Neutral light/dark themes, light default (updated by user request), single icon toggle, persistent explicit preference, safe blocked-storage fallback.
- Professional content first; preserve published slugs, PDFs, and the five standalone personal pages.
- WCAG 2.2 AA target: keyboard navigation, visible focus, semantic headings, and readable contrast in both themes. The iOS portfolio narrative is HTML; the older non-iOS gallery still requires text equivalents.
- No serious or critical axe violations on public pages in either theme.
- No horizontal page overflow at 320, 375, 768, 1024, or 1440 px.
- Lighthouse mobile medians over three runs: Performance >=95, Accessibility 100, Best Practices >=95, SEO 100 on every route in lighthouserc.cjs.
- Check, build, browser tests, and Lighthouse assertions must pass before the existing main-branch deployment steps. Do not weaken thresholds or skip tests to get a green build.
