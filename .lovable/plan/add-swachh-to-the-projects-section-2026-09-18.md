# Add SWACHH to the Projects Section

## Problem
The `/projects/swachh` detail page exists and works, but nothing links to it: the Projects section on the home page has no SWACHH card, so there is no way to reach the page by browsing.

## Change
- Add a SWACHH entry to the Projects showcase list in `src/content/portfolio.ts`, placed after the existing RADIAX entry, matching the card system already used by RADIAX / Line Follower / Pathfinder:
  - Title: `SWACHH: Smart Waste Autonomous Collector and Handler`
  - Metadata line: `Team DRISHTI | Technical Member`
  - Description: reuse the supplied Project Overview wording from the SWACHH detail page, exactly as written (no new content).
  - Link: `Know More →` to `/projects/swachh` (same behavior as the RADIAX card).
  - No technical tags and no badge until the user supplies them.
- Widen the `href` type on the showcase project type from `"/projects/radiax"` to `"/projects/radiax" | "/projects/swachh"` so the card navigates to the SWACHH page.
- Do not modify any other project card, section, or the SWACHH detail page itself.

## Verification
- Playwright the running preview at desktop and mobile widths: SWACHH card renders after RADIAX, title wraps without overflow, `Know More →` navigates to `/projects/swachh`, no console errors, other cards unchanged.
