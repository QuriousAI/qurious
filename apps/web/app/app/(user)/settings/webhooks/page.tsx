import { Heading } from "@/components/global-heading";
import { Webhook, Construction } from "@workspace/design-system/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/design-system/components/card";
import { createMetadata } from "@workspace/seo/metadata";

export const metadata = createMetadata({
  title: "Webhooks",
  description: "Configure webhooks for real-time notifications",
});

export default function WebhooksSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <Heading
        heading="Webhooks"
        subHeading="Configure webhooks for real-time notifications."
        icon={<Webhook />}
      />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Construction className="h-5 w-5" />
            Coming Soon
          </CardTitle>
          <CardDescription>
            Webhook configuration is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Soon you'll be able to set up webhooks to receive real-time
            notifications when events occur in your Qurious account.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
