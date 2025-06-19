import "@workspace/ui/src/styles/globals.css";
import type { Metadata } from "next";
import { Font } from "@workspace/ui/src/font";

// Providers
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexWithClerkProvider } from "@/providers/convex-with-clerk";
import { ThemeProvider } from "@workspace/ui/src/providers/theme-provider";

import { APP_DESCRIPTION, APP_NAME } from "@workspace/ui/src/content";

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
    <html lang="en" className={Font.className}>
      <body className="antialiased">
        <ClerkProvider>
          <ConvexWithClerkProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </ConvexWithClerkProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
