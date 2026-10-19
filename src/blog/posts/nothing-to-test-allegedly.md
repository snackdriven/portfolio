---
title: "nothing to test, allegedly"
date: 2026-09-16
permalink: /nothing-to-test-allegedly.html
tag: tooling
read: 2
excerpt: "Bad credentials came back as an empty queue. HTTP 200 was being generous."
description: "Bad credentials came back as an empty queue. HTTP 200 was being generous."
ogtitle: "nothing to test, allegedly &middot; snackdriven.com"
---
<p class="lead">With deliberately bad credentials, the search returned an empty queue and HTTP 200. A remarkably polite refusal.</p>

One of my QA tools reads Jira to find work waiting for testing. An empty result is useful information, provided the tool managed to ask the question.

In this investigation, a rejected credential produced the same empty issue list as a quiet queue. The request looked successful, so the error handler never ran. The tool reported nothing ready to test.

The agent tested the same query with valid credentials and got a known ticket back. A separate, genuinely empty query also mattered: an empty list alone could not become an error without making quiet days look broken.

The response carried an authentication-failure header. It appeared with the bad credentials and was absent from the successful and authenticated-empty cases tested. Reading it gave the shared request helper a way to reject that misleading success response. The catch was that this header was undocumented. It was evidence from those probes, with a dependency that could change.

Making the helper throw exposed another problem. A caller&rsquo;s error path returned an incomplete object, and the code consuming it immediately read a missing array&rsquo;s length. The proposed improvement would have replaced an empty queue with a crash. The agent repaired that path too, then deliberately broke each fix to check that the new tests objected.

I wanted the tool to distinguish an empty queue from a failed lookup. Following the error into its caller was part of getting there. The changes were still local at the end of this run. Eleven other scripts bypassed the shared helper and went onto the backlog for investigation.

I would prefer my queue earn its zero.
