import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AdminProvider } from "@/components/admin-provider";
import { AdminLogin } from "@/components/admin-login";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Native Schema | Building Smarter Systems",
  description: "Technology company specializing in custom software, system integrations, and data-driven automation for service businesses. We build smart systems that empower businesses to work smarter and scale faster.",
  keywords: ["custom software", "system integration", "automation", "data analytics", "business intelligence", "legal tech", "Brisbane", "Australia"],
  authors: [{ name: "Native Schema" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Native Schema | Building Smarter Systems",
    description: "Technology company specializing in custom software, system integrations, and data-driven automation for service businesses.",
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="dark" storageKey="theme">
          <AdminProvider>
            {children}
            <AdminLogin />
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
