import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [history, setHistory] = useLocalStorage(
    "lakunaart-search-history",
    []
  );

  const saveSearch = useCallback((keyword) => {
    const value = keyword.trim();
    if (!value) return;

    setHistory((prev) => {
      const next = [
        value,
        ...prev.filter(
          (item) => item.toLowerCase() !== value.toLowerCase()
        ),
      ];

      return next.slice(0, 10);
    });
  }, [setHistory]);

  const removeSearch = useCallback((keyword) => {
    setHistory((prev) =>
      prev.filter((item) => item !== keyword)
    );
  }, [setHistory]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const value = useMemo(
    () => ({
      history,
      saveSearch,
      removeSearch,
      clearHistory,
    }),
    [history, saveSearch, removeSearch, clearHistory]
  );

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchHistory = () => useContext(SearchContext);
