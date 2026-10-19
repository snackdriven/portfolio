# Resume PDF

Edit `resume.html`, then run `python tools/resume/render.py` from the repository root.
The renderer requires Python Playwright, pypdf, and Chromium. Install them if
needed with `python -m pip install playwright pypdf` and `python -m playwright install chromium`.

The checked-in PDF is served at `/portfolio/resume/kayla-young-resume.pdf`.
This is the only published resume. The stale `-tools.pdf` and `-automation.pdf`
files are retired. Rendering writes only the primary PDF;
`tools/build_resume.py` delegates to this renderer.
Rendering is manual; the site build copies the committed PDF without requiring
Playwright. Keep the single-column layout, standard headings, and selectable text.
Review the rendered page after each change and confirm it remains one page.

The site's Chakra Petch and Inter fonts are bundled in `fonts/` with their SIL
Open Font License notices. The PDF embeds these fonts; rendering does not require
Google Fonts access or a local font installation. The body uses static Inter
regular and bold instances (optical size 14, weights 400/700), derived from the
bundled variable font with FontTools. This avoids the Type3 glyph output seen
with the variable font. Keep the Inter license with all three font files.

The renderer checks page count, embedded font subtype, and key extracted text
before replacing the PDFs. Review the image as well; extraction alone does not
establish compatibility with every applicant tracking system.
