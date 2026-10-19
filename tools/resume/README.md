# Resume PDF

Edit `resume.html`, then run `python tools/resume/render.py` from the repository root.
The renderer requires Python Playwright and its Chromium browser. Install them if
needed with `python -m pip install playwright` and `python -m playwright install chromium`.

The checked-in PDF is served at `/portfolio/resume/kayla-young-resume.pdf`.
Rendering is manual; the site build copies the committed PDF without requiring
Playwright. Keep the single-column layout, standard headings, and selectable text.
Review the rendered page after each change and confirm it remains one page.

The site's Chakra Petch and Inter fonts are bundled in `fonts/` with their SIL
Open Font License notices. The PDF embeds these fonts; rendering does not require
Google Fonts access or a local font installation.
