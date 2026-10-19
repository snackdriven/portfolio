# Portfolio visual consistency audit

October 19, 2026. Scope: portfolio overview, QA Workflow, AL80 Studio and platform investigation. Felt Presence is explicitly excluded. The blog and resume retain their existing presentation.

## Original visual references

- `verification/portfolio-desktop.png` and `portfolio-mobile.png`: the original purple canvas, green Chakra Petch display type, pink DM Mono section labels, 200px darker section rail and mobile label strips.
- `verification/home-desktop.png`: the same palette/type identity with the blog's separate reading layout. It is a calibration reference, not a reason to turn every page into a blog card list.
- `verification/qa-portfolio-style-desktop.png`: the quiet case identity header and one prominent green project heading. The earlier two-large-green-header treatment is not restored.

## Findings and changes

- **Different section framing:** cases used a permanent Contents rail while the overview used a labeled rail beside each section. The three cases now use the overview's section treatment, with compact on-page jump navigation above the article. Mobile section strips follow the overview too.
- **Navigation drift:** cases had a reduced set of links and used Contact while the overview used Email. All four now use the same labels/order/destinations: Projects, Experience, Resume PDF, Email, LinkedIn, GitHub and Blog. Fragment targets point back to the overview from a case; local overview anchors remain local.
- **Independent spacing rules:** a scoped stylesheet now supplies the common 1320px canvas, 200px rail, 48px desktop/24px mobile gutters and navigation treatment. Case content uses the original 44px/52px section rhythm, with a 24px mobile inset. Functional section labels are shortened to fit the rail.
- **Type and color already matched:** retained Chakra Petch, Inter, DM Mono and the existing site tokens. No new palette, illustration, animation or display font was introduced.

## Preservation and validation

- Original body paragraphs, table cells, supporting facts, captions and section IDs were compared with main and preserved. Recent evidence additions and shorter introductions remain.
- Felt HTML, Felt CSS, shared case-study.css and site.css are unchanged. The new stylesheet is not loaded by Felt. The built Felt HTML remains byte-identical to the prior deployed artifact (SHA-256 `606283d9c0ea7b052955eaa77dd2ea5de2cecf5a9c4ac7c76b1f6a698696f3f1`).
- Browser checks across the four in-scope pages at 320, 390, 768, 769, 1440 and 1920 CSS pixels: no horizontal page overflow, matching navigation labels, valid local fragment targets and matching section grids. Viewport checks are not physical-device tests.
- Existing 17 Jest and eight Node tests, build and artifact smoke pass. The artifact smoke now checks seven stylesheets, including the scoped portfolio system.
- Independent review found two small integration issues, corrected before PR: restore original print gutters and load the already-tested repository shortcut on cases that advertise it.
- No assistive-technology or physical-device testing was performed, as requested. No factual career or project-result claims were added.
