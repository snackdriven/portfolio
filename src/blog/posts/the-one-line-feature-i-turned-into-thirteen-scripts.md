---
title: "The one-line feature I turned into thirteen scripts"
date: 2026-06-03
permalink: /the-one-line-feature-i-turned-into-thirteen-scripts.html
tag: tooling
read: 2
excerpt: "Claude Code has a status line. The deal is simple: you point a setting at a script, it hands that script a blob of session data every tick, and whatever the script prints shows up at the bottom of the terminal."
description: "Claude Code has a status line. The deal is simple: you point a setting at a script, it hands that script a blob of session data every tick, and whatever the script prints shows up at the bottom of the terminal."
ogtitle: "The one-line feature I turned into thirteen scripts — snackdriven.com"
---
<p class="lead">Claude Code has a status line. The deal is simple: you point a setting at a script, it hands that script a blob of session data every tick, and whatever the script prints shows up at the bottom of the terminal. That&rsquo;s the feature. One command, print what you want.</p>

I print a lot.

Mine is three rows now, assembled out of about thirteen separate little scripts that each know how to render one thing: a PR count, the current ticket, the next meeting, git status, how much context is left, the buddy. Each runs in parallel, writes its piece to a small json file, and a layout engine in Python reads them all, drops whatever&rsquo;s gone stale, sorts by priority, and packs the rest into the width it&rsquo;s got. The feature gives you a string. I built a thing that composes a string.

The one rule the whole layout obeys: resizing the terminal changes the whitespace, never the content. Nothing reflows, nothing gets dropped to make room, nothing jumps to a new line. It just gets roomier or tighter. I spent a whole audit getting that right, because a status bar that rearranges itself when you resize is worse than no status bar.

It kept growing because every time I wanted to see something without asking, it became a region. A region for live subagents. A region for the other terminals I have open. A region that changes color when a rule of mine is about to get broken. The newest one lists which of my background sessions are alive right now, which I added this afternoon after noticing it was only counting the ones that had done something in the last few minutes.

Claude Code gave me one line and told me to print whatever. This is what whatever looks like after a few months.
