# AAR Project Detail Page

## Goal
Add a dedicated `/projects/aar` page for “AAR: Autonomous Agricultural Robot for Precision Farming” using the existing RADIAX and SWACH visual system and the supplied AAR model.

## Page content
- Header with the exact title and `TEAM DRISHTI | TEAM LEAD`.
- Project Overview using the supplied paragraph exactly.
- `CAD MODEL` section using the uploaded `AAR.glb` in the existing interactive viewer, including Solid/Wireframe/Transparent modes, rotate, zoom, pan, reset, fullscreen, instructions, and `Loading CAD Model...`.
- Technical Implementation in the existing compact bordered two-column layout, with only the supplied Mechanical System, Electronics & Instrumentation, Autonomous System, and Engineering Analysis content.
- My Contributions in the existing two-column diamond-bullet treatment, preserving all eight supplied statements.
- Achievement section with exactly the two supplied GUJCOST Robofest 5.0 achievements and superscript ordinal formatting.
- Compact clickable GUJCOST certificate preview using the real certificate when supplied. Until then, show a clearly inactive pending state without creating substitute artwork.
- Technical Documentation with separate Round 1 and Round 2 controls linked to the supplied Drive files.

## Portfolio access
- Add an AAR project card using the exact title, team line, supplied overview, GUJCOST Proposal badge, and a `Know more` link to `/projects/aar`.
- Leave all existing project cards and sections unchanged.

## Technical details
- Store the uploaded GLB through the project asset flow and reference its CDN URL.
- Add route-specific title, description, Open Graph text, `og:type`, and `twitter:card` metadata.
- Reuse existing design tokens and viewer behavior; add a small page-local certificate lightbox with Escape and close controls.
- Verify desktop and mobile layouts, long-title wrapping, model rendering, document links, achievement hierarchy, certificate pending state, overflow, and browser errors.
