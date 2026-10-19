# Felt Presence case-study theme

This change applies only to `/portfolio/projects/felt-presence.html` and its dedicated assets. The shared portfolio styles and the Felt Presence reader repository are unchanged.

## Design source and assets

- Palette and type direction verified against the public reader and its current stylesheet on October 18, 2026: moss `#24281f`, parchment `#f3e6ca`, ink `#493a2b`, brass `#d5b57a`; Literata, DM Sans, and Caveat.
- Shop illustration copied from this already-public URL, without editing: https://felt-presence.snackdriven.com/media/2026-10-18-03-23c44854192f-v2-1536.avif
- The image is labeled as an illustration from the public reader. The existing process diagram remains labeled as a reconstruction.
- The three font files match the reader's existing font assets; their accompanying SIL Open Font License texts are included in `portfolio/projects/felt-fonts/`.
- No private story text, original character reference art, or private archive content was added.
- The publishing section was checked against the current reader deployment documentation and the archive/catalog test source. It distinguishes recurring AI-assisted generation/archiving from the push-triggered Cloudflare build, and retains pending-pair, approval, checksum, retry, and last-good-deployment boundaries. These reader tests were inspected, not rerun during this portfolio-only update.

## Validation

- `npm test`: 3 Jest suites / 7 tests and the Markdown security test passed.
- `npm run build`: passed after the final CSS change.
- Local links and anchors: homepage and five portfolio pages passed.
- Chromium layout checks: no horizontal overflow at 320, 390, 768, 850, 1024, or 1440px.
- Verified the shop illustration loads and the body uses Literata, with all fonts loaded.
- Contents navigation reaches `#decisions`; keyboard focus on the reader link has a visible 3px solid outline.
- Palette contrast: cream on moss 12.14:1; muted text on moss 7.46:1; ink on paper 8.83:1; links on paper 7.00:1; inset captions 5.33:1.
- Print styles reviewed for white paper, dark text, hidden hero/navigation, and one-column content. A new browser print rendering was not performed.
- `git diff --check`: clean.

## Enlarged-text follow-up — October 19, 2026

- Reproduced the review finding on `14b8c91`: at a 360px viewport with the root font increased from 16px to 32px, document width reached 391px.
- The page now uses a zero-minimum mobile article grid track, permits the article to shrink, and wraps otherwise unbreakable text. The wrapping fallback also covers the project facts.
- Chromium: no horizontal document overflow at 320, 360, 390, 768, 850, 1024, or 1440px, at both 16px and 32px root font sizes. At 360px/32px, the document measured 350px wide and the article 326px wide (the viewport includes the scrollbar).
- This is root-text enlargement, not browser zoom, physical-device testing, or a fresh print-pagination check.
- `felt-presence-enlarged-text.png`: 360px viewport, 32px root text, article detail after the fix.

## Screenshots

- `felt-presence-themed-hero.jpg`: desktop opening view.
- `felt-presence-themed-mobile.jpg`: 390px mobile opening view.
- `felt-presence-themed-desktop-reading.jpg`: desktop paper/content detail.
- `felt-presence-themed-mobile-reading.jpg`: 390px mobile paper/content detail.
- `felt-presence-publishing-desktop.jpg`: automatic-publication section on desktop.
- `felt-presence-publishing-mobile.jpg`: automatic-publication section at 390px.
