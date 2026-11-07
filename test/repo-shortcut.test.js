/** @jest-environment jsdom */
const fs = require('node:fs');
const path = require('node:path');
const script = fs.readFileSync(path.join(__dirname, '../assets/repo-shortcut.js'), 'utf8');
beforeAll(() => { window.eval(script); });
beforeEach(() => {
  document.body.innerHTML = '<input id="input"><textarea id="textarea"></textarea><select id="select"></select><div contenteditable="true" id="editable"><span id="child">text</span></div>';
  window.open = jest.fn();
});
function press(options = {}, target = document) {
  const event = new KeyboardEvent('keydown', { key: '?', altKey: true, bubbles: true, cancelable: true, ...options });
  target.dispatchEvent(event);
  return event;
}
test('Alt+? opens source with opener protection and consumes only the handled key', () => {
  expect(press().defaultPrevented).toBe(true);
  expect(window.open).toHaveBeenCalledWith('https://github.com/snackdriven/portfolio', '_blank', 'noopener,noreferrer');
});
test.each([{ altKey: false }, { key: 'a' }, { ctrlKey: true }, { metaKey: true }, { repeat: true }, { isComposing: true }])('does not open source for %j', options => {
  expect(press(options).defaultPrevented).toBe(false);
  expect(window.open).not.toHaveBeenCalled();
});
test.each(['input', 'textarea', 'select', 'editable', 'child'])('does not intercept typing in %s', id => {
  press({}, document.getElementById(id));
  expect(window.open).not.toHaveBeenCalled();
});
test('respects an already handled event', () => {
  const event = new KeyboardEvent('keydown', { key: '?', altKey: true, bubbles: true, cancelable: true });
  event.preventDefault();
  document.dispatchEvent(event);
  expect(window.open).not.toHaveBeenCalled();
});
