"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

/* The FALO star: two curved blades — lavender and steel — that lock
   around a diamond. The steel blade is the lavender blade turned 180°. */
const BLADE =
  "M533 143 C600 200 628 262 604 334 C574 442 503 520 422 575 C470 606 512 644 535 680 L478 780 C420 690 330 627 205 627 L205 517 C402 517 528 384 533 143 Z";

type Props = {
  size?: number;
  className?: string;
  /** Plays the blades sliding in and locking. */
  animate?: boolean;
  delay?: number;
  title?: string;
};

export function FaloMark({ size = 40, className, animate = false, delay = 0, title = "FALO Enterprise" }: Props) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const play = animate && !reduce;
  const spring = { type: "spring" as const, stiffness: 140, damping: 18, mass: 0.9, delay };

  return (
    <svg
      viewBox="180 120 710 910"
      width={size}
      height={(size * 910) / 710}
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={`lav-${id}`} x1="0.6" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#c4b4fb" />
          <stop offset="0.55" stopColor="#b2a3e6" />
          <stop offset="1" stopColor="#a094c6" />
        </linearGradient>
        <linearGradient id={`steel-${id}`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#7d7c88" />
          <stop offset="0.45" stopColor="#b0b1b8" />
          <stop offset="1" stopColor="#7f7e8a" />
        </linearGradient>
      </defs>
      <motion.path
        d={BLADE}
        fill={`url(#lav-${id})`}
        initial={play ? { x: -120, y: -90, opacity: 0, rotate: -14 } : false}
        animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
        transition={spring}
        style={{ transformOrigin: "535px 572px", transformBox: "view-box" }}
      />
      <g transform="rotate(180 535 572)">
        <motion.path
          d={BLADE}
          fill={`url(#steel-${id})`}
          initial={play ? { x: -120, y: -90, opacity: 0, rotate: -14 } : false}
          animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          transition={{ ...spring, delay: delay + 0.12 }}
          style={{ transformOrigin: "535px 572px", transformBox: "view-box" }}
        />
      </g>
    </svg>
  );
}
