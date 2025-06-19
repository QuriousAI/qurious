"use client";

import { useSearchParams } from "next/navigation";
import { useNextStep } from "nextstepjs";
import { useEffect } from "react";

const Onboarder = () => {
  const searchParams = useSearchParams();
  const { startNextStep } = useNextStep();

  useEffect(() => {
    if (searchParams.get("onboarding") === "true") {
      startNextStep("tour-1");
    }
  }, [searchParams, startNextStep]);

  return null;
};

export default Onboarder;
