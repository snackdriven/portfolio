/* Preserve the original name flicker: solo letters, an ng cascade, and the rare yl pair. */
if (document.getElementById('portfolio-overview') && typeof window.initNeonFlicker === 'function') {
  window.initNeonFlicker('.pr-name [data-group="yl"]', '.pr-name [data-group="ie"]', '.pr-name [data-solo]');
}

// 👀 oh, a dev. hi.
console.log('%c  SUITE  kayla-young.spec  ','background:#A78BFA;color:#2D2B3A;font-family:"DM Mono",monospace;font-size:11px;font-weight:700;padding:2px 6px;border-radius:2px;');
console.log('%c\n  ✓  is a real person, not a landing page template\n  ✓  finds the edge case you swore couldn\'t happen\n  ✓  actually reads the ticket before testing\n  ✓  you should hire her\n','color:#4AEEA0;font-family:"DM Mono",monospace;font-size:11px;line-height:1.9;');
console.log('%c  4 passing','color:#B5B2C8;font-family:"DM Mono",monospace;font-size:11px;');
console.log('%c\n  → kayla@snackdriven.com\n','color:#72C5D9;font-family:"DM Mono",monospace;font-size:11px;');
