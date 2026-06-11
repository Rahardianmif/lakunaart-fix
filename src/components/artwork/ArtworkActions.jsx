import {
  Archive,
  GitCompareArrows,
  Heart,
  Share2,
} from "lucide-react";

import { useFavorites } from "../../context/FavoritesContext";
import { useCompare } from "../../context/CompareContext";
import { useCollections } from "../../context/CollectionsContext";

function ArtworkActions({ artwork }) {
  const {
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useFavorites();

  const {
    addCompare,
    removeCompare,
    isCompared,
  } = useCompare();

  const { addArtworkByCollectionName } = useCollections();

  const favorite = isFavorite(artwork.id);
  const compared = isCompared(artwork.id);

  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(artwork.id);
    } else {
      addFavorite(artwork);
    }
  };

  const handleCompare = () => {
    if (compared) {
      removeCompare(artwork.id);
    } else {
      addCompare(artwork);
    }
  };

  const handleCollection = () => {
    const collectionName = window.prompt(
      "Save to collection name:",
      "Inspiration"
    );

    if (!collectionName) return;

    addArtworkByCollectionName(collectionName, artwork);
    alert(`Saved to ${collectionName}`);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: artwork.title,
          text: artwork.artist,
          url: window.location.href,
        });

        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      alert("Artwork link copied");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="artwork-actions-bar">
      <button
        className={`detail-action-btn ${favorite ? "active" : ""}`}
        onClick={handleFavorite}
      >
        <Heart
          size={18}
          fill={favorite ? "currentColor" : "none"}
        />
        Favorite
      </button>

      <button
        className={`detail-action-btn ${compared ? "active" : ""}`}
        onClick={handleCompare}
      >
        <GitCompareArrows size={18} />
        Compare
      </button>

      <button
        className="detail-action-btn"
        onClick={handleCollection}
      >
        <Archive size={18} />
        Collection
      </button>

      <button
        className="detail-action-btn"
        onClick={handleShare}
      >
        <Share2 size={18} />
        Share
      </button>
    </div>
  );
}

export default ArtworkActions;
