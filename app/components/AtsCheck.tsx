"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { CHECKS } from "./data";
import { Check, Flag } from "./icons";

const EASE = [0.16, 1, 0.3, 1] as const;
const SCORES = [
  { k: "Impact", v: 97 },
  { k: "Keywords", v: 94 },
  { k: "Clarity", v: 98 },
  { k: "Completeness", v: 95 },
];

function Ruler({ label, value, delay }: { label: string; value: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? value : 0);
  const shown = useTransform(mv, (v) => Math.round(v).toString());
  const left = useTransform(mv, (v) => `${v}%`);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(mv, value, { duration: 1.4, ease: EASE, delay });
    return () => c.stop();
  }, [inView, reduce, mv, value, delay]);

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between">
        <span className="text-[14px] font-semibold text-ink">{label}</span>
        <motion.span className="measure text-[13px] text-violet-ink">{shown}</motion.span>
      </div>
      <div
        className="relative mt-2 h-4"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgb(28 24 48 / 0.35) 0 1px, transparent 1px 10%), repeating-linear-gradient(90deg, rgb(28 24 48 / 0.18) 0 1px, transparent 1px 2%)",
          backgroundSize: "100% 100%, 100% 45%",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      >
        <motion.span style={{ left }} className="absolute top-[-3px] bottom-[-3px] w-[2px] -translate-x-1/2 bg-violet" />
      </div>
    </div>
  );
}

export function AtsCheck() {
  const reduce = useReducedMotion();
  return (
    <section id="check" className="relative scroll-mt-16 bg-tissue py-28 sm:py-36">
      <div className="mx-auto grid max-w-[1280px] gap-16 px-4 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div>
          <h2 className="balance font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-[1] font-bold tracking-[-0.035em] text-ink">
            Every sheet is checked like a cutting list.
          </h2>
          <p className="pretty mt-8 max-w-[34rem] text-[18px] leading-[1.65] text-ink-2">
            The ATS optimizer reads your resume the way screening software does. It scores it, runs a real-time keyword analysis, and lists exactly which checks pass and which need your attention.
          </p>
          <p className="pretty mt-5 max-w-[34rem] text-[15.5px] leading-[1.6] text-ink-3">
            No tool can promise that a particular system will accept a document, and ResuMax doesn&rsquo;t. Treat the score as strong preparation, not a guarantee.
          </p>
        </div>

        <div className="rounded-[4px] bg-tissue-soft p-6 ring-1 ring-ink/10 sm:p-8">
          <div className="flex items-baseline justify-between border-b border-ink/15 pb-4">
            <p className="text-[15px] font-bold text-ink">Parse report</p>
            <p className="measure text-[10px] text-ink-3 uppercase">Sample analysis</p>
          </div>

          <motion.ol
            className="divide-y divide-ink/10"
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            variants={{ show: { transition: { staggerChildren: 0.28, delayChildren: 0.2 } } }}
          >
            {CHECKS.map((c) => (
              <motion.li
                key={c.label}
                variants={{
                  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
                  show: { opacity: 1, clipPath: "inset(0 0% 0 0)", transition: { duration: 0.55, ease: EASE } },
                }}
                className="flex items-center gap-4 py-3.5"
              >
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${c.ok ? "bg-pass/12 text-pass" : "bg-flag/12 text-flag"}`}>
                  {c.ok ? <Check size={15} /> : <Flag size={15} />}
                </span>
                <span className="flex-1 text-[15px] text-ink">{c.label}</span>
                <span className={`measure text-[10px] uppercase ${c.ok ? "text-pass" : "text-flag"}`}>{c.ok ? "Passed" : "Needs attention"}</span>
              </motion.li>
            ))}
          </motion.ol>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {SCORES.map((s, i) => <Ruler key={s.k} label={s.k} value={s.v} delay={0.15 * i} />)}
          </div>
          <p className="mt-7 text-[13px] leading-[1.5] text-ink-3">Your real score is generated from your own resume.</p>
        </div>
      </div>
    </section>
  );
}
