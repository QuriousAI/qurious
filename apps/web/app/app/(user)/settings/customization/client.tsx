"use client";

import { cn } from "@workspace/design-system/lib/utils";
import { useMediaQuery } from "@workspace/design-system/hooks/use-media-query";
import { Button } from "@workspace/design-system/components/button";
import { Input } from "@workspace/design-system/components/input";
import { Label } from "@workspace/design-system/components/label";
import {
  ChevronDown,
  CreditCard,
  LogOut,
  Settings,
  UserCog,
  Palette,
  Brush,
  Key,
  Share2,
} from "@workspace/design-system/icons";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@workspace/design-system/components/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/design-system/components/select";
import { SubscriptionClient } from "./auth-header";
import { Heading } from "../global-heading";
import { UserProfile } from "@clerk/nextjs";
import { InformationTooltip } from "@/components/information-tooltip";
import { useFont } from "@workspace/design-system/providers/font-provider";
import { useTheme } from "next-themes";
import { Textarea } from "@workspace/design-system/components/textarea";

import { ScrollArea } from "@workspace/design-system/components/scroll-area";

export const ContentSettingsBox = () => {
  const { font, setFont } = useFont();
  const { theme, setTheme } = useTheme();
  const summarySettingsPlaceholder = `e.g. Concise summary highlighting main results and conclusions\ne.g. Focus on statistical findings and key takeaways\ne.g. Summarize methods in detail, skip introduction\ne.g. Bullet-point format with links to cited studies`;
  const userInfoPlaceholder = `e.g. PhD student in neuroscience, interested in cognitive bias and decision-making\ne.g. Clinical researcher focusing on oncology trials and drug efficacy\ne.g. Machine learning enthusiast with a background in economics\ne.g. Masters in sociology, looking for papers on behavioral trends`;

  return (
    <div className="flex flex-col gap-8 rounded-md border bg-card p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Label>Font Family</Label>
          <InformationTooltip content="Choose your preferred font family for the interface." />
        </div>
        <Select value={font} onValueChange={(value: "sans" | "mono") => setFont(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sans">Sans</SelectItem>
            <SelectItem value="mono">Mono</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Label>Theme</Label>
          <InformationTooltip content="Choose your preferred color theme." />
        </div>
        <Select value={theme || "system"} onValueChange={(value: string) => setTheme(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
