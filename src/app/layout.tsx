import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation, Footer } from '@/components/layout';
import { CustomCursor } from '@/components/ui';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description: "A visually rich and interactive portfolio website showcasing creative development work with modern animations and 3D experiences.",
  keywords: ["portfolio", "developer", "creative", "web development", "React", "Next.js", "GSAP", "animations"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Portfolio | Creative Developer",
    description: "A visually rich and interactive portfolio website",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-white`}
      >
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
