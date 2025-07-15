import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MembersAvatarProps {
  name: string;
  className?: string;
  fallbackClassName?: string;
}

export const MembersAvatar = ({
  name,
  className,
  fallbackClassName,
}: MembersAvatarProps) => {
  return (
    <Avatar
      className={cn(
        "size-5 transition border rounded-full border-neutral-300",
        className
      )}
    >
      <AvatarFallback
        className={cn(
          "text-white bg-blue-600 font-semibold uppercase rounded-md",
          fallbackClassName
        )}
      >
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};
