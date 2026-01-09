"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { cn } from "@workspace/design-system/lib/utils";

const settingsTabs = [
  { name: "Account", href: "/settings/account" },
  { name: "Customization", href: "/settings/customization" },
  { name: "Keys", href: "/settings/keys" },
  { name: "Subscription", href: "/settings/subscription" },
  { name: "Webhooks", href: "/settings/webhooks" },
];

export default function Page({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="w-full flex md:flex-row gap-8">
      <nav className="border-b mb-6 bg-background">
        <ul className="flex md:flex-col gap-2">
          {settingsTabs.map((tab) => (
            <li key={tab.href}>
              <Link
                href={tab.href}
                // className={cn(
                //   "py-3 px-5 rounded-t-md font-medium text-sm transition-colors hover:text-primary",
                //   pathname === tab.href
                //     ? "bg-muted border-b-2 border-primary text-primary"
                //     : "bg-transparent text-muted-foreground"
                // )}
                prefetch={false}
              >
                {tab.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>{children}</div>
    </div>
  );
}