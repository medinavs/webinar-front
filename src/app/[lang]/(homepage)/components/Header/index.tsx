import { TrendingUp } from "lucide-react";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="flex items-start justify-between mb-10">
      <div className="flex items-center gap-4">
        <TrendingUp className="size-8 text-green-100" />
        <h2 className="font-bold text-gray-100 text-xl">Início</h2>
      </div>
    </header>
  );
};
