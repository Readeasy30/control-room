# DIRECTIVES.md

Read this first at the start of every session. These are standing instructions. Do not re-litigate them.

## 1. Verify-First Rule

The live GitHub repository is the source of truth.

`STATUS.md`, memory, notes, and past chat summaries are only hints. They can be stale.

Before claiming anything is pending, missing, done, broken, or ready, verify the actual repo state first.

Use one of these methods:

* Run `/sync` in Claude Code.
* List the real repo file tree through GitHub MCP.
* Inspect the live GitHub repo directly.

Then compare the verified repo state against `STATUS.md`.

Trust the repo, not the note.

## 2. Session Startup Routine

Do this first every session:

1. Read `DIRECTIVES.md`.
2. Read `STATUS.md` if it exists.
3. Run `/sync`, list the repo file tree, or inspect the live repo directly.
4. Compare the real repo files against `STATUS.md`.
5. Report any mismatch before changing files.
6. Gerry names the task.
7. Claude works, edits, and commits.

Do not start work from memory alone.

## 3. End-of-Session Routine

Before ending a session:

1. Update `STATUS.md` from verified repo reality.
2. Record what changed.
3. Record what is confirmed present.
4. Record what is actually next.
5. Date each status item.

Use clear date notes, such as:

`Verified present 2026-06-14`

## 4. GitHub Account Facts

All active repos live under this GitHub account:

`Readeasy30`

Display name:

`Webmaster`

`Wholelychit` is a brand name and Windows username.

`Wholelychit` is not the GitHub account to use.

Never try to sign in as `Wholelychit`.

Old README paths that say:

`Wholelychit/...`

should be treated as old references and corrected to:

`Readeasy30/...`

Do not create another GitHub account.

## 5. Active Repo Reference

Primary repos:

* `control-room` — standing instructions and live status
* `webmasters` — marketing system, formerly marketing-system
* `spx-tastytrade-autotrader` — private SPX trading study tool
* `readeasy30.com` — reading website
* `matheasy30.com` — math website
* `petneeds.ai` — pet education website
* `ozarkwebmasters.com` — local web agency website
* `restaurantaibot.com` — restaurant AI bot website

## 6. Claude GitHub File Authority

Claude is authorized to manage files inside GitHub repositories owned by:

`Readeasy30`

Claude may:

* Read files and folders.
* List the full repo file tree.
* Open and inspect any needed file.
* Create new files and folders.
* Edit existing files.
* Rename files and folders when needed.
* Delete obsolete, duplicate, broken, unused, or replaced files.
* Commit file changes directly to GitHub.
* Update `STATUS.md` after work is verified.

Claude must not change files outside the current repo.

## 7. Required Work Order

Claude must use this order:

1. Verify the live repo first.
2. Read `DIRECTIVES.md`.
3. Read `STATUS.md`.
4. List or sync the real repo file tree.
5. Reconcile any drift.
6. Make the requested file changes.
7. Commit changes.
8. Update `STATUS.md`.
9. Report what was changed, added, renamed, or deleted.

Claude should not ask Gerry to manually create, edit, rename, or delete files unless GitHub MCP or direct commit access is not working.

## 8. Write Path

Primary write path:

GitHub MCP connected inside Claude Code.

The token should be stored once in config.

Do not re-paste the token every session.

Backup write path:

Fine-grained PAT plus direct commits through GitHub API.

Required PAT settings:

* Resource owner: `Readeasy30`
* Repository access: All repositories
* Contents: Read and write

Security rule:

Prefer MCP over pasting a PAT into chat.

If a token is ever pasted into chat, regenerate it.

## 9. Write Path to Skip

Do not use the GitHub Desktop sign-in routine.

It fails because it tries to reconcile a `Wholelychit` account that does not exist.

Skip GitHub Desktop sign-in entirely.

## 10. Website Rules

For website repos, use:

* Plain HTML
* Plain CSS
* Plain JavaScript
* GitHub repository source files
* Cloudflare Pages hosting

Do not switch to:

* React
* Vite
* Node
* npm
* Build tools
* Complicated routing

Do not redesign unless Gerry clearly asks.

Prefer full-file replacements for code changes unless the edit is tiny.

## 11. Gerry Navigation Rules

Gerry often lands in GitHub’s global search bar when asked to type a URL.

Do not rely on typed-URL instructions.

Use one of these instead:

* Tappable links
* Click-by-click menu steps
* Exact button names
* Exact file names
* Exact repo names
* Exact commit messages

Keep instructions short and direct.

## 12. Communication Rules

Use short, direct steps.

Do not ask many small questions.

Make the best reasonable assumption and continue.

Batch work.

Avoid repeating work.

Do not re-open settled account, repo, or workflow questions.

When giving manual GitHub instructions, always say exactly:

1. Which repo to open.
2. Which file to open.
3. What to paste.
4. What commit message to use.
5. What to verify after commit.

## 13. Deletion Rule

Claude may delete files only when they are clearly:

* Obsolete
* Duplicate
* Broken
* Unused
* Replaced by the correct file

Claude must report deleted files in the commit summary.

## 14. Safety Check Before Commit

Before committing, confirm:

1. The correct repo is open.
2. The correct files are being changed.
3. The change matches Gerry’s task.
4. The site remains plain HTML/CSS/JS unless Gerry clearly asked otherwise.
5. Nothing important was removed by accident.

## 15. Preferred Commit Message Format

Use this format:

`Update repo files: [short description]`

Examples:

`Update repo files: add Claude directives`

`Update repo files: fix lesson loader`

`Update repo files: clean duplicate video folder`

## 16. Core Rule

Before touching files:

Verify the repo first.

Then work.

The live GitHub repo is always the source of truth.


