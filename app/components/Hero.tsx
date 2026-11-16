"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MagneticTag } from "./MagneticTag";
import { RegionResume } from "./RegionResume";
import { SIGNUP_URL } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;
const LINES = ["One profile.", "Cut to fit", "wherever you apply."];

function Pin({ className }: { className: string }) {
  return (
    <span aria-hidden className={`absolute z-20 block h-3.5 w-3.5 rounded-full ${className}`}>
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#e9e4ff,#7a69d0_55%,#3d2f8f)] shadow-[0_3px_5px_rgb(31_24_64/0.4)]" />
    </span>
  );
}

function Notch({ className }: { className: string }) {
  return <span aria-hidden className={`absolute z-10 block h-0 w-0 border-x-[7px] border-t-[11px] border-x-transparent border-t-chalk ${className}`} />;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sheetY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const sheetRotate = useTransform(scrollYProgress, [0, 1], [-1.1, reduce ? -1.1 : -3]);

  return (
    <section ref={ref} id="top" className="mat relative overflow-hidden pt-24 pb-20 sm:pt-[104px] lg:pb-28">
      {/* Mat ruler along the top edge */}
      <div aria-hidden className="measure pointer-events-none absolute inset-x-0 top-16 hidden justify-between px-8 text-[9px] text-violet-ink/55 lg:flex">
        {Array.from({ length: 13 }, (_, i) => <span key={i}>{i * 5}</span>)}
      </div>

      <motion.div
        style={{ y: sheetY, rotate: sheetRotate }}
        initial={reduce ? false : { opacity: 0, y: 60, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: -1.1 }}
        transition={{ type: "spring", stiffness: 70, damping: 16, mass: 1.1, delay: 0.1 }}
        className="relative mx-auto max-w-[1280px] px-4 sm:px-8"
      >
        <div className="tissue relative rounded-[3px] px-5 pt-10 pb-12 sm:px-10 lg:px-14 lg:pt-11 lg:pb-14">
          {/* Seam allowance: the cutting line draws itself around the piece */}
          <svg aria-hidden className="pointer-events-none absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] overflow-visible" preserveAspectRatio="none">
            <motion.rect
              x="0" y="0" width="100%" height="100%" rx="2"
              fill="none" stroke="#8e8f99" strokeWidth="1.25" strokeDasharray="7 6"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: EASE, delay: 0.6 }}
            />
          </svg>
          <Pin className="top-5 left-5" />
          <Pin className="top-5 right-5" />
          <Pin className="right-5 bottom-5 hidden lg:block" />
          <Notch className="top-0 left-1/3" />
          <Notch className="top-0 left-2/3 hidden lg:block" />
          <Notch className="bottom-0 left-1/2 rotate-180" />

          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-10">
            {/* Piece label */}
            <div className="relative">
              <h1 className="font-display text-[clamp(2.5rem,5.8vw,5rem)] leading-[0.94] font-bold tracking-[-0.04em] text-ink">
                {LINES.map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.06em]">
                    <motion.span
                      className={`block ${i === 1 ? "text-violet" : ""}`}
                      initial={reduce ? false : { y: "105%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.35 + i * 0.09 }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
                className="pretty mt-6 max-w-[34rem] text-[18px] leading-[1.6] text-ink-2 sm:text-[19px]"
              >
                FALO Enterprise makes software to measure. Our first piece, <strong className="font-semibold text-ink">Resumax AI</strong>,
                takes the one profile you already have and tailors it to the standard of the place you&rsquo;re applying, checked line by line. It never pads and never invents.
              </motion.p>

              {/* Pattern label table, as printed on a real pattern piece */}
              <motion.dl
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-7 grid max-w-[34rem] grid-cols-2 border-y border-ink/15 text-[13px] sm:grid-cols-4"
              >
                {[
                  ["Piece", "Resumax AI 1.0"],
                  ["Cut from", "One profile"],
                  ["Graded to", "5 regional standards"],
                  ["Languages", "EN · AR (RTL)"],
                ].map(([k, v], i) => (
                  <div key={k} className={`py-3 pr-3 ${i % 2 ? "sm:pl-3" : ""} ${i > 0 ? "sm:border-l sm:border-ink/15 sm:pl-3" : ""}`}>
                    <dt className="measure text-[9.5px] text-ink-3 uppercase">{k}</dt>
                    <dd className="mt-1 font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </motion.dl>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
                className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5"
              >
                <MagneticTag href={SIGNUP_URL} label="Try Resumax AI free" note="No credit card" />
                <a href="#process" className="text-[15px] font-semibold text-violet-ink underline decoration-violet/40 hover:decoration-violet">
                  See how it&rsquo;s cut
                </a>
              </motion.div>
            </div>

            {/* The garment: the sample sheet with its grading lines */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              className="relative pt-6 sm:px-8"
            >
              <RegionResume />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
