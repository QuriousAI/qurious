"use client";

// import { pages } from "next/dist/build/templates/app-page";
import { useSearchParams } from "next/navigation";
import { useNextStep } from "nextstepjs";
import { useEffect } from "react";

// ShadCN Dialog Animations - Use Motions
const steps = [{
Welcome to Qurious,
I'm Alfred, your assitant. Let me give you a short onboarding.
},
{
  Search pages,
  Explain pricicing,
},
{
  Folder pages,
  Paper pages,
  Settings pages,
},
 Developer Settings
 Webhooks API Keys Public APIS 
{
  Visit the help center, Visit the blog post for updates, Visit the status uptime montirng, Join the discord
  
},
] Give Option To Quit Tour, or Close Button at Top

export const Onboarder = () => {
  const searchParams = useSearchParams();
  const { startNextStep } = useNextStep();

  useEffect(() => {
    if (searchParams.get("onboarding") === "true") {
      startNextStep("tour-1");
    }
  }, [searchParams, startNextStep]);

  return <Dialog></Dialog>;
};
