"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import { STEPS } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

/* One full colour field per act: mat, tissue, steel, night. */
const FIELDS = ["#bba9f5", "#ffffff", "#a9aab2", "#1f1840"];
const INKS = ["#1c1830", "#1c1830", "#1c1830", "#ffffff"];

function AnswerVisual() {
  const opts = ["A job", "An internship", "A scholarship", "A promotion"];
  return (
    <div className="w-full max-w-[420px] rounded-[4px] bg-tissue p-6 text-ink shadow-[0_20px_50px_-24px_rgb(31_24_64/0.5)]">
      <p className="measure text-[10px] text-ink-3 uppercase">Question 2 of 7</p>
      <p className="mt-2 text-[20px] font-bold tracking-[-0.015em]">What are you applying for?</p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {opts.map((o, i) => (
          <span key={o} className={`rounded-[4px] px-3 py-2.5 text-[14px] font-medium ring-1 ${i === 0 ? "bg-violet-ink text-tissue ring-violet-ink" : "ring-ink/15"}`}>{o}</span>
        ))}
      </div>
    </div>
  );
}

function DraftVisual() {
  const rows = ["Contact", "Summary", "Skills", "Experience", "Projects", "Education"];
  return (
    <ul className="w-full max-w-[420px] space-y-2">
      {rows.map((r, i) => (
        <motion.li
          key={r}
          layout
          className={`flex items-center gap-3 rounded-[4px] bg-tissue px-4 py-3 text-[15px] font-semibold text-ink ring-1 ${i === 3 ? "translate-x-3 ring-2 ring-violet shadow-[0_14px_30px_-16px_rgb(31_24_64/0.6)]" : "ring-ink/12"}`}
        >
          <span aria-hidden className="grid grid-cols-2 gap-[3px]">
            {Array.from({ length: 6 }, (_, k) => <span key={k} className="h-[3px] w-[3px] rounded-full bg-chalk" />)}
          </span>
          {r}
          {i === 3 && <span className="measure ml-auto text-[9px] text-violet uppercase">Saved</span>}
        </motion.li>
      ))}
    </ul>
  );
}

function TailorVisual() {
  return (
    <div className="w-full max-w-[440px] rounded-[4px] bg-tissue p-6 text-ink shadow-[0_20px_50px_-24px_rgb(31_24_64/0.5)]">
      <p className="measure text-[10px] text-ink-3 uppercase">Summary · tailored for an internship</p>
      <p className="mt-3 text-[15px] leading-[1.6] text-ink-3 line-through decoration-flag/70">
        Designer with experience across a range of digital projects.
      </p>
      <p className="mt-2 text-[15px] leading-[1.6] font-medium">
        Interaction design student who shipped two campus apps end to end, from research to release.
      </p>
      <p className="measure mt-4 border-t border-ink/10 pt-3 text-[9.5px] text-ink-3 uppercase">Rewritten from your own entries only · 50–90 words</p>
    </div>
  );
}

