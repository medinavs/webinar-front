import { FC } from "react";
import { UsersAvatarProps } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UsersAvatar: FC<UsersAvatarProps> = ({
  users,
  maxAvatarsToShow = 4,
}) => {
  return (
    <div className="flex -space-x-[0.45rem]">
      {users.slice(0, maxAvatarsToShow).map((user) => (
        <Avatar key={user.id} className="w-8 h-8 border-2 border-gray-800">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback className="bg-gray-600 text-gray-300">
            {user.name && user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
};
