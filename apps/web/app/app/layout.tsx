import "@workspace/design-system/styles/globals.css";
import type { Metadata } from "next";
import { GeistSans, GeistMono } from "@workspace/design-system/font";

// Providers
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexWithClerkProvider } from "@/providers/convex-with-clerk";
import { ThemeProvider } from "@workspace/design-system/providers/theme-provider";
import { FontProvider } from "@workspace/design-system/providers/font-provider";

import { APP_DESCRIPTION, APP_NAME } from "@workspace/design-system/content";

import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        <ClerkProvider>
          <ConvexWithClerkProvider>
            <ThemeProvider>
              <FontProvider>{children}</FontProvider>
            </ThemeProvider>
          </ConvexWithClerkProvider>
        </ClerkProvider>
        <Analytics />
      </body>
    </html>
  );
}
