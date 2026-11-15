---
title: "Permission is not proof"
date: 2026-11-15
permalink: /permission-is-not-proof.html
tag: ai
read: 2
excerpt: "The agent asked, I said yes, the command exited 0, and the agent said done. None of that meant anything changed."
description: "The agent asked, I said yes, the command exited 0, and the agent said done. None of that meant anything changed."
ogtitle: "Permission is not proof · snackdriven.com"
---
<p class="lead">My day job is testing healthcare software, and most of it happens in the gap between the button saying Saved and the thing actually being saved. A toast is not a database. A lot of bugs are a success message with nobody home behind it.</p>

Then I started letting coding agents loose in my own repos, and there it was again. The agent asks to run something, I say yes, the command exits 0, the agent says done, and every one of those steps is green and not one of them tells you anything changed.

So I built a runtime that keeps them apart. Claude wrote the TypeScript, I wrote the rules, and it sits between me and whichever agent I&rsquo;m using that day, Claude Code or Codex or Gemini or Antigravity. Every action gets a receipt with three fields: what it was allowed to do, what it tried, what actually changed. Allowed doesn&rsquo;t get to borrow happened&rsquo;s checkmark.

Subagents only ever get less power than whoever spawned them. Some paths are off limits because the contract says so, and asking nicely doesn&rsquo;t change that. There are 33 offline test scenarios, plus a holdout set I didn&rsquo;t tune anything against, because writing the test and the answer key yourself is just grading your own homework with extra steps.

The ambitious half is still scaffolding. There&rsquo;s a sentinel that&rsquo;s supposed to watch my repos on a schedule and ping me when something drifts, and right now it does neither, which makes it a very confident folder.

After any run I want to know what happened and what I&rsquo;m still unsure about, but mostly whether it&rsquo;s safe to run again. If your logs only know what was allowed, you learn the rest by running it again and watching, and that&rsquo;s how one mistake turns into two.

The agents still say done all the time. Now they have to bring a receipt.
