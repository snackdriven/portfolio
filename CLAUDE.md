# CLAUDE.md — agent context for snackdriven.com

Personal site + blog for Kayla Young. Static site built with **Eleventy (11ty)**,
deployed to **GitHub Pages** at [snackdriven.com](https://snackdriven.com). This
file is the styling/voice contract for anyone (human or LLM) editing posts.

## Build, verify, deploy

```bash
npm install            # first run only (deps: @11ty/eleventy, markdown-it)
npx @11ty/eleventy     # build -> _site/ (also: npm run build)
npm run serve          # local preview with --serve
```

- **Deploy is push-to-`main`.** `.github/workflows/deploy.yml` builds and
  publishes to Pages on every push to `main`. There is no separate release
  step — merging/pushing to `main` *is* "push live."
- `_site/` and `node_modules/` are gitignored; never commit them.
- After `npm install`, revert any incidental `package-lock.json` churn before
  committing content-only changes.
- Always run the build once before pushing; confirm the changed post writes
  without errors.

## Where things live

- `src/blog/posts/*.md` — one file per post (markdown + raw HTML).
- `src/blog/posts/posts.json` — directory data; applies `layout: post.njk`,
  `tags: ["post"]`, `isPost`, `blogcss`, `ogtype: article` to every post.
- `src/_includes/*.njk` — `base.njk` (head/meta/JSON-LD), `post.njk` (article
  layout + `.post-meta` row), `topbar.njk`, `site-footer.njk`.
- `eleventy.config.js` — defines the `ymd` date filter and the `visiblePost`
  collection.
- `portfolio/`, `assets/`, `404.html`, `CNAME` — passthrough-copied as-is.

## Front-matter schema (every post)

| Key | Required | Notes |
|-----|----------|-------|
| `title` | yes | Quoted string. Also used in `<h1 class="neon post-title">` and `<title>`. |
| `date` | yes | `YYYY-MM-DD`. **Drives listing order** (newest first). See ordering rules. |
| `permalink` | yes | `/slug.html` — flat, no `/blog/` prefix. Match the filename slug. |
| `tag` | yes | Exactly one. Rendered as `#tag`. In-use set: `ai`, `building`, `design`, `incident`, `meta`, `reflection`, `tooling`. Reuse an existing tag unless there's a real reason not to. |
| `read` | yes | Integer minutes, shown as `~N min read`. |
| `excerpt` | yes | Card blurb on the landing list. |
| `description` | yes | Meta description + OG/Twitter + JSON-LD. **Keep identical to `excerpt`.** |
| `ogtitle` | yes | Convention: `"<title> — snackdriven.com"`. |
| `hidden` | optional | `true` = drafted/withheld from the listing. Omitting it (or `false`) = live. |
| `badge` | optional | Small pill in the meta row (e.g. `placeholder`). Rare. |

## Publishing model

- The `visiblePost` collection = all `post`-tagged files **without** `hidden`,
  reversed to newest-first. Hidden posts still build to their permalink but
  don't appear in the landing listing.
- **To publish a draft:** remove `hidden: true` (don't set `hidden: false` —
  just drop the line; that's how live posts read).
- Landing behavior: renders the single post in full when only one is visible,
  and falls back to the card list at 2+.

## Ordering & cross-links

- Posts sort by `date`, newest first. When you change a date, re-check the
  resulting sequence.
- **Internal links must point backward in time** — a post may reference older
  posts, never newer ones. Verify chronology after any date edit.
- Cross-links use root-relative permalinks: `[text](/other-slug.html)`.
- Respect explicit per-post "no cross-links" requests; when a post has none,
  keep referential ideas self-contained rather than pointing at other posts.
- The build does not fail on dead internal links — check them by hand.

## HTML & typography conventions

- Markdown allows raw HTML (`html: true` + `linkify` in `markdown-it`). Terminal
  code blocks and the lead paragraph rely on it.
- **First paragraph** of a post is `<p class="lead">…</p>`.
- Use **HTML entities for punctuation**, not literal glyphs:
  - `&rsquo;` apostrophe/right single quote, `&lsquo;` left single
  - `&ldquo;` / `&rdquo;` double quotes
  - `&mdash;` em dash, `&ndash;` en dash
  - `&larr;` etc. for arrows
  - Match the surrounding text — existing posts are fully entity-encoded.
- Known CSS hooks (don't invent new ones casually): `.wrap.reading`,
  `.post-meta`, `.tag`, `.badge`, `.neon`, `.post-title`, `.lead`, `.backlink`.
  Terminal/code snippets use `<pre><code>` with span classes `c` (comment),
  `g` (green/pass), `m` (muted/pending), etc.

## Voice & style (house rules)

The blog is first-person, dry, self-deprecating, technically specific. When
editing copy, preserve that. Concrete rules distilled from prior edits:

- **Blurbs (`excerpt`/`description`) are short and snappy.** Cut throat-clearing
  ("my first real X, the upgrade I'd been promising myself") and lead with the
  hook. Keep the two fields identical.
- **Stay truthful to what actually happened.** Don't reach for a dramatic verb
  that misstates the work — e.g. the keyboard was *reverse-engineered over USB*,
  not physically taken apart ("no screwdriver, all over USB").
- **Understate the stakes.** Frame purchases/upgrades plainly (a needed, overdue
  desk upgrade), not as a holy-grail/dream acquisition.
- **Vary cadence; avoid duplicative parallax.** Don't repeat a construction like
  "the same ___ I keep ___-ing" across nearby sentences, and watch for a word
  (e.g. "keep") recurring three times in a stretch. Mix sentence lengths — a
  clipped fragment next to a longer line reads better than two matched clauses.
- **Avoid "AI-vocab" tells.** Prior passes deliberately swapped flagged words
  (e.g. "crucially" → "mercifully"). Don't reintroduce generic LLM phrasing.

### AI-tell audit (run on every draft)

The "voice audit" step has teeth — these are the patterns that read as
machine-written by late-2026 standards. Hunt them and cut them:

- **Em-dash density.** The single biggest visual tell. Budget: at most one `—`
  per post, ideally zero. Convert to colons, commas, or periods. (Check the
  `excerpt`/`description` too — they show on the card.)
- **"Not X, it's Y" antithesis.** "The mod isn't vanity. It's insurance."
  Rewrite so the point lands without the balanced negation.
- **AI scaffolds.** "The honest version is that…", "The truth is simpler…",
  "Here's the thing:". Cut the frame, just say it.
- **Precision adverbs/adjectives** stacked for emphasis: "unshakeable,"
  "specific," "precise," "genuinely," "truly," "exactly." Trim them.
- **Tidy reveal-buttons.** "I was the problem." / "That's the whole point."
  Land the beat on something concrete or on the piece's actual thesis instead.
- **Balanced-negation pairs.** "all true, all beside the point"; "never once
  the moment I paid for it." Vary the sentence lengths so it isn't symmetrical.
- **Tacked-on quirky similes** and dated casual words ("unhinged," "feral,"
  "chef's kiss"). Prefer a drier, more specific image.
- **Parallel tricolons** where all three clauses share a shape. One is fine;
  three matched ones in a row is a tell. Break the pattern.

Not every symmetry is a tell — a real chiasmus or an earned punchline can stay.
The test: does it carry meaning, or is it just shape? Keep meaning, cut shape.

### Signature moves (things the author likes)

Weave these in where they land naturally — never force them, and don't let one
crowd a line (see the "is it too much" lesson: confession + *one* payoff beats a
pile-up).

- **Alliteration.** Reach for it when it doesn't feel strained.
- **Meta jokes & self-reference.** Jokes about the medium itself — the post
  noticing it's a post, the site referring to itself as "the log," a QA framing
  turned on the writing. (e.g. the homepage's "the rest is committed, so
  technically it's research.")
- **Easter eggs.** Small rewards for people who look closely. Existing ones:
  the `console.log` status panel + neon-flicker script on the homepage, the
  `>`-prompt SVG favicon, the terminal `PASS`/pending code block in
  `hello-world`. Add more in that spirit.
- **Numbers motif.** The author favors **13, 22, 23, 16** (list is not
  exhaustive — more may surface). Where a number is arbitrary anyway — a count,
  a version, a throwaway quantity, an Easter egg — prefer one of these. Don't
  bend facts to hit them; use them only where the value is free to choose.
  (Existing: "the one line feature i turned into **thirteen** scripts.")

## Pre-publish checklist (any post copy change)

Before flipping a post live or pushing a copy edit:

1. **Run the humanizer skill** over the changed post to strip AI-vocab tells and
   machine cadence.
2. **Run a voice audit** — read the result against the house rules above
   (snappy blurb, truthful framing, understated stakes, varied cadence). The
   humanizer and the audit are complementary: the skill catches word-level
   tells, the audit catches structure/framing the skill won't flag. Do both.
3. Rebuild (`npx @11ty/eleventy`) and confirm the post writes clean.
4. Then commit and push.

## Commit conventions

- Content commits are prefixed `post:` with a short imperative summary
  (e.g. `post: tighten keyboard blurb`).
- Keep commits scoped to the files you actually changed.
