---
title: "The Tale of Two Tobys"
date: 2026-06-22
permalink: /the-tale-of-two-tobys.html
tag: incident
hidden: false
read: 3
excerpt: "It was the best of names. It was the worst of names."
description: "It was the best of names. It was the worst of names."
ogtitle: "The Tale of Two Tobys · snackdriven.com"
---
<p class="lead">It was the best of names. It was the worst of names. It was, specifically, two of the worst of names, because the name was Toby and there were two of him.</p>

Some background. Every terminal session I run gets a code name, pulled from a rotating themed cast so the cross-terminal sync doc reads like a roster instead of a wall of UUIDs. Monday&rsquo;s theme was The Office. The system that hands out these names has exactly one job and one promise: distinct per session. Nobody shares.

So when I looked over and saw two Toby Flendersons, that was a problem. Not a cosmetic one. A &ldquo;the thing that exists to prevent this exact situation has failed at the only thing it does&rdquo; one.

There&rsquo;s a smaller, dumber tragedy nested inside the big one. Of all the characters in the cast, the universe duplicated Toby. The sad HR guy. The one Michael Scott would walk across hot coals to avoid. The system had Michael, Pam, Dwight, fifteen names to choose from, and it produced a second Toby. As if one wasn&rsquo;t enough.

## The body count

First thing I did was pull the ledger, the flat file where the assignments actually live. I expected two Tobys. I found four.

Two were ghosts: throwaway sessions in /tmp that had died hours ago and left their rows behind. The other two were alive and well and both insisting they were Toby. One was an interactive terminal. The other was a background job off testing a billing ticket, blissfully unaware it had a doppelganger.

Four rows, one name, for a system whose entire reason to exist is &ldquo;never do that.&rdquo;

## Why it happened

The assignment logic does something reasonable. Before it hands you a name it asks: who&rsquo;s alive right now, and what names are they holding? Whatever&rsquo;s left is fair game, pick the first free one.

The bug was in how it answered &ldquo;who&rsquo;s alive.&rdquo; It checked exactly one source: the daemon roster, the list of sessions the background system had launched. Clean and authoritative.

Also incomplete.

Because not every live session is on that list. A background spare process, the kind that gets pre-warmed and then handed real work, keeps its heartbeat somewhere else entirely: a presence file on disk, not a roster entry. It was alive, doing real work, holding Toby. And invisible to the one question that mattered.

So the logic ran exactly as written. New session shows up, asks &ldquo;is Toby taken?&rdquo;, checks the roster, doesn&rsquo;t see the spare, concludes Toby is free, hands it out. Again. The check wasn&rsquo;t broken. It was looking at a list it trusted to be the whole world, and the world was bigger than the list.

## The part worth keeping

The roster wasn&rsquo;t lying. It was authoritative for the sessions it knew about. It just wasn&rsquo;t complete, and those are different words. The gap between &ldquo;this source is correct&rdquo; and &ldquo;this source is everything&rdquo; is exactly where this kind of bug sets up shop. You don&rsquo;t notice it, because the source you&rsquo;re trusting is right about every row it has. It&rsquo;s the rows it doesn&rsquo;t have that get you.

I&rsquo;ve hit the same shape before in places that have nothing to do with each other. Code that exists in the repo isn&rsquo;t the same as code a user can actually reach. A fact saved in memory isn&rsquo;t the same as a fact that&rsquo;s still true. Same trap, different costume: mistaking the map you have for the territory it covers.

The fix was boring, which is how you want fixes to be. Ask both sources. The roster knows the fleet jobs. The presence files know the terminals and the spares. Neither one is the full room on its own. Union them and you get everyone who&rsquo;s actually here.

Twenty tests pass, including a new one that recreates the exact two-Tobys scenario so it can&rsquo;t quietly come back.

## Resolution

There is one Toby now.

The background job that used to be the second Toby is, as of this afternoon, Pam Beesly-Halpert. Which is a promotion.
