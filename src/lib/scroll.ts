/**
 * Viewport-aware smooth scroll for the main portfolio page navbar.
 *
 * ROOT CAUSE OF THE PREVIOUS PROBLEM:
 * Every <Section> has py-16 sm:py-20 (64–80 px) of top padding INSIDE the
 * section container, plus a mb-10 heading block, before the visible heading
 * appears. Scrolling to the section container top therefore left 100+ px of
 * dead structural space above the first visible text - making the content
 * feel "too low" with no room below.
 *
 * FIX:
 * Target the HEADING element ({id}-title) rather than the section container.
 * The heading is where the visual content actually begins. Subtract the sticky
 * navbar height and a small fixed breathing gap (32 px) so the heading sits
 * comfortably below the navbar with balanced space.
 *
 * Why 32 px and not a viewport-fraction?
 * A viewport-fraction breathing room sounds right but overshoots on tall
 * screens - it adds too much space and the content still looks "low". A small
 * fixed gap after the navbar is the correct visual anchor: it puts the heading
 * reliably just below the navbar on every screen size.
 *
 * @param sectionId   The section's id attribute (without "#").
 *                    The function first tries "{sectionId}-title" (the <h2>
 *                    inside the Section component), then falls back to the
 *                    section container itself.
 * @param breathing   Extra px of space to leave between the navbar bottom and
 *                    the heading. Default 32 px works well across all sections.
 */
export function scrollToSection(sectionId: string, breathing = 32): void {
  // Prefer the heading element - that is where visible content begins.
  const contentEl =
    document.getElementById(`${sectionId}-title`) ??
    document.getElementById(sectionId);
  if (!contentEl) return;

  const navbar = document.querySelector("header");
  const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 56;

  const absoluteTop = contentEl.getBoundingClientRect().top + window.scrollY;
  const scrollTarget = Math.max(absoluteTop - navbarHeight - breathing, 0);

  window.scrollTo({ top: scrollTarget, behavior: "smooth" });
}
