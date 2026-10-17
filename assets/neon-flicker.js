window.initNeonFlicker = function(rareSelector, mediumSelector, soloSelector) {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var rare   = Array.from(document.querySelectorAll(rareSelector));
  var medium = Array.from(document.querySelectorAll(mediumSelector));
  var solo   = Array.from(document.querySelectorAll(soloSelector));
  if (!solo.length) return;

  function rnd(a, b) { return Math.floor(Math.random() * (b - a + 1) + a); }

  function flicker(spans, stagger) {
    spans.forEach(function (l, i) {
      setTimeout(function () {
        l.classList.add('flickering');
        setTimeout(function () { l.classList.remove('flickering'); }, 800);
      }, i * (stagger || 0));
    });
  }

  function next() {
    var roll = Math.random();
    if (roll < 0.2) {
      flicker(rare, 0);
      setTimeout(next, rnd(3000, 5000));
    } else if (roll < 0.55) {
      flicker(medium, 120);
      setTimeout(next, rnd(2500, 4500));
    } else {
      flicker([solo[rnd(0, solo.length - 1)]], 0);
      setTimeout(next, rnd(1500, 3500));
    }
  }

  next();
};
