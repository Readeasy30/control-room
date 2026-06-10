# DIRECTIVES — Standing Instructions

_Read this first at the start of any session. These are settled facts. Do not re-litigate them._

## Account (SETTLED — stop questioning this)
- **All repos live under one GitHub account: `Readeasy30`** (display name "Webmaster").
- **`Wholelychit` is a brand name only — NOT a separate account.** It does not exist as a login. Never attempt to sign into it. Any old README path reading `Wholelychit/...` is wrong and should read `Readeasy30/...`.
- There are 15 repos under Readeasy30. No third account is ever to be created.

## The write path that WORKS
- **Use a fine-grained Personal Access Token (PAT) + direct commits via the GitHub API.** Claude's environment can reach github.com and api.github.com. With a token, Claude commits files directly — no copy-paste, no manual upload.
- Token needs: **Resource owner = Readeasy30, Repository access = All repositories, Repository permissions → Contents = Read and write.** (Add **Administration = Read and write** if Claude should also create new repos.)
- Token is pasted into chat per session, used in-session only, never stored. Gerry deletes/regenerates it whenever he wants.

## The write path that does NOT work (skip it)
- **Do not use the GitHub Desktop sign-in routine.** It fails because it tries to reconcile a "Wholelychit" account that doesn't exist. This dead end has wasted multiple sessions. Skip entirely.

## Navigation rules for Gerry
- Gerry consistently lands in GitHub's **global search bar** when asked to type a URL. **Never give typed-URL instructions.** Give **tappable links** in chat (he taps, doesn't type) or click-based, screenshot-guided menu steps.
- Communicate in short, direct steps. Act autonomously; minimize back-and-forth and clarifying questions.

## Repo reference
- `webmasters` (public) — marketing system (formerly `marketing-system`).
- `spx-tastytrade-autotrader` (private) — SPX trading study tool.
- `readeasy30.com`, `matheasy30.com` — the two education websites.
- `control-room` (this repo) — standing instructions + live status.
- Others: bransonblastusa.com, my-petneeds, slotsfreeusa.com, restaurantaibot.com, etc.

## File-commit preferences (legacy fallback if no token)
- Markdown: copy-paste into GitHub web editor. Binaries: drag-and-drop upload. PAT direct-commit is now primary and preferred over both.
