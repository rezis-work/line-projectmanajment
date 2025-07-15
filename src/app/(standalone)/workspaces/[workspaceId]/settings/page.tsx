import { getCurrent } from "@/features/auth/queries";
import { getWorkspace } from "@/features/workspaces/queries";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";

interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceSettingsPage = async ({ params }: WorkspaceIdPageProps) => {
  const { workspaceId } = params;
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getWorkspace(workspaceId);

  if (!initialValues) redirect("/workspaces");

  return (
    <div className="w-full lg:max-w-xl mx-auto">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceSettingsPage;
