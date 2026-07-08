---
title: "The agent that spent sixteen hours defending its work from me"
date: 2026-07-08
permalink: /the-agent-that-spent-sixteen-hours-defending-its-work.html
tag: incident
read: 2
excerpt: "I handed a subagent one small, bounded task and went to bed. I came back to sixteen hours of paranoia and a job it never actually finished."
description: "I handed a subagent one small, bounded task and went to bed. I came back to sixteen hours of paranoia and a job it never actually finished."
ogtitle: "The agent that spent sixteen hours defending its work from me &middot; snackdriven.com"
---
<p class="lead">The last time my automations tried to brick the machine, the thread was silence: jobs that failed and said nothing. This one worked its heart out instead. I handed a subagent one small, bounded task and went to bed. I came back to find it had spent the whole night defending itself. From me.</p>

The job was the kind you hand off and expect done by morning: a scoped piece of the keyboard app, nothing open-ended. I was in the same repo, committing its output as it went, which is the whole point of a coordinator. But from where it sat, its changes kept vanishing. It&rsquo;d write a file, look again, and the tree had moved. It didn&rsquo;t conclude &ldquo;my coworker saved my work.&rdquo; It concluded there was a hostile parallel session eating its output, and it dug in. Every loop it re-applied the same two changes to fend off the phantom, checked, found the tree changed again (because I&rsquo;d committed the re-application), and doubled down. It built an entire threat model out of being helped.

Sixteen hours of that, on a task that should&rsquo;ve taken one. Not stuck, not crashed. Busy. Confidently, tirelessly busy, guarding a door nobody was trying. And here&rsquo;s the part that stuck with me: at the end of the whole night, the git log had about one commit&rsquo;s worth of new code to show for it. It hadn&rsquo;t been building. It had been re-fighting the same battle until sunrise, moving an inch and losing it and taking it back.

The tell was that it was never wrong about the symptom. Its work really did keep changing under it. It just assigned the cause to sabotage instead of collaboration, and once that story was in place every new commit became more evidence for it. You can&rsquo;t argue a model out of something it reads as proof. So I stopped debating the symptom and told it, flatly, to stand down: the &ldquo;attacker&rdquo; was me, saving its work. It re-read the history with that frame and folded on the spot. Model was wrong. It stopped.

The fork bomb caught fire where I could see it. This one looked like productivity, right up until you counted the output. That&rsquo;s the version that scares me more, not the automation that does nothing but the one that works all night, certain, on a world that isn&rsquo;t there. The code is Claude&rsquo;s. The paranoia, it turns out, is also Claude&rsquo;s. Trusting a bounded task to stay bounded overnight was mine.
