import { Query } from "node-appwrite";
import { DATABASE_ID, MEMBER_ID, WORKSPACE_ID } from "@/config";
import { getMember } from "../members/utils";
import { Workspace } from "./types";
import { createSessionClient } from "@/lib/appwrite";

export const getWorkspaces = async () => {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();

    const members = await databases.listDocuments(DATABASE_ID, MEMBER_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (members.total === 0) {
      return { documents: [], total: 0 };
    }

    const workspaceIds: string[] = members.documents.map(
      (member) => member.workspaceId
    );

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACE_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
    );

    return workspaces;
  } catch {
    return { documents: [], total: 0 };
  }
};

export const getWorkspace = async (workspaceId: string) => {
  const { account, databases } = await createSessionClient();

  const user = await account.get();

  const member = await getMember({
    databases,
    workspaceId,
    userId: user.$id,
  });

  if (!member) {
    throw new Error("Unauthorized");
  }

  const workspace = await databases.getDocument<Workspace>(
    DATABASE_ID,
    WORKSPACE_ID,
    workspaceId
  );

  return workspace;
};

interface GetWorkspaceInfoProps {
  workspaceId: string;
}

export const getWorkspaceInfo = async ({
  workspaceId,
}: GetWorkspaceInfoProps) => {
  const { databases } = await createSessionClient();
  const workspace = await databases.getDocument(
    DATABASE_ID,
    WORKSPACE_ID,
    workspaceId
  );

  return {
    name: workspace.name,
  };
};
