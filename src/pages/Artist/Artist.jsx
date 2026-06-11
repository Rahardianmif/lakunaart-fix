import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";
import ArtworkGrid from "../../components/artwork/ArtworkGrid";
import SkeletonGrid from "../../components/common/SkeletonGrid";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import { searchArtwork } from "../../services/artworkService";
import { unslug } from "../../utils/storage";

function Artist() {
  const { slug } = useParams();
  const artistName = unslug(slug);

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const response = await searchArtwork({
          query: artistName,
          filters: {
            hasImage: true,
          },
          limit: 36,
          skip: 0,
        });

        if (!ignore) {
          setArtworks(response.artworks);
        }
      } catch (err) {
        if (!ignore) setError(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [artistName]);

  const firstArtwork = artworks[0];

  return (
    <MainLayout>
      <section className="section">
        <div className="artist-hero-card">
          <div>
            <span className="eyebrow-label">Artist Page</span>
            <h1>{artistName}</h1>
            <p>
              {firstArtwork?.artistBiography ||
                `Explore available works, materials, departments, and related objects associated with ${artistName}.`}
            </p>
          </div>

          {firstArtwork?.image && (
            <img src={firstArtwork.image} alt={firstArtwork.title} />
          )}
        </div>
      </section>

      <section className="section">
        <h2 className="mb-4">Works</h2>

        {loading && <SkeletonGrid />}
        {error && <ErrorState description={error.message} />}
        {!loading && !error && artworks.length === 0 && (
          <EmptyState
            title="No works found"
            description={`No artwork data found for ${artistName}.`}
          />
        )}
        {!loading && !error && artworks.length > 0 && (
          <ArtworkGrid artworks={artworks} />
        )}
      </section>

      <section className="section related-artist-card">
        <h2>Related Artists</h2>
        <p>
          Use the recommendation and search filters to explore artists with similar culture, medium, department, or period.
        </p>
      </section>
    </MainLayout>
  );
}

export default Artist;
