window.initNeonFlicker = function(rareSelector, mediumSelector, soloSelector) {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rare   = Array.from(document.querySelectorAll(rareSelector));
  const medium = Array.from(document.querySelectorAll(mediumSelector));
  const solo   = Array.from(document.querySelectorAll(soloSelector));
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
    const THRESHOLD_RARE = 0.2;
    const THRESHOLD_MEDIUM = 0.55;

    const STAGGER_NONE = 0;
    const STAGGER_MEDIUM = 120;

    const DELAY_RARE_MIN = 3000;
    const DELAY_RARE_MAX = 5000;
    const DELAY_MEDIUM_MIN = 2500;
    const DELAY_MEDIUM_MAX = 4500;
    const DELAY_SOLO_MIN = 1500;
    const DELAY_SOLO_MAX = 3500;

    const roll = Math.random();
    if (roll < THRESHOLD_RARE) {
      flicker(rare, STAGGER_NONE);
      setTimeout(next, rnd(DELAY_RARE_MIN, DELAY_RARE_MAX));
    } else if (roll < THRESHOLD_MEDIUM) {
      flicker(medium, STAGGER_MEDIUM);
      setTimeout(next, rnd(DELAY_MEDIUM_MIN, DELAY_MEDIUM_MAX));
    } else {
      flicker([solo[rnd(0, solo.length - 1)]], STAGGER_NONE);
      setTimeout(next, rnd(DELAY_SOLO_MIN, DELAY_SOLO_MAX));
    }
  }

  next();
};

// This script is deferred, so the brand exists before initialization runs.
window.initNeonFlicker('.topbar .brand [data-group="ve"]', '.topbar .brand [data-group="ck"]', '.topbar .brand [data-solo]');
