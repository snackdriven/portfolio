---
title: "The chip I deleted because the footer caught up"
date: 2026-06-12
permalink: /the-chip-i-deleted-because-the-footer-caught-up.html
tag: tooling
read: 1
excerpt: "For a while my statusline showed the PR number for whatever branch I was on."
description: "For a while my statusline showed the PR number for whatever branch I was on."
ogtitle: "The chip I deleted because the footer caught up — snackdriven.com"
---
<p class="lead">For a while my statusline showed the PR number for whatever branch I was on. Claude Code already handed my script the PR info on every tick, tucked in the data blob it passes down. My script pulled the number out and printed it in the corner, clickable, linking to the PR.</p>

Then one day it was there twice. Same number, top of my bar and bottom of the screen. Claude Code had started rendering its own PR footer off the exact field my script was reading. We were both printing the same thing. It just caught up.

So I deleted mine. Producers here switch off by filename, so I renamed the script to end in <code>.disabled</code> and the top-row copy was gone. One rename brings it back if the native one turns out worse, which it won&rsquo;t, since it&rsquo;s the same number from the same place.

This is the buddy in reverse. There, Claude Code shipped a nice thing, took it away, and I rebuilt it. Here it grew into something I&rsquo;d already built, and I got to delete code instead. That&rsquo;s the better direction. I write these scripts to cover gaps in a bigger tool, and the best ending one of them can get is the tool closing the gap itself, so I can pull mine out.
