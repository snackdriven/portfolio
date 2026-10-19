# QA case-study visual alignment

Compared the live `/portfolio/` page with the QA workflow case study. The page-specific stylesheet now uses the portfolio's compact plain name link and green left stripe, shared purple background and type, pink monospace headings, 200px sidebar, section rules, and inset evidence styling. The reading column stays bounded while the page chrome uses the portfolio's full-width layout.

Only `qa-workflow.html` loads the new stylesheet. Shared styles, other project pages and case-study text are unchanged. A normalized text comparison with the parent revision passed.

## Checks

- Build passed; all 7 Jest tests plus the Markdown security test passed.
- Chromium normal-text layout: no horizontal overflow at 320, 360, 390, 768, 850, 1024 and 1440px.
- Root-text enlargement to 32px: no horizontal overflow at 320, 390, 768, 850, 1024 and 1440px. This is not browser zoom testing.
- Loaded fonts verified, Validation anchor lands at the section, and keyboard focus on Evidence has a visible 3px outline.
- Print rules retain a white, one-column version; print pagination was not freshly rendered. No physical-device, Safari or screen-reader speech testing.

## Screenshots

- `qa-portfolio-style-desktop.png`: 1440px opening.
- `qa-portfolio-style-mobile.png`: 390px opening.
- `qa-portfolio-style-reading-mobile.png`: mobile validation section.
