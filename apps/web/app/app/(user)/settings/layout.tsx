"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@workspace/design-system/lib/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@workspace/design-system/components/tooltip";
import {
  UserCog,
  Palette,
  CreditCard,
  Key,
  Webhook,
  Settings,
} from "@workspace/design-system/icons";

const settingsTabs = [
  { name: "Account", href: "/settings/account", icon: UserCog },
  { name: "Customization", href: "/settings/customization", icon: Palette },
  { name: "Subscription", href: "/settings/subscription", icon: CreditCard },
  { name: "Keys", href: "/settings/keys", icon: Key, disabled: true },
  {
    name: "Webhooks",
    href: "/settings/webhooks",
    icon: Webhook,
    disabled: true,
  },
];

export default function Page({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-4 p-4 md:p-6">
      {/* Sidebar Navigation */}
      <aside className="shrink-0 md:w-44">
        <div className="flex items-center gap-2 mb-4 px-3">
          <Settings className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Settings</h2>
        </div>
        <nav className="flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;

            if (tab.disabled) {
              return (
                <Tooltip key={tab.href}>
                  <TooltipTrigger asChild>
                    <span
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
                        "text-muted-foreground/50 cursor-not-allowed",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="whitespace-nowrap">{tab.name}</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right">Coming soon!</TooltipContent>
                </Tooltip>
              );
            }

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="whitespace-nowrap">{tab.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Divider */}
      <div className="hidden md:block w-px bg-border" />

      {/* Main Content */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
