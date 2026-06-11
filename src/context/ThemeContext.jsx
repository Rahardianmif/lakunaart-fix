import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext(null);

function getSystemTheme() {
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useLocalStorage(
    "lakunaart-theme-mode",
    "system"
  );

  const [resolvedTheme, setResolvedTheme] = useState(() =>
    mode === "system" ? getSystemTheme() : mode
  );

  useEffect(() => {
    const applyTheme = () => {
      const nextTheme = mode === "system" ? getSystemTheme() : mode;
      setResolvedTheme(nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
      document.documentElement.setAttribute("data-theme-mode", mode);
    };

    applyTheme();

    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    media?.addEventListener?.("change", applyTheme);

    return () => {
      media?.removeEventListener?.("change", applyTheme);
    };
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      resolvedTheme,
      toggleTheme: () =>
        setMode((current) => current === "dark" ? "light" : "dark"),
    }),
    [mode, resolvedTheme, setMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
