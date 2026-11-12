"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* "Product Lead" re-forms, letter by letter, into "Product Manager". */
function KeywordMorph() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const FROM = "Lead";
  const TO = "Manager";
  const [text, setText] = useState(FROM);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setText(TO); setDone(true); return; }
    const glyphs = "abcdefghijklmnopqrstuvwxyz";
    let frame = 0;
    const total = 22;
    const id = setInterval(() => {
      frame++;
      const settled = Math.floor((frame / total) * TO.length);
      let out = "";
      for (let i = 0; i < TO.length; i++) {
        out += i < settled ? TO[i] : i === 0 ? "M" : glyphs[(i * 7 + frame * 3) % 26];
      }
      setText(out);
      if (frame >= total) { clearInterval(id); setText(TO); setDone(true); }
    }, 55);
    return () => clearInterval(id);
  }, [inView, reduce]);

  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2">
      <span>Product</span>
      <span ref={ref} className="relative inline-block">
        <span aria-hidden className={`measure transition-colors duration-500 ${done ? "text-pass" : "text-flag"}`}>{text}</span>
        <span className="sr-only">Manager</span>
        <motion.span
          aria-hidden
          className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-pass"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: done ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </span>
    </span>
  );
}

function MergedColumns() {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-[120px] overflow-hidden rounded-[4px] bg-tissue p-4 ring-1 ring-ink/10" aria-hidden>
      <div className="grid h-full grid-cols-2 gap-4">
        {[0, 1].map((c) => (
          <motion.div
            key={c}
            className="space-y-2"
            initial={false}
            whileInView={reduce ? undefined : { x: c === 0 ? "48%" : "-48%", opacity: 0.9 }}
            viewport={{ once: true, amount: 0.9 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
          >
            {[92, 70, 84, 60].map((w, i) => (
              <span key={i} className={`block h-[6px] rounded-full ${c ? "bg-flag/55" : "bg-ink/55"}`} style={{ width: `${w}%` }} />
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MissingSkills() {
  const reduce = useReducedMotion();
  return (
    <div className="flex h-[120px] flex-col justify-center gap-2.5 rounded-[4px] bg-tissue p-4 ring-1 ring-ink/10" aria-hidden>
      {[86, 64, 78].map((w, i) => (
        <div key={i} className="flex items-center gap-3">
          <motion.span
            className="h-2 w-14 rounded-full bg-chalk-light"
            initial={false}
            whileInView={reduce ? undefined : { opacity: 0.25 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
          />
          <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-ink/8">
            <motion.span
              className="absolute inset-y-0 left-0 rounded-full bg-violet"
              initial={{ width: `${w}%` }}
              whileInView={reduce ? undefined : { width: "0%" }}
              viewport={{ once: true, amount: 0.9 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 + i * 0.12 }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

const FAULTS = [
  {
    title: "Columns merged",
    body: "A two-column layout gets read straight across. Your job titles fuse into one run-on line.",
    demo: <MergedColumns />,
  },
  {
    title: "Wording didn't match",
    body: "The posting says Product Manager. Your resume says Product Lead. The ranking sees no match.",
    demo: (
      <div className="flex h-[120px] items-center rounded-[4px] bg-tissue p-4 text-[26px] font-bold tracking-[-0.02em] text-ink ring-1 ring-ink/10">
        <KeywordMorph />
      </div>
    ),
  },
  {
    title: "Skills went missing",
    body: "Skills drawn as a chart or an icon row carry no text, so nothing gets read at all.",
    demo: <MissingSkills />,
  },
];

export function Problem() {
  return (
    <section id="resumax" className="mat-steel relative scroll-mt-16 py-28 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <h2 className="balance font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-[1] font-bold tracking-[-0.035em] text-ink">
            Most resumes are cut for the wrong reader.
          </h2>
          <p className="pretty max-w-[32rem] text-[18px] leading-[1.6] text-ink">
            Your resume isn&rsquo;t rejected by a robot. It&rsquo;s ranked by one, then skimmed by a person in about seven seconds, against hundreds of others.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {FAULTS.map((f) => (
            <div key={f.title} className="rounded-[4px] bg-tissue/55 p-5 ring-1 ring-ink/10">
              {f.demo}
              <h3 className="mt-6 text-[20px] font-bold tracking-[-0.015em] text-ink">{f.title}</h3>
              <p className="pretty mt-2 text-[15.5px] leading-[1.6] text-ink">{f.body}</p>
            </div>
          ))}
        </div>

        <figure className="mt-16 grid gap-6 border-t border-ink/20 pt-8 md:grid-cols-[auto_1fr] md:items-baseline md:gap-12">
          <p className="font-display text-[clamp(3.5rem,7vw,6rem)] leading-none font-bold tracking-[-0.04em] text-ink">88%</p>
          <div>
            <blockquote className="pretty max-w-[40rem] text-[19px] leading-[1.5] font-medium text-ink">
              of employers say qualified candidates get filtered out because their wording didn&rsquo;t match the job description.
            </blockquote>
            <figcaption className="measure mt-3 text-[10.5px] text-ink-2 uppercase">
              Harvard Business School &amp; Accenture, <cite className="not-italic">Hidden Workers</cite>, 2021
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
