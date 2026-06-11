import MainLayout
from "../../components/layout/MainLayout";

import MasonryGallery
from "../../components/artwork/MasonryGallery";

import EmptyState
from "../../components/common/EmptyState";

import { useFavorites }
from "../../context/FavoritesContext";

function Favorites() {
  const { favorites } =
    useFavorites();

  return (
    <MainLayout>

      <section className="section">

        <h1 className="mb-4">
          My Favorites
        </h1>

        {favorites.length === 0 ? (
          <EmptyState
            title="No favorites yet"
          />
        ) : (
          <MasonryGallery
            artworks={favorites}
          />
        )}

      </section>

    </MainLayout>
  );
}

export default Favorites;