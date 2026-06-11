import MainLayout from "../../components/layout/MainLayout";
import SearchBar from "../../components/search/SearchBar";
import MasonryGallery from "../../components/artwork/MasonryGallery";
import useExploreArtworks from "../../hooks/useExploreArtworks";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import SkeletonGrid from "../../components/common/SkeletonGrid";

function Explore() {
  const {
    artworks,
    loading,
    error,
  } = useExploreArtworks();

  return (
    <MainLayout>
      <section className="section">
        <div className="page-heading">
          <span className="eyebrow-label">Explore</span>
          <h1>Explore Artworks</h1>
          <p>Browse an image-rich stream of museum objects from the Cleveland Museum of Art.</p>
        </div>

        <SearchBar />

        {loading && <SkeletonGrid />}

        {error && (
          <ErrorState description={error.message} />
        )}

        {!loading && !error && artworks.length === 0 && (
          <EmptyState />
        )}

        {!loading && !error && artworks.length > 0 && (
          <>
            <div className="result-summary mb-4">
              <strong>Showing {artworks.length} artworks</strong>
            </div>

            <MasonryGallery artworks={artworks} />
          </>
        )}
      </section>
    </MainLayout>
  );
}

export default Explore;
