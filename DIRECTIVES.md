Paste this into DIRECTIVES.md. Use Ctrl+A to clear the old text first.

DIRECTIVES — Standing Instructions

Read this first at the start of every session. These are settled facts. Do not re-litigate them.

1. Verify-First Rule

The repo is the source of truth.

STATUS.md, memory, notes, and past summaries are only hints. They can go stale.

Before claiming anything is pending, missing, done, broken, or ready — check the actual repo state first.

Always verify by doing one of these:

Run /sync in Claude Code
Or list the real file tree through GitHub MCP
Or inspect the live repo directly

Then reconcile the repo against STATUS.md.

Trust the repo, not the note.

Most wasted days happen because stale summaries are treated as fact.

2. Session Startup Routine

Do this first every time:

Read DIRECTIVES.md.
Read STATUS.md.
Run /sync in Claude Code, or list the real repo file tree through GitHub MCP.
Compare verified repo state against STATUS.md.
Report any drift before changing files.
Gerry names the task.
Claude works, edits, and commits.

Do not start work from memory alone.

3. End-of-Session Routine

Before ending a session:

Update STATUS.md from verified reality.
Record what changed.
Record what is confirmed present.
Record what is actually next.
Date each status item.

Use clear date notes, such as:

verified present 2026-06-10

4. GitHub Account Facts

All repos live under one GitHub account:

Readeasy30

Display name:

Webmaster

Wholelychit is a brand name and the Windows username.

Wholelychit is not a GitHub account.

Never try to sign in as Wholelychit.

Old README paths that say:

Wholelychit/...

should be treated as old references and corrected to:

Readeasy30/...

There are 15 repos under Readeasy30.

Do not create a third GitHub account.

5. Working Write Path

Primary write path:

GitHub MCP connected inside Claude Code

The token should be stored once in config.

Do not re-paste the token every session.

Backup write path:

Fine-grained PAT + direct commits through GitHub API

Token settings:

Resource owner: Readeasy30
Repository access: All repositories
Contents: Read and write

Security rule:

Prefer MCP over pasting a PAT into chat.

If a token is ever pasted into chat, regenerate it.

6. Write Path to Skip

Do not use the GitHub Desktop sign-in routine.

It fails because it tries to reconcile a Wholelychit account that does not exist.

Skip GitHub Desktop sign-in entirely.

7. Gerry Navigation Rules

Gerry often lands in GitHub’s global search bar when asked to type a URL.

Do not give typed-URL instructions.

Use one of these instead:

Tappable links
Click-by-click menu steps
Exact button names
Exact file names

Keep instructions short and direct.

Act autonomously.

Minimize back-and-forth.

8. Active Repo Reference

Primary repos:

control-room — standing instructions and live status
webmasters — marketing system, formerly marketing-system
spx-tastytrade-autotrader — private SPX trading study tool
readeasy30.com — reading website
matheasy30.com — math website
9. File Commit Preferences

Primary method:

Use MCP or PAT direct commit.

Legacy fallback:

Markdown files: GitHub web editor copy-paste
Binary files: drag-and-drop upload

When giving manual GitHub instructions, say exactly:

Which repo to open
Which file to open
What to paste
What commit message to use
What to verify after commit
10. Communication Rules

Use short, direct steps.

Do not ask many small questions.

Make the best reasonable assumption and continue.

Batch work.

Avoid repeating work.

Do not redesign unless Gerry asks.

Do not re-open settled account, repo, or workflow questions.

11. Core Rule

Before touching files:

Verify the repo first. Then work.
Claude GitHub File Authority

Claude is authorized to manage files inside GitHub repositories owned by:

Readeasy30

This includes the GitHub repo directory/file tree.

Claude may:

Read files and folders.
List the full repo file tree.
Open and inspect any needed file.
Create new files and folders.
Edit existing files.
Rename files and folders when needed.
Delete obsolete, duplicate, broken, or unnecessary files.
Commit file changes directly to GitHub.
Update STATUS.md after the work is verified.

Claude must use this order:

Verify the live repo first.
Read DIRECTIVES.md.
Read STATUS.md.
List or sync the real repo file tree.
Reconcile any drift.
Make the requested file changes.
Commit changes.
Report what was changed, added, or deleted.

Claude should not ask Gerry to manually create, edit, or delete files unless GitHub MCP/direct commit access is not working.

Claude should not use stale memory as proof.

The live GitHub repo is always the source of truth.

Deletion rule:

Claude may delete files when they are clearly obsolete, duplicate, broken, unused, or replaced by the correct file. Claude should report deleted files in the commit summary.

Preferred commit message format:

Update repo files: [short description]
