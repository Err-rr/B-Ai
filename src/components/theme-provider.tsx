"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const DARK_QUERY = "(prefers-color-scheme: dark)";

function subscribeToSystemTheme(callback: () => void) {
  const mql = window.matchMedia(DARK_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSystemTheme(): Theme {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function getServerSystemTheme(): Theme {
  return "light";
}

/**
 * Theme is React state only, seeded from the OS preference — we
 * deliberately do not persist an override to localStorage in this
 * phase (brief constraint). A refresh forgets a manual toggle and
 * falls back to the system preference again.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
    getServerSystemTheme,
  );
  const [override, setOverride] = useState<Theme | null>(null);
  const theme = override ?? systemTheme;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setOverride((current) =>
      (current ?? systemTheme) === "light" ? "dark" : "light",
    );
  }, [systemTheme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
