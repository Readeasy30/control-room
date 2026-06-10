# STATUS — Live Session Log

_Last updated: 2026-06-10 by Claude. Update this at the end of every session._

## Verified state as of 2026-06-10

### webmasters repo (the big one)
Most "pending" video files were already committed last session — they just landed in the **lowercase `video-system/`** folder, which is why earlier notes thought they were missing. Current reality:
- `make_shorts.py` — PRESENT in root ✓
- `PROJECT-STATUS.md` — PRESENT in root ✓
- `video-system/` (lowercase) contains: EDUCATION-YOUTUBE-SHORTS-BATCH-01.md, VIDEO-GENERATION-REPAIR-NOTES.md, EDUCATION-YOUTUBE-UPLOAD-METADATA.md, EDUCATION-CANVA-DESIGN-BRIEF.md ✓
- `VIDEO-SYSTEM/` (uppercase) contains only EDUCATION-YOUTUBE-UPLOAD-METADATA.md
- The stray broken-name file `make shorts py` (no extension) — NOT present (already clean) ✓
- No duplicate/mislabeled Python script found ✓

**Genuinely still missing (2 items):**
1. `PUBLISHING-SCHEDULE.md` (education version — Mon/Wed/Fri, 3x/week across YouTube Shorts, TikTok, Instagram Reels, Facebook Reels). Only a RESTURANTS-AI publishing schedule exists.
2. `outreach-tracker.xlsx` (multi-sheet: 14-col tracker w/ dropdowns, Daily Send Log 5/day cap, Opt-Out Registry, auto-counting Summary, hidden Lists). Only a CSV exists in CAMPAIGNS/.

**Cleanup decision needed:** two parallel video folders (`VIDEO-SYSTEM` vs `video-system`) plus some root duplicates. Pick ONE canonical folder and consolidate.

> NOTE: content for the 2 missing files was generated in past sessions but is gone from Claude's disk (resets each session). Both must be regenerated from spec before committing.

### spx-tastytrade-autotrader (private)
- 4 files committed and done: spx_position_monitor.py, .gitignore, .env.example, requirements.txt.
- Built against tastytrade SDK v12.4.1 (OAuth via provider_secret/refresh_token).
- **Blocked on Gerry:** supply OAuth creds TT_SECRET and TT_REFRESH from tastytrade developer settings. Read-only monitor; places no orders.

### Websites
- readeasy30.com — audited clean (46 pages, no broken links).
- matheasy30.com — 4 broken links fixed (created division-practice.html, number-sense-practice.html; fixed 404.html stylesheet path). Plain HTML/CSS/JS, no build tools.
- **Both sites:** day-01 through day-30 lesson pages are linked but DO NOT EXIST. Flagged for repair.

### claude-seo-agent (Cloudflare Worker)
- Built: React SPA + Claude API search-intent analysis, Google Custom Search, KV caching, rate limiting, PDF/CSV export, Recharts.
- **Not deployed.** Needs dashboard "Edit Code" or `wrangler deploy`. Secrets CLAUDE_API_KEY and GOOGLE_JSON must be set before /analyze works.

## Suggested next actions
1. Regenerate + commit PUBLISHING-SCHEDULE.md and outreach-tracker.xlsx to webmasters.
2. Decide canonical video folder, consolidate, delete the duplicate.
3. Fix README paths (Wholelychit/ -> Readeasy30/).
4. Build day-01..30 lesson pages for both education sites.
