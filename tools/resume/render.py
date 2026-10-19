"""Render the editable resume source to the public PDF using Python Playwright."""
from pathlib import Path
from playwright.sync_api import sync_playwright

source = Path(__file__).resolve().parent / 'resume.html'
output = source.parents[2] / 'portfolio/resume/kayla-young-resume.pdf'
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto(source.as_uri(), wait_until='load')
    page.evaluate('document.fonts.ready')
    assert page.evaluate('document.fonts.check(\'700 26pt "Chakra Petch"\')')
    assert page.evaluate('document.fonts.check(\'10.5pt "Inter"\')')
    page.pdf(path=str(output), format='Letter', print_background=True,
             display_header_footer=False)
    browser.close()
print(output)
