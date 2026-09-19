# RADIAX Project Page with Interactive 3D CAD Viewer

## Goal
Add a dedicated RADIAX project detail page that feels exactly like another project in the existing portfolio — same dark theme, orange accent, typography, thin borders, and section hierarchy as the Line Follower project view. No redesign of anything existing.

## Where it lives
- New route `/projects/radiax` — a full page (shareable link, room for the 3D viewer) styled to match the existing case-study layout: bordered panel, same header structure, same section labels.
- Header: large title **RADIAX**, small orange metadata `GUJCOST PROPOSAL · CONCEPTUAL DESIGN`, and a back/close control matching the existing project view, returning to the Projects section.
- A RADIAX card is added to the Projects grid (alongside Line Follower and Pathfinder) with the same card design; its "Know More" opens this page.
- Page gets its own title/description/og metadata.

## Page sections (exact wording from your spec)
1. **Project overview** — the two-paragraph RADIAX description (compact AGV for radiopharmaceutical handling, two design iterations, shared electronics/navigation architecture).
2. **3D CAD model** — the visual highlight (details below).
3. **Design iterations** — intro sentence, then two equal cards side-by-side on desktop, stacked on mobile:
   - *Iteration 01 — Initial Concept* (label MECHANICAL DESIGN): screw-actuated lifting, two-finger gripper, mecanum-wheel platform + your iteration images (compact, click-to-enlarge).
   - *Iteration 02 — Finalised Concept* (label MECHANICAL DESIGN): scissor lift with lead screw, rack-and-pinion parallel gripper, compliant pads, extension rods + counterweight, mecanum platform + your images (compact, click-to-enlarge).
4. **Common system architecture** — below both iteration columns; subheading "Electronics & Navigation" with the 10-item technical list (Raspberry Pi 4, Arduino Mega 2560, ESP32, RPLIDAR C1, GPS NEO-M8N + IMU, camera, DC gear motors/drivers, LiPo + LM2596, ROS 2, kill switch). Not duplicated under the iterations.
5. **My contributions** — the four bullets in the same two-column bullet layout as the Line Follower page.
6. **Documentation** — one button styled like the existing one: `TECHNICAL DOCUMENTATION ↗`, wired to whatever link you provide.
- No Achievements / Competition / Certificate section.

## The 3D CAD viewer
- Uses the **actual GLB you upload** — never a substituted or generated model. Until you upload it, the viewer area shows a clean "3D model coming soon" state, not a black box.
- While the GLB loads: shimmer-style loading state with "Loading 3D Model…" (no black empty area); on failure, a clean "Model unavailable" state.
- Controls, kept minimal per your spec:
  - Drag to rotate, scroll/pinch to zoom, right-drag to pan (mouse + touch).
  - Reset view and fullscreen buttons.
  - Per your earlier request, one discreet **Solid / Wireframe / Transparent** display-mode toggle — say the word if you'd rather drop it.
- Small instruction line under the viewer: `Drag to rotate · Scroll to zoom · Right-click to pan`.
- Reasonable fixed height (roughly 480–560px desktop, smaller on mobile) inside a bordered frame matching the site's thin borders; never full-window.
- Orange accent only on interactive controls; dark scene background matching the page; respects reduced-motion; no page horizontal scroll.

## Content safeguards
- Wording never implies RADIAX was built, deployed, or implemented — it stays a conceptual/proposed GUJCOST design.
- No invented hardware, claims, dates, or achievements. Iteration images, the GLB, and the documentation link come from you.

## Technical details
- Install `three`, `@react-three/fiber@^9`, `@react-three/drei@^10`, `@types/three`.
- New `src/components/portfolio/CadViewer.tsx` — client-only (Canvas never renders server-side; page section mounts it behind a client gate), GLB served as a CDN asset via lovable-assets, wrapped in Suspense for the loading state, performance capped for phones.
- New `src/routes/projects.radiax.tsx` (route `/projects/radiax`) with its own `head()` metadata; RADIAX entry added to the showcase data in `src/content/portfolio.ts`; card rendered by the existing Projects section.
- Images use the existing LoadingImage + click-to-enlarge lightbox behaviour.
- Verified in the running preview with Playwright: page renders, all six sections present with exact wording, viewer states correct, iterations stack on mobile, back navigation works, no console errors.
