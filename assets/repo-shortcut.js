// Easter egg: press "?" outside an editable field to open this site's source.
(function () {
  document.addEventListener('keydown', function (event) {
    if (event.key !== '?' || event.ctrlKey || event.metaKey || event.altKey ||
        event.repeat || event.isComposing || event.defaultPrevented) return;

    var target = event.target;
    if (target instanceof Element &&
        (target.closest('input, textarea, select') || target.isContentEditable)) return;

    window.open('https://github.com/snackdriven/portfolio', '_blank', 'noopener,noreferrer');
  });
})();
