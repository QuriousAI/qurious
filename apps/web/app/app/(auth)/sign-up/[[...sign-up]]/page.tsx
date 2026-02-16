import { SignUp } from "@clerk/nextjs";
import { createMetadata } from "@workspace/seo/metadata";

export const metadata = createMetadata({
  title: "Sign Up",
  description: "Create a new Qurious account",
});

export default function SignUpPage() {
  return <SignUp />;
}
