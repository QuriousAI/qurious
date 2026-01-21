import type { ReactNode } from "react";

interface LegalLayoutProps {
  children: ReactNode;
}

export default function LegalLayout({ children }: LegalLayoutProps) {
  return <div className="min-h-screen w-full max-w-5xl">{children}</div>;
}
