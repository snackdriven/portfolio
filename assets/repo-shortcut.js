// Easter egg: press Alt+? outside an editable field to open this site's source.
(function () {
  document.addEventListener('keydown', function (event) {
    if (event.key !== '?' || !event.altKey || event.ctrlKey || event.metaKey ||
        event.repeat || event.isComposing || event.defaultPrevented) return;

    var target = event.target;
    if (target instanceof Element &&
        (target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])') || target.isContentEditable)) return;

    event.preventDefault();
    window.open('https://github.com/snackdriven/portfolio', '_blank', 'noopener,noreferrer');
  });
})();
