"use client";

import { Input } from "@/components/common/Input";
import { useDebounce } from "@/hooks/use-debounce";
import { Search, Telescope } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { HeaderProps } from "./types";

export const Header: FC<HeaderProps> = ({ dictionary }) => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }, [debouncedSearch]);

  return (
    <header className="flex items-start justify-between mb-14">
      <div className="flex items-center gap-4">
        <Telescope className="size-8 text-green-100" />
        <h2 className="font-bold text-gray-100 text-xl">
          {dictionary.catalog}
        </h2>
      </div>
      <Input
        placeholder={dictionary.search_placeholder}
        icon={<Search className="size-5" />}
        value={search}
        onChange={({ target }) => setSearch(target.value)}
        className="max-w-sm"
      />
    </header>
  );
};
