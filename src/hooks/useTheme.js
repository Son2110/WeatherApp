import { useState, useEffect } from "react";

export function useTheme() {
  const [darkMode, setDarkMode] = useState(() => {
    //ktra local storage or system preference
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-schema: dark").matches;
  });

  useEffect(() => {
    //cap nhat class dark vao html tag
    document.documentElement.classList.toggle("dark", darkMode);
    //luu preference vao local storage
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [[darkMode]]);

  return {
    darkMode,
    toggleTheme: () => setDarkMode((prev) => !prev),
  };
}
