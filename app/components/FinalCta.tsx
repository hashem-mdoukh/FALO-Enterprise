"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { FaloMark } from "./FaloMark";
import { MagneticTag } from "./MagneticTag";
import { SIGNUP_URL } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  return (
    <section className="mat-night relative overflow-hidden py-28 text-tissue sm:py-40">
      <div ref={ref} className="mx-auto grid max-w-[1280px] items-center gap-16 px-4 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="balance font-display text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.95] font-bold tracking-[-0.04em]">
            Your first draft is seven questions away.
          </h2>
          <p className="pretty mt-7 max-w-[32rem] text-[18px] leading-[1.6] text-mat">
            Answer seven questions and Resumax AI writes your first draft for you. Start on the free plan and upgrade only if you need more.
          </p>
          <div className="mt-11">
            <MagneticTag href={SIGNUP_URL} label="Create your free account" note="No credit card required" tone="lavender" />
          </div>
        </div>
        <div className="relative hidden justify-center lg:flex" aria-hidden>
          {inView && <FaloMark size={260} animate={!reduce} delay={0.1} title="" />}
          <motion.span
            className="absolute -inset-10 rounded-full border border-dashed border-mat/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
          />
        </div>
      </div>
    </section>
  );
}
