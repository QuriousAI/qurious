"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { cn } from "@workspace/design-system/lib/utils";
import {Separator} from "@workspace/design-system/components/separator"

import { Tooltip, TooltipTrigger, TooltipContent } from "@workspace/design-system/components/tooltip";
import { Button } from "@workspace/design-system/components/button";


const settingsTabs = [
  { name: "Account", href: "/settings/account" },
  { name: "Customization", href: "/settings/customization" },
  { name: "Subscription", href: "/settings/subscription" },
  { name: "Keys", href: "/settings/keys", disabled:true },
  { name: "Webhooks", href: "/settings/webhooks", disabled:true },
];

export default function Page({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 p-2">
      <ul className="flex gap-4 overflow-x-auto md:flex-col shrink-0">
        {settingsTabs.map((tab) => (
          <li key={tab.href} className="">
            {tab.disabled ? 
        
            <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-not-allowed text-muted-foreground">{tab.name}</span>
            </TooltipTrigger>
            <TooltipContent>
              Coming soon!
            </TooltipContent>
          </Tooltip>:
            <Link href={tab.href}>{tab.name}</Link>
          }
          </li>
        ))}
      </ul>
      <div className="w-1 rounded bg-neutral-800"></div>
      <div>{children}</div>
    </div>
  );
}
