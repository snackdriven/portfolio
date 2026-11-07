# Felt Presence puppet theatre

- Replaces the computer workshop hero with the approved puppet-theatre illustration. Art direction credit: mote (dot).
- Exact accepted PNG, unchanged: 1536 x 1024 pixels, 2,739,557 bytes. SHA256: `d01140cc32a3a5031067bd4cbf9e727d389c02a768756bb910fdb82f373b28a1`.
- The full scene scales proportionally using the existing responsive image styles; no character or shelf detail is cropped. Descriptive alt text identifies the shared theatre scene, and the caption describes making it together in the shop.
- The Limits section retains the alternate-universe portfolio boundary. This does not introduce a story installment. Original reference art and story archive are not included.
- Based on current main `633f37b4edb0a834eb906567543619e93f2461b2`. PR43 is merged. Concurrent PR56 changes publishing evidence rather than this hero; this PR has no stacking dependency.

## Validation

- `npm test`: 17 Jest tests and 8 Node tests passed.
- `npm run build`: passed.
- `npm run test:artifact`: inventory test and local artifact smoke passed (7 HTML pages, 6 stylesheets, PDF, sitemap, feed, robots and 404).
- Chromium: no horizontal document overflow at 320, 360, 390, 768, 850, 1024 and 1440 CSS pixels, each at 16px and 32px root text. Root-text enlargement is not browser zoom.
- Hero loads at its natural 1536 x 1024 dimensions; rendered aspect ratio, alt text, caption and all seven local fragment targets checked. No page script errors.
- Desktop (1440px) and mobile (390px) screenshots inspected. Full composition remains visible at both sizes.
- `git diff --check`: passed.

Coverage is desktop Chromium with simulated mobile widths. Physical devices, other browser engines, screen-reader speech and print pagination were not tested in this focused image replacement.
