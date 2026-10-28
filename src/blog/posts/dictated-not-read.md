---
title: "dictated, not read"
date: 2026-10-27
permalink: /dictated-not-read.html
tag: building
read: 2
excerpt: "Six months from four fictional roommates in a FastAPI chat tab to a silent collector with a subpoena."
description: "Six months from four fictional roommates in a FastAPI chat tab to a silent collector with a subpoena."
ogtitle: "dictated, not read · snackdriven.com"
---
<p class="lead">At the start of the month, in <a href="/dear-diary-allegedly.html">dear diary, allegedly</a>, the journal importer was still a local preview with a trust problem. It could append a dated paragraph to <code>day-crumbs</code> without clobbering my edits, and it respected the 3 a.m. Chicago cutoff for when a day actually ends, but it also looked at a short personal message in a transcript, grabbed the work update sitting next to it, and confidently decided the first was about the second.</p>

Meanwhile, sitting in another repository since April, I had an older prototype with a name I hated (`meat-suit`, which is gross and half the reason I finally renamed it).

It started from a premise I still agree with: every app that wants to know about your life makes you report to it, and asking *&ldquo;how are you feeling on a scale of 1 to 10?&rdquo;* is what ruins the answer. My April solution was a local FastAPI chat tab with four selectable personas (`the CEO`, `the Feral BFF`, `the Almanac`, and `the Innkeeper`). The active persona was a goldfish with opinions that could only see the last twenty messages, while behind a one-way wall `Scribe` pulled JSON out of the chat exhaust and `Weaver` showed up at 23:59 to write the daily entry. (Yes, TL;DR: too much, too weird, and not remotely thought through beforehand.)

It took the 1-to-10 question out of the room, but it replaced it with a room I had to remember to walk into. I already spend all day talking to assistants in five other windows while doing real work. Opening a sixth tab just to banter with an innkeeper so a background script can take notes is still homework, just with better lighting.

So this week I gutted the whole thing, renamed it `daycatcher`, and pointed it at the conversations I&rsquo;m already having.

The new version has no chat tab and no innkeeper. Windowless background readers on my Windows desktop pull local logs from Codex and Claude Code (even with the apps closed), a hidden Electron bridge catches regular Claude web chats, and hourly jobs pick up bounded turns from ChatGPT and topic fragments from Dot. My work Mac runs its own local collector. Raw work transcripts never leave the Mac; an hourly handoff exports only sanitized, slot-constrained descriptions tagged by claim kind (`intention`, `reported action`, `explicit reaction`, `discussion`, `uncertainty`), and a `work-handoff-STOP` file can pause the work feed on the spot without stopping personal entries.

The first pass shipped fixed topic blocks into `day-crumbs`. They were safe, accurate, and read like a customs declaration. Worse, if you let a writer turn bare topic labels back into stories, it starts guessing. So the last step was replacing the topic renderer with a narrative writer whose runbook reads like a cross-examination:

- **Wanting to make a podcast does not become listening to one.** Asking for a fix does not become finishing it. Assistant suggestions and pasted examples do not become things I supposedly did.
- **Adjacency is not causation.** Short replies like *&ldquo;that&rdquo;*, *&ldquo;both&rdquo;*, and *&ldquo;same&rdquo;* have to be resolved inside their own verified conversation before linking anything, instead of assuming two consecutive timestamps are about the same subject.
- **Style approval is not factual approval.** After the voice and sentence-variety pass runs, a second check re-audits every factual clause against a SHA-256 manifest of source IDs in `receipts.sqlite3`. If a flourish turned an intention into a completed action, the clause gets stripped.
- **Deleted stays deleted.** Before backfilling a missing date, the planner checks GitHub commit metadata for that exact path. If an entry used to exist there and I deleted it, it records `manual_deletion` and walks away instead of resurrecting a day I threw out.

Once a real paragraph lands inside its `journal-narrative` markers, the cleanup pass retires the untouched legacy topic blocks and leaves my manual edits and Rook&rsquo;s prose byte-for-byte alone.

It took six months to get from four fictional roommates in a FastAPI app to a silent collector with a subpoena, but the nightly entry finally reads like my day. I still retain editing privileges. The innkeeper has been laid off.
