---
title: "the warning that reported itself"
date: 2026-07-15
permalink: /the-warning-that-reported-itself.html
tag: tooling
read: 2
excerpt: "The report explained why a reminder kept firing on quotations. The reminder fired on the report."
description: "The report explained why a reminder kept firing on quotations. The reminder fired on the report."
ogtitle: "the warning that reported itself &middot; snackdriven.com"
---
<p class="lead">The report explained why a reminder kept firing on quotations. The reminder fired on the report.</p>

*Written October 19, 2026, from my July 15 work notes.*

After [my automations spent a while failing quietly](/the-week-my-own-automations-tried-to-brick-my-laptop.html), I wanted checks that said something when work went wrong. Claude writes the code; I set the requirements and decide whether the result is useful. By July, some of those checks needed a closer look.

One hook checked wording. It could spot a phrase in a draft, but it also spotted the same phrase in a quotation documenting a previous false alarm. Its request to correct that quotation arrived while the report about this problem was being written.

The quote was evidence. Editing it to satisfy the check would have damaged the record. One of its other targets was a verbatim transcript collection regenerated nightly, so correcting that file would not even make the warning stay gone.

The replay found quieter versions of the same problem. A link checker treated URLs inside inline code as prose needing links. A document-freshness check repeated a warning of more than 2,000 characters whenever one stale document was read. The document really was stale. Repeating the entire warning did not make it fresher.

Some checks earned their interruptions. Two were marked keep. The useful recommendations were narrower triggers for the noisy ones: distinguish quotations from drafts, recognize inline code, and give repeated stale-state warnings a way to stop repeating themselves.

This run stopped at measurement and recommendations. The replay used a sandbox; it did not change the installed hooks or settings. I had evidence for what to tune, without a conveniently finished ending to attach to it.

The reminder did contribute one excellent reproduction step: write down what it does.
