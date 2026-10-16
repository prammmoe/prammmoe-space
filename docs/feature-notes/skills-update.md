# Skills Update Implementation Notes

Branch: `main`

## 2026-10-16 - Expand portfolio skills

### Changed
- Added Database, Backend, and DevOps & Infra categories with the requested technologies and Ubuntu experience note.
- Consolidated existing iOS/Swift SDKs, libraries, integrations, and security skills under Mobile Development; added Android Development and Kotlin.
- Moved Realm to Database as Realm DB and Docker/GitHub Actions to DevOps & Infra without duplicates.

### Verification
- `npm run check` passed with zero errors/warnings and one existing hint.
- `npm run build` passed; checked the built homepage for every requested category and skill.
- `git diff --check` passed.

## 2026-10-16 - Add available skill logos

### Changed
- Added 14 local Devicon SVGs for Android, Kotlin, PostgreSQL, MySQL, SQLite, Realm, Go, Node.js, NestJS, FastAPI, Next.js, Express, Linux, and Bash using the existing logo rendering and MIT license.
- Kept Gin and CI/CD text-only because the chosen Devicon catalog has no matching logo; retained existing Docker and GitHub Actions logos.

### Verification
- Parsed all 14 downloaded SVGs and verified that all 24 logo mappings resolve to local files.
- `npm run check`, `npm run build`, and `git diff --check` passed; check retains one existing unrelated hint.
- Targeted browser image/link test could not start because the sandbox denied binding the preview server to port 4321 (`EPERM`).
