import { FC } from "react";
import { UsersAvatarProps } from "./types";

export const UsersAvatar: FC<UsersAvatarProps> = ({
  users,
  maxAvatarsToShow = 4,
}) => {
  return (
    <div className="flex -space-x-[0.45rem]">
      {users.slice(0, maxAvatarsToShow).map((user) => (
        <img
          key={user.id}
          className="ring-purple-200 rounded-full ring-1"
          src={user.avatarUrl}
          width={24}
          height={24}
          alt={`Avatar ${user.name}`}
        />
      ))}
    </div>
  );
};

export const UsersAvatarMock: FC = () => {
  return (
    <div className="flex -space-x-[0.45rem]">
      <img
        className="ring-purple-200 rounded-full ring-1"
        src="https://randomuser.me/api/portraits/men/32.jpg"
        width={24}
        height={24}
        alt="Avatar 01"
      />
      <img
        className="ring-purple-200 rounded-full ring-1"
        src="https://randomuser.me/api/portraits/women/44.jpg"
        width={24}
        height={24}
        alt="Avatar 02"
      />
      <img
        className="ring-purple-200 rounded-full ring-1"
        src="https://randomuser.me/api/portraits/men/65.jpg"
        width={24}
        height={24}
        alt="Avatar 03"
      />
      <img
        className="ring-purple-200 rounded-full ring-1"
        src="https://randomuser.me/api/portraits/women/12.jpg"
        width={24}
        height={24}
        alt="Avatar 04"
      />
    </div>
  );
};
