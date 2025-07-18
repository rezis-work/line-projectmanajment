import { getCurrent } from "@/features/auth/queries";
import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const user = await getCurrent();

  if (user) redirect("/");
  return <SignUpCard />;
}
