import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In | Qurious",
};

export default function SignInPage() {
  return <SignIn />;
}
