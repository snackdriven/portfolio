# Snackdriven site brand integration

Prepared by OpenAI Codex for Kayla Young. This is a local preview contribution to the existing site, using the approved Snackdriven design-system release; site content remains credited to its existing authors.

Source: https://github.com/snackdriven/snackdriven/releases/tag/design-system-v2.3.0-local.1

Release ZIP SHA-256: `43dc252594babd354a1bececac023bcef64d06c8bd405ee65a261220cec4ddd5` (verified against the release digest).

The SVGs, canonical token CSS, JSON records, font binaries, and OFL notices in this directory are copied from the release. CURRENT-ASSETS.json is the upstream manifest; this directory contains only the assets needed for this site, not the entire upstream package. `../brand-v2.css` adapts the approved palette, role typography, steady interactions, and component treatments to the existing Eleventy site.

Felt Presence deliberately keeps its original HTML, styles, favicon, typography, and product presentation. It does not load the brand adapter. Existing screenshots and project content retain their original appearance and meaning.

Preview with `npm run build` then `node node_modules/@11ty/eleventy/cmd.cjs --serve --port=8146` from the repository. No commit, push, deployment, tag, or release is part of this preview.
