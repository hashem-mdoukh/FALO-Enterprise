"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Arrow } from "./icons";

type Props = { href: string; label: string; note?: string; tone?: "ink" | "lavender" };

/** The primary action, cut as a garment spec tag hanging on a thread. */
export function MagneticTag({ href, label, note, tone = "ink" }: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.6 });
  const rotate = useTransform(sx, [-20, 20], [-4, 4]);

  const dark = tone === "ink";

  return (
    <motion.a
      href={href}
      style={{ x: sx, y: sy, rotate }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.22);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center gap-4 py-4 pr-6 pl-9 text-[16px] font-semibold [clip-path:polygon(18px_0,100%_0,100%_100%,18px_100%,0_50%)] ${
        dark ? "bg-ink text-tissue hover:bg-violet-ink" : "bg-mat text-violet-ink hover:bg-tissue"
      } transition-colors duration-300`}
    >
      {/* Eyelet */}
      <span aria-hidden className={`absolute top-1/2 left-[14px] h-2.5 w-2.5 -translate-y-1/2 rounded-full ring-2 ${dark ? "bg-tissue ring-mat" : "bg-night ring-violet-ink/40"}`} />
      <span className="flex flex-col leading-tight">
        <span>{label}</span>
        {note && <span className={`measure mt-1 text-[9.5px] font-normal uppercase ${dark ? "text-mat" : "text-violet-ink/75"}`}>{note}</span>}
      </span>
      <Arrow size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
    </motion.a>
  );
}
