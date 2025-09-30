"use client";

import { Input } from "@/components/common/Input";
import { Search, User } from "lucide-react";
import { FC, useState } from "react";
import { HeaderProps } from "./types";

export const Header: FC<HeaderProps> = ({ dictionary }) => {
  const [search, setSearch] = useState<string>("");

  return (
    <header className="flex flex-col items-start gap-10 mb-14">
      <div className="flex items-center gap-4">
        <User className="size-8 text-green-100" />
        <h2 className="font-bold text-gray-100 text-xl">
          {dictionary.profile}
        </h2>
      </div>
      <Input
        placeholder={dictionary.search_placeholder}
        icon={<Search className="size-5" />}
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
    </header>
  );
};
