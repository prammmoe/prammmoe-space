# ERHA Buddy App Store Badge

Branch: `main`

## 2026-10-20 - Use supplied App Store asset

### Changed
- Replaced the ERHA Buddy campaign's text and arrow button with the supplied PNG, saved unchanged as `public/app-store-badge.png`.
- Sized the image responsively and retained descriptive link alternative text.

### Stayed The Same
- App Store destination, campaign copy, and other project pages.

### Verification
- `npm run check` and `npm run build` passed.
- `git diff --check` passed; SHA-256 confirms the PNG matches the attachment.
- Browser verification was unavailable: the sandbox blocked the local preview server and Chrome launch.

## 2026-10-20 - Remove campaign container

### Changed
- Removed the campaign container, promotional copy, and their unused styles; kept the linked App Store badge by itself.

### Verification
- `npm run check`, `npm run build`, and `git diff --check` passed.

## 2026-10-20 - Move download to the bottom

### Changed
- Moved the standalone App Store badge to the end of the ERHA Buddy article, after the portfolio PDF footer.

### Verification
- `npm run build` and `git diff --check` passed.
- Checked generated HTML: exactly one App Store badge, placed after the article footer.

## 2026-10-20 - Place badge above portfolio download

### Changed
- Positioned the App Store badge immediately above the Download portfolio PDF footer, following the user's placement correction.

### Verification
- Build and `git diff --check` passed; generated HTML contains one badge immediately before the portfolio PDF footer.
