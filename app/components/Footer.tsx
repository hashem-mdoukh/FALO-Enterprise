import { FaloMark } from "./FaloMark";

const R = "https://resumax-frontend.fly.dev/en";

const COLS = [
  {
    title: "ResuMax",
    links: [
      ["Open the app", R],
      ["Templates", `${R}/templates`],
      ["Pricing", `${R}/pricing`],
      ["Help center", `${R}/help`],
    ],
  },
  {
    title: "Read",
    links: [
      ["About ResuMax", `${R}/about`],
      ["The ResuMax Journal", `${R}/blog`],
      ["Privacy", `${R}/privacy`],
      ["Terms", `${R}/terms-and-conditions`],
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-tissue-soft py-16">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <FaloMark size={30} title="" />
            <span className="text-[19px] font-semibold tracking-[-0.02em] text-ink">
              FALO <span className="font-normal text-ink-2">Enterprise</span>
            </span>
          </div>
          <p className="mt-5 max-w-[22rem] text-[15px] leading-[1.6] text-ink-2">
            Software made to measure. ResuMax is a FALO Enterprise product.
          </p>
        </div>
        {COLS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="measure text-[10px] text-ink-3 uppercase">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-[15px] text-ink-2 transition-colors hover:text-violet-ink hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto mt-14 flex max-w-[1280px] flex-wrap justify-between gap-4 border-t border-ink/10 px-4 pt-6 text-[13px] text-ink-3 sm:px-8">
        <p>© 2026 FALO Enterprise</p>
        <p className="measure text-[10px] uppercase">Measured twice · cut once</p>
      </div>
    </footer>
  );
}
