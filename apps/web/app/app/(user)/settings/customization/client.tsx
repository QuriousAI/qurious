"use client";

import { Label } from "@workspace/design-system/components/label";
import {
  Type,
  Sun,
  Moon,
  Monitor,
  User,
  FileText,
} from "@workspace/design-system/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/design-system/components/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/design-system/components/card";
import { InformationTooltip } from "@/components/information-tooltip";
import { useFont } from "@workspace/design-system/providers/font-provider";
import { useTheme } from "next-themes";
import { Textarea } from "@workspace/design-system/components/textarea";

export const ContentSettingsBox = () => {
  const { font, setFont } = useFont();
  const { theme, setTheme } = useTheme();
  const summarySettingsPlaceholder = `e.g. Concise summary highlighting main results and conclusions
e.g. Focus on statistical findings and key takeaways
e.g. Summarize methods in detail, skip introduction
e.g. Bullet-point format with links to cited studies`;
  const userInfoPlaceholder = `e.g. PhD student in neuroscience, interested in cognitive bias and decision-making
e.g. Clinical researcher focusing on oncology trials and drug efficacy
e.g. Machine learning enthusiast with a background in economics
e.g. Masters in sociology, looking for papers on behavioral trends`;

  return (
    <div className="space-y-6">
      {/* Appearance Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize how Qurious looks and feels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Font Family</Label>
                <InformationTooltip content="Choose your preferred font family for the interface." />
              </div>
              <Select
                value={font}
                onValueChange={(value: "sans" | "mono") => setFont(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sans">
                    <span className="font-sans">Sans Serif</span>
                  </SelectItem>
                  <SelectItem value="mono">
                    <span className="font-mono">Monospace</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Theme</Label>
                <InformationTooltip content="Choose your preferred color theme." />
              </div>
              <Select
                value={theme || "system"}
                onValueChange={(value: string) => setTheme(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <span className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      Light
                    </span>
                  </SelectItem>
                  <SelectItem value="dark">
                    <span className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      Dark
                    </span>
                  </SelectItem>
                  <SelectItem value="system">
                    <span className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      System
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Personalization Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            AI Personalization
          </CardTitle>
          <CardDescription>
            Help us tailor the AI experience to your needs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">About You</Label>
              <InformationTooltip content="Tell us a bit about yourself to improve your experience (e.g., field of study, role, interests)." />
            </div>
            <Textarea
              className="min-h-[120px] resize-none"
              placeholder={userInfoPlaceholder}
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary Preferences Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Summary Preferences
          </CardTitle>
          <CardDescription>
            Customize how paper summaries are generated.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Summary Style</Label>
              <InformationTooltip content="Choose how detailed and personalized you'd like your summaries to be." />
            </div>
            <Textarea
              className="min-h-[120px] resize-none"
              placeholder={summarySettingsPlaceholder}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
