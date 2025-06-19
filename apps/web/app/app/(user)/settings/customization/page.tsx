import { Separator } from "@workspace/ui/src/components/separator";
import { Heading } from "@/components/heading";
import { ContentSettingsBox } from "@/app/(user)/settings/customization/content-setting-box";

export const metadata = {
  title: "Customization Settings | Qurious",
};

export default function CustomizationSettingsPage() {
  return (
    <div className="space-y-2">
      <Heading
        heading="Customization Settings"
        subHeading="Customize your app appearance and preferences."
      />
      <ContentSettingsBox />
    </div>
  );
}
