import { AtsCheck } from "./components/AtsCheck";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { MotionRoot } from "./components/MotionRoot";
import { Nav } from "./components/Nav";
import { Principles } from "./components/Principles";
import { Problem } from "./components/Problem";
import { Process } from "./components/Process";
import { Studio } from "./components/Studio";
import { Templates } from "./components/Templates";

export default function Home() {
  return (
    <MotionRoot>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-tissue">
        Skip to content
      </a>
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <Studio />
        <Problem />
        <Process />
        <AtsCheck />
        <Templates />
        <Principles />
        <FinalCta />
      </main>
      <Footer />
    </MotionRoot>
  );
}
