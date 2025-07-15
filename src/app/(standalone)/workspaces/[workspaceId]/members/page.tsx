import { getCurrent } from "@/features/auth/queries";
import { MemberList } from "@/features/workspaces/components/member-list";
import { redirect } from "next/navigation";

export default async function MembersPage() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return (
    <div className="w-full lg:max-w-xl">
      <MemberList />
    </div>
  );
}
