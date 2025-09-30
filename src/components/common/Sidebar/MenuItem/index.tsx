import { FC } from "react";
import { MenuItemProps } from "./types";
import Link from "next/link";

export const MenuItem: FC<MenuItemProps> = ({ icon, label, to, selected }) => {
  return (
    <li className="mb-2 flex items-center">
      {selected && (
        <div className="absolute left-14 w-1 h-6 bg-green-200 rounded-full bg-gradient-to-b from-green-100 to-purple-100" />
      )}
      <Link href={to} className="flex items-center gap-2">
        {icon}
        <span className={`${!selected && "text-gray-400"}`}>{label}</span>
      </Link>
    </li>
  );
};
