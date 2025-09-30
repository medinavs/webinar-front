import { TrendingUp } from "lucide-react";
import { FC } from "react";
import { HeaderProps } from "./types";

export const Header: FC<HeaderProps> = ({ dictionary }) => {
  return (
    <header className="flex items-start justify-between mb-10">
      <div className="flex items-center gap-4">
        <TrendingUp className="size-8 text-green-100" />
        <h2 className="font-bold text-gray-100 text-xl">{dictionary.home}</h2>
      </div>
    </header>
  );
};
