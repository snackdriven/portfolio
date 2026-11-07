/* Progressive enhancement: the source keeps all stages readable without JS. */
(() => {
  const workbench = document.querySelector('[data-workbench]');
  if (!workbench) return;
  const tablist = workbench.querySelector('[role="tablist"]');
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  if (!tabs.length || panels.some(panel => !panel)) return;

  function select(index, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    panels[index].tabIndex = 0;
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      const target = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 }[event.key];
      if (target === undefined || event.altKey || event.ctrlKey || event.metaKey) return;
      event.preventDefault();
      select(target, true);
    });
  });
  select(Math.max(0, tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true')));
  tablist.hidden = false;

  // Include the expandable evidence record when printing, restoring its state.
  const evidence = document.querySelector('.qa-evidence-detail');
  let evidenceWasOpen;
  window.addEventListener('beforeprint', () => {
    if (evidence) { evidenceWasOpen = evidence.open; evidence.open = true; }
  });
  window.addEventListener('afterprint', () => {
    if (evidence && evidenceWasOpen !== undefined) evidence.open = evidenceWasOpen;
  });
})();
