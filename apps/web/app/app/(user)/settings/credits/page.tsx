import { Heading } from "@/components/global-heading";
import { CreditsClient } from "./client";
import { CreditCard } from "@workspace/design-system/icons";
import { createMetadata } from "@workspace/seo/metadata";

export const metadata = createMetadata({
  title: "Credits",
  description: "Manage your credits and billing preferences",
});

export default function CreditsSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <Heading
        heading="Credits"
        subHeading="Manage your credits and billing preferences."
        icon={<CreditCard />}
      />
      <CreditsClient />
    </div>
  );
}
