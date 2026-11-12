"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { REGIONS, type RegionId } from "./data";
import { Check, Dash } from "./icons";

const EASE = [0.16, 1, 0.3, 1] as const;
const block = {
  initial: { opacity: 0, scale: 0.94, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.94, filter: "blur(4px)" },
  transition: { duration: 0.45, ease: EASE },
};

function Bar({ w, tone = "ink" }: { w: string; tone?: "ink" | "soft" }) {
  return (
    <span
      className={`block h-[5px] rounded-full ${tone === "ink" ? "bg-ink/70" : "bg-ink/15"}`}
      style={{ width: w }}
    />
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1.5 border-b border-ink/15 pb-1 text-[10px] font-semibold tracking-[0.08em] text-violet-ink uppercase">
      {children}
    </p>
  );
}

/** The ResuMax sheet, re-cut per regional convention. Sample data. */
export function RegionResume() {
  const [active, setActive] = useState<RegionId>("us");
  const region = REGIONS.find((r) => r.id === active)!;
  const index = REGIONS.findIndex((r) => r.id === active);

  return (
    <div className="relative">
      {/* Grading lines: one nested outline per region, the active one cut solid */}
      <div className="relative mx-auto w-full max-w-[440px]">
        <div aria-hidden className="pointer-events-none absolute -inset-[34px] hidden sm:block">
          {REGIONS.map((r, i) => {
            const inset = (REGIONS.length - 1 - i) * 8;
            const on = r.id === active;
            return (
              <motion.div
                key={r.id}
                className="absolute rounded-[10px]"
                style={{ inset }}
                animate={{
                  borderColor: on ? "rgb(110 91 196)" : "rgb(142 143 153 / 0.55)",
                  borderWidth: on ? 2 : 1,
                  borderStyle: on ? "solid" : "dashed",
                }}
                transition={{ duration: 0.35 }}
              >
                <motion.span
                  className="measure absolute -top-[9px] bg-tissue px-1.5 text-[9px] uppercase"
                  style={{ right: 14 + i * 76 }}
                  animate={{ color: on ? "#33267a" : "#8e8f99" }}
                >
                  {r.label}
                </motion.span>
              </motion.div>
            );
          })}
        </div>

        {/* The page */}
        <motion.article
          layout
          aria-label={`Sample resume formatted for ${region.long}`}
          className="relative z-10 overflow-hidden rounded-[4px] bg-tissue p-5 text-ink shadow-[0_1px_2px_rgb(31_24_64/0.08),0_18px_40px_-18px_rgb(31_24_64/0.35)] ring-1 ring-ink/10 sm:p-6"
          transition={{ layout: { duration: 0.55, ease: EASE } }}
        >
          <LayoutGroup>
            <motion.header layout className="flex items-start gap-4">
              <AnimatePresence initial={false} mode="popLayout">
                {region.photo && (
                  <motion.div
                    key="photo"
                    layout
                    {...block}
                    className="grid h-14 w-12 shrink-0 place-items-center rounded-[3px] bg-mat/60 text-[11px] font-semibold text-violet-ink"
                    aria-label="Photo"
                  >
                    MO
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div layout className="min-w-0 flex-1">
                <p className="text-[19px] leading-tight font-bold tracking-[-0.02em]">Maya Okafor</p>
                <p className="text-[11px] text-ink-2">Senior Product Designer</p>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[9.5px] text-ink-3">
                  <span>maya@example.com</span>
                  <span>Lisbon, PT</span>
                  <AnimatePresence initial={false} mode="popLayout">
                    {region.dob && (
                      <motion.span key="dob" layout {...block}>
                        Born 14 Mar 1993
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.header>

            <motion.section layout className="mt-4">
              <Heading>Summary</Heading>
              <div className="space-y-1.5">
                <Bar w="96%" /><Bar w="88%" /><Bar w="62%" />
              </div>
            </motion.section>

            <motion.section layout className="mt-4">
              <Heading>Experience</Heading>
              {["Lead Product Designer", "Product Designer"].map((t, i) => (
                <div key={t} className={i ? "mt-3" : ""}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[11px] font-semibold">{t}</p>
                    <p className="measure text-[8.5px] text-ink-3">{i ? "2019–21" : "2021–now"}</p>
                  </div>
                  <div className="mt-1.5 space-y-1.5">
                    <Bar w="90%" tone="soft" /><Bar w="74%" tone="soft" />
                  </div>
                </div>
              ))}
            </motion.section>

            <motion.section layout className="mt-4">
              <Heading>Education</Heading>
              <div className="flex items-baseline justify-between">
                <p className="text-[11px] font-semibold">BA Interaction Design</p>
                <p className="measure text-[8.5px] text-ink-3">2015</p>
              </div>
            </motion.section>

            <AnimatePresence initial={false} mode="popLayout">
              {region.publications && (
                <motion.section key="pubs" layout {...block} className="mt-4">
                  <Heading>Publications</Heading>
                  <div className="space-y-1.5"><Bar w="84%" tone="soft" /><Bar w="70%" tone="soft" /></div>
                </motion.section>
              )}
              {region.referees && (
                <motion.section key="refs" layout {...block} className="mt-4">
                  <Heading>Referees</Heading>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5"><Bar w="80%" tone="soft" /><Bar w="60%" tone="soft" /></div>
                    <div className="space-y-1.5"><Bar w="76%" tone="soft" /><Bar w="54%" tone="soft" /></div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {region.onePage && (
                <motion.div
                  key="limit"
                  layout
                  {...block}
                  className="measure mt-5 flex items-center gap-2 text-[8.5px] text-violet uppercase"
                >
                  <span className="h-px flex-1 border-t border-dashed border-violet" />
                  one-page limit
                  <span className="h-px flex-1 border-t border-dashed border-violet" />
                </motion.div>
              )}
            </AnimatePresence>
          </LayoutGroup>
          <p className="measure absolute right-3 bottom-2 text-[8px] text-ink-3 uppercase">Sample profile</p>
        </motion.article>
      </div>

      {/* Tape-measure rail: choose the region to grade to */}
      <div className="mx-auto mt-12 w-full max-w-[480px]">
        <div
          role="tablist"
          aria-label="Format the sample resume for a region"
          className="relative grid grid-cols-4 rounded-[6px] bg-[#ebe5fd] p-1 shadow-[inset_0_-1px_0_rgb(0_0_0/0.08),0_6px_14px_-8px_rgb(31_24_64/0.35)]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgb(28 24 48 / 0.45) 0 1px, transparent 1px 12px), repeating-linear-gradient(90deg, rgb(28 24 48 / 0.6) 0 1px, transparent 1px 60px)",
            backgroundSize: "100% 6px, 100% 11px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 0, 0 0",
          }}
        >
          {REGIONS.map((r) => {
            const on = r.id === active;
            return (
              <button
                key={r.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(r.id)}
                className={`relative z-10 cursor-pointer px-2 pt-4 pb-2 text-[13px] font-semibold transition-colors duration-200 ${on ? "text-tissue" : "text-ink hover:text-violet-ink"}`}
              >
                {on && (
                  <motion.span
                    layoutId="tape-pill"
                    className="absolute inset-x-0.5 top-2.5 bottom-0.5 -z-10 rounded-[4px] bg-violet-ink"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {r.label}
              </button>
            );
          })}
        </div>

        {/* The cutting list for the active region */}
        <dl className="mt-5 grid grid-cols-5 gap-1 text-center">
          {([
            ["Photo", region.photo],
            ["Birth date", region.dob],
            ["1 page", region.onePage],
            ["Referees", region.referees],
            ["Papers", region.publications],
          ] as const).map(([k, v]) => (
            <div key={k} className="flex flex-col items-center gap-1">
              <dt className="measure text-[9px] text-violet-ink/80 uppercase">{k}</dt>
              <dd className="relative h-5 w-5" aria-label={v ? "included" : "omitted"}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={`${k}-${v}-${index}`}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.25 }}
                    className={`absolute inset-0 grid place-items-center ${v ? "text-violet-ink" : "text-violet-ink/45"}`}
                  >
                    {v ? <Check /> : <Dash />}
                  </motion.span>
                </AnimatePresence>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
