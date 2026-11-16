export const APP_URL = "https://resumax-frontend.fly.dev/en";
export const SIGNUP_URL = "https://resumax-frontend.fly.dev/en/createaccount";
export const TEMPLATES_URL = "https://resumax-frontend.fly.dev/en/templates";

export type RegionId = "us" | "europass" | "gcc" | "academic";

/* Verified from the Resumax AI multi-region table. */
export const REGIONS: {
  id: RegionId;
  label: string;
  long: string;
  photo: boolean;
  dob: boolean;
  onePage: boolean;
  referees: boolean;
  publications: boolean;
}[] = [
  { id: "us", label: "US", long: "US / Canada", photo: false, dob: false, onePage: true, referees: false, publications: false },
  { id: "europass", label: "Europass", long: "EU Europass", photo: true, dob: true, onePage: false, referees: true, publications: false },
  { id: "gcc", label: "GCC", long: "GCC / Middle East", photo: true, dob: true, onePage: false, referees: true, publications: false },
  { id: "academic", label: "Academic", long: "Academic CV", photo: false, dob: false, onePage: false, referees: true, publications: true },
];

/* Verified product flow. */
export const STEPS = [
  {
    verb: "Answer",
    count: 7,
    unit: "questions",
    body: "Seven questions about your purpose, field, target role, education and skills. Resumax AI picks the layout that fits you and fills your first draft before you type a word.",
  },
  {
    verb: "Draft",
    count: 6,
    unit: "sections",
    body: "Contact, summary, skills, experience, projects and education. Drag to reorder them. Every change saves itself.",
  },
  {
    verb: "Tailor",
    count: 7,
    unit: "purposes",
    body: "Your title, summary and experience are rewritten for what you are actually applying to — a job, an internship, a scholarship, a promotion.",
  },
  {
    verb: "Export",
    count: 2,
    unit: "formats",
    body: "Change the template, accent colour, font and scale and watch the page update. Download the finished sheet as a PDF or a JPG.",
  },
] as const;

/* Verified ATS parse report (sample). */
export const CHECKS = [
  { label: "Standard section headings", ok: true },
  { label: "Consistent date format", ok: true },
  { label: "Contact block detected", ok: true },
  { label: "No skills section found", ok: false },
] as const;

/* Verified template catalogue. */
export const TEMPLATES = [
  { slug: "executive", q: "executive", name: "Executive Teal", tagline: "High performance", field: "Finance / Mgmt", body: "Clean margins and a single-column layout for finance, leadership and high-stakes corporate roles.", free: false },
  { slug: "developer", q: "developer", name: "Developer Sidebar", tagline: "Density focus", field: "Tech / STEM", body: "A multi-column layout that puts your technical stack and repositories up front.", free: false },
  { slug: "director", q: "director", name: "Creative Director", tagline: "Artistic edge", field: "Design / Art", body: "Bold, high-contrast and asymmetrical, with refined typography for designers.", free: false },
  { slug: "classic", q: "minimal", name: "Classic ATS", tagline: "Clean cut", field: "Business / General", body: "Distraction-free, with clarity, whitespace and fast scanning.", free: true },
  { slug: "academic", q: "academic", name: "Academic CV", tagline: "Research ready", field: "Education / Research", body: "Publications, research, teaching and graduate applications.", free: false },
  { slug: "global", q: "global", name: "Global Professional", tagline: "International", field: "Global / Remote", body: "Languages, certifications and remote roles, for international applications.", free: false },
] as const;

/* Verified: "Five Things We Will Never Do". */
export const NEVER = [
  {
    title: "We don't invent your achievements.",
    body: "The writer is instructed never to add a metric, project, tool or result your own entries don't contain — and employers, titles, dates and education are never rewritten at all.",
  },
  {
    title: "We don't pad it to fill a page.",
    body: "Summaries are written to 50–90 words and each role to two to four lines. Length is not the same as substance, and recruiters read the second page least.",
  },
  {
    title: "We don't track you.",
    body: "No analytics, no advertising pixels, no third-party cookies anywhere on the site. That is why it has never asked you to accept any.",
  },
  {
    title: "We don't send anything to an AI unless you ask.",
    body: "Nothing leaves your draft in the background. The model runs when you press the button, and not one moment before.",
  },
  {
    title: "We don't keep what you delete.",
    body: "Deleting your account erases every resume, draft and sign-in token in the same operation. There is no archive to ask us about.",
  },
] as const;
