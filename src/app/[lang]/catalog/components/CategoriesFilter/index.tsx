"use client";
import { FC, useState } from "react";
import { CategoriesFilterProps, Category } from "./types";
import { Tag } from "@/components/common/Tag";

export const CategoriesFilter: FC<CategoriesFilterProps> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const handleSelectCategory = (category: Category | null) => {
    setActiveCategory(category);
    const queryStringParams = new URLSearchParams(window.location.search);
    if (category) {
      queryStringParams.set("category", category.name);
    } else {
      queryStringParams.delete("category");
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${queryStringParams.toString()}`
    );
  };

  return (
    <div className="flex flex-wrap gap-3 mb-10">
      <Tag
        active={activeCategory === null}
        onClick={() => handleSelectCategory(null)}
      >
        Todas
      </Tag>
      {categories.map((category) => (
        <Tag
          active={activeCategory?.id === category.id}
          key={category.id}
          onClick={() => handleSelectCategory(category)}
        >
          {category.name}
        </Tag>
      ))}
    </div>
  );
};
