---
title: "The ghosts still need a publishing schedule"
date: 2026-10-19
permalink: /keeping-the-haunted-shop-stocked.html
tag: building
read: 3
excerpt: "A haunted craft shop, recurring stories and illustrations, and a publishing workflow that knows when a letter is actually ready."
description: "A haunted craft shop, recurring stories and illustrations, and a publishing workflow that knows when a letter is actually ready."
ogtitle: "The ghosts still need a publishing schedule · snackdriven.com"
ogimage: /assets/social/felt-presence.png
ogimagealt: "Felt Presence: letters from a haunted craft shop, with a publishing workflow behind them."
---
<p class="lead">I gave a fictional haunted craft shop a letter reader. Then it needed more letters. This is how a small design project acquires inventory management.</p>

[Felt Presence](https://felt-presence.snackdriven.com/) is a shop that sends illustrated stories. There are seasonal details, stamps, and vines that took several attempts to stop looking so obedient. The reader needed to feel handmade while leaving enough room to read. I had opinions about both halves of that sentence.

Getting one installment onto a page was manageable. Keeping the shop stocked meant thinking about what happens before the page exists: the story, its illustration, the continuity between installments, and the point at which a pair is ready to publish.

## A letter has two parts

I configured recurring AI-assisted story and illustration generation around the archive&rsquo;s continuity and visual references. I set the direction and workflow requirements, directed the implementation, and reviewed the reader and publication behavior. AI writes the code and generates the content.

The publication unit is a complete story and its accepted image. A successful generation step alone does not establish that the pair is ready. The archive needs the approval metadata and matching image checksum before the build can publish it.

That gives unfinished work somewhere honest to be: pending. A missing image stays missing. The page does not acquire a convincing placeholder and pretend the job is done.

## From archive to reader

Once a complete, accepted pair is archived and pushed, Cloudflare rebuilds the Eleventy reader. The new letter gets a public page without a separate manual publishing step.

The build checks the pair and its metadata. Conflicting records fail deployment, leaving the previous good version available. An archive retry reuses the accepted image instead of asking for another one. There is enough variation in the stories without a retry quietly changing the illustration.

The publication tests include a new approved pair joining the archive without an edit to the curated publication list. That is the useful handoff to check: can completed content reach the reader through the workflow that is supposed to publish it?

## The part people actually open

I still checked the unopened page, the opening interaction, and the letter itself. Automation can keep the archive moving and still leave you with two competing timestamps or an awkward scroll. Both turned up during review.

The [case study](/portfolio/projects/felt-presence.html) has the reader views, design decisions, publication checks, and limits. The source archive stays private; the [shop](https://felt-presence.snackdriven.com/) is open.

The vines can wander. I would prefer the publishing state stayed put.
