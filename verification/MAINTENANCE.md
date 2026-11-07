# Dependency and release maintenance

Reviewed October 19, 2026 against this branch's lockfile.

`npm update` refreshed compatible versions within the existing dependency ranges. It retained Jest 30.5.2 and the stylesheet versioning hook. Notable resolved packages: Eleventy 3.1.7, markdown-it 14.3.3, linkify-it 5.0.2, liquidjs 10.30.0, js-yaml 4.3.2 and 3.15.2, and brace-expansion 1.1.21 / 2.1.7 / 5.0.12. No forced audit fix, major-version override or downgrade was applied.

The first hosted validation caught optional peer entries omitted by a local npm 11 lock update. The lock was regenerated with the runner's npm 10.9.9 in a clean directory without node_modules, restoring @emnapi/core and @emnapi/runtime entries needed by Linux. Use the CI npm version when updating the lock and verify `npm ci` from a clean install; a successful install with another npm version is not the hosted receipt.

After updating, `npm audit` reports zero high/critical entries and 19 moderate package entries. Those 19 entries trace to one underlying advisory, [GHSA-hp3w-g68c-fv3c](https://github.com/advisories/GHSA-hp3w-g68c-fv3c), in `sprintf-js@1.0.3`. They are dependency propagation, not 19 independent flaws. The installed path is Jest 30.5.2 -> babel-plugin-istanbul 8.0.0 -> @istanbuljs/load-nyc-config 1.1.0 -> js-yaml 3.15.2 -> argparse 1.0.10 -> sprintf-js 1.0.3. The advisory covers versions through 1.1.3; the registry and advisory list no patched release at review time.

The affected operation consumes a caller-controlled numeric format string. Here it is in the development test/coverage configuration stack. The static site's browser assets do not contain or call this package, and the site accepts no visitor-supplied build input. Pull requests can change build inputs and run in the read-only validation job, so that toolchain exposure remains relevant; this note does not establish that every possible build input is safe. Keep the residual exception open until the upstream stack supplies a compatible fix. Revisit it when updating Jest/coverage tooling or accepting external build inputs. Do not downgrade Jest to satisfy npm's suggested forced fix.

Validation runs on pull requests and main: clean install, regression tests, build, then artifact checks. Only main can upload and deploy the validated artifact. Deployment alone has Pages/OIDC write permissions. The final smoke job downloads that same artifact and compares critical HTML, PDF, XML/text and hashed CSS bytes with the hosted responses; it also requires a real 404 recovery response. Its log includes the workflow commit SHA. A hosted smoke failure marks the release workflow failed after publication; it does not roll back Pages automatically.

Unlisted posts still build at their existing public permalinks. They are omitted from the index/feed and now from the sitemap. This is a discovery policy, not access control. Public case URLs are maintained in `src/_data/portfolioPages.json`; artifact verification checks the inventory against the case files and their canonical links.

The source Easter egg now uses **Alt+?** (Alt+Shift+/ on a US keyboard). Unmodified characters, editable fields, repeated/composing events and already handled events do not open a tab. The GitHub link's title exposes the shortcut without making keyboard discovery a prerequisite for reaching the source.
