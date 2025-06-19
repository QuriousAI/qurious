import type { ReactNode } from "react";
import { InformationToolTip } from "./info-tooltip";
import { Folders } from "@workspace/ui/src/iconography";

export const Heading = (props: {
  heading: string;
  subHeading?: string;
  tooltip?: string;
  actions?: ReactNode;
  icon: ReactNode;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex flex-col px-2 border-l border-l-4">
      <div className="flex items-center gap-2">
        {props.icon}
        <div className="text-2xl font-semibold">{props.heading}</div>
        {props.tooltip && <InformationToolTip content={props.tooltip} />}
      </div>
      <div className="text-muted-foreground">{props.subHeading}</div>
    </div>
    <div className="">{props.actions}</div>
  </div>
);
