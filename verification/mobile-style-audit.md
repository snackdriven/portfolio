# Mobile style follow-up

October 19, 2026. Compared the public homepage, portfolio and all four project pages with the pre-refresh CSS and saved QA mobile screenshot (`qa-portfolio-style-mobile.png`). The original palette, type families, green case heading and section treatments remain in place. Felt Presence retains its separate moss/parchment theme.

The new Resume PDF link caused Contact to wrap alone on standard case pages. The mobile navigation now fits one row at 360px and above, has 44px-high targets, and uses two balanced columns below 360px. Felt's navigation similarly uses two columns at 380px and below. No heading palette or type treatment was redesigned.

An existing browser session also retained an older CSS response after the updated HTML deployed. The build now versions each local stylesheet URL by its contents, including copied portfolio pages and generated blog pages. External font URLs remain unchanged. The regression test checks relative and root paths, stability across repeat builds, and invalidation after a CSS edit.

Browser layout checks covered `/`, `/portfolio/`, all four case pages, and the new publishing post at 320, 360, 390, and 430px: no horizontal page overflow. Confirmed Inter/Chakra/mono identity on standard pages and DM Sans/Literata on Felt. Checked balanced navigation at 320px and the full four-link row at 390px. These are desktop-browser viewport checks, not physical iOS/Android device certification.

Validation: existing Jest and markdown-security suites; stylesheet-cache regression; Eleventy build; built-page internal-link/asset/metadata check; fresh independent review. Screenshots show the proposed branch, not a deployed fix.

The accompanying copy changes summarize newly supplied evidence of current care-module automation strategy ownership and Felt creative direction. They publish no private quotes, client identities, nomination claims or sensitive personal origin details.
