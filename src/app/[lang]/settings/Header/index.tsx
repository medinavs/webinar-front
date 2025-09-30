import { Settings } from "lucide-react";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="flex items-start justify-between mb-14">
      <div className="flex items-center gap-4">
        <Settings className="size-8 text-green-100" />
        <h2 className="font-bold text-gray-100 text-xl">Configurações</h2>
      </div>
    </header>
  );
};
