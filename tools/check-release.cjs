const fs = require('node:fs');
const path = require('node:path');
const semver = require('semver');

function canonicalVersion(version) {
  const parsed = semver.parse(version);
  return parsed && `${parsed.version}${parsed.build.length ? `+${parsed.build.join('.')}` : ''}` === version;
}

function checkRelease(pkg, lock, changelog, env = {}) {
  const errors = [];
  const version = pkg.version;
  if (!canonicalVersion(version)) {
    errors.push('package.json version must be a canonical SemVer version.');
  }
  if (lock.version !== version || lock.packages?.['']?.version !== version) {
    errors.push('package.json and both package-lock.json versions must match.');
  }
  const headings = [...changelog.matchAll(/^## (.+)$/gm)].map(match => match[1].trim());
  if (headings.shift() !== '[Unreleased]') errors.push('First changelog section must be ## [Unreleased].');
  if (!changelog.includes('keepachangelog.com') || !changelog.includes('semver.org')) {
    errors.push('Changelog must link to Keep a Changelog and SemVer.');
  }
  const pending = changelog.split(/^## \[Unreleased\]\s*$/m)[1]?.split(/^## |^\[Unreleased\]:/m)[0] || '';
  const categories = [...pending.matchAll(/^### (.+)$/gm)].map(match => match[1].trim());
  const allowed = ['Added', 'Changed', 'Deprecated', 'Removed', 'Fixed', 'Security'];
  if (new Set(categories).size !== categories.length || categories.some(category => !allowed.includes(category))) {
    errors.push('Unreleased categories must be unique Keep a Changelog categories.');
  }
  if (pending.split(/^### .+$/m).slice(1).some(section => !/^- \S/m.test(section))) {
    errors.push('Unreleased categories must not be empty.');
  }
  const versions = [];
  for (const heading of headings) {
    const match = /^\[([^\]]+)\] - (\d{4}-\d{2}-\d{2})$/.exec(heading);
    if (!match || !canonicalVersion(match[1])) {
      errors.push(`Invalid release heading: ${heading}`);
      continue;
    }
    const [, released, date] = match;
    const parsedDate = new Date(`${date}T00:00:00Z`);
    if (Number.isNaN(parsedDate.valueOf()) || parsedDate.toISOString().slice(0, 10) !== date) {
      errors.push(`Invalid release date: ${date}`);
    }
    if (versions.some(previous => !semver.gt(previous, released))) {
      errors.push('Changelog releases must be unique and newest first.');
    }
    versions.push(released);
    if (!changelog.split(/\r?\n/).some(line => line.startsWith(`[${released}]: https://`))) {
      errors.push(`Missing changelog link for ${released}.`);
    }
  }
  // main adopted 1.0.0 as an untagged baseline with no historical releases.
  if (versions[0] !== version && !(versions.length === 0 && version === '1.0.0')) {
    errors.push('Newest changelog release must match package.json version.');
  }
  if (env.GITHUB_REF_TYPE === 'tag') {
    if (env.GITHUB_REF_NAME !== `v${version}`) errors.push('Tag must match package.json version.');
    if (!versions.includes(version)) errors.push('Tagged releases need dated, curated release notes.');
  }
  return errors;
}

if (require.main === module) {
  const root = path.join(__dirname, '..');
  const read = file => fs.readFileSync(path.join(root, file), 'utf8');
  const errors = checkRelease(JSON.parse(read('package.json')), JSON.parse(read('package-lock.json')), read('CHANGELOG.md'), process.env);
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
  } else {
    console.log('SemVer, lockfile, and changelog are consistent.');
  }
}

module.exports = { checkRelease };
