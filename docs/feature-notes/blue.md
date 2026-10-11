# KVAD-inspired redesign implementation notes

Branch: `design/blue`

## 2026-10-12 - Shared portfolio redesign

### Changed
- Rebuilt the shared Astro layout as an 830px shell with an ornamental CGI header, a CSS/SVG diagonal, vertical PRAMMMOE wordmark, and MENU / FEATURE / CONTENT desktop columns.
- Generated original capsule-robot artwork with ImageGen and saved a 1660 × 554 WebP locally (203,674 bytes). No runtime image-generation dependency.
- Added Verdana typography, indigo panels, dotted footer texture, featured-project thumbnails, profile links, document downloads, and a compact dated homepage article index.
- Kept biography, experience, education, and professional links on the homepage. Article prose uses 16px type with 1.6 line height.
- Scoped theme styles to `.kvad-site`. At 640px and below, navigation precedes content and the feature panel follows content. Code, tables, and math have local overflow containers.
- Added a skip link, active-page semantics, visible focus outlines, and mobile navigation targets of at least 44px.

### Stayed the same
- Markdown collections, schemas, routes, draft filtering, date order, SEO metadata, and existing external-link destinations.
- E-voucher, matcha, puzzle, wishes, and birthday source files are byte-for-byte unchanged from HEAD and their built pages exclude the KVAD theme.
- Existing banner assets remain on disk, although the shared layout no longer displays them.

### Decisions
- MENU text uses dark indigo on orange: contrast is 4.87:1; the reference's white text would measure 3.57:1.
- Source order prioritizes navigation, main content, then supplementary features. Desktop Grid places features in the middle; mobile visual and source order match.
- Font choice approximates the screenshot; the original font could not be confirmed.

### Verification
- `npm run check`: no errors or warnings; one existing hint about `destinationData` in the untouched matcha page.
- `npm run build`: 20 static pages generated successfully; Vite reports an unused-import warning inside Astro dependencies.
- `git diff --check`: passed.
- Parsed all 15 themed built pages: local links, fragments, downloads, and image sources resolve; each has exactly one h1 and main/nav/aside landmarks; every image has alt text.
- Compared all five standalone page sources against HEAD and checked their built output for absence of the new theme.
- Inspected the generated artwork. Browser screenshots, actual keyboard interaction, runtime console checks, and viewport tests at 375/768/1440px remain unverified: the local server escalation was rejected, Chrome was unavailable, and the in-app browser blocks file URLs. No workaround was attempted after the browser-policy rejection.
- Post-implementation audit: `anti-slop/audit-002-2026-10-12.md`.

## 2026-10-12 - Retro font rendering

### Changed
- Disabled font smoothing on `.kvad-site` using `-webkit-font-smoothing: none` and `font-smooth: never` for sharper, jagged letter edges on supported browsers. Font family, sizing, and standalone pages are unchanged.
- This is a progressive visual adjustment: CSS cannot force aliased rendering across every browser/OS. MDN documents the WebKit control as macOS-only; Firefox has no equivalent off value.

### Verification
- `npm run build` and `git diff --check` passed. Browser rendering remains unverified due to the previously recorded preview restrictions.
