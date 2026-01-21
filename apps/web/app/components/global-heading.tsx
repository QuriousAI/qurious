import type { ReactNode } from "react";
import { InformationTooltip } from "./information-tooltip";

export const Heading = (props: {
  heading: string;
  subHeading?: string;
  tooltip?: string;
  actions?: ReactNode;
  icon: ReactNode;
}) => (
  <div className="flex items-start justify-between gap-4 pb-2">
    <div className="space-y-1">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {props.icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              {props.heading}
            </h1>
            {props.tooltip && <InformationTooltip content={props.tooltip} />}
          </div>
          {props.subHeading && (
            <p className="text-sm text-muted-foreground hidden md:block">
              {props.subHeading}
            </p>
          )}
        </div>
      </div>
    </div>
    {props.actions && <div className="shrink-0">{props.actions}</div>}
  </div>
);
