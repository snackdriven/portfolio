---
title: "One Line of Modulo"
date: 2026-07-01
permalink: /i-reverse-engineered-the-screen-on-an-impulse-keyboard.html
tag: building
hidden: false
read: 2
excerpt: "The AI said impossible. Reddit said only the vendor app could touch the screen. It was one line of modulo."
description: "The AI said impossible. Reddit said only the vendor app could touch the screen. It was one line of modulo."
ogtitle: "One Line of Modulo &middot; snackdriven.com"
---
<p class="lead">I&rsquo;m at this desk most of my waking hours, so a good keyboard isn&rsquo;t a small thing. The upgrade was overdue. I&rsquo;d been on a Logitech MX Keys. Lovely, flat, completely screenless. So when the AL80 turned up in a Prime Day lightning deal with a little color screen above the arrow keys, the timing was right and I grabbed it. I lasted under a week before I couldn&rsquo;t leave the screen alone.</p>

Out of the box you drive that screen through the vendor&rsquo;s web app. It shows a 24-hour clock and lets you upload pictures, and that&rsquo;s the whole menu. I wanted a 12-hour clock. Reasonable request. Not on offer. And when I asked around, the answer was that it couldn&rsquo;t be done. The AI I asked said the 12-hour clock was impossible; Reddit&rsquo;s verdict was blunter, that the screen only changes through YUNZII&rsquo;s own app and VIA can&rsquo;t touch it. So I opened up the HID traffic myself to see what the web app was actually saying to the thing.

The clock hack turned out to be almost insulting. The screen displays whatever hour value you hand it. It doesn&rsquo;t convert anything, doesn&rsquo;t know what AM is. Send it a 5 instead of a 17 and it reads 05. The entire &ldquo;feature&rdquo; is one line of modulo. I shipped a little script that re-syncs every minute so it doesn&rsquo;t drift, and I had the 12-hour clock the vendor didn&rsquo;t feel like giving me, the one the internet had just sworn was impossible.

Then I wanted my own images on it, and that&rsquo;s where it became actual work. Every packet carries checksums, and nothing draws if they&rsquo;re wrong. Cracking them cost me one long night: the header one is a standard CRC, and the pixel one is a plain additive checksum I got wrong twice before the bytes set me straight. The panel is 112 by 137, sixteen-bit color, about thirty thousand bytes a frame. Now I can push whatever I want to it.

I had Claude reading captures with me, and it was confident and wrong in the way I keep writing about here. It labeled the packet types backwards. It invented a tidy formula that fell apart the second real pixels went through it, then kept calling the number &ldquo;confirmed.&rdquo; Same trap as always: a source that&rsquo;s right about every row it has still isn&rsquo;t the whole room. The fix was the same boring thing every time: stop trusting the summary, run the actual numbers. Four thousand-odd packets either match your formula or they don&rsquo;t. Mine didn&rsquo;t, until it did.

So there&rsquo;s a programmable tiny TV on my keyboard now, which, if you&rsquo;ve read anything else here, is my whole personality showing up in hardware. The vendor wasn&rsquo;t going to hand me a 12-hour clock or my own pixels, so I took them. Right now it&rsquo;s running my 12-hour clock with a pink skull spinning on the GIF screen next to it. And the impulse buy has been retroactively reclassified as research. That&rsquo;s allowed. I checked.

---

**Correction, 2026-07-04:** the panel is 96 by 160, not the 112 by 137 I gave above. The size in bytes was right either way, about thirty thousand a frame, which is exactly how the wrong number got past me. Caught it going back in for <a href="/the-keyboard-screen-was-the-easy-part.html">round two</a>.
