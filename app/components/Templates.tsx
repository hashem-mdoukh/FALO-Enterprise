"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { APP_URL, TEMPLATES, TEMPLATES_URL } from "./data";
import { Arrow } from "./icons";

export function Templates() {
  const reduce = useReducedMotion();
  return (
    <section id="templates" className="mat relative scroll-mt-16 overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="balance max-w-[16ch] font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-[1] font-bold tracking-[-0.035em] text-ink">
            Six cuts, one for every kind of career.
          </h2>
          <a href={TEMPLATES_URL} className="inline-flex items-center gap-2 text-[15px] font-semibold text-violet-ink underline decoration-violet-ink/40 hover:decoration-violet-ink">
            Browse the template studio <Arrow size={15} />
          </a>
        </div>
      </div>

      {/* Hanging rail */}
      <div className="relative mt-16">
        <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,#7d7c88,#c9cad1,#8a8b95)] shadow-[0_2px_3px_rgb(31_24_64/0.25)]" />
        <ul className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pt-0 pb-10 [scrollbar-width:thin] sm:px-8 lg:mx-auto lg:grid lg:max-w-[1280px] lg:grid-cols-6 lg:gap-5 lg:overflow-visible">
          {TEMPLATES.map((t, i) => (
            <motion.li
              key={t.slug}
              className="w-[230px] shrink-0 snap-start lg:w-auto"
              style={{ transformOrigin: "50% 0%" }}
              initial={reduce ? false : { rotate: i % 2 ? 4 : -4, y: -20, opacity: 0 }}
              whileInView={{ rotate: 0, y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 90, damping: 9, delay: i * 0.07 }}
              whileHover={reduce ? undefined : { rotate: i % 2 ? 2.2 : -2.2, transition: { type: "spring", stiffness: 160, damping: 7 } }}
            >
              <a href={`${APP_URL}/resume/preview?template=${t.q}`} className="group block">
                {/* Thread */}
                <span aria-hidden className="mx-auto block h-10 w-[1.5px] bg-violet-ink/70" />
                <div className="tissue relative rounded-[3px] p-2.5">
                  <span aria-hidden className="absolute top-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-mat ring-1 ring-violet-ink/30" />
                  <div className="relative mt-3 aspect-[2382/3369] overflow-hidden rounded-[2px] bg-tissue-soft">
                    <Image
                      src={`/templates/${t.slug}.webp`}
                      alt={`${t.name} resume template preview`}
                      fill
                      sizes="(min-width:1024px) 200px, 230px"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  {/* Spec label grid: name / field / tagline */}
                  <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-2 border-t border-ink/12 pt-2.5 text-[11px] leading-snug">
                    <dt className="measure text-[8.5px] text-ink-3 uppercase">Name</dt>
                    <dd className="font-bold text-ink">{t.name}</dd>
                    <dt className="measure text-[8.5px] text-ink-3 uppercase">Field</dt>
                    <dd className="text-ink-2">{t.field}</dd>
                    <dt className="measure text-[8.5px] text-ink-3 uppercase">Cut</dt>
                    <dd className="text-ink-2">{t.tagline}{t.free && <span className="measure ml-1.5 rounded-sm bg-mat px-1 py-px text-[8px] text-violet-ink uppercase">Free</span>}</dd>
                  </dl>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
      <p className="mx-auto max-w-[1280px] px-4 text-[14px] text-violet-ink sm:px-8">
        Every layout is built with a clean, parseable structure, in English or Arabic, for A4 or US Letter.
      </p>
    </section>
  );
}
