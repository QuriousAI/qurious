import { Heading } from "@/components/global-heading";
import { ContentSettingsBox } from "./client";
import { Palette } from "@workspace/design-system/icons";

export const metadata = {
  title: "Customization Settings | Qurious",
};

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
