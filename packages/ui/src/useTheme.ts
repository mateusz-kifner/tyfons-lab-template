"use client";

export type ThemeType = "light" | "dark";

export default function useTheme(defaultValue: ThemeType = "light") {
  if (typeof window !== "undefined") {
    const theme = localStorage.getItem("theme") ?? defaultValue;
    if (theme !== null) {
      if (theme === "light") {
        document.documentElement?.classList.remove("dark");
      } else {
        document.documentElement?.classList.add("dark");
      }
    }
    const setTheme = (value: ThemeType) => {
      if (value === "light") {
        document.documentElement?.classList.remove("dark");
      } else {
        document.documentElement?.classList.add("dark");
      }
      localStorage.setItem("theme", value);
    };
    return {
      theme: theme as ThemeType,
      setTheme,
    };
  }

  return {
    theme: undefined,
    setTheme: undefined,
  };
}
