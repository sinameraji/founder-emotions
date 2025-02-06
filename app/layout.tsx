import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Head from 'next/head';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emotional Compass For The Trenches",
  description: "The best free content for the realest startup emotions, curated by founders who have seen things",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <title>Emotional Compass For The Trenches</title>
        <meta property="og:title" content="Emotional Compass For The Trenches" />
        <meta property="og:description" content="The best free content for the realest startup emotions, curated by founders who have seen things" />
        <meta property="og:image" content="https://trenches.learningloop.com/og-pic-trenches.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Emotional Compass For The Trenches" />
        <meta name="twitter:description" content="The best free content for the realest startup emotions, curated by founders who have seen things" />
        <meta name="twitter:image" content="https://trenches.learningloop.com/og-pic-trenches.png" />
      </Head>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
