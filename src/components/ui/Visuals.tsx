import type { ReactNode } from 'react';
import { Brain, Code, Database } from './Icons';

/* ---------- helpers ---------- */

/** Three faces of an isometric slab centred on (cx, cy). */
function slab(cx: number, cy: number, w: number, h: number, d: number) {
  return {
    top: `${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h} ${cx - w},${cy}`,
    left: `${cx - w},${cy} ${cx},${cy + h} ${cx},${cy + h + d} ${cx - w},${cy + d}`,
    right: `${cx},${cy + h} ${cx + w},${cy} ${cx + w},${cy + d} ${cx},${cy + h + d}`,
  };
}

/* ---------- dotted particle wave (bottom of hero) ---------- */

const WAVE_W = 1440;
const WAVE_H = 300;
const WAVE_ROWS = Array.from({ length: 11 }, (_, r) => {
  const pts: string[] = [];
  for (let x = -20; x <= WAVE_W + 20; x += 24) {
    const y =
      150 +
      r * 11 +
      Math.sin(x / 190 + r * 0.16) * (46 - r * 1.6) +
      Math.sin(x / 83 + 1.4) * 9 * (1 - r / 14);
    pts.push(`${x === -20 ? 'M' : 'L'}${x} ${y.toFixed(1)}`);
  }
  return { d: pts.join(' '), opacity: 0.18 + (r / 10) * 0.62, width: 1.6 + (r / 10) * 1.6 };
});

export function ParticleWave({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${WAVE_W} ${WAVE_H}`}
      preserveAspectRatio="xMidYMax slice"
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-[220px] w-full md:h-[300px] ${className}`}
      style={{ maskImage: 'linear-gradient(to top, #000 35%, transparent)', WebkitMaskImage: 'linear-gradient(to top, #000 35%, transparent)' }}
    >
      <g className="wave-drift">
        {WAVE_ROWS.map((row, i) => (
          <path
            key={i}
            d={row.d}
            className="wave-row"
            style={{ strokeOpacity: row.opacity, strokeWidth: row.width, strokeDasharray: `0.01 ${12 + i * 0.6}` }}
          />
        ))}
      </g>
    </svg>
  );
}

/* ---------- hero: three glass cards wired to an isometric platform ---------- */

const CARD_ICONS = { software: Code, data: Database, ai: Brain } as const;

export interface HeroCard {
  id: 'software' | 'data' | 'ai';
  title: string;
  text: string;
}

