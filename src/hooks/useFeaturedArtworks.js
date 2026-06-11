import {
  useEffect,
  useState,
} from "react";

import {
  getFeaturedArtworks,
} from "../services/artworkService";

export default function useFeaturedArtworks() {
  const [artworks, setArtworks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data =
          await getFeaturedArtworks();

        setArtworks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    artworks,
    loading,
  };
}

