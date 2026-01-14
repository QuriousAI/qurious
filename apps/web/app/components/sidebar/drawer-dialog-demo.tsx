"use client"

import * as React from "react"

import { cn } from "@workspace/design-system/lib/utils"
import { useMediaQuery } from "@workspace/design-system/hooks/use-media-query"
import { Button } from "@workspace/design-system/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/design-system/components/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/design-system/components/drawer"
import { Input } from "@workspace/design-system/components/input"
import { Label } from "@workspace/design-system/components/label"

import {
    ChevronDown,
    CreditCard,
    LogOut,
    Settings,
    Settings2,
    UserCog,
    Palette,
    Brush,Key,Share2
  } from "@workspace/design-system/icons";

import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
  } from "@workspace/design-system/components/tabs";
import {  SubscriptionClient } from "./auth-header"
import { Heading } from "../global-heading"
import { UserProfile } from "@clerk/nextjs"
import { InformationTooltip } from "../information-tooltip"

import { Textarea } from "@workspace/design-system/components/textarea";

import { ScrollArea } from "@workspace/design-system/components/scroll-area"



export const ContentSettingsBox = () => {
    const summarySettingsPlaceholder = `e.g. Concise summary highlighting main results and conclusions\ne.g. Focus on statistical findings and key takeaways\ne.g. Summarize methods in detail, skip introduction\ne.g. Bullet-point format with links to cited studies`;
    const userInfoPlaceholder = `e.g. PhD student in neuroscience, interested in cognitive bias and decision-making\ne.g. Clinical researcher focusing on oncology trials and drug efficacy\ne.g. Machine learning enthusiast with a background in economics\ne.g. Masters in sociology, looking for papers on behavioral trends`;
  
    return (
      <div className="flex flex-col gap-8 rounded-md border bg-card p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Label>What do you do?</Label>
            <InformationTooltip content="Tell us a bit about yourself to improve your experience (e.g., field of study, role, interests)." />
          </div>
          <Textarea
            className="w-full resize-none dark:bg-transparent"
            placeholder={userInfoPlaceholder}
          />
        </div>
  
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Label>How should the summary be?</Label>
            <InformationTooltip content="Choose how detailed and personalized you'd like your summaries to be." />
          </div>
          <Textarea
            className="w-full resize-none dark:bg-transparent"
            placeholder={summarySettingsPlaceholder}
          />
        </div>
  
        <div className="flex gap-4">
          {/* <DeleteSearchHistoryButton />
          <DeleteAllFoldersButton /> */}
        </div>
      </div>
    );
  };

export function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="icon"><Settings2/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}
    preventScrollRestoration={false}
    disablePreventScroll
    noBodyStyles
    >
      <DrawerTrigger asChild>
        <Button variant="icon"><Settings2/></Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4 overflow-y-scroll" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const tabs: {
    triggerName: string;
    triggerValue: string;
    triggerIcon: React.JSX.Element;
    triggerContent: React.JSX.Element;
  }[] = [
    {
      triggerName: "Account",
      triggerValue: "account",
      triggerIcon: <UserCog />,
      triggerContent: (
        <div>
          <Heading
            heading="Account Settings"
            subHeading="Manage your account profile and authentication settings."
          />
          <UserProfile />
        </div>
      ),
    },
    {
      triggerName: "Customization",
      triggerValue: "customization",
      triggerIcon: <Brush />,
      triggerContent: (
        <div>
          <Heading
            heading="Customization Settings"
            subHeading="Customize your AI preferences."
          />
          <ContentSettingsBox />
        </div>
      ),
    },
    {
      triggerName: "Subscription",
      triggerValue: "subscription",
      triggerIcon: <CreditCard />,
      triggerContent: (
        <div>
          <Heading
            heading="Subscription Settings"
            subHeading="Manage your subscription and billing preferences."
          />
          <SubscriptionClient />
        </div>
      ),
    },
    {
      triggerName: "Keys",
      triggerValue: "keys",
      triggerIcon: <Key />,
      triggerContent: <div>Keys settings placeholder.</div>,
    },
    {
      triggerName: "Webhooks",
      triggerValue: "webhooks",
      triggerIcon: <Share2 />,
      triggerContent: <div>Webhooks settings placeholder.</div>,
    },
  ];
  

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <Tabs
            defaultValue="account"
            className="w-full"
          >
            <div>
              <TabsList>
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.triggerValue} value={tab.triggerValue}>
                    {tab.triggerIcon}
                    {tab.triggerName}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {/* Tab Content */}
            <div className="overflow-y-scroll">
                <ScrollArea className="min-h-[100vh]">
                {tabs.map((tab) => (
                    <TabsContent key={tab.triggerValue} value={tab.triggerValue}>
                    {tab.triggerContent}
                  </TabsContent>
                ))}
                </ScrollArea>
            </div>
          </Tabs>
  )
}
