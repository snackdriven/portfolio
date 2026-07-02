---
title: "The week my own automations tried to brick my laptop"
date: 2026-06-12
permalink: /the-week-my-own-automations-tried-to-brick-my-laptop.html
tag: incident
hidden: true
read: 2
excerpt: "The worst one looked like a memory leak. iTerm went sludgy, the fans came up, the load average hit 401."
description: "The worst one looked like a memory leak. iTerm went sludgy, the fans came up, the load average hit 401."
ogtitle: "The week my own automations tried to brick my laptop · snackdriven.com"
---
<p class="lead">The worst one looked like a memory leak. iTerm went sludgy, the fans came up, the load average hit 401. The culprit was a hook I&rsquo;d written to analyze my sessions when they end. It did the analysis by spawning a Claude session. A Claude session, when it ends, fires the session-end hook. Which spawns a Claude session. You can see where this goes. It audited its own auditor, about three kids per generation, until there were thirty-odd of them eating seven gigs of RAM and the machine was face down. I&rsquo;d reported it to myself as a leak. It was a fork bomb in my own handwriting.</p>

The quiet one was worse because it never said anything. A pile of my background jobs talk to Jira. Background jobs on a Mac don&rsquo;t inherit my shell&rsquo;s cert setting, and there&rsquo;s a corporate proxy inspecting traffic, so every job using a particular network call just died with a TLS error. Silently. One was supposed to catch when ticket statuses drifted out of sync. It failed 57 runs out of 57 while looking completely alive.

Same stretch had a backup job pushing my Claude memory to a private repo that couldn&rsquo;t be found, so it failed quietly for days. Plus the buddy file forking itself. Plus a plugin I scrapped after deciding it duplicated something that already shipped. Not a banner fortnight.

The thread is silence. The fork bomb at least caught fire where I could see it. The cert failures and the dead backup returned exit code zero and did nothing. So most of what I built after isn&rsquo;t a feature, it&rsquo;s noise on purpose: a job that writes down why it failed, a watchdog that yells when the load spikes, a gate that makes a stale check explain itself.

The code is Claude&rsquo;s. The ideas, the specs, and apparently the disasters are mine.