export function HeroVisual({ cards, alt }: { cards: HeroCard[]; alt: string }) {
  const L1 = slab(300, 268, 200, 80, 14);
  const L2 = slab(300, 236, 150, 60, 14);
  const L3 = slab(300, 200, 100, 40, 16);
  const floats = ['float-slow', 'float-slow-2', 'float-slow-3'];

  return (
    <div className="relative mx-auto w-full max-w-[640px]" role="group" aria-label={alt}>
      <ul className="m-0 grid list-none grid-cols-3 p-0">
        {cards.map((c, i) => {
          const Icon = CARD_ICONS[c.id];
          return (
            <li key={c.id} className="px-1 sm:px-2">
              <div className={`glass flex h-full flex-col items-center px-2 pb-4 pt-5 text-center sm:px-4 sm:pb-6 sm:pt-7 ${floats[i]}`}>
                <Icon width={40} height={40} strokeWidth={1.4} className="accent sm:size-12" />
                <p className="mt-3 text-[1.05rem] font-bold sm:text-step-1">{c.title}</p>
                <p className="mt-2 hidden text-[0.8125rem] leading-snug text-muted sm:block">{c.text}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <svg viewBox="0 0 600 360" aria-hidden="true" focusable="false" className="-mt-px block h-auto w-full overflow-visible">
        <defs>
          <linearGradient id="hv-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2a8fd8" />
            <stop offset="1" stopColor="#0b3566" />
          </linearGradient>
          <linearGradient id="hv-top-hot" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#38c8f2" />
            <stop offset="1" stopColor="#0c4f8f" />
          </linearGradient>
          <linearGradient id="hv-left" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0d3b6c" />
            <stop offset="1" stopColor="#06182f" />
          </linearGradient>
          <linearGradient id="hv-right" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1371a8" />
            <stop offset="1" stopColor="#082a4d" />
          </linearGradient>
          <radialGradient id="hv-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0.55" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse className="platform-glow" cx="300" cy="300" rx="290" ry="70" fill="url(#hv-glow)" />

        {/* circuit lines from each card down to the platform */}
        <g>
          <path className="glow-line" d="M100 0 V44 Q100 64 120 64 H212 Q232 64 232 84 V186" />
          <path className="glow-line" d="M300 0 V152" />
          <path className="glow-line" d="M500 0 V44 Q500 64 480 64 H388 Q368 64 368 84 V186" />
          <path className="glow-line flow-dash" style={{ strokeOpacity: 0.9, strokeWidth: 3 }} d="M100 0 V44 Q100 64 120 64 H212 Q232 64 232 84 V186" />
          <path className="glow-line flow-dash" style={{ strokeOpacity: 0.9, strokeWidth: 3 }} d="M500 0 V44 Q500 64 480 64 H388 Q368 64 368 84 V186" />
          <circle className="glow-dot" cx="100" cy="2" r="4" />
          <circle className="glow-dot" cx="300" cy="2" r="4" />
          <circle className="glow-dot" cx="500" cy="2" r="4" />
          <circle className="glow-dot" cx="170" cy="64" r="3.5" />
          <circle className="glow-dot" cx="430" cy="64" r="3.5" />
          <circle className="glow-dot" cx="232" cy="186" r="4" />
          <circle className="glow-dot" cx="368" cy="186" r="4" />
        </g>

        {/* isometric platform */}
        <g style={{ filter: 'drop-shadow(0 0 10px rgba(34,211,238,0.55))' }} strokeLinejoin="round">
          <polygon points={L1.left} fill="url(#hv-left)" stroke="#22d3ee" strokeOpacity="0.7" />
          <polygon points={L1.right} fill="url(#hv-right)" stroke="#22d3ee" strokeOpacity="0.7" />
          <polygon points={L1.top} fill="#06203d" stroke="#22d3ee" strokeOpacity="0.85" strokeWidth="1.5" />
          <polygon points={L2.left} fill="url(#hv-left)" stroke="#22d3ee" strokeOpacity="0.8" />
          <polygon points={L2.right} fill="url(#hv-right)" stroke="#22d3ee" strokeOpacity="0.8" />
          <polygon points={L2.top} fill="url(#hv-top)" stroke="#22d3ee" strokeOpacity="0.95" strokeWidth="1.5" />
          <polygon points={L3.left} fill="url(#hv-left)" stroke="#67e8f9" />
          <polygon points={L3.right} fill="url(#hv-right)" stroke="#67e8f9" />
          <polygon points={L3.top} fill="url(#hv-top-hot)" stroke="#a5f3fc" strokeWidth="1.5" />
        </g>
        <text
          transform="matrix(1 -0.42 1 0.42 330 213)"
          fontSize="84"
          fontWeight="800"
          fontStyle="italic"
          fill="#22d3ee"
          textAnchor="middle"
          style={{ filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.9))' }}
          fontFamily="var(--font-sans)"
        >
          E
        </text>
      </svg>
    </div>
  );
}

/* ---------- academic tile: a small isometric slab with a graduation cap ---------- */

export function CapTile({ className = '' }: { className?: string }) {
  const A = slab(100, 118, 84, 34, 12);
  const B = slab(100, 96, 60, 24, 12);
  return (
    <svg viewBox="0 0 200 180" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id="ct-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a8fd8" />
          <stop offset="1" stopColor="#0b3566" />
        </linearGradient>
        <linearGradient id="ct-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d3b6c" />
          <stop offset="1" stopColor="#06182f" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="158" rx="92" ry="18" fill="#22d3ee" opacity="0.18" />
      <g style={{ filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.5))' }} strokeLinejoin="round" stroke="#22d3ee" strokeOpacity="0.85">
        <polygon points={A.left} fill="url(#ct-side)" />
        <polygon points={A.right} fill="url(#ct-side)" />
        <polygon points={A.top} fill="#06203d" />
        <polygon points={B.left} fill="url(#ct-side)" />
        <polygon points={B.right} fill="url(#ct-side)" />
        <polygon points={B.top} fill="url(#ct-top)" />
      </g>
      <g transform="translate(70 36) scale(2.5)" style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.9))' }} fill="none" stroke="#a5f3fc" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 9.5 10-5 10 5-10 5-10-5z" />
        <path d="M6 11.7V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.3M22 9.5v5.5" />
      </g>
    </svg>
  );
}

/* ---------- monogram ---------- */

export function Monogram({ className = '' }: { className?: string }): ReactNode {
  return (
    <span
      aria-hidden="true"
      className={`inline-block font-black italic leading-none text-cyan ${className}`}
      style={{ textShadow: '0 0 14px rgba(34,211,238,0.7)' }}
    >
      E
    </span>
  );
}
