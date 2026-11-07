/** @jest-environment jsdom */
const fs = require('node:fs');
const path = require('node:path');
const inventory = require('../src/_data/portfolioPages.json');
const origin = 'https://snackdriven.com';
const cases = inventory.filter(url => url.startsWith('/portfolio/projects/'));

function page(url) {
  const file = path.join(__dirname, '..', url.endsWith('/') ? url + 'index.html' : url);
  const doc = document.implementation.createHTMLDocument();
  doc.documentElement.innerHTML = fs.readFileSync(file, 'utf8');
  return doc;
}

test('every published case study is directly discoverable in selected projects before the full about section', () => {
  const doc = page('/portfolio/');
  const selected = doc.getElementById('selected-projects');
  const links = [...selected.querySelectorAll('.project .project-link')].map(link => new URL(link.getAttribute('href'), origin + '/portfolio/').pathname);
  expect(cases.every(url => links.includes(url))).toBe(true);
  const about = doc.getElementById('about-heading').closest('section');
  expect(selected.compareDocumentPosition(about) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});

test('the next-case journey reaches every published case once before returning to its start', () => {
  const first = page('/portfolio/').querySelector('#selected-projects .project-link');
  const start = new URL(first.getAttribute('href'), origin + '/portfolio/').pathname;
  let current = start;
  const visited = [];
  for (let i = 0; i < cases.length; i++) {
    visited.push(current);
    const next = page(current).querySelector('.case-footer a');
    current = new URL(next.getAttribute('href'), origin + current).pathname;
  }
  expect([...new Set(visited)].sort()).toEqual([...cases].sort());
  expect(current).toBe(start);
});
