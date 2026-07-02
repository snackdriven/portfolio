---
title: "I reverse-engineered the screen on an impulse keyboard"
date: 2026-07-01
permalink: /i-reverse-engineered-the-screen-on-an-impulse-keyboard.html
tag: building
hidden: true
read: 2
excerpt: "The keyboard was a Prime Day impulse I'd pre-approved as an eventual upgrade. It has a tiny screen. I lasted about two weeks before I had to take the screen apart."
description: "The keyboard was a Prime Day impulse I'd pre-approved as an eventual upgrade. It has a tiny screen. I lasted about two weeks before I had to take the screen apart."
ogtitle: "I reverse-engineered the screen on an impulse keyboard — snackdriven.com"
---
<p class="lead">The keyboard was a Prime Day impulse. I&rsquo;d been telling myself for months I&rsquo;d upgrade eventually, so when the AL80 dropped into a lightning deal I let &ldquo;eventually&rdquo; quietly mean &ldquo;now&rdquo; and filed it under planning. It has a little color screen tucked above the arrow keys. I lasted about two weeks before I couldn&rsquo;t leave the screen alone.</p>

Out of the box you drive that screen through the vendor&rsquo;s web app. It shows a 24-hour clock and lets you upload pictures, and that&rsquo;s the whole menu. I wanted a 12-hour clock. Reasonable request. Not on offer. So I opened up the HID traffic to see what the web app was actually saying to the thing.

The clock hack turned out to be almost insulting. The screen displays whatever hour value you hand it &mdash; it doesn&rsquo;t convert anything, doesn&rsquo;t know what AM is. Send it a 5 instead of a 17 and it reads 05. The entire &ldquo;feature&rdquo; is one line of modulo. I shipped a little script that re-syncs every minute so it doesn&rsquo;t drift, and I had the 12-hour clock the vendor didn&rsquo;t feel like giving me.

Then I wanted my own images on it, and that&rsquo;s where it became actual work. Every packet carries checksums, and nothing draws if they&rsquo;re wrong. Cracking them was the weekend: the header one is a standard CRC, and the pixel one is a plain additive checksum I got wrong twice before the bytes set me straight. The panel is 112 by 137, sixteen-bit color, about thirty thousand bytes a frame. Now I can push whatever I want to it.

I had Claude reading captures with me, and it was confident and wrong in the way I keep writing about here. It labeled the packet types backwards. It invented a tidy formula that fell apart the second real pixels went through it, then kept calling the number &ldquo;confirmed.&rdquo; It was the same trap as [the two Tobys](/the-tale-of-two-tobys.html): a source that&rsquo;s right about every row it has is still not the whole room. The fix was the same boring thing every time &mdash; stop trusting the summary, run the actual numbers. Four thousand-odd packets either match your formula or they don&rsquo;t. Mine didn&rsquo;t, until it did.

So there&rsquo;s a programmable tiny TV on my keyboard now, which, if you&rsquo;ve read anything else here, is my whole personality showing up in hardware. It&rsquo;s the same reflex that had me rebuild [the terminal buddy an update deleted](/unknown-skill-buddy.html): when the thing you want gets taken back, or never offered, you make the version that&rsquo;s yours. The vendor wasn&rsquo;t going to hand me a 12-hour clock or my own pixels, so I took them. And the impulse buy has been retroactively reclassified as research. That&rsquo;s allowed. I checked.
