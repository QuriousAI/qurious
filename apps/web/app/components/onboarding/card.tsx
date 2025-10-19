"use client";

import React from "react";
import { Step } from "nextstepjs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/design-system/components/card";
import { Button } from "@workspace/design-system/components/button";

interface ShadcnDarkModeCardProps {
  step: Step;
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
  arrow: React.ReactNode;
}

export const ShadcnDarkModeCard = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  skipTour,
  arrow,
}: ShadcnDarkModeCardProps) => {
  return (
    <Card className="w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          {step.icon && <span>{step.icon}</span>}
          {step.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mb-2">{step.content}</div>
        {arrow}
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {currentStep + 1} / {totalSteps}
        </div>

        <div className="flex gap-2">
          {currentStep > 0 && (
            <Button variant="outline" size="sm" onClick={prevStep}>
              Previous
            </Button>
          )}

          <Button size="sm" onClick={nextStep}>
            {currentStep === totalSteps - 1 ? "Finish" : "Next"}
          </Button>

          {step.showSkip && (
            <Button variant="ghost" size="sm" onClick={skipTour}>
              Skip
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
