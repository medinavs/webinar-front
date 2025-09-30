import { Settings } from "lucide-react";
import { FC } from "react";
import { HeaderProps } from "./types";

export const Header: FC<HeaderProps> = ({ dictionary }) => {
  return (
    <header className="flex items-start justify-between mb-14">
      <div className="flex items-center gap-4">
        <Settings className="size-8 text-green-100" />
        <h2 className="font-bold text-gray-100 text-xl">
          {dictionary.settings}
        </h2>
      </div>
    </header>
  );
};
