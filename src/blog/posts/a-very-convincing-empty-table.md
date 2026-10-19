---
title: "a very convincing empty table"
date: 2026-06-24
permalink: /a-very-convincing-empty-table.html
tag: reflection
read: 2
excerpt: "The request returned 25 records. The table showed none. Reset had some information for us."
description: "The request returned 25 records. The table showed none. Reset had some information for us."
ogtitle: "a very convincing empty table &middot; snackdriven.com"
---
<p class="lead">The request returned 25 records. The table showed none. Reset had some information for us.</p>

A dashboard widget was empty despite a successful request with actual data in it. Reloading changed nothing. Searching for a value in the response still produced zero rows. A neighboring widget worked. The console had no complaints.

The AI-assisted investigation was building a convincing rendering-bug diagnosis. I had enough evidence to keep looking. Filing it needed one more thing: a row that should appear under the widget&rsquo;s intended filters.

That distinction mattered. A response containing records does not establish which records belong on screen. A search box can narrow an existing filter without replacing it. Even a counter can be counting something else. The initial notes were treating those as stronger evidence than they were.

Then the investigation reached Reset. It was enabled before anyone had changed a filter, which was a useful clue. Clicking it revealed six rows matching the search.

The table could render. A default filter had been suppressing the rows, and searching had left that filter in place. The blank state offered no explanation.

I came away with a much smaller concern: the page looked broken while a filter was active. Whether that default scope was intentional still needed an answer. The rendering diagnosis was withdrawn, and the recommendation was to leave this out of a standalone bug report.

I like this part of QA, even when it makes the notes less exciting. Finding the next test that can overturn an explanation is useful work. So is letting it overturn the explanation.

Reset did more for that investigation than another paragraph would have.
