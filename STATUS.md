# STATUS.md

Last updated: 2026-06-14 by ChatGPT from Gerry’s supplied Claude session log.

## Master Rule

GitHub repo files are the source of truth.

This `STATUS.md` file is only a working note. It may be stale.

Before doing work, Claude must verify the real repo files before saying anything is done, missing, broken, or pending.

---

# Current Active Status

## ReadEasy30

Domain: `readeasy30.com`

Stack:

* Plain HTML
* Plain CSS
* Plain JavaScript
* GitHub
* Cloudflare Pages

Verified 2026-06-12 by Claude:

* App uses dropdown-driven `app.html`.
* Site does not use per-day lesson HTML pages.
* Earlier note saying `day-01` through `day-30` lesson pages were missing was wrong.
* Real issue was `app.js` was not using the staged 240-day lesson data.
* Staged lesson data is complete: 8 level files, 240 unique lessons, no day gaps.
* `app.html` was updated to load all 8 lesson files plus `lesson-loader-240.js`.
* `app.js` was updated to build lessons from `window.READEASY_NEXT_PATH_LESSONS`.
* Fallback lesson generator remains in place.
* Simulated load confirmed days 1, 120, and 240 render correctly.
* Result: 240 unique reading stories now load instead of repeating a small template set.

Files changed 2026-06-12:

* `readeasy30.com/app.js`
* `readeasy30.com/app.html`

Current open item:

* Gerry must verify whether these files were committed and pushed.

---

## MathEasy30

Domain: `matheasy30.com`

Stack:

* Plain HTML
* Plain CSS
* Plain JavaScript
* GitHub
* Cloudflare Pages

Verified 2026-06-12 by Claude:

* App uses dropdown-driven `app.html`.
* Site does not use per-day lesson HTML pages.
* Earlier note saying `day-01` through `day-30` lesson pages were missing was wrong.
* Real issue was `app.js` was ignoring the staged 240-day lesson data.
* All 9 staging tags were already present in `app.html`.
* All 8 level files total 240 days with no gaps.
* `app.js` now builds `lessonPlan` from `window.MATHEASY_NEXT_PATH_LESSONS`.
* Embedded 30-day lesson array remains as fallback.
* `app.html` app.js cache-buster was bumped to `20260612-staged1`.
* Simulated load confirmed dropdown lists days 1–240.
* Days 1, 120, and 240 render correctly.

Files changed 2026-06-12:

* `matheasy30.com/app.js`
* `matheasy30.com/app.html`

Current open item:

* Gerry must verify whether these files were committed and pushed.

---

## Restaurant AI Bot / Webmasters Repo

Verified 2026-06-11 by Claude.

Completed:

* Fixed spelling from `RESTURANTS-AI` to `RESTAURANTS-AI`.
* Merged misspelled `ResturantsAI/` folder into `RestaurantAI/`.
* Corrected `resturant` to `restaurant` repo-wide.
* Verified zero `restur` strings remain.
* Repointed Restaurant AI branding/domain references to `restaurantaibot.com`.
* Removed old Restaurant(s).ai references.
* Confirmed against actual public website repo.
* Pushed to main.

Commits:

* `fb2ba71` — spelling cleanup
* `d13356f` — domain repoint

Current open item:

* Confirm webmasters repo still points to latest main commit.

---

## Webmasters Video System

Verified 2026-06-10 by Claude.

Current reality:

* `make_shorts.py` exists in root.
* `PROJECT-STATUS.md` exists in root.
* `video-system/` lowercase contains the real active video files.
* `VIDEO-SYSTEM/` uppercase contains only `EDUCATION-YOUTUBE-UPLOAD-METADATA.md`.
* Broken file `make shorts py` is not present.
* No duplicate/mislabeled Python script found.

Completed 2026-06-10:

* Added `video-system/PUBLISHING-SCHEDULE.md`.
* Added `outreach-tracker.xlsx`.
* Tracker includes Summary, Tracker, Daily Send Log, Opt-Out Registry, and hidden Lists.
* Tracker has 199 formulas and zero formula errors.

Current open item:

* Choose one canonical folder.
* Recommended canonical folder: `video-system/` lowercase.
* Consolidate or delete near-empty `VIDEO-SYSTEM/` uppercase folder after verification.

---

## SPX Tastytrade Autotrader

Repo: `spx-tastytrade-autotrader`

Status:

* Code-complete.
* Read-only monitor.
* Places no orders.
* Needs local `.env` before live run.

Completed 2026-06-10 by Claude:

* Rewrote `spx_position_monitor.py` for real tastytrade 12.4.1 API.
* Uses OAuth fields:

  * `TT_SECRET`
  * `TT_REFRESH`
* Updated `.env.example`.
* Removed stray `.env` that was a mislabeled script copy.
* No credential leak found.
* Added setup guide at `docs/OAUTH-SETUP.md`.

Blocked on Gerry:

* Create local `.env` from `.env.example`.
* Add real tastytrade OAuth values.
* Run:

```bash
python spx_position_monitor.py
```

---

## Claude SEO Agent Worker

Status:

* Built but not deployed.

Built features:

* React SPA
* Claude API search-intent analysis
* Google Custom Search
* KV caching
* Rate limiting
* PDF export
* CSV export
* Recharts

Blocked:

* Needs deployment by Cloudflare dashboard Edit Code or Wrangler.
* Needs secrets set before `/analyze` works:

  * `CLAUDE_API_KEY`
  * `GOOGLE_JSON`

---

## Website Audit Notes

Verified 2026-06-10 by Claude:

### ReadEasy30

* Audited clean.
* 46 pages checked.
* No broken links found.

### MathEasy30

* 4 broken links fixed.
* Created:

  * `division-practice.html`
  * `number-sense-practice.html`
* Fixed `404.html` stylesheet path.
* Confirmed plain HTML/CSS/JS.
* No build tools.

Important correction:

* Do not build `day-01` through `day-30` HTML pages unless Gerry specifically asks.
* Both education sites use dropdown-driven `app.html`.

---

# Current Next Actions

1. Verify whether the 2026-06-12 ReadEasy30 and MathEasy30 app file changes were committed and pushed.
2. If not committed, commit these files:

   * `readeasy30.com/app.js`
   * `readeasy30.com/app.html`
   * `matheasy30.com/app.js`
   * `matheasy30.com/app.html`
3. Confirm live ReadEasy30 loads 240 lessons.
4. Confirm live MathEasy30 loads 240 lessons.
5. Consolidate webmasters video folders using lowercase `video-system/` as canonical.
6. Fix README paths from `Wholelychit/` to `Readeasy30/` where still needed.
7. Run SPX tastytrade monitor locally after Gerry adds `.env`.
8. Deploy Claude SEO Agent Worker after secrets are added.

---

# Do Not Do

* Do not rebuild per-day lesson HTML pages unless Gerry clearly asks.
* Do not switch any site to React, Vite, Node, npm, or build tools.
* Do not redesign ReadEasy30 or MathEasy30.
* Do not trust this status file without checking the repo.
* Do not claim pending/done/missing until the actual GitHub repo is verified.


