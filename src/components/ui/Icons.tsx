import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

/** One icon set for the whole UI: 24 px grid, 1.6 stroke, round caps. */
function Base(props: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
}

export const ArrowRight = (p: P) => (
  <Base {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Base>
);
export const ArrowUpRight = (p: P) => (
  <Base {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
);
export const ArrowUp = (p: P) => (
  <Base {...p}>
    <path d="M12 20V5M6 11l6-6 6 6" />
  </Base>
);
export const Chevron = (p: P) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
);
export const MenuIcon = (p: P) => (
  <Base {...p}>
    <path d="M4 8h16M4 16h16" />
  </Base>
);
export const CloseIcon = (p: P) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);
export const Check = (p: P) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);
export const Info = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5M12 8v.01" />
  </Base>
);
export const Play = (p: P) => (
  <Base {...p} fill="currentColor" stroke="none">
    <path d="M7 4.6v14.8a.8.8 0 0 0 1.2.7l12-7.4a.8.8 0 0 0 0-1.4L8.2 3.9A.8.8 0 0 0 7 4.6z" />
  </Base>
);
export const Mail = (p: P) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6.5L20.5 7" />
  </Base>
);
export const Code = (p: P) => (
  <Base {...p}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
  </Base>
);
export const Database = (p: P) => (
  <Base {...p}>
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
  </Base>
);
export const Brain = (p: P) => (
  <Base {...p}>
    <path d="M12 4.6V19.4" />
    <path d="M12 6.2C12 4.7 10.8 3.5 9.3 3.5 7.9 3.5 6.8 4.5 6.6 5.8 5.1 6.1 4 7.4 4 9c0 .9.4 1.7 1 2.3-.6.6-1 1.4-1 2.3 0 1.4.9 2.6 2.2 3 .1 1.4 1.3 2.4 2.7 2.4 1 0 1.9-.5 2.4-1.3" />
    <path d="M12 6.2c0-1.5 1.2-2.7 2.7-2.7 1.4 0 2.5 1 2.7 2.3C18.9 6.1 20 7.4 20 9c0 .9-.4 1.7-1 2.3.6.6 1 1.4 1 2.3 0 1.4-.9 2.6-2.2 3-.1 1.4-1.3 2.4-2.7 2.4-1 0-1.9-.5-2.4-1.3" />
    <path d="M8.5 9.5c1 0 1.8.4 2.4 1.1M15.5 9.5c-1 0-1.8.4-2.4 1.1M8.5 14c.9 0 1.7-.3 2.3-.9M15.5 14c-.9 0-1.7-.3-2.3-.9" />
  </Base>
);
export const Atom = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    <ellipse cx="12" cy="12" rx="9" ry="3.6" />
    <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
  </Base>
);
export const Users = (p: P) => (
  <Base {...p}>
    <circle cx="8.5" cy="8.5" r="3" />
    <circle cx="17" cy="9.5" r="2.4" />
    <path d="M2.8 19c0-3 2.5-5 5.7-5s5.7 2 5.7 5M15.5 14.3c3 0 5.7 1.7 5.7 4.7" />
  </Base>
);
export const Cap = (p: P) => (
  <Base {...p}>
    <path d="m2 9.5 10-5 10 5-10 5-10-5z" />
    <path d="M6 11.7V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.3M22 9.5v5.5" />
  </Base>
);
export const Chip = (p: P) => (
  <Base {...p}>
    <rect x="5" y="5" width="14" height="14" rx="2.5" />
    <path d="M9 2.5v2.5M15 2.5v2.5M9 19v2.5M15 19v2.5M2.5 9H5M2.5 15H5M19 9h2.5M19 15h2.5" />
    <path d="m8.8 15 1.8-5.5h.4L12.8 15M9.3 13.3h2.8M15 9.7V15" strokeWidth="1.4" />
  </Base>
);
export const Layers = (p: P) => (
  <Base {...p}>
    <path d="m12 3 9 4.7-9 4.7-9-4.7L12 3z" />
    <path d="m3 12.2 9 4.7 9-4.7M3 16.6 12 21.3l9-4.7" />
  </Base>
);
