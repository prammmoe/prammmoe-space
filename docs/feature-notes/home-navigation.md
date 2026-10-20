# Portfolio Home Navigation

Branch: `main`

## 2026-10-20 - Add direct navigation to Home

### Changed
- Added a Back to home link to the shared header on portfolio subpages, linking directly to `/` even when a page is opened without browser history.
- Positioned the link on the left and kept the theme control on the right, with a 44px minimum link height and the existing global keyboard focus style.
- Added direct-entry keyboard navigation coverage for every published portfolio subpage and header geometry checks at 320, 375, 768, 1024, and 1440px in both themes.

### Stayed The Same
- Home has no header navigation link. The five standalone personal pages, existing parent-list links, and ERHA Buddy badge changes remain intact.

### Verification
- Confirmed the original built Projects header lacked a Home link before implementation.
- `npm run check`, `npm run build`, and `git diff --check` passed. Astro retains its pre-existing hint about `destinationData` in the standalone matcha page.
- Inspected all 17 built portfolio pages: exactly one header Home link on every subpage and none on Home.
- The new Playwright direct-entry keyboard navigation test passed across all 16 published portfolio subpages.
- Full `npm test` passed: 39 tests, including all five viewport sizes in both themes, parent-list keyboard navigation, and axe accessibility checks.

## 2026-10-20 - Expand section navigation by default

### Changed
- Set On this page to start expanded in case studies, while retaining native keyboard toggling and section anchor links.
- Updated the section navigation test to assert the initial expanded state, then close and reopen it using Enter.

### Verification
- `npm run check`, `npm run build`, and `git diff --check` passed.
- Verified all five built case studies with section navigation contain the native `open` attribute.
- Playwright section navigation test passed: expanded by default, closes/reopens using Enter, and navigates to the selected section.
