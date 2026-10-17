/** @jest-environment jsdom */

const fs = require('node:fs');
const path = require('node:path');

const script = fs.readFileSync(path.join(__dirname, '../assets/repo-shortcut.js'), 'utf8');

beforeAll(() => {
  window.eval(script);
});

beforeEach(() => {
  document.body.innerHTML = '<input id="test-input">';
  window.open = jest.fn();
});

afterEach(() => {
  document.body.innerHTML = '';
});

test('opens the repository for question mark', () => {
  document.dispatchEvent(new KeyboardEvent('keydown', { key: '?', bubbles: true }));
  expect(window.open).toHaveBeenCalledWith('https://github.com/snackdriven/portfolio', '_blank', 'noopener,noreferrer');
});

test('ignores other keys and modifier keys', () => {
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
  document.dispatchEvent(new KeyboardEvent('keydown', { key: '?', ctrlKey: true, bubbles: true }));
  expect(window.open).not.toHaveBeenCalled();
});

test('ignores editable fields', () => {
  document.getElementById('test-input').dispatchEvent(new KeyboardEvent('keydown', { key: '?', bubbles: true }));
  expect(window.open).not.toHaveBeenCalled();
});
