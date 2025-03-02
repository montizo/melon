"use client";

import { useEffect, useState } from "react";

export default function ThemeSettingsPage() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) return storedTheme;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex-2 p-16">
      <div className="bg-[#181818] dark:bg-[#181818] border-[1.5px] border-blue-500 dark:border-[#222222] p-8 rounded-2xl w-full grid gap-4">
        <h2 className="text-3xl font-semibold text-white">Appearance</h2>
        <button
          onClick={() => setTheme("dark")}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg"
        >
          Dark Mode
        </button>
        <button
          onClick={() => setTheme("light")}
          className="px-4 py-2 bg-gray-200 text-black rounded-lg"
        >
          Light Mode
        </button>
      </div>
    </div>
  );
}
