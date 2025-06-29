import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/use-toast";
import { InstallPrompt } from "@/components/install-prompt";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "TaskCMP - Task Management Board",
    template: "%s | TaskCMP"
  },
  description: "Real-time collaborative task management system with beautiful animations and Firebase sync. Create, manage, and track tasks with your team instantly.",
  keywords: ["Task Management", "Project Management", "Collaboration", "Real-time", "Firebase", "Next.js", "PWA", "Productivity"],
  authors: [{ name: "TaskCMP Team" }],
  creator: "TaskCMP",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TaskCMP",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://taskcmp.com",
    title: "TaskCMP - Task Management Board",
    description: "Real-time collaborative task management system with beautiful animations and Firebase sync.",
    siteName: "TaskCMP",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "TaskCMP Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskCMP - Task Management Board",
    description: "Real-time collaborative task management system with beautiful animations and Firebase sync.",
    creator: "@taskcmp",
    images: ["/icons/icon-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3B82F6" },
    { media: "(prefers-color-scheme: dark)", color: "#1E40AF" },
  ],
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
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TaskCMP" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="mask-icon" href="/icons/icon.svg" color="#3B82F6" />
      </head>
      <body className={`${inter.variable} antialiased min-h-screen`}>
        <main>
          {children}
        </main>
        <Toaster />
        <InstallPrompt />
      </body>
    </html>
  );
}
