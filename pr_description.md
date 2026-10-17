🎯 **What:** The duplicated neon flicker script logic was extracted into a shared `assets/neon-flicker.js` file and removed from both `src/_includes/base.njk` and `portfolio/index.html`.
💡 **Why:** By extracting the identical flicker animation logic to a single asset, this change improves maintainability and keeps templates clean while retaining the unique initialization parameters per page.
✅ **Verification:** Handled Eleventy project build to ensure it generates all files without regressions. The generated HTML matches and properly includes the new shared script.
✨ **Result:** A cleaner codebase where updating the flicker effect applies universally instead of having to be tracked down across disparate template files.
