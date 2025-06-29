import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/use-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "TaskCMP - Modern Next.js App",
    template: "%s | TaskCMP"
  },
  description: "A modern Next.js application built with the latest technologies and best practices. Fast, responsive, and beautifully designed.",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Modern Web Development"],
  authors: [{ name: "TaskCMP Team" }],
  creator: "TaskCMP",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://taskcmp.com",
    title: "TaskCMP - Modern Next.js App",
    description: "A modern Next.js application built with the latest technologies and best practices.",
    siteName: "TaskCMP",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskCMP - Modern Next.js App",
    description: "A modern Next.js application built with the latest technologies and best practices.",
    creator: "@taskcmp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen`}>
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
