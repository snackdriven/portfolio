# Felt Presence workshop implementation

PR #43 added the revised workshop concept under `verification/` but left the page referencing the original public-reader ghost illustration. This follow-up puts the approved workshop scene into the actual page.

- `felt-presence-workshop.png` is an unchanged copy of the already-public approved concept. No regeneration or character edits.
- The heading precedes the full workshop scene, with descriptive copy below it. The title does not cover any characters.
- Caption and limits identify this as an alternate-universe portfolio illustration, not a reader screenshot or story installment. Original private references were not published.
- At a 390px viewport, the image begins around 401px instead of the previously measured 673px.
- The reader application, story archive, generation/publishing behavior and other portfolio pages are unchanged.

## Validation

- Build, all 7 Jest tests and Markdown security test passed; `git diff --check` passed.
- Chromium normal-text layout: no horizontal overflow at 320, 360, 390, 768, 850, 1024 and 1440px.
- Doubled root text: no horizontal overflow at 320, 390, 768, 1024 and 1440px. This is not browser zoom.
- New image loads at its 1536px natural width; fonts loaded; Publishing contents anchor and visible keyboard focus checked.
- `felt-workshop-implemented-desktop.png` and `felt-workshop-implemented-mobile.png` show implemented UI, not standalone concept art.
- No fresh print-pagination, physical-device, Safari or screen-reader speech checks.
