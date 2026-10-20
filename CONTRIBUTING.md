# Contributing

## Commits

Use Node.js 22.12 or later and install the locked dependencies with `npm ci`.
Stage the files for one change, then run `npm run commit` to use commitlint's
interactive prompts. No global install or Git hook is required. Use a short
imperative summary and an optional scope:

```text
feat(portfolio): add project filters
fix(navigation): restore keyboard focus
post: tighten keyboard blurb
chore(release): prepare 1.0.1
```

The prompt also offers `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`,
and `revert`. Describe incompatible changes in a
`BREAKING CHANGE: ...` footer. Use the same convention for PR titles when squash merging. Existing
commit history is retained; czg guides new commits; commitlint validates messages without enforcing a hook.
To validate a message without creating a commit, pipe it to `npm run commit:check`.

## Versions and changelog

`package.json` is the version source; both root versions in `package-lock.json`
must agree. Versions follow [SemVer](https://semver.org/spec/v2.0.0.html):

- **Patch:** compatible corrections to content, styling, accessibility, or behavior.
- **Minor:** new compatible pages or capabilities.
- **Major:** incompatible changes to public URLs, supported behavior, or the
  contributor workflow. Preserve redirects where practical and describe migration.

The public contract includes stable URLs, navigation, and documented site
behavior. A release can group several PRs. Routine edits need an `[Unreleased]`
entry when notable; they do not require a version bump for every commit.

Maintain `CHANGELOG.md` by hand for readers, using only relevant Keep a Changelog
groups: Added, Changed, Deprecated, Removed, Fixed, and Security. Do not paste the
Git log or invent historical releases. The initial `1.0.0` entry records the
existing site at adoption and points to its baseline commit.

## Prepare a release PR

From an up-to-date branch, choose the appropriate bump:

```sh
npm version patch --no-git-tag-version
```

Use `minor` or `major` instead when appropriate. This updates the package and
lockfile together without making a commit or tag. Then:

1. Move the relevant `[Unreleased]` entries into a new `## [X.Y.Z] - YYYY-MM-DD`
   section immediately below it. Keep `[Unreleased]` for the next changes.
2. Add a version comparison link. For the first release, compare the baseline
   commit `9655755` to the intended `vX.Y.Z` tag; later compare release tags.
   Update the `[Unreleased]` link to compare that tag to `main`.
3. Run `npm run release:check`, `npm test`, `npm run build`, and
   `npm run test:artifact`.
4. Stage the release files, use `npm run commit`, and open a PR for review.

After the release PR is approved and merged, a maintainer can create and push an
annotated `vX.Y.Z` tag on the merged release commit and publish GitHub release
notes from that changelog entry. Do not tag the PR branch or publish the private
npm package.

Pages still deploys when a PR merges to `main`. Version tags document reviewed
snapshots; they do not control deployment. This setup does not automatically
push commits, create tags, or publish releases.
