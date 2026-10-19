---
title: "passed what, exactly?"
date: 2026-10-07
permalink: /passed-what-exactly.html
tag: tooling
read: 2
excerpt: "The screenshot said reloaded. The screenshot showed a sign-in splash screen."
description: "The screenshot said reloaded. The screenshot showed a sign-in splash screen."
ogtitle: "passed what, exactly? &middot; snackdriven.com"
---
<p class="lead">A screenshot with &ldquo;reloaded&rdquo; in its filename showed a sign-in splash screen. I would like the evidence to participate in the conclusion.</p>

I use AI to help investigate and test things. It can produce a convincing walkthrough with attachments and a verdict. Before I trust that verdict, I need to know what the attachments actually establish.

In one settings investigation, the first pass became a kickback candidate after follow-up checks found a path that dropped other saved choices. The investigation had to separate several questions: what the requirements promised, what the interface displayed, and what the server stored.

The source review checked ticket criteria against RFCs and looked for later decisions in discussions. Reproducing a behavior would not settle whether it was intended. Environment mattered too. A check run on dev could not quietly become staging coverage in the write-up.

The persistence checks recorded starting values, changed an option, saved, reloaded, and read the settings back. An option without the same unit-picker behavior served as a control. The network log distinguished the values sent from those returned by the save and those retrieved afterward.

Then the evidence needed checking. Recording frames established which action happened when. The network requests supplied the saved-value evidence. Their clocks had an offset, so the review matched sequence and noted timing uncertainty. The splash-screen still could support a loading observation; it could not show the settings after reload. During that gap, the stored-value claim rested on the later response.

An independent AI reviewer replayed the form logic against captured request data. Another review caught the dev/staging overclaim and a restoration claim: the visible defaults matched, but the stored configuration differed from the starting state. The report was corrected.

Some paths and roles remained untested. A written runbook did not mean every check had run. The notes had to distinguish what was observed from what was inferred or still missing. I directed the workflow and owned the acceptance verdict; another agent agreeing was useful only when it brought evidence I could inspect.

The filename had done enough QA for one day.
