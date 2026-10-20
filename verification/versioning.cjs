const test = require('node:test');
const assert = require('node:assert/strict');
const { checkRelease } = require('../tools/check-release.cjs');

const lock = version => ({ version, packages: { '': { version } } });
const notes = (version = '1.0.0', date = '2026-10-20') => `# Changelog\n\n## [Unreleased]\n\n## [${version}] - ${date}\n\n### Added\n\n- Site baseline.\n\n[${version}]: https://github.com/snackdriven/portfolio/tree/baseline\n`;

test('accepts synchronized stable and prerelease versions', () => {
  for (const version of ['1.0.0', '1.1.0-rc.1']) {
    assert.deepEqual(checkRelease({ version }, lock(version), notes(version)), []);
  }
});

test('rejects invalid versions and drift in either lockfile version', () => {
  assert.match(checkRelease({ version: 'v1.0.0' }, lock('v1.0.0'), notes()).join(), /canonical SemVer/);
  for (const broken of [{ ...lock('1.0.0'), version: '1.1.0' }, lock('1.0.0')]) {
    const version = broken.version === '1.1.0' ? '1.0.0' : '1.1.0';
    assert.match(checkRelease({ version }, broken, notes()).join(), /must match/);
  }
});

test('rejects missing release notes, invalid dates, duplicate or unordered releases and missing links', () => {
  for (const [changelog, expected] of [
    [notes().replace('## [Unreleased]', '## Unreleased'), /First changelog/],
    [notes('1.1.0'), /Newest changelog/],
    [notes('1.0.0', '2026-02-30'), /Invalid release date/],
    [notes().replace('## [1.0.0] - 2026-10-20', '## [1.0] - 2026-10-20'), /Invalid release heading/],
    [notes() + '\n## [1.0.0] - 2026-10-20\n', /unique and newest first/],
    [notes() + '\n## [2.0.0] - 2026-10-20\n', /unique and newest first/],
    [notes().replace('[1.0.0]: https://', '[missing]: https://'), /Missing changelog link/]
  ]) {
    assert.match(checkRelease({ version: '1.0.0' }, lock('1.0.0'), changelog).join(), expected);
  }
});

test('Commitizen offers content commits and produces a conventional message', async () => {
  const adapter = require('cz-conventional-changelog');
  let message;
  await adapter.prompter({ prompt: async questions => {
    assert.ok(questions.find(q => q.name === 'type').choices.some(choice => choice.value === 'post'));
    return { type: 'chore', scope: 'release', subject: 'configure versioning', body: '', isBreaking: false, isIssueAffected: false };
  } }, output => { message = output; });
  // The adapter invokes its callback asynchronously after the prompt resolves.
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(message, 'chore(release): configure versioning');
});
