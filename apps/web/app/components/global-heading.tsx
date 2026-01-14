import type { ReactNode } from "react";
import { InformationTooltip } from "./information-tooltip";

export const Heading = (props: {
  heading: string;
  subHeading?: string;
  tooltip?: string;
  actions?: ReactNode;
  icon: ReactNode;
}) => (
  <div className="flex-row items-center justify-between space-y-2">
    
    <div className="flex flex-col px-2 border-l border-l-4">
      <div className="flex items-center gap-2">
        {props.icon}
        <div className="text-2xl font-semibold">{props.heading}</div>
        {props.tooltip && <InformationTooltip content={props.tooltip} />}
      </div>
      <div className="text-muted-foreground hidden md:block">{props.subHeading}</div>
    </div>

    <div className="">{props.actions}</div>
  </div>
);
