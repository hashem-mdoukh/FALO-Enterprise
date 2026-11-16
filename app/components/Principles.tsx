"use client";

import { motion, useReducedMotion } from "motion/react";
import { NEVER } from "./data";
import { Scissors } from "./icons";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Principles() {
  const reduce = useReducedMotion();
  return (
    <section id="principles" className="relative scroll-mt-16 bg-tissue py-28 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="balance font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-[1] font-bold tracking-[-0.035em] text-ink">
              Five things Resumax AI will never do.
            </h2>
            <p className="pretty mt-6 max-w-[26rem] text-[17px] leading-[1.6] text-ink-2">
              A good tailor never adds cloth that isn&rsquo;t there. These are product rules, not marketing lines.
            </p>
          </div>

          <ol>
            {NEVER.map((n, i) => (
              <li key={n.title} className="relative py-9 first:pt-0">
                <div className="grid gap-3 sm:grid-cols-[1fr_1.15fr] sm:gap-10">
                  <h3 className="balance text-[22px] leading-[1.2] font-bold tracking-[-0.02em] text-ink">{n.title}</h3>
                  <p className="pretty text-[16px] leading-[1.65] text-ink-2">{n.body}</p>
                </div>
                {/* Stitched seam that runs in as you reach it */}
                {i < NEVER.length - 1 && (
                  <div aria-hidden className="absolute inset-x-0 bottom-0 flex items-center gap-3 text-chalk">
                    <Scissors size={14} className="shrink-0 -rotate-90" />
                    <motion.span
                      className="h-0 flex-1 origin-left border-t-[1.5px] border-dashed border-chalk"
                      initial={reduce ? false : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 1 }}
                      transition={{ duration: 1.1, ease: EASE }}
                    />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
