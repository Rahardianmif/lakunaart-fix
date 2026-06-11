import {
  useEffect,
  useState,
} from "react";

import {
  getExploreArtworks,
} from "../services/artworkService";

export default function useExploreArtworks() {
  const [artworks, setArtworks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data =
          await getExploreArtworks();

        setArtworks(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    artworks,
    loading,
    error,
  };
}