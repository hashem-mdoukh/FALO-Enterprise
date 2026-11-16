"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { FaloMark } from "./FaloMark";
import { APP_URL } from "./data";
import { Arrow } from "./icons";

const LINKS = [
  { href: "#studio", label: "Studio" },
  { href: "#process", label: "How it's cut" },
  { href: "#templates", label: "Templates" },
  { href: "#principles", label: "Principles" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      animate={{
        backgroundColor: solid ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0)",
        boxShadow: solid ? "0 1px 0 rgba(28,24,48,0.08), 0 8px 24px -16px rgba(31,24,64,0.3)" : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.3 }}
    >
      <nav className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-6 px-4 sm:px-8" aria-label="Main">
        <a href="#top" className="flex items-center gap-2.5 rounded-sm" aria-label="FALO Enterprise, back to top">
          <span className="grid h-9 w-9 place-items-center rounded-[8px] bg-tissue shadow-[0_2px_6px_-2px_rgb(31_24_64/0.3)]">
            <FaloMark size={22} animate delay={0.15} title="" />
          </span>
          <span className="text-[17px] font-semibold tracking-[-0.02em] whitespace-nowrap text-ink">
            FALO <span className="font-normal text-ink-2">Enterprise</span>
          </span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-[14px] font-medium text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={APP_URL}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-4 py-2 whitespace-nowrap text-[14px] font-semibold text-tissue transition-colors hover:bg-violet-ink"
        >
          Open Resumax AI
          <Arrow size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      </nav>
    </motion.header>
  );
}
