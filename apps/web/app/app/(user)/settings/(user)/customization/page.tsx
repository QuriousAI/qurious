import { Separator } from "@workspace/design-system/components/separator";
import { Heading } from "@/components/global-heading";
import { ContentSettingsBox } from "./client";
import { Palette } from "@workspace/design-system/icons";

export const metadata = {
  title: "Customization Settings | Qurious",
};

export default function CustomizationSettingsPage() {
  return (
    <div className="space-y-2">
      <Heading
        heading="Customization Settings"
        subHeading="Customize your AI preferences."
        icon={<Palette />}
      />
      <ContentSettingsBox />
    </div>
  );
}