function ExportVisual() {
  return (
    <div className="flex w-full max-w-[440px] flex-col gap-4">
      <div className="flex gap-3">
        {["PDF", "JPG"].map((f) => (
          <span key={f} className="measure flex h-24 flex-1 items-end rounded-[4px] bg-tissue p-3 text-[13px] text-ink shadow-[0_16px_34px_-20px_rgb(0_0_0/0.6)]">
            résumé.{f.toLowerCase()}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-[4px] bg-white/10 px-4 py-3 text-[13px] ring-1 ring-white/20">
        <span>Accent</span>
        <span className="flex gap-2" aria-hidden>
          {["#bba9f5", "#0d9488", "#a9aab2", "#ffffff"].map((c, i) => (
            <span key={c} className={`h-5 w-5 rounded-full ${i === 0 ? "ring-2 ring-white ring-offset-2 ring-offset-night" : ""}`} style={{ background: c }} />
          ))}
        </span>
      </div>
      <div className="flex items-center gap-4 rounded-[4px] bg-white/10 px-4 py-3 text-[13px] ring-1 ring-white/20">
        <span>Scale</span>
        <span className="relative h-1 flex-1 rounded-full bg-white/25"><span className="absolute inset-y-0 left-0 w-[62%] rounded-full bg-mat" /><span className="absolute top-1/2 left-[62%] h-3.5 w-3.5 -translate-1/2 rounded-full bg-tissue" /></span>
        <span className="measure">100%</span>
      </div>
    </div>
  );
}

const VISUALS = [AnswerVisual, DraftVisual, TailorVisual, ExportVisual];

function Act({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const n = STEPS.length;
  const s = i / n;
  const e = (i + 1) / n;
  const first = i === 0;
  const last = i === n - 1;
  const c = (v: number) => Math.min(1, Math.max(0, v));
  const opacity = useTransform(
    progress,
    [c(s - 0.04), c(s + 0.04), c(e - 0.04), c(e + 0.04)],
    [first ? 1 : 0, 1, 1, last ? 1 : 0],
  );
  const y = useTransform(progress, [c(s - 0.05), c(s + 0.05), c(e - 0.05), c(e + 0.05)], [first ? 0 : 60, 0, 0, last ? 0 : -60]);
  const clip = useTransform(progress, [c(s - 0.04), c(s + 0.06)], [first ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const step = STEPS[i];
  const Visual = VISUALS[i];

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex items-center" aria-hidden={false}>
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-6 px-4 sm:gap-10 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <motion.div style={{ y }}>
          <p className="font-display text-[clamp(3.6rem,14vw,11rem)] leading-[0.8] font-bold tracking-[-0.05em]">
            {step.count}
            <span className="ml-3 align-top text-[clamp(1rem,1.8vw,1.5rem)] font-semibold tracking-[-0.01em]">{step.unit}</span>
          </p>
          <h3 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] leading-none font-bold tracking-[-0.035em]">{step.verb}.</h3>
          <p className="pretty mt-5 max-w-[30rem] text-[17px] leading-[1.6] opacity-85">{step.body}</p>
        </motion.div>
        <motion.div style={{ clipPath: clip }} className="flex origin-top-left scale-[0.86] justify-center sm:scale-100 lg:justify-end">
          <Visual />
        </motion.div>
      </div>
    </motion.div>
  );
}

function TapeSegment({ i, label, on, progress }: { i: number; label: string; on: boolean; progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [i / 4, (i + 1) / 4], [0, 1]);
  return (
    <div className="flex-1">
      <div className="relative h-[3px] overflow-hidden rounded-full bg-current/20">
        <motion.div className="absolute inset-0 origin-left rounded-full bg-current" style={{ scaleX }} />
      </div>
      <p className={`measure mt-2 text-[10px] uppercase transition-opacity duration-300 ${on ? "opacity-100" : "opacity-50"}`}>{label}</p>
    </div>
  );
}

function StaticProcess() {
  return (
    <div className="space-y-px">
      {STEPS.map((step, i) => {
        const Visual = VISUALS[i];
        return (
          <div key={step.verb} style={{ background: FIELDS[i], color: INKS[i] }} className="px-4 py-20 sm:px-8">
            <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-2">
              <div>
                <p className="font-display text-[5rem] leading-none font-bold">{step.count} <span className="text-[1.25rem]">{step.unit}</span></p>
                <h3 className="mt-4 text-[2.4rem] font-bold">{step.verb}.</h3>
                <p className="mt-4 max-w-[30rem] text-[17px] leading-[1.6]">{step.body}</p>
              </div>
              <div className="hidden sm:block"><Visual /></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const stops = [0, 0.22, 0.28, 0.47, 0.53, 0.72, 0.78, 1];
  const bg = useTransform(scrollYProgress, stops, [FIELDS[0], FIELDS[0], FIELDS[1], FIELDS[1], FIELDS[2], FIELDS[2], FIELDS[3], FIELDS[3]]);
  const fg = useTransform(scrollYProgress, stops, [INKS[0], INKS[0], INKS[1], INKS[1], INKS[2], INKS[2], INKS[3], INKS[3]]);
  const [act, setAct] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setAct(Math.min(3, Math.floor(v * 4))));

  return (
    <section id="process" aria-labelledby="process-title" className="relative scroll-mt-0">
      <div className="bg-tissue px-4 pt-28 pb-16 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-[1280px]">
          <h2 id="process-title" className="balance max-w-[18ch] font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-[1] font-bold tracking-[-0.035em] text-ink">
            From blank page to job-ready, in four cuts.
          </h2>
        </div>
      </div>

      {reduce ? (
        <StaticProcess />
      ) : (
        <div ref={ref} className="relative h-[420vh]">
          <motion.div style={{ backgroundColor: bg, color: fg }} className="sticky top-0 h-[100svh] overflow-hidden">
            {STEPS.map((_, i) => <Act key={i} i={i} progress={scrollYProgress} />)}

            {/* Tape progress: which cut you are on */}
            <div className="absolute inset-x-0 bottom-8">
              <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-4 sm:px-8">
                {STEPS.map((s, i) => (
                  <TapeSegment key={s.verb} i={i} label={s.verb} on={act === i} progress={scrollYProgress} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
