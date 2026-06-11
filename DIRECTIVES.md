# DIRECTIVES — Standing Instructions

_Read this first at the start of any session. These are settled facts. Do not re-litigate them._

## Verify-first rule (the most important one)

The repo is the source of truth. STATUS.md and memory are only hints, and they go stale. Before claiming anything is pending, missing, or done — or starting any work — check the actual repo state, don't trust the note. Most "we already did this" days come from acting on a stale summary instead of the live repo. Run /sync (or list the real file tree) FIRST, reconcile against STATUS.md, then work.

## Session startup routine (do this first, every time)

1. Orient: read DIRECTIVES.md + STATUS.md (this repo).
2. VERIFY before doing: run /sync in Claude Code (or list the real file tree of each active repo via the GitHub MCP) and reconcile against STATUS.md. Trust the repo, not the note. Report any drift before touching anything.
3. Gerry names the task; Claude works and commits.

## End-of-session routine

- Update STATUS.md from verified reality: what changed, what's confirmed present, what's actually next. Date each item (e.g. "verified present 2026-06-10").

## The write path that WORKS

- Primary: GitHub MCP connected inside Claude Code. Token stored once in config, not re-pasted each session.
- Also works: fine-grained PAT + direct commits via the GitHub API.
- Token scope: Resource owner = Readeasy30, Repository access = All repositories, Contents = Read and write.
- Security: prefer the MCP over pasting a PAT into chat. If a token lands in chat, regenerate it.

## The write path that does NOT work (skip it)

- Do not use the GitHub Desktop sign-in routine. It fails trying to reconcile a "Wholelychit" account that doesn't exist. Skip entirely.

## Account (SETTLED — stop questioning this)

- All repos live under one GitHub account: Readeasy30 (display name "Webmaster").
- Wholelychit is a brand name AND the Windows username — NOT a GitHub account. Never try to sign into it. Old README paths reading Wholelychit/... should read Readeasy30/...
- 15 repos under Readeasy30. No third account is ever to be created.

## Navigation rules for Gerry

- Gerry consistently lands in GitHub's global search bar when asked to type a URL. Never give typed-URL instructions. Give tappable links or click-based menu steps.
- Communicate in short, direct steps. Act autonomously; minimize back-and-forth.

## Repo reference

- webmasters (public) — marketing system (formerly marketing-system).
- spx-tastytrade-autotrader (private) — SPX trading study tool.
- readeasy30.com, matheasy30.com — the two education websites.
- control-room (this repo) — standing instructions + live status.

## File-commit preferences (legacy fallback)

- Markdown: web editor copy-paste. Binaries: drag-and-drop. MCP/PAT direct-commit is now primary.
Paste that into the DIRECTIVES.md editor (Ctrl+A to clear f
