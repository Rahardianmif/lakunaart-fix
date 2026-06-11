import {
  useEffect,
  useState,
} from "react";

import {
  getExploreArtworks,
} from "../services/artworkService";

export default function useRelatedArtworks(
  currentId
) {
  const [artworks, setArtworks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data =
          await getExploreArtworks();

        const filtered =
          data
            .filter(
              (item) =>
                item.id !== currentId
            )
            .slice(0, 8);

        setArtworks(
          filtered
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [currentId]);

  return {
    artworks,
    loading,
  };
}