"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { cn } from "@workspace/design-system/lib/utils";
import {Separator} from "@workspace/design-system/components/separator"

const settingsTabs = [
  { name: "Account", href: "/settings/account" },
  { name: "Customization", href: "/settings/customization" },
  { name: "Keys", href: "/settings/keys" },
  { name: "Subscription", href: "/settings/subscription" },
  { name: "Webhooks", href: "/settings/webhooks" },
];

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@workspace/design-system/components/sidebar"

export default function Page({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 p-2 border-2 border-green-400">
      <ul className="flex gap-4 overflow-x-auto md:flex-col border-2 border-red-400  shrink-0">
        {settingsTabs.map((tab) => (
          <li key={tab.href}>
            <Link href={tab.href}>{tab.name}</Link>
          </li>
        ))}
      </ul>
      <div className="border-yellow-400 border-2 ">{children}</div>
    </div>
  );
}
