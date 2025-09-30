"use client";
import { FC, useState } from "react";
import { Globe, Moon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ContentProps } from "./types";

export const Content: FC<ContentProps> = ({ dictionary }) => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLang = pathname.split("/")[1] || "pt";
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const handleLanguageChange = (lang: string) => {
    const newPath = pathname.replace(`/${currentLang}`, `/${lang}`);
    router.push(newPath);
  };

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
      return;
    }

    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-6 bg-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="size-10 text-green-200 flex items-center justify-center">
            <Moon className="size-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-100">
              {dictionary.change_theme}
            </h2>
            <p className="text-sm text-gray-300">
              {dictionary.choose_between_light_and_dark}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-2">
          <button
            onClick={() => handleThemeChange("dark")}
            className={`px-4 py-2 rounded-lg border cursor-pointer transition-colors duration-200 ${
              theme === "dark"
                ? "border-green-200 text-green-200"
                : "border-gray-600 text-gray-400"
            }`}
          >
            {dictionary.dark}
          </button>
          <button
            onClick={() => handleThemeChange("light")}
            className={`px-4 py-2 rounded-lg border cursor-pointer transition-colors duration-200 ${
              theme === "light"
                ? "border-green-200 text-green-200"
                : "border-gray-600 text-gray-400"
            }`}
          >
            {dictionary.light}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 bg-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="size-10 text-green-200 flex items-center justify-center">
            <Globe className="size-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-100">
              {dictionary.change_language}
            </h2>
            <p className="text-sm text-gray-300">
              {dictionary.choose_your_preferred_language}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-2">
          <button
            onClick={() => handleLanguageChange("pt")}
            className={`px-4 py-2 rounded-lg border cursor-pointer transition-colors duration-200 ${
              currentLang === "pt"
                ? "border-green-200 text-green-200"
                : "border-gray-600 text-gray-400"
            }`}
          >
            Português
          </button>
          <button
            onClick={() => handleLanguageChange("en")}
            className={`px-4 py-2 rounded-lg border cursor-pointer transition-colors duration-200 ${
              currentLang === "en"
                ? "border-green-200 text-green-200"
                : "border-gray-600 text-gray-400"
            }`}
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
};
