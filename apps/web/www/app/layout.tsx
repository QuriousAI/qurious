import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@workspace/ui/src/styles/globals.css";

import { Font } from "@workspace/ui/src/font";

import { Header } from "@/components/header";

import { ThemeProvider } from "@workspace/ui/src/providers/theme-provider";
import { APP_DESCRIPTION, APP_NAME } from "@workspace/ui/src/content";
import { Separator } from "@workspace/ui/src/components/separator";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

const BackgroundGridsAndBlob = () => {
  return (
    /* This is the background container that sits behind all content
        - fixed positioning keeps it in place while scrolling
        - inset-0 makes it fill the entire viewport
        - -z-10 places it behind other content
        - overflow-hidden prevents scrollbars */
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Black background layer that fills the container
          - relative positioning allows absolute positioning of children */}
      <div className="relative h-full w-full bg-black">
        {/* Grid pattern overlay
            - Creates subtle grid lines using CSS gradients
            - Light gray horizontal and vertical lines
            - 14px x 24px grid size
            - Positioned absolutely to fill black background */}
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        {/* Circular gradient blob
            - Creates a soft radial gradient from light gray to black
            - 1000px circular shape slightly offset from top
            - 80% opacity for subtle effect
            - Positioned absolutely over grid pattern */}
        <div className="absolute top-[-10%] right-0 left-0 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)] opacity-80"></div>
      </div>
    </div>
  );
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={Font.className}>
      <body className="antialiased">
        <ThemeProvider>
          <BackgroundGridsAndBlob />
          <div className="flex flex-col items-center justify-center">
            <Header />
            {children}
          </div>
          <Separator />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
