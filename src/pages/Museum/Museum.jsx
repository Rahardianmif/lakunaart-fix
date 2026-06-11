import MainLayout from "../../components/layout/MainLayout";
import ArtworkGrid from "../../components/artwork/ArtworkGrid";
import SkeletonGrid from "../../components/common/SkeletonGrid";
import useFeaturedArtworks from "../../hooks/useFeaturedArtworks";

function Museum() {
  const {
    artworks,
    loading,
  } = useFeaturedArtworks();

  return (
    <MainLayout>
      <section className="section">
        <div className="museum-hero-card">
          <span className="eyebrow-label">Museum Page</span>
          <h1>Cleveland Museum of Art</h1>
          <p>
            LakunaArt currently uses the Cleveland Museum of Art Open Access collection as its primary source.
            This page gives users a museum-level entry point for overview, collections, and highlights.
          </p>
        </div>
      </section>

      <section className="section stats-grid">
        <article>
          <strong>Source</strong>
          <p>Cleveland Museum of Art Open Access API</p>
        </article>

        <article>
          <strong>Focus</strong>
          <p>Open-access artworks, object metadata, images, departments, and creator information.</p>
        </article>

        <article>
          <strong>Experience</strong>
          <p>Search, filter, curate, compare, and explore artworks by culture, period, and medium.</p>
        </article>
      </section>

      <section className="section">
        <h2 className="mb-4">Collection Highlights</h2>
        {loading ? <SkeletonGrid /> : <ArtworkGrid artworks={artworks} />}
      </section>
    </MainLayout>
  );
}

export default Museum;
