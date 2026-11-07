/* ============================================================
   snackdriven.com — site.js
   Shared behavior, loaded on every page (after site.css).
   ============================================================ */

/* Show the scrollbar only while scrolling: a "scrolling" class is added
   to <html> on scroll and removed after a short idle, and site.css only
   paints the thumb green while that class is present. */
(function () {
  const root = document.documentElement;
  let t;
  let isScrolling = false;
  window.addEventListener('scroll', function () {
    if (!isScrolling) {
      window.requestAnimationFrame(function() {
        root.classList.add('scrolling');
      });
      isScrolling = true;
    }
    clearTimeout(t);
    t = setTimeout(function () {
      isScrolling = false;
      root.classList.remove('scrolling');
    }, 700);
  }, { passive: true });
})();

/* 👀 oh, a dev. hi. */
(function () {
  if (typeof console === 'undefined' || !console.log) return;
  try {
    console.log('%c  SUITE  kayla-young.spec  ', 'background:#AF98F1;color:#15131B;font-family:"DM Mono",monospace;font-size:11px;font-weight:700;padding:2px 6px;border-radius:2px;');
    console.log('%c\n  ✓  is a real person, not a landing page template\n  ✓  finds the edge case you swore couldn\'t happen\n  ✓  actually reads the ticket before testing\n  ✓  you should hire her\n', 'color:#B7E65F;font-family:"DM Mono",monospace;font-size:11px;line-height:1.9;');
    console.log('%c  4 passing', 'color:#B5B2C8;font-family:"DM Mono",monospace;font-size:11px;');
    console.log('%c\n  → kayla@snackdriven.com\n', 'color:#42B9AA;font-family:"DM Mono",monospace;font-size:11px;');
  } catch (_) {}
})();
