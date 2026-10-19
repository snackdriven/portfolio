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

The renderer enables Chromium's tagged PDF and document outline options. The
HTML's English language, headings, lists, and links become PDF language metadata,
structure tags, and heading bookmarks. Use a Python Playwright version that
supports `page.pdf(tagged=True, outline=True)`.

Before replacing the primary PDF, the renderer checks page count, font subtype,
key extracted text, English language metadata, a real structure tree with heading,
list and link roles, and bookmarks. Review the image as well; these checks do not
establish PDF/UA compliance, screen-reader usability, or compatibility with every
applicant tracking system.
