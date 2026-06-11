import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const CollectionsContext = createContext(null);

const DEFAULT_COLLECTIONS = [
  {
    id: "inspiration",
    name: "Inspiration",
    description: "Works saved as general visual inspiration.",
    artworks: [],
  },
  {
    id: "japanese-art",
    name: "Japanese Art",
    description: "A personal collection for Japanese art references.",
    artworks: [],
  },
];

function makeId(name) {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
}

export function CollectionsProvider({ children }) {
  const [collections, setCollections] = useLocalStorage(
    "lakunaart-user-collections",
    DEFAULT_COLLECTIONS
  );

  const createCollection = useCallback((name, description = "") => {
    const cleanName = name.trim();
    if (!cleanName) return null;

    const collection = {
      id: makeId(cleanName),
      name: cleanName,
      description,
      artworks: [],
    };

    setCollections((prev) => [collection, ...prev]);
    return collection;
  }, [setCollections]);

  const deleteCollection = useCallback((collectionId) => {
    setCollections((prev) =>
      prev.filter((collection) => collection.id !== collectionId)
    );
  }, [setCollections]);

  const addArtworkToCollection = useCallback((collectionId, artwork) => {
    setCollections((prev) =>
      prev.map((collection) => {
        if (collection.id !== collectionId) return collection;

        const exists = collection.artworks.some(
          (item) => item.id === artwork.id
        );

        if (exists) return collection;

        return {
          ...collection,
          artworks: [artwork, ...collection.artworks],
        };
      })
    );
  }, [setCollections]);

  const removeArtworkFromCollection = useCallback((collectionId, artworkId) => {
    setCollections((prev) =>
      prev.map((collection) => {
        if (collection.id !== collectionId) return collection;

        return {
          ...collection,
          artworks: collection.artworks.filter(
            (item) => item.id !== artworkId
          ),
        };
      })
    );
  }, [setCollections]);

  const addArtworkByCollectionName = useCallback((name, artwork) => {
    const cleanName = name.trim();
    if (!cleanName || !artwork?.id) return;

    setCollections((prev) => {
      const existing = prev.find(
        (collection) =>
          collection.name.toLowerCase() === cleanName.toLowerCase()
      );

      if (existing) {
        return prev.map((collection) => {
          if (collection.id !== existing.id) return collection;

          const exists = collection.artworks.some(
            (item) => item.id === artwork.id
          );

          if (exists) return collection;

          return {
            ...collection,
            artworks: [artwork, ...collection.artworks],
          };
        });
      }

      return [
        {
          id: makeId(cleanName),
          name: cleanName,
          description: "Created from artwork detail.",
          artworks: [artwork],
        },
        ...prev,
      ];
    });
  }, [setCollections]);

  const value = useMemo(
    () => ({
      collections,
      createCollection,
      deleteCollection,
      addArtworkToCollection,
      removeArtworkFromCollection,
      addArtworkByCollectionName,
    }),
    [
      collections,
      createCollection,
      deleteCollection,
      addArtworkToCollection,
      removeArtworkFromCollection,
      addArtworkByCollectionName,
    ]
  );

  return (
    <CollectionsContext.Provider value={value}>
      {children}
    </CollectionsContext.Provider>
  );
}

export const useCollections = () =>
  useContext(CollectionsContext);
