---
title: "The keyboard screen was the easy part"
date: 2026-07-03
permalink: /the-keyboard-screen-was-the-easy-part.html
tag: building
hidden: true
read: 4
excerpt: "The screen was chapter one. Chapter two: a control app, a custom firmware, and a few days of disproving my own confident theories."
description: "The screen was chapter one. Chapter two: a control app, a custom firmware, and a few days of disproving my own confident theories."
ogtitle: "The keyboard screen was the easy part · snackdriven.com"
---
<p class="lead"><a href="/i-reverse-engineered-the-screen-on-an-impulse-keyboard.html">Last time</a> I cracked the little screen on my keyboard and put a 12-hour clock and a spinning pink skull on it. I called that the end of the story. It was the tutorial level. What I actually wanted crept in afterward: not just pixels on the screen, but the whole keyboard made mine. Recolor the factory rainbow down to my own two colors. Keep the screen while I did it. And put something on that screen worth looking at, like whatever&rsquo;s playing. This is the messy part I skipped over.</p>

The first thing I learned is that building the workbench is its own project. To do any of this I wrote a little browser app, al80-studio, that talks to the keyboard from a tab. It drives the screen, and it cracked the lighting protocol too, so I can take that rainbow and bend it into a palette I actually chose: two to six colors, cycle or breathe or strobe, saved as presets. The satisfying part is that I can drive it blind. Set a value, read it straight back, and the keyboard repeats my own command bytes at me with a confirmation byte stamped on top. That&rsquo;s the whole handshake. You ask, it says the same thing back, and now you know it heard you.

Then I got greedy.

I wanted the recolor to live on the keyboard, not in a browser tab I have to remember to open. So I pulled the vendor&rsquo;s firmware apart and compiled my own out of what I found inside it. Keys, per-key lighting, a full editable keymap, all of it built clean and working. There&rsquo;s exactly one problem, and it happens to be the whole reason I bought this keyboard: my firmware can&rsquo;t light the screen. The screen gets fed over a serial line, and one physical pin pulls double duty as both an LED enable and a screen control line. They can&rsquo;t both have it. Untangling which is which is a logic-analyzer job I haven&rsquo;t sat down for yet. So I have a lovely custom firmware that does everything except the one thing I care about, parked in a folder until I wire up a scope.

Somewhere in here I lost an evening to a light bar that wasn&rsquo;t there. The side strip stays rainbow even when I flatten the keys, so I went hunting through the firmware for its separate data wire. It doesn&rsquo;t exist. The bar is three more LEDs on the same chip as the keys, held rainbow by a different little run of code. Once I stopped looking for the wire, the fix was three lines in a table.

The radio was the same shape of wrong. I figured a wireless keyboard might have a hidden control channel I could drive everything through. It doesn&rsquo;t. The radio is a separate chip that carries keystrokes and nothing else. Dead end, except the digging coughed up the exact math the keyboard uses to read its own battery, which I never went looking for and am absolutely going to use.

And then the banding, which I&rsquo;ll be telling people about for a while.

Photos I pushed to the screen came out striped. Red and blue horizontal bands, like a broken broadcast. I found a cousin keyboard online, same chip family, and its documentation said its screen stored pixels column-first instead of in normal rows. Perfect. Tidy. My banding was obviously the same column-first misalignment, so I built that fix and shipped it. On the actual device the photo came out sideways, which proved the exact opposite of what I&rsquo;d bet on: my keyboard stores pixels in rows like anything else, and column order was never the bug.

The real bug was dumber, and I&rsquo;m fond of it. I was shoving the image at the screen faster than it could swallow, and it was quietly dropping bytes on the floor. The fix is to wait your turn. Send a block, wait for the screen to send its little acknowledgment back (one byte, 0x55), then send the next one. Flow control, the least glamorous thing in computing.

The part that got me, though. When I tried to make it extra safe by adding pacing delays between blocks, it got worse. Every single time. The screen doesn&rsquo;t want gaps. It wants the natural back-and-forth of ack, then send, ack, then send, and my careful safety margins were the thing jamming it. I deleted the delays and it cleaned right up.

To prove the transport itself was solid I rewrote it as a plain script talking straight to the USB, no browser in the middle. Eighteen blocks out, eighteen clean acks back. Native works.

Which brings me to the last wall, the one that beat me longest. The now-playing screen is built. Album art, track, a little progress bar, rendered down to the 96 by 160 panel. The frame writes perfectly: all 549 blocks acknowledged, every one, in about a second. And the screen shows the old picture. It agrees that it got everything, confirms each block, and displays nothing new. The browser managed a fresh frame earlier in the same session; the native path writes clean and refuses to update. So there&rsquo;s a &ldquo;now actually show it&rdquo; step the screen is waiting on that I&rsquo;m either not sending or sending a beat too early.

A beat too early was the right instinct. It was never the pixels. The whole thing came down to timing again, same as the flow control before it.

The setup packet I&rsquo;d been treating as a header, the little thing I fire off before the pixel blocks, is the command that shows the picture. It tells the screen to commit whatever&rsquo;s in the buffer and put it on the glass. And it needs a moment to do it. A pause after the announce, a shorter one after the setup, and the commit takes. My native code was firing the two back to back with no gap, so the picture just sat in a scratch buffer, received and acked and never committed, while the screen went on showing the last one it had actually finished. All 549 acks were true. The screen wasn&rsquo;t lying to me. It just hadn&rsquo;t been told to look, in a language slow enough for it to hear.

And the part that stung. The reason the browser showed a fresh frame earlier and my clean rewrite wouldn&rsquo;t: the browser had those pauses by accident. My first scrappy test harness, the throwaway I wrote to prove the transport before I built it &lsquo;properly,&rsquo; had gaps in it just from being sloppy. The polished version I made to replace it was too fast to work. The code that worked was the one I&rsquo;d already filed under disposable.

Then the last twist, and it fits this whole post a little too well. The final command in my sequence, the one I&rsquo;d added to switch to the picture view and show the card, doesn&rsquo;t mean show the card. It means advance to the next stored picture. So every time the frame committed and appeared, that one line flipped straight past it to an older slot. That was the half-second flash I kept catching out of the corner of my eye, the picture arriving and leaving on the same breath. My own last step, quietly undoing the thing it was there to finish. I deleted the line and it held.

If there&rsquo;s a lesson in the last few days, it&rsquo;s that I was wrong about this keyboard over and over, and sure of myself every time. Column-first pixels, the phantom light strip, the secret radio channel, the safety delays. They all felt right, and they were all detours, and the detours are the only reason I know how the thing actually works now. The last one I had to give up was the idea that my own fix was helping. Every version that made it worse was pointing right at the part I wasn&rsquo;t looking at.

For a week the keyboard kept showing me last week&rsquo;s picture. Now it shows me this one: whatever&rsquo;s playing, on a little screen, holding still. The cover art&rsquo;s real now, pulled from Spotify once I stopped handing it a login it had already thrown away. Three rounds before I caught on. It works. The whole card, holding steady on the 96 by 160 panel. The fix, after all of it, was two pauses and one deleted line: teach it to wait a beat, and to ignore my last instruction.
