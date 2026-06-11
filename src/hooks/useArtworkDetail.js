import {
  useEffect,
  useState,
} from "react";

import {
  getArtworkDetail,
} from "../services/artworkService";

export default function useArtworkDetail(
  id
) {
  const [artwork, setArtwork] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data =
          await getArtworkDetail(
            id
          );

        setArtwork(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return {
    artwork,
    loading,
    error,
  };
}