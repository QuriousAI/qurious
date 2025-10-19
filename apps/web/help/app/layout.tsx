import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Font } from '@workspace/design-system/font';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={Font.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
