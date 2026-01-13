// Providers
import { TooltipProvider } from "@workspace/design-system/components/tooltip";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/design-system/components/sidebar";
import { NextStepProvider } from "nextstepjs";
import { Toaster } from "@workspace/design-system/components/sonner";
import { AppSidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { AlphaWarning } from "@/components/alpha-warning";
import { OnboardingSteps } from "@/components/onboarding/steps";
import { CSSProperties } from "react";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <SidebarProvider
        defaultOpen={true}
        style={
          {
            "--sidebar-width": "18rem",
            "--sidebar-width-mobile": "18rem",
          } as CSSProperties
        }
      >
        <TooltipProvider>
          <AlphaWarning />
          <AppSidebar />
          <main className="h-screen flex flex-col p-1 w-full">
            <Header />
            <SidebarInset className="shadow-2xl rounded-2xl border overflow-auto no-scrollbar">
              <Toaster />
              <div className="w-full">
                <div className="max-w-4xl mx-auto p-1.5">{children}</div>
              </div>
            </SidebarInset>
          </main>

        </TooltipProvider>
      </SidebarProvider>
  );
}
