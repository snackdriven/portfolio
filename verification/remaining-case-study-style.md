# Remaining portfolio case studies

AL80 Studio and Platform Investigation now use the same portfolio layout approved for QA Workflow: compact plain name link, one large green case-study heading, purple background, pink section labels, 200px desktop navigation rail and section dividers. Mobile collapses the rail into a contents strip.

Renamed the QA-specific stylesheet to `portfolio-case-study.css` and generalized its opt-in class. Its CSS declarations are otherwise unchanged. QA Workflow uses the renamed stylesheet with the same appearance. Felt Presence does not load it; no Felt Presence files or shared base styles changed.

## Audit and verification

- Normalized text comparisons passed for all three pages: writing, claims, figures and links are unchanged.
- Build passed; 7 Jest tests and the Markdown security test passed; `git diff --check` passed.
- Both updated pages: no horizontal overflow at 320, 360, 390, 768, 850, 1024 and 1440px with normal text.
- Both updated pages: no horizontal overflow at 320, 390, 768, 1024 and 1440px with the root text enlarged to 32px. This is not a browser zoom test.
- Mobile anchor navigation and visible 3px keyboard focus checked on both pages. Loaded fonts checked. AL80's diagram fits the viewport; the platform audit graphic retains its descriptive accessible label.
- QA Workflow mobile smoke check passed using the renamed stylesheet. A source comparison confirms the previous QA style declarations are preserved.
- No physical-device, Safari, screen-reader speech or fresh print-pagination checks. Existing print rules are preserved.

## Screenshots

- `al80-portfolio-style-desktop.png` and `al80-portfolio-style-mobile.png`: opening views.
- `al80-portfolio-style-reading-mobile.png`: mobile decisions section.
- `platform-portfolio-style-desktop.png` and `platform-portfolio-style-mobile.png`: opening views.
- `platform-portfolio-style-evidence-mobile.png`: mobile evidence section.
