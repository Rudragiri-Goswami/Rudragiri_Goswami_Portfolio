# Rudragiri Goswami Portfolio

## Goal
Build a minimal, single-page engineering portfolio inspired by the reference site’s structure while using the selected **Editorial blueprint** direction and only content verified in the attached résumé.

## Page structure
- Sticky compact navigation with links to work, experience, skills, achievements, and contact.
- Strong first screen introducing Rudragiri Goswami as a mechanical engineering student, robotics leader, and GATE-qualified candidate.
- Key figures for 9.18 CGPA, four projects, and three leadership roles.
- Internship section for the India Space Academy astronomy and astrophysics work.
- Four project entries with exact titles, dates, organizations, tools, and résumé-backed outcomes.
- Leadership section covering Mindbend, DRISHTI Robotics Club, and the BIS Club.
- Education, achievements, and skill groups presented in compact editorial rows.
- Contact area with the résumé email and LinkedIn only; the phone number will remain private.
- View/download résumé action using the attached PDF.

## Visual direction
- Preserve the selected graphite-black editorial layout, orange-red accent, Archivo headings, IBM Plex Mono labels, sharp separators, and restrained pill-shaped actions.
- No portrait, photo placeholder, 3D scene, glow effects, or decorative clutter.
- Use subtle entrance and interaction motion, with reduced-motion support.
- Keep the desktop composition faithful to the selected direction while adapting navigation, grids, text, and actions cleanly for mobile.

## Content safeguards
- Replace all invented prototype copy with facts from the supplied résumé.
- Do not invent project links, GitHub links, availability claims, technologies, awards, or biography details.
- Use the résumé’s actual email and LinkedIn URL.
- Preserve the résumé’s dates, rankings, measurements, and project scope accurately.

## Technical details
- Implement the page at `/` in the existing TanStack Start app.
- Add semantic design tokens and font definitions to the existing Tailwind v4 stylesheet.
- Add page-specific title, description, Open Graph, and Twitter metadata.
- Store the uploaded résumé through the project asset flow and connect all résumé actions to it.
- Use accessible landmarks, one H1, descriptive link labels, visible focus states, and semantic lists/timelines.
- Validate the finished page in the running preview at desktop and mobile sizes, checking navigation, PDF access, text wrapping, spacing, and browser errors.
