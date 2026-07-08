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
- `assets/blog.css` — blog feature stylesheet (layout, cards, article typography, inline expand,
  terminal hero). Builds on CSS custom properties from `site.css`; link `site.css` first.
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
| `ogtitle` | yes | Convention: `"<title> · snackdriven.com"`. Middot separator, never a dash. |
| `hidden` | optional | `true` = drafted/withheld from the listing. Omitting it (or `false`) = live. |
| `badge` | optional | Small pill in the meta row (e.g. `placeholder`). Rare. |
| `blogcss` | optional | `true` = link `blog.css` in `<head>`. Set for all posts via `posts.json`; also set on `index.njk`. |

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
  - `&ndash;` en dash (ranges only). Never `&mdash;`/em dash; see the AI-tell audit.
  - `&larr;` etc. for arrows
  - Match the surrounding text — existing posts are fully entity-encoded.
- Known CSS hooks (don't invent new ones casually):
  - **Layout/index:** `.wrap`, `.wrap.reading`, `.page-label`, `.page-title`, `.page-intro`, `.posts`
  - **Terminal hero:** `.prompt-title`, `.prompt-title .host`, `.prompt-title .pmt`, `.prompt-title .cmd`, `.prompt-title .cursor`
  - **Post cards:** `.post-card`, `.post-row`, `.post-row-title-row`, `.post-toggle`
  - **Inline expand:** `.post-body-wrap`, `.post-body-inner`
  - **Article:** `.single-post`, `.post-meta`, `.post-title`, `.neon`, `.tag`, `.badge`, `.lead`, `.backlink`
  - **Code snippet spans** inside `<pre><code>`: `.c` = comment/muted, `.g` = green/pass, `.m` = magenta/pending

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

- **No em-dashes. Zero.** The single biggest visual tell. Not one `—` anywhere
  in prose (body, `excerpt`, `description`, lead). Convert to colons, commas, or
  periods. Titles use a middot separator (`Title · snackdriven.com`), never a
  dash. Check the `excerpt`/`description` too; they show on the card.
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

### Anchor voice (the bracket-README DNA)

The truest calibration is the author's own shipped public writing, not an abstract
rulebook. When a draft passes the AI-tell audit but still reads like nobody, check it
against these moves, distilled from her repo READMEs (`snackdriven/`: `disney-bracket`,
`bad-movie-bracket`, `qa-brain`, `qa-toolkit`, `riff-tracks`, `portfolio`) and the
published bracket post. **The test for any line: could it sit in the disney-bracket or
qa-brain README without sticking out? If not, cut or rewrite.**

- **Flavor the framing, not every line.** The bite goes in the title, the opening, and
  the closing aside. The body stays dry and functional. A crafted button on *every*
  paragraph is the actual anti-pattern: over-salting kills it as fast as no voice at all.
  This is the single most load-bearing rule, and the easiest to violate while feeling clever.
- **Land a flat closing kicker.** Every post ends on one flat, unsignposted line: the
  identity bite ("I find bugs for money and introduce them for fun. The brackets are the
  second part.") or the license-footer bite ("MIT. These movies had no quality control.
  Neither do you."). One kicker, not a pile-up. Don't trail off on a summary.
- **Specific weird detail over abstract.** "Toy Story 2 was almost deleted by accident."
  "The Fanatic made $3,153 opening weekend." Reach for the concrete oddity, not the
  general claim.
- **Flat punchline after the setup, no signposting.** "I'm sorry. There was no other way
  to build this." Set it up straight, land it flat, move on. No "and the kicker is..."
- **Wry confessional aside, in passing.** "It happens to everyone. You will be okay.
  Probably." Self-deprecating, never a paragraph about the feeling.
- **Match the POV to whose experience it is.** Second person for a reader-experience
  piece (the brackets are about *you* picking movies: "you're going to have to put Beauty
  and the Beast against The Emperor's New Groove"). First person for a build/debug saga
  (it's about *her* doing the work: "then I got greedy"). Don't force one over the other.

The internal work-vault carries the fuller version (`kayla-voice-cadence.md` + `voice/anchors.md`),
which is tuned for terse Jira/Slack. This section is the blog-register subset; the two agree
on the DNA (bite in the framing, dry body, flat kicker, specific detail, zero em-dashes).

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
  the `console.log` status panel on the homepage (styled status panel, post count, "pending" line),
  the neon-flicker on `.prompt-title .host span` letters (random single/run/cascade, respects
  `prefers-reduced-motion`), the `>`-prompt SVG favicon, the terminal `PASS`/pending code block in
  `hello-world`. Add more in that spirit. Note: the inline expand feature (`.post-card` →
  `.post-body-wrap` height animation on `.post-row` click) is UX, not an Easter egg — don't remove it.
- **Numbers motif.** The author favors **13, 22, 23, 16** (list is not
  exhaustive — more may surface). Where a number is arbitrary anyway — a count,
  a version, a throwaway quantity, an Easter egg — prefer one of these. Don't
  bend facts to hit them; use them only where the value is free to choose.
  (Existing: "the one line feature i turned into **thirteen** scripts.")

## Pre-publish checklist (any post copy change)

Before flipping a post live or pushing a copy edit:

1. **Run the humanizer skill** over the changed post to strip AI-vocab tells and
   machine cadence.
2. **Run a voice audit** — read the result against the house rules AND the **Anchor
   voice** section above (framing-not-every-line, a flat closing kicker, specific-weird-
   detail). The test for any line: could it sit in the disney-bracket or qa-brain README
   without sticking out? The humanizer catches word-level tells; the audit catches the
   structure/framing it won't flag. Do both.
3. Rebuild (`npx @11ty/eleventy`) and confirm the post writes clean.
4. Then commit and push.

## Commit conventions

- Content commits are prefixed `post:` with a short imperative summary
  (e.g. `post: tighten keyboard blurb`).
- Keep commits scoped to the files you actually changed.
