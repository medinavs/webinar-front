import { FC } from "react";
import { ProfileDetailItemProps } from "./types";

export const ProfileItem: FC<ProfileDetailItemProps> = ({
  icon,
  info,
  label,
}) => {
  return (
    <div className="flex gap-5">
      <span className="size-8 text-green-100 flex items-center justify-center">
        {icon}
      </span>
      <div>
        <h2 className="font-bold text-gray-100 text-xl">{info}</h2>
        <p className="text-sm text-gray-300">{label}</p>
      </div>
    </div>
  );
};
