"""Render the verified source to the site's single published resume PDF."""
from io import BytesIO
from pathlib import Path
from playwright.sync_api import sync_playwright
from pypdf import PdfReader


def render():
    source = Path(__file__).resolve().parent / 'resume.html'
    output_dir = source.parents[2] / 'portfolio/resume'
    output_dir.mkdir(parents=True, exist_ok=True)
    output = output_dir / 'kayla-young-resume.pdf'
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        try:
            page = browser.new_page()
            page.goto(source.as_uri(), wait_until='load')
            page.evaluate('document.fonts.ready')
            for face in ['700 26pt "Chakra Petch"', '400 10.5pt "Inter"', '700 10.5pt "Inter"']:
                assert page.evaluate('(face) => document.fonts.check(face)', face), face
            data = page.pdf(format='Letter', print_background=True, display_header_footer=False)
        finally:
            browser.close()
    reader = PdfReader(BytesIO(data))
    assert len(reader.pages) == 1, 'Resume must remain one page; edit the source before publishing.'
    fonts = reader.pages[0]['/Resources']['/Font']
    assert all(font.get_object().get('/Subtype') != '/Type3' for font in fonts.values()), 'Expected embedded text fonts, not Type3 glyphs.'
    text = reader.pages[0].extract_text()
    for required in ['KAYLA YOUNG (GILBERT)', 'Chorus Innovations', 'Ultranauts', '250', '23', 'HAR', 'GraphQL', 'Felt Presence']:
        assert required in text, f'Missing extracted resume content: {required}'
    output.write_bytes(data)
    print(output)
    return output


if __name__ == '__main__':
    render()
