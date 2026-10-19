---
title: "adjacent to the tests"
date: 2026-09-09
permalink: /adjacent-to-the-tests.html
tag: tooling
read: 2
excerpt: "The new test case was valid Python. It was also sitting outside the test list."
description: "The new test case was valid Python. It was also sitting outside the test list."
ogtitle: "adjacent to the tests &middot; snackdriven.com"
---
<p class="lead">The new test case was valid Python. It was also sitting outside the test list.</p>

I use small checks to keep my AI-assisted workflow from declaring victory too early. Those checks have tests. This investigation was about whether the tests would notice if the checks broke.

Mutation testing gives that question something concrete to work with: deliberately change the code, then run the tests. If they pass after an important behavior disappears, there is something to investigate. Some mutations leave behavior unchanged, so a surviving mutation needs inspection before it becomes a defect.

The first explanation looked plausible: perhaps the tests never ran the actual scripts. Checking that spoiled the theory. Six of the seven suites did run them as subprocesses. Code was executing, but the assertions did not distinguish enough of what happened inside it.

One gap was small enough to follow through. A wording check needed to ignore the result and evidence lines at the end of a response so it could examine the sentence above them. Its tests had no example with that ending. Removing the cleanup loop left the suite green.

The agent added a fixture for that case. Its first edit left the tuple between two assignments, outside the list the test runner used. Python accepted it. The test runner never saw it.

An old docstring then made the count look wrong: it said eleven examples, while the original list held ten. The correction used the parsed list and checked that its length increased by one. With the fixture in place, disabling the cleanup loop caused the new case to fail.

That one fixture raised detection from 22 of 78 mutations to 28 of 78 for that check. The other survivors still needed investigation; this fixed one demonstrated gap.

I direct the checks and review the evidence. The generated edit needed that review as much as the code it was supposed to test.

The test was nearby. We eventually introduced it to the others.
