const types = [
  'feat', 'fix', 'post', 'docs', 'style', 'refactor',
  'perf', 'test', 'build', 'ci', 'chore', 'revert'
];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', types]
  },
  prompt: {
    useEmoji: false,
    types: types.map(value => ({ value, name: value }))
  }
};
