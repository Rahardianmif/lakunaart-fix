import {
  Heart,
  GitCompareArrows,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  useFavorites,
} from "../../context/FavoritesContext";

import {
  useCompare,
} from "../../context/CompareContext";

function ArtworkCard({
  id,
  title,
  artist,
  image,
  year,
  museum,
}) {
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

  const favorite = isFavorite(id);

  const compared = isCompared(id);

  const cardVariants = [
    "card-short",
    "card-medium",
    "card-tall",
    "card-large",
  ];

  const variant =
    cardVariants[id % cardVariants.length];

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (favorite) {
      removeFavorite(id);
    } else {
      addFavorite({
        id,
        title,
        artist,
        image,
        year,
        museum,
      });
    }
  };

  const handleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (compared) {
      removeCompare(id);
    } else {
      addCompare({
        id,
        title,
        artist,
        image,
        year,
        museum,
      });
    }
  };

  return (
    <Link
      to={`/artwork/${id}`}
      className="text-decoration-none text-dark"
    >
      <div
        className={`card-art artwork-card ${variant}`}
      >

        <div className="artwork-image-wrapper">

          <img
            src={
              image ||
              "https://placehold.co/600x800?text=Artwork"
            }
            alt={title}
            className="artwork-image"
          />

          <div className="artwork-actions">

            <button
              type="button"
              className="action-btn"
              onClick={handleFavorite}
            >
              <Heart
                size={18}
                fill={
                  favorite
                    ? "currentColor"
                    : "none"
                }
              />
            </button>

            <button
              type="button"
              className="action-btn"
              onClick={handleCompare}
            >
              <GitCompareArrows
                size={18}
                fill={
                  compared
                    ? "currentColor"
                    : "none"
                }
              />
            </button>

          </div>

        </div>

        <div className="p-3">

          <span className="museum-tag">
            {museum}
          </span>

          <h5 className="artwork-title">
            {title}
          </h5>

          <p className="artwork-artist">
            {artist}
          </p>

          <small className="text-secondary">
            {year}
          </small>

        </div>

      </div>
    </Link>
  );
}

export default ArtworkCard;