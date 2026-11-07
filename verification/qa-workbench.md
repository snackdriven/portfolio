# QA workflow: Workbench direction

The user selected the Workbench concept from three design previews. This implements it only on `portfolio/projects/qa-workflow.html`, using the existing purple, green, pink and lavender tokens. Shared portfolio CSS, other case studies, the approved Felt Presence artwork and current navigation links remain intact.

## Content and behavior

- The opening presents the workflow, the author's role and the documented review result. The five stages expose the existing source-context, preparation, investigation, review and verdict examples.
- Review is selected initially. Click, Left/Right arrows, Home and End switch stages; only the selected tab is in the normal tab order, followed by its labeled panel. A visible focus indicator remains.
- With JavaScript disabled or unavailable, all five stages are readable in document order. Printing reveals every stage and temporarily expands the synthetic evidence record, then restores the disclosure state.
- The June 2026 test-layer example still distinguishes API checks executed on dev from pending UI coverage. Dev/staging correction, saved-state correction, missing video evidence, retired release automation and the author's ownership of acceptance verdicts remain explicit.
- The workflow is labeled as an illustrative reconstruction. The expandable evidence table retains its synthetic-data label. No new workplace screenshot, private source or unsupported outcome was added.
- Existing fragment targets (`problem`, `decisions`, `test-layers`, `validation`, `evidence`, `limits`) remain available.

## Verification

- `npm test`: 20 Jest tests and 8 Node tests passed. New tests exercise the actual HTML and script: no-JavaScript fallback, tab selection, arrow wrap and Home/End focus.
- `npm run build`, `npm run test:artifact` and `git diff --check`: passed.
- Chromium: 320, 360, 390, 768, 850, 1024 and 1440 CSS pixels at normal and doubled root text. All five stages checked at every combination, without horizontal document overflow or narrow text columns.
- Keyboard activation and focus, evidence disclosure, all local fragment links, all-stage no-JavaScript fallback, and print visibility checked. No page script errors. Print labels use dark ink; a fresh PDF was produced, but its page-by-page pagination was not visually reviewed.
- Screenshots: desktop opening, full mobile page, mobile doubled-text opening and doubled-text workflow detail.

Coverage is one Chromium engine with simulated viewports and root-text enlargement. Physical devices, screen-reader speech, other browser engines and browser-UI zoom were not tested.
