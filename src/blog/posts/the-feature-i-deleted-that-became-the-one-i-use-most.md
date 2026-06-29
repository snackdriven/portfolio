---
title: "The feature I deleted that became the one I use most"
date: 2026-06-14
permalink: /the-feature-i-deleted-that-became-the-one-i-use-most.html
tag: tooling
hidden: true
read: 1
excerpt: "The thing I run most in a day is `! folder`."
description: "The thing I run most in a day is `! folder`."
ogtitle: "The feature I deleted that became the one I use most — snackdriven.com"
---
<p class="lead">The thing I run most in a day is <code>!folder</code>. It lists a folder, each file with its icon and last-edited time and a clickable link, newest first, instantly, no model turn. Deeply boring. I&rsquo;d fight someone for it. It started as a feature I tore out.</p>

I&rsquo;d built a little docs region into my statusline. The idea was the statusline could be interactive: click a thing, it does something, click the date, open the calendar. Some of it worked. The docs region didn&rsquo;t earn its space, so I pulled it. But the look of it, a clean scannable clickable list, was the good part, and I didn&rsquo;t want to throw that out with the rest.

So: what if that same look pointed at any folder. That became <code>/folder</code>. Then I wanted it to feel like talking instead of a command, so <code>/folder desktop/personal</code> takes loose paths. Then I noticed running it inline with a bang skips the model entirely and comes back instantly, so <code>!folder</code> became the real way I use it. Then I got annoyed it felt slow and swapped the runtime, 0.63 seconds down to 0.14.

The look outlived the feature so completely I built a second thing on it. <code>!todo</code> is the same viewer pointed at a checklist. The original docs region is dead and I don&rsquo;t miss it.

Most of my good tools are salvaged organs of bad ones.
