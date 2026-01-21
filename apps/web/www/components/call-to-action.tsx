import { TAILWIND_GRADIENT_TEXT } from "@/utils/tailwind-gradient";
import { Button } from "@workspace/design-system/components/button";
import Link from "next/link";

export const CallToAction = () => (
  <div className="self-center flex flex-col items-center gap-6 py-20 px-10 border border-y-2 border-dashed">
    <div className="flex flex-col items-center gap-2">
      <div className={`text-6xl font-bold ${TAILWIND_GRADIENT_TEXT}`}>
        Become an Early Adopter.
      </div>
      <div className="text-xl text-muted-foreground">
        Start free. Upgrade only when you're impressed.
      </div>
    </div>
    <div className="flex gap-4">
      <Button variant="default" className="text-xl py-6" size="lg">
        <Link href={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/sign-up`}>
          Get Started
        </Link>
        {/* <MoveRight strokeWidth={2.75} className="size-6" /> */}
      </Button>
      <Button variant="secondary" className="text-xl py-6" size="lg">
        <Link href="/pricing">View Pricing</Link>
        {/* <MoveRight strokeWidth={2.75} className="size-6" /> */}
      </Button>
    </div>
  </div>
);
