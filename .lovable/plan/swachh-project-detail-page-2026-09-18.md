# SWACHH Project Detail Page

## Goal
Add a dedicated `/projects/swachh` page that matches the existing RADIAX page without changing other project pages or portfolio sections.

## Page structure
- Header: full SWACHH title and `TEAM DRISHTI | TECHNICAL MEMBER`.
- Project Overview: use the supplied paragraph exactly.
- CAD MODEL: reuse the existing interactive viewer with rotate, zoom, pan, reset, fullscreen, instruction text, and the exact `Loading CAD Model...` state.
- Technical Implementation: compact bordered two-column layout on desktop, stacked on mobile, containing only the supplied Hardware, Mechanisms, Waste Detection & Segregation, Autonomous Navigation, Power System, and Software & Development content.
- My Contributions: reuse the RADIAX two-column bullet treatment and supplied wording exactly.
- Technical Documentation: `DOCUMENT ↗` control styled like RADIAX.

## Asset handling
- Use only the actual SWACHH GLB and PDF/link when supplied.
- Until those files are available, show the viewer's clean coming-soon state and a non-active documentation control rather than substituting content.
- Do not add CAD images, a gallery, achievements, certificates, or unsupported implementation claims.

## Technical details
- Create `src/routes/projects.swachh.tsx` with route-specific title, description, Open Graph text, `og:type`, and `twitter:card` metadata.
- Add optional viewer labels so SWACHH can display `Loading CAD Model...` while RADIAX retains its current wording and behavior.
- Verify the page in the running preview at desktop and mobile widths, including title wrapping, technical-section stacking, overflow, and console errors.
