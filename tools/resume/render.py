"""Render the verified source to the site's single published resume PDF."""
from io import BytesIO
from pathlib import Path
from playwright.sync_api import sync_playwright
from pypdf import PdfReader, PdfWriter
from pypdf.generic import DictionaryObject, NameObject


READING_LABELS = [
    'Personal QA workflow.', 'AL80 Studio.', 'Felt Presence.',
    'QA:', 'AI workflows:', 'Tools & technologies:',
]


def map_legacy_roles(data):
    """Give Chromium's PDF 2.0 Strong tag a legacy-reader equivalent.

    The PDF Association recommends Strong -> Span for pre-2.0 documents:
    https://pdfa.org/download-area/cheat-sheets/StandardStructureElements.pdf
    Clone the document root, preserving structure, metadata, outlines and links.
    """
    reader = PdfReader(BytesIO(data))
    writer = PdfWriter(clone_from=reader)
    writer.pdf_header = reader.pdf_header
    tree = writer.root_object['/StructTreeRoot']
    role_map = tree.get('/RoleMap')
    if role_map is None:
        role_map = DictionaryObject()
        tree[NameObject('/RoleMap')] = role_map
    else:
        role_map = role_map.get_object()
    role_map[NameObject('/Strong')] = NameObject('/Span')
    output = BytesIO()
    writer.write(output)
    writer.close()
    return output.getvalue()


def structure_text(reader):
    """Follow the one-page resume's structure into its marked-content text.

    Whole-page extraction alone misses this regression: visible text can remain
    present while a tagged reader skips the unsupported structure around it.
    """
    text_by_mcid = {}
    stack = []

    def operand(operator, arguments, _cm, _tm):
        if operator == b'BDC':
            properties = arguments[1]
            stack.append(properties.get('/MCID') if isinstance(properties, dict) else None)
        elif operator == b'BMC':
            stack.append(None)
        elif operator == b'EMC' and stack:
            stack.pop()

    def text(value, _cm, _tm, _font, _size):
        mcid = next((item for item in reversed(stack) if item is not None), None)
        if mcid is not None:
            text_by_mcid.setdefault(mcid, []).append(value)

    reader.pages[0].extract_text(visitor_operand_before=operand, visitor_text=text)
    tree = reader.trailer['/Root']['/StructTreeRoot']
    role_map = tree.get('/RoleMap', {})
    role_map = role_map.get_object() if hasattr(role_map, 'get_object') else role_map

    def walk(node):
        node = node.get_object() if hasattr(node, 'get_object') else node
        if isinstance(node, int):
            return ''.join(text_by_mcid.get(node, []))
        if isinstance(node, list):
            return ''.join(walk(child) for child in node)
        if isinstance(node, dict):
            role = node.get('/S')
            seen = set()
            while role in role_map:
                assert role not in seen, f'Cyclic structure role mapping: {role}'
                seen.add(role)
                role = role_map[role]
            assert role != '/Strong', 'Strong needs a Span role mapping for legacy tagged readers.'
            if '/MCID' in node:
                return walk(node['/MCID'])
            return walk(node.get('/K', []))
        return ''

    return walk(tree)


def structure_roles(node):
    """Read roles from the actual Chromium structure tree, not just /Marked."""
    node = node.get_object() if hasattr(node, 'get_object') else node
    if isinstance(node, list):
        return [role for child in node for role in structure_roles(child)]
    if isinstance(node, dict):
        roles = [str(node['/S'])] if '/S' in node else []
        return roles + structure_roles(node.get('/K', []))
    return []


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
            data = page.pdf(
                format='Letter', print_background=True, display_header_footer=False,
                tagged=True, outline=True,
            )
        finally:
            browser.close()
    data = map_legacy_roles(data)
    reader = PdfReader(BytesIO(data))
    assert len(reader.pages) == 1, 'Resume must remain one page; edit the source before publishing.'
    root = reader.trailer['/Root']
    assert root.get('/Lang') == 'en', 'Expected English document language from the HTML lang attribute.'
    assert root.get('/MarkInfo', {}).get('/Marked'), 'Expected a tagged PDF.'
    assert '/StructTreeRoot' in root, 'Expected a real PDF structure tree.'
    roles = structure_roles(root['/StructTreeRoot'])
    assert roles.count('/H1') == 1 and roles.count('/H2') == 4, 'Expected name and section heading tags.'
    assert '/L' in roles and '/LI' in roles and '/Link' in roles, 'Expected semantic lists and contact links.'
    assert reader.outline, 'Expected heading-based PDF bookmarks.'
    assert reader.metadata.title == 'Kayla Young - Resume', 'Expected the resume document title.'
    expected_links = {
        'mailto:kayla@snackdriven.com', 'https://snackdriven.com/portfolio/',
        'https://linkedin.com/in/snackdriven', 'https://github.com/snackdriven',
    }
    links = {
        annotation.get_object().get('/A', {}).get('/URI')
        for annotation in reader.pages[0].get('/Annots', [])
    }
    assert links == expected_links, 'Expected all four contact/portfolio links to survive export.'
    fonts = reader.pages[0]['/Resources']['/Font']
    assert all(font.get_object().get('/Subtype') != '/Type3' for font in fonts.values()), 'Expected embedded text fonts, not Type3 glyphs.'
    for reference in fonts.values():
        font = reference.get_object()
        leaf = font['/DescendantFonts'][0].get_object() if font.get('/Subtype') == '/Type0' else font
        descriptor = leaf.get('/FontDescriptor')
        descriptor = descriptor.get_object() if descriptor else {}
        assert any(key in descriptor for key in ['/FontFile', '/FontFile2', '/FontFile3']), f'Expected embedded font: {font.get("/BaseFont")}'
    text = reader.pages[0].extract_text()
    for required in ['Kayla Young', 'Chorus Innovations', 'Ultranauts', '250', '23', 'HAR', 'GraphQL', 'Felt Presence']:
        assert required in text, f'Missing extracted resume content: {required}'
    reading_text = ' '.join(structure_text(reader).split())
    for label in READING_LABELS:
        assert label in reading_text, f'Missing label from tagged reading structure: {label}'
    output.write_bytes(data)
    print(output)
    return output


if __name__ == '__main__':
    render()
