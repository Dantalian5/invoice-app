import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

const loadTheme = (): Theme => {
  const theme = localStorage.getItem("colorSchemeo");
  if (theme) {
    return theme === "dark" ? "dark" : "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const useThemeStore = create<ThemeState>((set) => ({
  theme: loadTheme(),
  toggleTheme: () => {
    set((state) => {
      const newColorScheme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("colorScheme", newColorScheme);
      return { theme: newColorScheme };
    });
  },
}));
export default useThemeStore;
