/**
 * Fixed full-viewport film-grain texture. Purely decorative and CSS-driven
 * (see `.grain-overlay` in globals.css); auto-hidden for reduced-motion users.
 */
export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden />;
}
