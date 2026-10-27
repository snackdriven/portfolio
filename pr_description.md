🧹 [Code Health] Use const instead of var in neon-flicker.js

🎯 **What:** Replaced `var` declarations with `const` for variables `rare`, `medium`, `solo`, and `roll` in `assets/neon-flicker.js`.
💡 **Why:** To improve code health and maintainability by preventing unintended reassignments and scoping issues associated with `var`.
✅ **Verification:** Verified by running `npm test` successfully. Visually verified by taking a screenshot using a Playwright script targeting the local development server to ensure no visual regressions in rendering.
✨ **Result:** Improved readability and robustness of `assets/neon-flicker.js` without altering its behavior.
