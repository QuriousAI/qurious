import { Heading } from "@/components/global-heading";
import { ContentSettingsBox } from "./client";
import { Palette } from "@workspace/design-system/icons";
import { createMetadata } from "@workspace/seo/metadata";

export const metadata = createMetadata({
  title: "Customization Settings",
  description: "Customize your AI preferences and appearance",
});

export default function CustomizationSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <Heading
        heading="Customization Settings"
        subHeading="Customize your AI preferences and appearance."
        icon={<Palette />}
      />
      <ContentSettingsBox />
    </div>
  );
}
