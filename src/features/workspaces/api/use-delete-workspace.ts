import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["$delete"]
>;

export const useDeleteWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspaces[":workspaceId"]["$delete"]({
        param,
      });
      if (!response.ok) {
        throw new Error("Failed to delete workspace");
      }
      return await response.json();
    },
    onSuccess: ({ data: workspace }) => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", workspace.$id] });
      toast.success("Workspace deleted successfully");
      router.push(`/`);
    },
    onError: () => {
      toast.error("Failed to delete workspace");
    },
  });

  return mutation;
};
