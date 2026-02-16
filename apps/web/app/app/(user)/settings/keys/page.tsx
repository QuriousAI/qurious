import { Heading } from "@/components/global-heading";
import { Key, Construction } from "@workspace/design-system/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/design-system/components/card";
import { createMetadata } from "@workspace/seo/metadata";

export const metadata = createMetadata({
  title: "API Keys",
  description: "Manage your API keys for external integrations",
});

export default function KeysSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <Heading
        heading="API Keys"
        subHeading="Manage your API keys for external integrations."
        icon={<Key />}
      />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Construction className="h-5 w-5" />
            Coming Soon
          </CardTitle>
          <CardDescription>
            API key management is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Soon you'll be able to create and manage API keys for integrating
            Qurious with your own applications and workflows.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
