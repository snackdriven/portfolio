const test = require('node:test');
const assert = require('node:assert');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

test('repo-shortcut tests', async (t) => {
  let dom;
  let window;
  let document;
  let openCalled = 0;
  let openArgs = [];

  t.beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html><body><input id="test-input"></body></html>', {
      runScripts: "dangerously"
    });
    window = dom.window;
    document = window.document;

    // Mock window.open
    openCalled = 0;
    openArgs = [];
    window.open = (...args) => {
      openCalled++;
      openArgs = args;
    };

    // Load and execute the script inside JSDOM
    const scriptContent = fs.readFileSync(path.join(__dirname, '../assets/repo-shortcut.js'), 'utf8');
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptContent;
    document.body.appendChild(scriptEl);
  });

  await t.test('opens window on ? key press', () => {
    const event = new window.KeyboardEvent('keydown', { key: '?' });
    document.dispatchEvent(event);
    assert.strictEqual(openCalled, 1);
    assert.deepStrictEqual(openArgs, ['https://github.com/snackdriven/portfolio', '_blank', 'noopener,noreferrer']);
  });

  await t.test('does not open window on other key press', () => {
    const event = new window.KeyboardEvent('keydown', { key: 'a' });
    document.dispatchEvent(event);
    assert.strictEqual(openCalled, 0);
  });

  await t.test('does not open window with modifier keys', () => {
    const event = new window.KeyboardEvent('keydown', { key: '?', ctrlKey: true });
    document.dispatchEvent(event);
    assert.strictEqual(openCalled, 0);
  });

  await t.test('does not open window inside input', () => {
    const input = document.getElementById('test-input');
    const event = new window.KeyboardEvent('keydown', { key: '?', bubbles: true });
    input.dispatchEvent(event);
    assert.strictEqual(openCalled, 0);
  });
});
