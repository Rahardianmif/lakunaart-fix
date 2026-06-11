import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const RecentlyViewedContext = createContext(null);

export function RecentlyViewedProvider({ children }) {
  const [items, setItems] = useLocalStorage(
    "lakunaart-recently-viewed",
    []
  );

  const addRecentlyViewed = useCallback((artwork) => {
    if (!artwork?.id) return;

    setItems((prev) => {
      const cleaned = prev.filter((item) => item.id !== artwork.id);
      return [artwork, ...cleaned].slice(0, 12);
    });
  }, [setItems]);

  const clearRecentlyViewed = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const value = useMemo(
    () => ({
      recentlyViewed: items,
      addRecentlyViewed,
      clearRecentlyViewed,
    }),
    [items, addRecentlyViewed, clearRecentlyViewed]
  );

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export const useRecentlyViewed = () =>
  useContext(RecentlyViewedContext);
