import { SignIn } from "@clerk/nextjs";
import { createMetadata } from "@workspace/seo/metadata";

export const metadata = createMetadata({
  title: "Sign In",
  description: "Sign in to your Qurious account",
});

export default function SignInPage() {
  return <SignIn />;
}
