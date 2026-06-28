/* ============================================================
   snackdriven.com — site.js
   Shared behavior, loaded on every page (after site.css).
   ============================================================ */

/* Show the scrollbar only while scrolling: a "scrolling" class is added
   to <html> on scroll and removed after a short idle, and site.css only
   paints the thumb green while that class is present. */
(function () {
  var root = document.documentElement;
  var t;
  window.addEventListener('scroll', function () {
    root.classList.add('scrolling');
    clearTimeout(t);
    t = setTimeout(function () { root.classList.remove('scrolling'); }, 700);
  }, { passive: true });
})();
