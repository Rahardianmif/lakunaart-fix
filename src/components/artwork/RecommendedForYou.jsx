import { useEffect, useMemo, useState } from "react";

import ArtworkGrid from "./ArtworkGrid";
import SkeletonGrid from "../common/SkeletonGrid";
import SectionTitle from "../common/SectionTitle";
import { useFavorites } from "../../context/FavoritesContext";
import { useRecentlyViewed } from "../../context/RecentlyViewedContext";
import { searchArtwork } from "../../services/artworkService";

function pickSeed(favorites, recentlyViewed, seedArtwork) {
  if (seedArtwork) return seedArtwork;
  return favorites[0] || recentlyViewed[0] || null;
}

function RecommendedForYou({ seedArtwork = null, currentId = null }) {
  const { favorites } = useFavorites();
  const { recentlyViewed } = useRecentlyViewed();

  const seed = useMemo(
    () => pickSeed(favorites, recentlyViewed, seedArtwork),
    [favorites, recentlyViewed, seedArtwork]
  );

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function load() {
      if (!seed) return;

      try {
        setLoading(true);

        const response = await searchArtwork({
          query: seed.artistName || seed.artist || seed.culture || seed.medium,
          filters: {
            department: seed.department !== "-" ? seed.department : "",
            medium: seed.medium !== "-" ? seed.medium : "",
            hasImage: true,
          },
          limit: 12,
          skip: 0,
        });

        if (ignore) return;

        setArtworks(
          response.artworks
            .filter((item) => item.id !== currentId)
            .slice(0, 8)
        );
      } catch (error) {
        console.error(error);
        if (!ignore) setArtworks([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [seed, currentId]);

  if (!seed) {
    return null;
  }

  if (loading) {
    return (
      <section className="section">
        <SectionTitle>Recommended For You</SectionTitle>
        <SkeletonGrid />
      </section>
    );
  }

  if (!artworks.length) {
    return null;
  }

  return (
    <section className="section">
      <SectionTitle>Recommended For You</SectionTitle>
      <p className="section-subtitle">
        Based on your recent interest in {seed.artistName || seed.artist}, {seed.medium}, and {seed.department}.
      </p>
      <ArtworkGrid artworks={artworks} />
    </section>
  );
}

export default RecommendedForYou;
