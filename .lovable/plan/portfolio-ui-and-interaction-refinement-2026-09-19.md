# Portfolio UI and interaction refinement

## Scope
Refine the existing portfolio without changing its dark editorial design, typography, orange accent, project assets, technical content, or existing interactions beyond the requested layout changes.

## Implementation

### Hero and About
- Rebuild the hero content as one left-aligned vertical stack: name, tagline, academic line, then the existing Explore My Work control.
- Keep the current smooth scroll destination and restrained responsive name sizing.
- Render the About heading as two left-aligned lines, with white “About” above orange “Me”; leave both body paragraphs untouched.

### Full-screen detail experiences
- Convert the existing Robotics case-study panel, Research/Internship detail panel, and Coursework detail panel from right-side drawers into full-viewport dark overlays.
- Use full-width headers, constrained readable content columns, independently scrollable detail content, Escape/Close support, background scroll locking, and scroll-position preservation.
- Preserve nested image, graph, and document lightboxes and their current controls.
- Keep RADIAX, SWACH, and AAR as their existing dedicated full-page project views because they already occupy the complete viewport rather than opening a drawer.

### Shared 3D CAD states
- Upgrade the shared CAD viewer so every GLB instance displays a centered orange technical loading message and subtle animated indicator until the model is ready.
- Move model readiness reporting into the 3D scene so the loading state disappears only after the GLB has loaded.
- Keep geometry, materials, scale, lighting choices, controls, and model appearance unchanged.
- Show a clear technical error state when loading fails instead of an empty viewport.

### Experience layout
- Replace the two vertically separated category blocks with a responsive two-column layout: Research Projects on the left and Internship on the right, stacking on mobile.
- Keep the research cards in their existing horizontal carousel and the internship card/group parallel to them.
- Remove the large duplicate category headings and add compact orange “Research Project” / “Internship” labels at the top of each card.
- Preserve card content hierarchy, equal visual treatment, arrow navigation, swipe behavior, and bottom-aligned Know More controls.

### Requested content and ordering changes
- Move Pathfinder immediately before Autonomous Line Follower while preserving every other Robotics project and all card content.
- Change the two achievement titles to “8th out of 135+ Teams Nationwide” and “5th out of 40+ Teams Nationwide”, retaining ordinal superscripts.
- Standardize Team Innovation metadata to “DRISHTI - Robotics Club, SVNIT | Team Innovation” wherever that organization/team line appears.
- Remove only the explanatory sentence below the Coursework Projects heading.
- Replace all remaining en/em dashes in displayed source content and metadata with simple hyphens.

### Scrollbar and responsive behavior
- Hide native vertical and horizontal scrollbar chrome globally for the document, overlays, modal content, and carousels while preserving wheel, touch, trackpad, keyboard, Page Up/Page Down, and arrow-key scrolling.
- Keep carousel arrows and touch/swipe navigation, with no native horizontal scrollbar.
- Verify desktop, tablet, and mobile for full-screen overlays, stacked Experience categories, no horizontal overflow, unclipped controls, centered CAD states, and preserved page scroll position after closing details.

## Validation
- Check the live page at desktop, tablet, and mobile widths.
- Open and close one detail from Robotics, Research, Internship, and Coursework; verify full viewport coverage, internal scrolling, Escape/Close, and exact background scroll restoration.
- Exercise carousel arrows/swipe and confirm no visible browser or carousel scrollbars.
- Confirm the requested hero/About alignment, Experience layout, Robotics order, achievement wording, Team Innovation metadata, removed Coursework sentence, and absence of em/en dashes.
- Confirm each CAD viewer shows loading feedback, renders the real GLB, retains rotate/zoom/pan/reset/fullscreen, and does not leave a blank error state.
