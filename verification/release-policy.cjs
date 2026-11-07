const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const yaml = require('js-yaml');
const workflow = yaml.load(fs.readFileSync('.github/workflows/deploy.yml', 'utf8'));

test('PRs validate the tested artifact without deployment privileges; main deploy depends on validation', () => {
  assert.ok(Object.hasOwn(workflow.on, 'pull_request'));
  assert.ok(!Object.hasOwn(workflow.on, 'pull_request_target'));
  assert.deepEqual(workflow.permissions, { contents: 'read' });
  const validate = workflow.jobs.validate;
  assert.equal(validate.permissions, undefined);
  const commands = validate.steps.filter(step => step.run).map(step => step.run);
  for (const [before, after] of [['npm ci', 'npm run release:check'], ['npm run release:check', 'npm test'], ['npm test', 'npm run build'], ['npm run build', 'npm run test:artifact']]) {
    assert.ok(commands.indexOf(before) >= 0 && commands.indexOf(after) > commands.indexOf(before), `${before} gates ${after}`);
  }
  assert.ok(validate.steps.every(step => !step['continue-on-error']), 'failed validation cannot be ignored');
  assert.equal(workflow.jobs.deploy.needs, 'validate');
  assert.match(workflow.jobs.deploy.if, /refs\/heads\/main/);
  assert.match(workflow.jobs.deploy.if, /event_name != 'pull_request'/);
  assert.deepEqual(workflow.jobs.deploy.permissions, { pages: 'write', 'id-token': 'write' });
  assert.equal(workflow.jobs.smoke.needs, 'deploy');
  assert.ok(workflow.jobs.smoke.steps.some(step => step.uses?.startsWith('actions/download-artifact@')));
  assert.ok(workflow.jobs.smoke.steps.some(step => step.run === 'node tools/site-smoke.cjs'));
});
