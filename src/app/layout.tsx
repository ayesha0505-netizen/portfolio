import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayesha Naaz — Aspiring Software Developer | Learning. Building. Growing.",
  description:
    "Portfolio of Ayesha Naaz - Information Technology student at Narula Institute of Technology passionate about building web and mobile applications with React, Next.js, and TypeScript.",
  keywords: [
    "Ayesha Naaz",
    "Software Developer",
    "IT Student",
    "Narula Institute of Technology",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Mobile Development",
  ],
  authors: [{ name: "Ayesha Naaz" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Ayesha Naaz — Aspiring Software Developer",
    description:
      "Information Technology student passionate about building web and mobile applications with React, Next.js, and TypeScript.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-full flex flex-col font-body-md text-on-surface bg-surface selection:bg-primary-container selection:text-on-primary">
        {children}
      </body>
    </html>
  );
}
