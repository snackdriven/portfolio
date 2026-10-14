#!/usr/bin/env python3
"""Build Kayla Young's unified resume PDF (approved PR #20 draft + carried-over sections).
-- signed: Tenna (Muse agent), per Kayla's attribution rule.
"""
import sys
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle, HRFlowable, KeepTogether)
from reportlab.lib import colors

OUT = sys.argv[1]

doc = SimpleDocTemplate(OUT, pagesize=LETTER,
                        leftMargin=0.7 * inch, rightMargin=0.7 * inch,
                        topMargin=0.5 * inch, bottomMargin=0.4 * inch,
                        title="Kayla Young - Senior QA Automation Engineer",
                        author="Kayla Young")

name = ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=20, leading=24,
                      alignment=TA_CENTER, spaceAfter=2)
title = ParagraphStyle('title', fontName='Helvetica', fontSize=11.5, leading=14,
                       alignment=TA_CENTER, spaceAfter=2)
contact = ParagraphStyle('contact', fontName='Helvetica', fontSize=9.5, leading=12,
                         alignment=TA_CENTER, textColor=colors.HexColor('#333333'),
                         spaceAfter=6)
section = ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=10.5,
                         leading=12, spaceBefore=4, spaceAfter=2,
                         textColor=colors.HexColor('#111111'))
body = ParagraphStyle('body', fontName='Helvetica', fontSize=9.5, leading=10.9)
bullet = ParagraphStyle('bullet', parent=body, leftIndent=13, firstLineIndent=0,
                        bulletIndent=4, spaceAfter=1.4)
role = ParagraphStyle('role', fontName='Helvetica-Bold', fontSize=10.2, leading=13)
dates = ParagraphStyle('dates', fontName='Helvetica', fontSize=9.8, leading=13,
                       alignment=2, textColor=colors.HexColor('#333333'))
skills = ParagraphStyle('skills', parent=body, spaceAfter=1.5)
proj = ParagraphStyle('proj', fontName='Helvetica-Bold', fontSize=10, leading=13,
                      spaceBefore=2)

E = []
E.append(Paragraph('Kayla Young', name))
E.append(Paragraph('Senior QA Automation Engineer &middot; Platform Test Infrastructure &amp; AI Workflow Tooling', title))
E.append(Paragraph('Bentonville, AR &middot; Remote &middot; kayla@snackdriven.com &middot; LinkedIn &middot; GitHub &middot; Portfolio', contact))

E.append(Paragraph('SUMMARY', section))
E.append(HRFlowable(width='100%', thickness=0.7, color=colors.HexColor('#999999'), spaceAfter=4))
E.append(Paragraph(
    "Senior QA engineer who builds test infrastructure and AI workflow tooling for environments "
    "where standard tooling doesn't work. Quality across 8 behavioral health SaaS products, including "
    "a no-code platform with no staging and runtime-generated DOM. Built a config-driven Playwright "
    "framework with LLM-assisted selector resolution and 14 internal automation tools, directing AI "
    "coding agents to build them. The tooling is documented and config-driven, built as shared "
    "infrastructure rather than personal scripts.", body))

E.append(Paragraph('TECHNICAL SKILLS', section))
E.append(HRFlowable(width='100%', thickness=0.7, color=colors.HexColor('#999999'), spaceAfter=4))
for line in [
    "<b>Testing:</b> Playwright, Selenium, Cypress, Postman, GraphQL validation, regression design",
    "<b>Languages:</b> TypeScript, Python, SQL, Node.js",
    "<b>AI:</b> Claude API + Code, Gemini API, agentic workflows, MCP",
    "<b>Frontend:</b> React, Tailwind, Storybook",
    "<b>Tools:</b> GitHub Actions, Kubernetes, Jenkins, Docker, Jira, Confluence, Git, CI/CD, TestRail",
    "<b>Domain:</b> Behavioral health SaaS, HIPAA, no-code platforms, 988 crisis dispatch, Medi-Cal",
]:
    E.append(Paragraph(line, skills))

