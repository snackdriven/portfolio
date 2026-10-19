"""Render deterministic, branded 1200x630 share cards using the bundled site fonts.

Requires Pillow. Run from the repository root with python tools/build_social_previews.py.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/social'
FONTS = ROOT / 'tools/resume/fonts'
CARDS = {
    'site': ('off the happy path', 'debugging, useful tools, and the decisions behind them.'),
    'portfolio': ('QA, useful tools &\na little weirdness', 'the decisions, debugging, and checks behind the work.'),
    'qa-workflow': ('from scattered context\nto reviewable QA', 'recordings, network evidence, controls, and a human decision.'),
    'al80-studio': ('the logs said yes.\nthe screen said no.', 'AL80 Studio: browser controls and hands-on hardware debugging.'),
    'felt-presence': ('letters from\na haunted craft shop', 'Felt Presence: a reader, recurring generation, and publishing checks.'),
    'platform-investigation': ('250 findings.\n23 recurring patterns.', 'a four-day staging investigation, with its coverage limits attached.'),
}

def font(name, size):
    return ImageFont.truetype(str(FONTS / name), size)

def render():
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, (title, description) in CARDS.items():
        image = Image.new('RGB', (1200, 630), '#2D2B3A')
        draw = ImageDraw.Draw(image)
        draw.rectangle((0, 0, 11, 630), fill='#4AEEA0')
        draw.text((64, 51), '> snackdriven.com', font=font('ChakraPetch-Bold.ttf', 29), fill='#4AEEA0')
        title_font=font('ChakraPetch-Bold.ttf', 65)
        for i, line in enumerate(title.splitlines()):
            if draw.textlength(line, font=title_font)>1072:
                raise ValueError(f'{slug}: title exceeds card width')
            draw.text((64, 165+i*85), line, font=title_font, fill='#E0DEE8')
        body_font=font('Inter.ttf', 25)
        if draw.textlength(description,font=body_font)>1072:
            raise ValueError(f'{slug}: description exceeds card width')
        draw.text((66, 385), description, font=body_font, fill='#B5B2C8')
        draw.line((64, 482, 1136, 482), fill='#625A76', width=2)
        draw.text((66, 514), 'Kayla Young (Gilbert)', font=font('Inter.ttf', 26), fill='#E0DEE8')
        draw.text((66, 555), 'senior QA engineer · workflows & internal tools', font=font('Inter.ttf', 21), fill='#72C5D9')
        image.save(OUT / f'{slug}.png', optimize=True)
        print(OUT / f'{slug}.png')

if __name__=='__main__':
    render()
