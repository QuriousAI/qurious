import {
  CircleHelp,
  CreditCard,
  Folders,
  Home,
  NotebookPen,
  Search,
  Settings,
  SlashIcon,
  User,
  UserCog,
} from "@workspace/ui/src/iconography";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@workspace/ui/src/components/card";
import React, {
  ReactNode,
  ReactPortal,
  ReactElement,
  JSXElementConstructor,
  JSX,
  useState,
  useEffect,
} from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@workspace/ui/src/components/command";
import { SidebarTrigger } from "@workspace/ui/src/components/sidebar";
import Link from "next/link";

import posthog from "posthog-js";

const CommandTrigger = (props) => {
  return (
    <div
      onClick={() => props.setOpen(true)}
      className="flex items-center gap-4 justify-between py-0.75 border bg-background text-sm text-muted-foreground rounded-full px-3 hover:brightness-150 transition duration-300 hover:cursor-pointer"
    >
      <div className="items-center gap-2 hidden 2xl:flex">
        <SlashIcon className="size-4" /> Jump to anything...
      </div>
      <div className="gap-1 flex">
        <kbd className="rounded-md bg-sidebar font-bold px-1.5">⌘</kbd>
        <kbd className="rounded-md bg-sidebar font-bold px-1.5">K</kbd>
      </div>
    </div>
  );
};

export function Cmdk() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
        posthog.capture("cmdk_opened_keyboard");
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <CommandTrigger setOpen={setOpen} />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="App">
            <CommandItem
              onSelect={() => {
                router.push("/");
                setOpen(false);
              }}
            >
              <Home /> Home
            </CommandItem>

            <CommandItem
              onSelect={() => {
                router.push("/folders");
                setOpen(false);
              }}
            >
              <Folders /> Folders
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem
              onSelect={() => {
                router.push("/account");
                setOpen(false);
              }}
            >
              <UserCog /> Account
            </CommandItem>

            <CommandItem
              onSelect={() => {
                router.push("/subscription");
                setOpen(false);
              }}
            >
              <CreditCard /> Subscription
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
