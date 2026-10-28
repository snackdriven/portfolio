---
title: "Don't Talk to Me or My Fifteen Planners Ever Again"
date: 2026-10-28
permalink: /dont-talk-to-me-or-my-fifteen-planners-ever-again.html
tag: reflection
read: 2
excerpt: "I don't actually have eighty-eight repositories. I have fifteen planners, three other ideas in false mustaches, and a habit of starting fresh on Saturdays."
description: "I don't actually have eighty-eight repositories. I have fifteen planners, three other ideas in false mustaches, and a habit of starting fresh on Saturdays."
ogtitle: "Don't Talk to Me or My Fifteen Planners Ever Again · snackdriven.com"
---
<p class="lead">I caught myself mid-sentence this week saying I wanted to &ldquo;assimilate some of what I&rsquo;ve built over and over again,&rdquo; and then immediately trailed off with <em>maybe I shouldn&rsquo;t</em>.</p>

If you pull the commit history across all eighty-eight of my repositories, the reason my brain hit the brakes is sitting right there in the timestamps. I don&rsquo;t actually have eighty-eight projects. I have fifteen planners, three other ideas in false mustaches, and a string of names like `plush-galaxy` and `dreamy-ping` that I hand-picked based purely on vibes and still have to click into to remember which one was the to-do list and which one had the mood rings.

The fifteen planners are the loudest tell. Between September and November of last year, I tried to cure my own executive dysfunction with React and Supabase. The lineage goes `v0-the-projects`, `moodium`, `meh-trics`, `dysfunction-center`, `plush-galaxy`, `daybeam-app`, `dreamy-ping`, a private LiveJournal clone, a task manager, and a bootleg Google Calendar with two-way sync. Every single one of them was some variation of the **Grand Unified App That Will Totally Fix My Life&trade;**: tasks, habits, mood tracking, journaling, calendar, and analytics bolted into one monolith. I built `dysfunction-center` six different ways in three weeks and hated using all of them. An all-in-one life dashboard stops feeling like a tool the second you open it and starts feeling like homework you assigned yourself.

Then in March I built `nibble`, which was three files and no build step, and something clicked. Everything I&rsquo;ve built in that lane since has gotten smaller and weirder: `inside-weather`, `margination`, `dial` (a terminal journal you tune like an old CRT television), `daycatcher`, `day-crumbs` (a quiet nightly receipt). Those actually get used.

The rest of my GitHub is the same story in three other costumes.

There are six versions of the QA cockpit I use at my day job, born from the exact moment in the `riff-tracks` README when someone asks *&ldquo;did that ship?&rdquo;* and the room goes quiet. It started as `ATLAS` and `jira-wrapper` in November, turned into `jira-local` in March (full description: *&ldquo;Jira, but bearable&rdquo;*), and finally settled in June as `qa-brain` in the browser and `radar` in the terminal.

There are eight versions of a memory spine so I can stop spending the first ten minutes of every AI session reminding a very polite amnesia patient who I am: `cc-sessions`, `hum`, `memory-shack`, `chronicle` (*&ldquo;hi Claude, yes we&rsquo;re still working on the same project&rdquo;*), `narrator`, `operator-vault`, and now `operator-core-mini`, `lumi`, and `dotclaude`.

Whatever is left over is a tournament bracket or a poster generator (`bad-movie-bracket`, `disney-bracket`, `albums-poster-builder`, `movies-poster-builder`), because apparently I need a formal seeding algorithm to settle arguments about *The Emperor&rsquo;s New Groove*.

Looking at the timeline laid out flat, the split between November and March is the whole plot. In November, the instinct was consolidation: put the planner next to the mood tracker next to the calendar so my brain only has to remember one URL. The problem is that when you merge five small habits into one big app, the friction compounds. If you don&rsquo;t feel like looking at your overdue tasks, you stop opening the app, which means you also stop logging your mood and checking your calendar. The whole building gets condemned because one room is messy.

Starting with `nibble`, the stuff that survived did the opposite. A three-file planner has no opinions about my calendar. A TV knob in the terminal doesn&rsquo;t care about my Jira tickets. They work because they don&rsquo;t know about each other.

So when I heard myself say *&ldquo;I want to assimilate what I&rsquo;ve built&rdquo;* and hesitated, that was pattern recognition stepping between me and my own children. Merging the plumbing underneath so three repos stop duplicating the same script is fine. Merging the interfaces back into one big dashboard is how I end up with `dysfunction-center` v7, which I will spend all weekend building, name something gorgeous, and abandon by Tuesday. Leave the fifteen planners alone. They&rsquo;re doing fine.
