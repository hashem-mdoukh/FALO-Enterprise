import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Martian_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const martian = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "FALO Enterprise — Software made to measure",
  description:
    "FALO Enterprise is a product studio. Its first piece, ResuMax, tailors one profile into resumes that fit US, Europass, GCC and academic standards — checked line by line, never padded, never invented.",
  icons: { icon: "/falo-mark.svg" },
  openGraph: {
    title: "FALO Enterprise — Software made to measure",
    description:
      "Meet ResuMax: one profile, cut to fit every region you apply to.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#bba9f5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${martian.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
