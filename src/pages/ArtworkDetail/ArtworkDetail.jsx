import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";
import useArtworkDetail from "../../hooks/useArtworkDetail";
import RelatedArtworks from "../../components/artwork/RelatedArtworks";
import SkeletonGrid from "../../components/common/SkeletonGrid";
import ErrorState from "../../components/common/ErrorState";
import ArtworkActions from "../../components/artwork/ArtworkActions";
import ArtworkLightbox from "../../components/artwork/ArtworkLightbox";
import AIArtworkExplanation from "../../components/artwork/AIArtworkExplanation";
import RecommendedForYou from "../../components/artwork/RecommendedForYou";
import { useRecentlyViewed } from "../../context/RecentlyViewedContext";
import { makeSlug } from "../../utils/storage";

function ArtworkDetail() {
  const { id } = useParams();
  const { addRecentlyViewed } = useRecentlyViewed();

  const {
    artwork,
    loading,
    error,
  } = useArtworkDetail(id);

  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    if (artwork?.id) {
      addRecentlyViewed(artwork);
    }
  }, [artwork, addRecentlyViewed]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container-xl py-5">
          <SkeletonGrid />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <ErrorState description={error.message} />
      </MainLayout>
    );
  }

  if (!artwork) {
    return null;
  }

  return (
    <MainLayout>
      <section className="section artwork-detail-section">
        <div className="row g-5 align-items-start">
          <div className="col-lg-7">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="img-fluid rounded-4 artwork-detail-image"
              onClick={() => setShowLightbox(true)}
            />
          </div>

          <div className="col-lg-5">
            <aside className="artwork-sticky-metadata">
              <Link to="/museum/cleveland" className="museum-tag">
                {artwork.museum}
              </Link>

              <h1 className="mt-3 mb-3">
                {artwork.title}
              </h1>

              <Link
                to={`/artist/${makeSlug(artwork.artistName || artwork.artist)}`}
                className="artist-link"
              >
                {artwork.artist}
              </Link>

              <ArtworkActions artwork={artwork} />

              <div className="metadata-list">
                <div>
                  <strong>Year</strong>
                  <p>{artwork.year}</p>
                </div>

                <div>
                  <strong>Culture</strong>
                  <p>{artwork.culture}</p>
                </div>

                <div>
                  <strong>Medium</strong>
                  <p>{artwork.medium}</p>
                </div>

                <div>
                  <strong>Department</strong>
                  <p>{artwork.department}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <h3 className="mb-4">Description</h3>
        <p className="artwork-description">
          {artwork.description}
        </p>
      </section>

      <AIArtworkExplanation artwork={artwork} />

      <section className="section">
        <h3 className="mb-4">Additional Information</h3>

        <div className="metadata-list additional-metadata">
          <div>
            <strong>Dimensions</strong>
            <p>{artwork.dimensions}</p>
          </div>

          <div>
            <strong>Credit Line</strong>
            <p>{artwork.creditLine}</p>
          </div>

          <div>
            <strong>Accession Number</strong>
            <p>{artwork.accessionNumber}</p>
          </div>

          <div>
            <strong>License Status</strong>
            <p>{artwork.shareLicenseStatus}</p>
          </div>
        </div>
      </section>

      <RecommendedForYou
        seedArtwork={artwork}
        currentId={artwork.id}
      />

      <RelatedArtworks currentId={artwork.id} />

      {showLightbox && (
        <ArtworkLightbox
          image={artwork.image}
          title={artwork.title}
          onClose={() => setShowLightbox(false)}
        />
      )}
    </MainLayout>
  );
}

export default ArtworkDetail;
