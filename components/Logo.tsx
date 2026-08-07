import { site } from "@/lib/data";

const ACCENT = "#6ee7b7";
const FG = "#e8f2ec";
const CARD = "#0f1712";

/** Brand mark: rounded-square badge with an integrated "BA" monogram.
 *  "B" drawn in foreground strokes, an emerald "A" layered across it.
 *  Brand name is deliberately NOT translated (same in ID/EN). */
function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden
      focusable="false"
    >
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="11.5"
        fill={CARD}
        stroke={ACCENT}
        strokeOpacity="0.4"
      />
      {/* B — spine + two bowls */}
      <path d="M14 10 V30" stroke={FG} strokeWidth="3.4" strokeLinecap="round" />
      <path
        d="M14 10 h6 a4 4 0 0 1 0 8 h-6"
        fill="none"
        stroke={FG}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M14 18 h6 a4 4 0 0 1 0 8 h-6"
        fill="none"
        stroke={FG}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      {/* A — emerald slants + crossbar */}
      <path d="M25 9 L9 29" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
      <path d="M25 9 L29 29" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
      <path d="M20 15 h10" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <a href="#" className="inline-flex items-center gap-2" aria-label={site.name}>
      <Mark className="h-8 w-8 shrink-0" />
      <span className="hidden text-sm font-semibold tracking-tight text-accent sm:inline">
        Bani Adam <span className="text-fg">Afandi</span>
      </span>
    </a>
  );
}