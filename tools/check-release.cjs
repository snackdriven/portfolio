const fs = require('node:fs');
const path = require('node:path');
const semver = require('semver');

function checkRelease(pkg, lock, changelog) {
  const errors = [];
  const version = pkg.version;
  if (!semver.valid(version) || semver.valid(version) !== version) {
    errors.push('package.json version must be a canonical SemVer version.');
  }
  if (lock.version !== version || lock.packages?.['']?.version !== version) {
    errors.push('package.json and both package-lock.json versions must match.');
  }
  const headings = [...changelog.matchAll(/^## (.+)$/gm)].map(match => match[1].trim());
  if (headings.shift() !== '[Unreleased]') errors.push('First changelog section must be ## [Unreleased].');
  const versions = [];
  for (const heading of headings) {
    const match = /^\[([^\]]+)\] - (\d{4}-\d{2}-\d{2})$/.exec(heading);
    if (!match || !semver.valid(match[1]) || semver.valid(match[1]) !== match[1]) {
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
  if (versions[0] !== version) errors.push('Newest changelog release must match package.json version.');
  return errors;
}

if (require.main === module) {
  const root = path.join(__dirname, '..');
  const read = file => fs.readFileSync(path.join(root, file), 'utf8');
  const errors = checkRelease(JSON.parse(read('package.json')), JSON.parse(read('package-lock.json')), read('CHANGELOG.md'));
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
  } else {
    console.log('SemVer, lockfile, and changelog are consistent.');
  }
}

module.exports = { checkRelease };
