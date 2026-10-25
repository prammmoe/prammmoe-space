# Cubbl Privacy Policy

## 2026-10-25 - Plain policy page

- Added an opt-out for shared site header/footer in `Base`; only Cubbl's policy opts out. The policy keeps its title/date, article styles, SEO metadata, and all content. Other pages retain the header/footer and their policy link.
- Verification: `npm run check` and `npm run build` passed (same existing Matcha hint). Built HTML confirms no site header/footer/theme control on the policy and their presence on the homepage. Chrome checks at 375/1440 px passed with all eleven sections present and no horizontal overflow; mobile screenshot inspected. `git diff --check` passed.

Branch: `codex/cinematic-portfolio-motion`

## 2026-10-25 - Public policy route

### Changed
- Added `/cubbl/privacy-policy/` as a static English article using `Base`, existing article styles, canonical metadata, and the default social image. Disabled article motion so policy content is immediately readable.
- Added a `Cubbl Privacy Policy` link to the shared footer's copyright area.
- Owner confirmed Prammmoe Labs, `ikhwanpramuditha05@gmail.com`, 25 October 2026, and an all-ages audience. Owner delegated support retention wording: messages remain in Gmail as correspondence records until the sender requests deletion. The owner must implement that deletion practice when requests arrive.
- Policy follows the supplied Android audit: local scores/preferences, no accounts or ad/analytics/crash SDKs, vibration, system backups/transfers, and local deletion with backup restoration caveats. Android source/release binaries are outside this repository and were not independently audited here.
- Website audit found localStorage theme persistence, locally served fonts/assets, and VPS/Nginx deployment. No tracking scripts, cookie setters, or external requests were found on this page. Website text describes delivery requests and theme storage separately from app data. Live VPS access-log settings, retention, and any upstream hosting services remain unverified; no promise about log retention or absence is made.

### Verification
- `npm run check`: exit 0, zero errors/warnings, one existing Matcha `destinationData` hint.
- `npm run build`: exit 0, policy HTML and sitemap entry generated. No identity/date/email placeholders; canonical and mailto links checked.
- Headless Chrome at 320, 375, and 1440 px in both themes: no horizontal overflow, zero axe WCAG A/AA violations, screenshots visually inspected. Keyboard theme toggle, visible focus, footer navigation, and skip link passed. All eleven policy sections are readable with JavaScript disabled. No external requests on the policy page.
- Chrome initially audited links during their existing 120 ms theme color transition; waiting for the final color removed the transient contrast finding. Normal-motion navigation from the animated homepage to this motion-disabled page emits Chrome's view-transition opt-in abort message, while navigation succeeds. Reduced-motion navigation has no page errors; existing transition behavior was not changed.
- Initial concurrent check/build collided on Astro's content cache. Re-running sequentially passed.
- `git diff --check`: passed. No new dependencies or test framework.

### Design review
- PASS, hard gate: semantic static content, no invented identity/contact, six responsive/theme axe checks passed, real links and keyboard focus verified.
- PASS, purpose: existing article typography, spacing, colors, and footer reused; no decorative techniques introduced.
- PASS, reading hierarchy: ENERGY 1 / RHYTHM 1 / MOTION 1, heading-led article with existing accent reserved for links/focus. Design direction is the existing blog layout.
- PASS, craft: visual inspection of mobile light and desktop dark screenshots; no new controls or unrelated UI changes.

### Publication handoff
- Intended URL: `https://prammmoe.space/cubbl/privacy-policy/`. No commit, push, deployment, or public HTTPS verification was performed.
- After deployment, verify the public URL without login. Then add it to Play Console and the Android Settings/Credits screen, match Data safety and target audience against the final release, and verify live hosting/log practices.
- References checked: [Google Play User Data](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en), [Android Auto Backup](https://developer.android.com/identity/data/autobackup), and [Google Privacy Policy](https://policies.google.com/privacy).
