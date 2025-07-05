import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post();
      if (!response.ok) {
        throw new Error("Failed to logout");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      router.refresh();
      toast.success("Logged out successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
