/** @jest-environment jsdom */
const fs = require('node:fs');
const path = require('node:path');
// Disabling activation, hiding the fallback, or breaking roving keyboard focus
// must make these tests fail. Use the actual page markup and production script.
const htmlContent = fs.readFileSync(path.join(__dirname, '../portfolio/projects/qa-workflow.html'), 'utf8');
const scriptFile = path.join(__dirname, '../portfolio/projects/qa-workflow.js');
const scriptContent = fs.existsSync(scriptFile) ? fs.readFileSync(scriptFile, 'utf8') : '';

const html = () => htmlContent;
const enhance = () => {
  if (scriptContent) window.eval(scriptContent);
};
beforeEach(() => {
  document.documentElement.innerHTML = html().replace(/<!DOCTYPE html>/i, '');
});
const tabs = () => [...document.querySelectorAll('[data-workbench] [role="tab"]')];
const panels = () => [...document.querySelectorAll('[data-workbench] [data-stage-panel]')];
test('without JavaScript, every workflow stage remains readable', () => {
  expect(panels()).toHaveLength(5);
  expect(panels().every(panel => !panel.hidden)).toBe(true);
  expect(document.querySelector('[role="tablist"]').hidden).toBe(true);
});
test('starts on review and clicking another stage exposes its real content', () => {
  enhance();
  expect(tabs()).toHaveLength(5);
  expect(tabs().filter(tab => tab.getAttribute('aria-selected') === 'true').map(tab => tab.textContent)).toEqual([expect.stringContaining('Review')]);
  tabs()[1].click();
  expect(panels().filter(panel => !panel.hidden)).toEqual([document.getElementById(tabs()[1].getAttribute('aria-controls'))]);
  expect(panels()[1].textContent).toContain('runbook');
});
test('arrow keys wrap and Home/End move both selection and keyboard focus', () => {
  enhance();
  expect(tabs()).toHaveLength(5);
  const press = (index, key) => tabs()[index].dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
  press(3, 'End');
  expect(document.activeElement).toBe(tabs()[4]);
  press(4, 'ArrowRight');
  expect(document.activeElement).toBe(tabs()[0]);
  press(0, 'ArrowLeft');
  expect(document.activeElement).toBe(tabs()[4]);
  press(4, 'Home');
  expect(document.activeElement).toBe(tabs()[0]);
  expect(tabs().filter(tab => tab.tabIndex === 0)).toEqual([tabs()[0]]);
  expect(tabs()[0].getAttribute('aria-selected')).toBe('true');
});
