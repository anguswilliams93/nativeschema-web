import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AdminProvider } from "@/components/admin-provider";
import { AdminLogin } from "@/components/admin-login";
import { StickyNav } from "@/components/sticky-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Native Schema | Powerful decisions, driven by data",
  description: "Native Schema connects the tools you already use, cleans up the messy data in between, and turns it into Power BI reports your whole team can trust.",
  keywords: ["custom software", "system integration", "automation", "data analytics", "business intelligence", "power bi", "legal tech", "brisbane", "australia"],
  authors: [{ name: "Native Schema" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Native Schema | Powerful decisions, driven by data",
    description: "Native Schema connects the tools you already use, cleans up the messy data in between, and turns it into Power BI reports your whole team can trust.",
    type: "website",
    locale: "en_AU",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('theme');
                const theme = stored || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="dark" storageKey="theme">
          <AdminProvider>
            <StickyNav />
            {children}
            <AdminLogin />
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
