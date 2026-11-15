---
title: "The tale of two Tobys"
date: 2026-06-22
permalink: /the-tale-of-two-tobys.html
tag: incident
read: 2
excerpt: "It was the best of names. It was the worst of names."
description: "It was the best of names. It was the worst of names."
ogtitle: "The tale of two Tobys · snackdriven.com"
---
<p class="lead">It was the best of names. It was the worst of names. It was, specifically, two of the worst of names, because the name was Toby and there were two of him.</p>

Every terminal session I run gets a code name from a rotating themed cast, so the cross-terminal sync doc reads like a roster instead of a wall of UUIDs. Monday&rsquo;s theme was The Office. The system that hands out names makes exactly one promise: nobody shares.

So two Toby Flendersons was a problem, and of all the characters to duplicate, the universe picked the sad HR guy. Michael, Pam, Dwight, fifteen names to choose from, and it produced a second Toby. As if one wasn&rsquo;t enough.

I pulled the ledger expecting two Tobys and found four. Two were ghosts, throwaway sessions in /tmp that had died hours ago and left their rows behind. The other two were alive and both insisting they were Toby: an interactive terminal, and a background job off testing a billing ticket, blissfully unaware it had a doppelganger.

The assignment logic was reasonable. Before handing out a name it asks who&rsquo;s alive and what names they&rsquo;re holding, then takes the first free one. The bug was in how it answered &ldquo;who&rsquo;s alive.&rdquo; It checked one source, the daemon roster of sessions the background system had launched. Clean, authoritative, and incomplete. A pre-warmed spare process that gets handed real work keeps its heartbeat in a presence file on disk, not on the roster. It was alive, holding Toby, and invisible to the one question that mattered. So a new session asked whether Toby was taken, checked the roster, didn&rsquo;t see the spare, and got Toby. Again.

The roster wasn&rsquo;t lying. It was right about every session it knew about. It just wasn&rsquo;t complete, and those are different words. The gap between &ldquo;this source is correct&rdquo; and &ldquo;this source is everything&rdquo; is where this kind of bug sets up shop, because you never catch the source being wrong about a row it has. It&rsquo;s the rows it doesn&rsquo;t have. I&rsquo;ve hit the same shape in code that exists but no user can reach, and in a saved fact that quietly stopped being true.

The fix was boring, which is how you want fixes. Ask both sources and union them. Twenty tests pass, including one that recreates the two-Tobys scenario so it can&rsquo;t quietly come back.

There is one Toby now. The background job that used to be the second Toby is Pam Beesly-Halpert, which is a promotion.
