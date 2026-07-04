---
title: "The keyboard screen was the easy part"
date: 2026-07-03
permalink: /the-keyboard-screen-was-the-easy-part.html
tag: building
hidden: true
read: 3
excerpt: "Chapter two of the keyboard screen. I spent a week staring at bands so I could stare at bands."
description: "Chapter two of the keyboard screen. I spent a week staring at bands so I could stare at bands."
ogtitle: "The keyboard screen was the easy part · snackdriven.com"
---
<p class="lead">Okay, so. <a href="/i-reverse-engineered-the-screen-on-an-impulse-keyboard.html">Last time</a> I cracked the little screen on my keyboard and put a 12-hour clock and a spinning pink skull on it, and I called that the end of the story. It was the tutorial level. What I actually wanted crept in afterward: the whole keyboard made mine, not just pixels on a screen. Recolor the factory rainbow to my own colors, keep the screen while I did it, and put something worth looking at on it, like whatever&rsquo;s playing. That took a week. This is the messy part I skipped over.</p>

The first thing I learned is that building the workbench is its own project. I wrote a little browser app, al80-studio, that drives the screen from a tab and cracked the lighting protocol, so I could bend the factory rainbow into a palette I actually chose. Set a value, read it back, and the keyboard repeats it to me with a confirmation byte stamped on top. You ask, it says the same thing back, and now you know it heard you.

Then I got greedy.

I wanted the recolor to live on the keyboard, not in a browser tab I have to remember to open. So I pulled the vendor&rsquo;s firmware apart and compiled my own. Keys, per-key lighting, a full editable keymap, all built clean and working. One problem, and it&rsquo;s the whole reason I bought this keyboard: my firmware can&rsquo;t light the screen. One physical pin pulls double duty as both an LED enable and a screen control line, and they can&rsquo;t both have it. Untangling which is which is a logic-analyzer job I haven&rsquo;t sat down for. So I have a lovely custom firmware that does everything except the one thing I care about.

Then two dead ends, both the same shape of wrong. I lost an evening hunting the firmware for a separate data wire to the side light bar, sure it was its own addressable strip. It isn&rsquo;t. The bar is three more LEDs on the same chip as the keys, and the fix was three lines in a table. Same with the radio: I figured a wireless keyboard might have a hidden control channel I could drive everything through, and it doesn&rsquo;t, it just carries keystrokes. Both detours, except the radio dig coughed up the exact math the keyboard uses to read its own battery, which I never went looking for and am absolutely going to use.

And then the banding, which I&rsquo;ll be telling people about for a while. Photos came out striped, red and blue horizontal bands like a broken broadcast. I found a cousin keyboard online, same chip family, whose docs said it stored pixels column-first instead of in rows. Tidy. My banding was obviously that, so I built the fix and shipped it. On the device the photo came out sideways, which proved the exact opposite: my keyboard stores pixels in rows like anything else, and column order was never the bug.

The real bug was dumber, and I&rsquo;m fond of it. I was shoving the image at the screen faster than it could swallow, and it was quietly dropping bytes on the floor. Send a block, wait for the screen&rsquo;s one-byte acknowledgment, send the next. Flow control, the least glamorous thing in computing. And the twist: when I tried to be extra safe and add pacing delays between the blocks, it got worse every time. The screen doesn&rsquo;t want gaps, it wants the natural back-and-forth. I deleted the delays and it cleaned up.

Which brings me to the wall that beat me longest. The now-playing card is built, album art and track and a progress bar rendered down to the 96 by 160 panel. The frame writes perfectly: all 549 blocks acknowledged, in about a second. And the screen shows the old picture. It confirms every block and displays nothing new. There&rsquo;s a &ldquo;now actually show it&rdquo; step I&rsquo;m either not sending or sending a beat too early.

A beat too early was the right instinct. It was never the pixels. It came down to timing again, same as the flow control.

The setup packet I&rsquo;d been treating as a header is the command that shows the picture. It tells the screen to commit the buffer to the glass, and it needs a moment to do it: a pause after the announce, a shorter one after the setup, and the commit takes. My native code fired the two back to back with no gap, so the picture sat in a scratch buffer, acked and never committed, while the screen kept showing the last one it finished. The browser had managed a fresh frame earlier only because my scrappy throwaway test harness was sloppy enough to have those pauses by accident. The polished rewrite was too fast to work. The code that worked was the one I&rsquo;d already filed under disposable.

Then the last twist, and it fits this post a little too well. The final command in my sequence, the one meant to switch to the picture view and show the card, doesn&rsquo;t mean show the card. It means advance to the next stored picture. So every time the frame committed and appeared, that line flipped straight past it to an older slot. That was the half-second flash I kept catching out of the corner of my eye, the picture arriving and leaving on the same breath. My own last step, quietly undoing the thing it was there to finish. I deleted the line and it held.

By the end the pattern was hard to miss. I&rsquo;d been wrong about this keyboard over and over, sure of myself every time, and the last thing I gave up was the idea that my own fix was helping. Every version that made it worse was pointing right at the part I wasn&rsquo;t looking at.

So, whew. For a week the keyboard kept showing me last week&rsquo;s picture. Now it shows me this one, cover art and all, once I got Spotify to stop throwing away my login three rounds running. The whole fix, after all of that, was two pauses and one deleted line. Anyway. I spent a week staring at bands so I could stare at bands.
