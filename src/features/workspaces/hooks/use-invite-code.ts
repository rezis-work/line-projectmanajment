import { useParams } from "next/navigation";

export const useInviteCode = () => {
  const params = useParams();
  const inviteCode = params.inviteCode as string;

  return inviteCode;
};
