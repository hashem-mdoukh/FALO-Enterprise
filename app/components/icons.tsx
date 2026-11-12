type P = { className?: string; size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const Check = ({ className, size = 16 }: P) => (
  <svg {...base(size)} className={className}><path d="M4.5 12.5l4.5 4.5L19.5 6.5" /></svg>
);
export const Dash = ({ className, size = 16 }: P) => (
  <svg {...base(size)} className={className}><path d="M6 12h12" /></svg>
);
export const Flag = ({ className, size = 16 }: P) => (
  <svg {...base(size)} className={className}><path d="M12 7v6" /><path d="M12 17h.01" /><circle cx="12" cy="12" r="9" /></svg>
);
export const Arrow = ({ className, size = 16 }: P) => (
  <svg {...base(size)} className={className}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
);
export const Scissors = ({ className, size = 16 }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
    <path d="M8.1 8.1L20 20" /><path d="M8.1 15.9L20 4" />
  </svg>
);