def roleblock(role_text, date_text, bullets):
    t = Table([[Paragraph(role_text, role), Paragraph(date_text, dates)]],
              colWidths=[5.3 * inch, 1.8 * inch])
    t.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'),
                           ('LEFTPADDING', (0, 0), (-1, -1), 0),
                           ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                           ('TOPPADDING', (0, 0), (-1, -1), 3),
                           ('BOTTOMPADDING', (0, 0), (-1, -1), 1)]))
    items = [t]
    for b in bullets:
        items.append(Paragraph(b, bullet, bulletText='\u2022'))
    return items

E.append(Paragraph('EXPERIENCE', section))
E.append(HRFlowable(width='100%', thickness=0.7, color=colors.HexColor('#999999'), spaceAfter=2))
E.extend(roleblock('Senior QA Specialist &middot; Chorus Innovations', 'Sep 2024 \u2013 Present', [
    "Ran the first staging QA pass on a new multi-tenant platform: 250 findings in four days, written up as a readout the VP of Engineering shared in the engineering channel.",
    "Built a config-driven Playwright test harness for 350+ runtime-generated form fields on a no-code platform with no staging. Config files hold field mappings so I update those instead of rewriting tests. A Claude API layer handles fuzzy label matching when platform changes break selectors.",
    "14 automation scripts: video capture for audit evidence, Jira release summaries from ticket metadata, daily QA digests, 63-section form autofill. Documentation overhead went from ~4 hrs/wk to under 1.",
    "Document and maintain the toolkit as shared infrastructure: configuration and docs are part of the deliverable, and the digests, summaries, and autofill tools are documented for handoff.",
    "Quality coverage for 8 products across two release boards, 2x/week cadence.",
    "Release readiness system with gate checklists, regression grouped by data mutation type, risk-tiered LOE model for scoping.",
    "~230 releases across both boards over 2.5 years with HIPAA-compliant evidence trails.",
]))
E.extend(roleblock('Software QA Specialist &middot; Chorus Innovations', 'Apr 2023 \u2013 Sep 2024', [
    "Env was too flimsy to automate against, so I went manual first: templates, then checklists, then scripts. Covered both the React/GraphQL/Terraform stack and the legacy no-code platform (straight to prod, no staging).",
    "Second release board spun up and I took it on. Started writing early QA tooling that became the full automation toolkit by promotion.",
]))
E.extend(roleblock('Software Quality Engineer II &middot; Ultranauts', 'Oct 2021 \u2013 Feb 2023', [
    "QA on fintech, enterprise SaaS, and data tooling client projects: multi-role workflows, Selenium suites for complex business rules, data flowing between systems. Took on bigger engagements over time; promoted to SQE II.",
]))
E.extend(roleblock('Software Quality Engineer I &middot; Ultranauts', 'Feb 2020 \u2013 Sep 2021', [
    "Started part-time, went full-time within 8 months. Manual and exploratory testing across multiple client products. Wrote regression suites and test docs.",
]))
E.extend(roleblock('Virtual Assistant &middot; Self-employed', 'Mar 2019 \u2013 Jan 2020', [
    "E-commerce fractional work: CMS, scheduling, content updates, invoicing. Ran website and code audits and tested a mobile app for accessibility.",
]))
E.extend(roleblock('Assistant General Manager &middot; Sonic Drive-In &middot; 5 years', 'Jan 2014 \u2013 Dec 2018', [
    "Managed daily operations and staff at a high-volume location. Raised service speed and politeness scores 15% by coaching the team and acting on customer feedback.",
]))

E.append(Paragraph('PROJECTS', section))
E.append(HRFlowable(width='100%', thickness=0.7, color=colors.HexColor('#999999'), spaceAfter=4))
E.append(Paragraph('jira-local &middot; github.com/snackdriven/jira-local', proj))
E.append(Paragraph(
    "Local Jira client (React 18, TypeScript strict, Vite, TanStack Query) with 5 view modes, "
    "rate-limited API calls, local caching. AI-assisted build (Claude Code). MIT licensed, public repo.",
    bullet, bulletText='\u2022'))

doc.build(E)
print('built', OUT)
