"use client";

import { motion, useReducedMotion } from "motion/react";
import { FaloMark } from "./FaloMark";
import { APP_URL } from "./data";
import { Arrow } from "./icons";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Studio() {
  const reduce = useReducedMotion();
  return (
    <section id="studio" className="relative scroll-mt-16 bg-tissue py-28 sm:py-36">
      <div className="mx-auto grid max-w-[1280px] gap-16 px-4 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <div>
          <h2 className="balance font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-[1] font-bold tracking-[-0.035em] text-ink">
            A small studio that builds software the way a tailor cuts cloth.
          </h2>
          <p className="pretty mt-8 max-w-[36rem] text-[18px] leading-[1.65] text-ink-2">
            FALO Enterprise designs focused products. Each one is fitted to a specific job, not stretched to cover every job. We measure first, cut once, and show our working.
          </p>
        </div>

        {/* The workbench: what is on the table */}
        <div className="relative">
          <p className="measure mb-4 text-[10px] text-ink-3 uppercase">On the table</p>
          <motion.a
            href={APP_URL}
            initial={reduce ? false : { opacity: 0, y: 24, rotate: 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: EASE }}
            whileHover={reduce ? undefined : { y: -4, rotate: -0.6 }}
            className="group mat relative block overflow-hidden rounded-[4px] p-7 text-violet-ink shadow-[0_18px_40px_-22px_rgb(31_24_64/0.55)] sm:p-9"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="measure text-[10px] uppercase">Piece 01 · Live · v1.0</p>
                <p className="mt-3 font-display text-[44px] leading-none font-bold tracking-[-0.03em] text-ink">ResuMax</p>
                <p className="mt-4 max-w-[24rem] text-[16px] leading-[1.55] text-violet-ink">
                  The resume builder for people applying across borders: US, Europass, GCC, Asia-Pacific and academic formats built in, with native Arabic RTL.
                </p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-tissue transition-transform duration-300 group-hover:translate-x-1">
                <Arrow size={18} />
              </span>
            </div>
          </motion.a>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 flex items-center gap-5 rounded-[4px] border border-dashed border-chalk/70 p-7 sm:p-9"
          >
            <FaloMark size={30} title="" className="opacity-40 grayscale" />
            <div>
              <p className="measure text-[10px] text-ink-3 uppercase">Piece 02</p>
              <p className="mt-1 text-[16px] text-ink-2">The table has room for the next one.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
