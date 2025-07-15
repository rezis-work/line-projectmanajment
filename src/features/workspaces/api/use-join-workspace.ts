import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"]
>;

export const useJoinWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.workspaces[":workspaceId"]["join"][
        "$post"
      ]({
        param,
        json,
      });
      if (!response.ok) {
        throw new Error("Failed to join workspace");
      }
      return await response.json();
    },
    onSuccess: ({ data: workspace }) => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", workspace.$id] });
      toast.success("Joined workspace successfully");
      router.push(`/workspaces/${workspace.$id}`);
    },
    onError: () => {
      toast.error("Failed to join workspace");
    },
  });

  return mutation;
};
