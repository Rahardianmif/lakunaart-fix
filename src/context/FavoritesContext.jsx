import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const addFavorite = (artwork) => {
    const exists = favorites.some(
      (item) => item.id === artwork.id
    );

    if (exists) return;

    setFavorites((prev) => [...prev, artwork]);
  };

  const removeFavorite = (id) => {
    setFavorites((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const isFavorite = (id) => {
    return favorites.some(
      (item) => item.id === id
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () =>
  useContext(FavoritesContext);