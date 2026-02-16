import "@workspace/design-system/styles/globals.css";
import { GeistSans, GeistMono } from "@workspace/design-system/font";

// Providers
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexWithClerkProvider } from "@/providers/convex-with-clerk";
import { ThemeProvider } from "@workspace/design-system/providers/theme-provider";
import { FontProvider } from "@workspace/design-system/providers/font-provider";
import { PostHogProvider } from "@/providers/posthog-provider";

import { APP_DESCRIPTION, APP_NAME } from "@workspace/design-system/content";
import { createMetadata } from "@workspace/seo/metadata";

import { Analytics } from "@vercel/analytics/next";

export const metadata = createMetadata({
  title: "Home",
  description: APP_DESCRIPTION,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        <ClerkProvider>
          {/* <PostHogProvider> */}
          <ConvexWithClerkProvider>
            <ThemeProvider>
              <FontProvider>{children}</FontProvider>
            </ThemeProvider>
          </ConvexWithClerkProvider>
          {/* </PostHogProvider> */}
        </ClerkProvider>
        <Analytics />
      </body>
    </html>
  );
}
