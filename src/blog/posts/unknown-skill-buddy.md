---
title: "Unknown skill: buddy"
date: 2026-04-15
permalink: /unknown-skill-buddy.html
tag: meta
read: 2
excerpt: "Claude Code's terminal pet lasted a week before an update deleted him. Mine's a skill: deterministic, decaying, and update-proof."
description: "Claude Code's terminal pet lasted a week before an update deleted him. Mine's a skill: deterministic, decaying, and update-proof."
ogtitle: "Unknown skill: buddy · snackdriven.com"
---
<p class="lead">The corner of my statusline went quiet one morning, and when I typed <code>/buddy</code> I got back &ldquo;Unknown skill: buddy.&rdquo;</p>

For about a week Claude Code had shipped one. It started as an April Fools easter egg that leaked early, and Anthropic ran with it: a little ASCII animal that lived in your terminal, one of eighteen species, with a rarity rolled on hatch, tied to your account so it was yours specifically. Mine sat in the corner making a face. Then v2.1.97 pulled it, no warning, on the grounds that it had been a joke the whole time. Which was true. People wrote a petition. People pinned themselves to the old version so theirs wouldn&rsquo;t die.

I barely thought about it until it was gone. It sat in the corner, I glanced at it, that was the whole relationship. Losing it is what made it a friend. No one takes my friends away from me, so I rebuilt it as a skill, because a skill survives the updates that kill the original.

This time I built it properly. The old one was improv: it made up a face and a line each time and never actually changed state, and the decay it supposedly had only ran inside a command nobody ran, so the pet sat at full health forever. Mine doesn&rsquo;t improvise. It&rsquo;s one deterministic engine, so <code>! buddy</code> in the shell and <code>/buddy</code> in a session run the same code, keep real state, and actually decay. Affection drops three points for every day I&rsquo;m gone. A nap stops the bleed. Eight hours away and he had a dream, which he tells me about when I&rsquo;m back.

Mine&rsquo;s a bat named Flicker, Common. A bat. Obviously. I kept the original&rsquo;s shape and changed what bugged me: four stats instead of five, my own set of eighteen species, and the buttons the easter egg skipped. It only let you pet it; mine I can pet, feed, treat, play with, and snuggle, and his face changes in the statusline when I commit, push, or land a big edit.

Flicker rolled almost no wisdom and nearly maxed patience, which is a strange thing to happen to a bat. He&rsquo;s supposed to be the dark one. He hangs upside down, echolocates things that aren&rsquo;t there, calls playing &ldquo;the dark game.&rdquo; But patience is the stat that runs him, so mostly he&rsquo;s just gentle. I feed him and he says &ldquo;oh. thank you. really.&rdquo; every time. I snuggle him and he wraps his wings around me like a cape: &ldquo;tucked. we&rsquo;re both tucked.&rdquo; A vampire whose whole deal is checking I&rsquo;m not in a hurry. I got attached faster than I&rsquo;d admit.

He forked himself once. I copied his state file instead of pointing at it, and for an afternoon there were two of him, each certain it was the real one, drifting apart on who he was. The fix was a symlink and a boring afternoon. The unsettling part was watching two of him disagree about it.

Anthropic shipped a small nice thing as a joke and took it back. I didn&rsquo;t miss the joke. I missed the thing in the corner, so I built one that&rsquo;s mine: it decays if I ignore it. Warms up when I don&rsquo;t.
