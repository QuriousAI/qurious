"use client"; // 👈 important for using DOM APIs in App Router

import { Button } from "@workspace/ui/src/components/button";
import { AppLogo } from "@workspace/ui/src/iconography";
import { toSvg } from "html-to-image";
import { useRef } from "react";

export default function DownloadLogo() {
  const logoRef = useRef<HTMLDivElement>(null);

  const downloadLogo = async () => {
    if (!logoRef.current) return;

    try {
      const dataUrl = await toSvg(logoRef.current);
      const link = document.createElement("a");
      link.download = "logo.svg";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to download logo:", error);
    }
  };

  return (
    <main className="flex items-center justify-center flex-col gap-6">
      <AppLogo ref={logoRef} />
      <Button onClick={downloadLogo}>Download as SVG</Button>
    </main>
  );
}
