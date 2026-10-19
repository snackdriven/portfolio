---
title: "The ghosts still need a publishing schedule"
date: 2026-10-19
permalink: /keeping-the-haunted-shop-stocked.html
tag: building
read: 2
excerpt: "A little kindness became a haunted craft shop. Keeping that cozy place available acquired some technical requirements."
description: "A little kindness became a haunted craft shop. Keeping that cozy place available acquired some technical requirements."
ogtitle: "The ghosts still need a publishing schedule · snackdriven.com"
ogimage: /assets/social/felt-presence.png
ogimagealt: "Felt Presence: letters from a haunted craft shop, with a publishing workflow behind them."
---
<p class="lead">I asked for something nice to hear. I got a haunted craft shop, a ghost discovering weighted blankets, and a pumpkin with a secret.</p>

[Felt Presence](https://felt-presence.snackdriven.com/) started on October 7 with a tiny fictional bulletin. A moth was testing lamps. Miniature skeletons had added a conservatory to a dollhouse without being asked. One pumpkin was ceramic and keeping it quiet.

It became a cozy place for me to land. A nice reminder that things can be calm and we can be present. I wanted more installments spaced through the day, and somewhere to keep them. I chose the name, asked for a dedicated archive, and kept coming back to the shop.

The characters started carrying small bits of history with them. New stories needed to remember what had happened. Illustrations needed to look like the same place, down to the pumpkin&rsquo;s six-pocket waistcoat. The reader came later, with wax-sealed letters and warm paper. The vines took several attempts to stop looking so obedient.

AI generates the prose, artwork, and code. I shape the direction, choose what belongs, ask for corrections, and review how it all comes together. Keeping a gentle little world recognizable turned out to involve quite a lot of checking pockets.

## Keeping the shop stocked

Recurring generation needed a reliable route into the reader. Each new installment needs its story and accepted illustration together. The build checks the approval record and image checksum; an incomplete pair waits. Retrying an archive step reuses the accepted image.

Once that pair is archived and pushed, Cloudflare rebuilds the reader. A publication test checks that a new approved pair appears without another edit to a curated list. Conflicting records stop the build, leaving the previous good version available.

I still review what it feels like to open a letter. Two competing timestamps and an awkward scroll both turned up there. The mechanics should give the shop room to be calm, including when someone opens it on their phone.

The [case study](/portfolio/projects/felt-presence.html) has more of the design and publishing details. The source archive stays private; the [shop](https://felt-presence.snackdriven.com/) is open.

The skeletons can keep their unauthorized conservatory. I would like the next letter to arrive.
