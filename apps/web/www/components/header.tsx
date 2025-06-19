"use client";

import {
  NavigationMenuItem,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@workspace/ui/src/components/navigation-menu";
import Link from "next/link";
import { MoveRight } from "@workspace/ui/src/iconography";
import { Separator } from "@workspace/ui/src/components/separator";
import { Button } from "@workspace/ui/src/components/button";
import { useEffect, useState } from "react";

import { cn } from "@workspace/ui/src/lib/utils";

const NAVIGATION_LINKS = [
  {
    name: "Product",
    children: [
      {
        name: "Features",
        link: "/features",
        description:
          "Explore Qurious's powerful features for AI-powered learning and knowledge management",
      },
      {
        name: "Pricing",
        link: "/pricing",
        description: "Flexible pricing plans to suit your learning needs",
      },
      {
        name: "Credits",
        link: "/credits",
        description:
          "Learn about our credit system and how to manage your usage",
      },
    ],
  },
  {
    name: "Company",
    children: [
      {
        name: "Contact",
        link: "/contact",
        description: "Get in touch with our team for support or inquiries",
      },
    ],
  },
  {
    name: "Legal",
    children: [
      {
        name: "Privacy Policy",
        link: "/privacy",
        description: "How we protect and handle your data",
      },
      {
        name: "Terms & Conditions",
        link: "/terms",
        description: "Our terms of service and usage conditions",
      },
    ],
  },
  { name: "Blog", link: process.env.NEXT_PUBLIC_WEB_BLOG_URL },
  { name: "Help", link: process.env.NEXT_PUBLIC_WEB_HELP_URL },
];

const NavChild = (props) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={props.href}>
          <div className="">{props.name}</div>
          <div className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {props.description}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

const HeaderNavigationMenu = () => (
  <NavigationMenu viewport={false}>
    <NavigationMenuList className="h-4 gap-4">
      {NAVIGATION_LINKS.map((nl, i) => (
        <>
          {i > 0 && (
            <Separator
              orientation="vertical"
              className="text-muted rounded-full"
            />
          )}
          <NavigationMenuItem>
            {nl.link ? (
              <NavigationMenuLink>
                <Link href={nl.link}>{nl.name}</Link>
              </NavigationMenuLink>
            ) : (
              <>
                <NavigationMenuTrigger className="bg-transparent">
                  {nl.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-sm flex flex-col gap-2">
                    {nl.children.map((nl_x) => (
                      <NavChild
                        name={nl_x.name}
                        description={nl_x.description}
                        href={nl_x.link}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        </>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

export function Header() {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "z-100 top-0 sticky flex transition-all duration-300 items-center justify-between border-b border-neutral-700/80 bg-neutral-800/30 backdrop-blur-sm px-8 py-4 shadow-2xl  w-full",
        isScrolled && "w-3/4 top-4 border rounded-lg"
      )}
    >
      <div className="text-lg">Qurious</div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <HeaderNavigationMenu />
      </div>

      <div className="px-1 text-lg font-semibold">
        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <Link href="http://localhost:3001/sign-up">Get Started</Link>
            <MoveRight strokeWidth={2} className="size-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
