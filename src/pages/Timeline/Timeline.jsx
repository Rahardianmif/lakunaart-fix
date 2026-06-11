import { useEffect, useState } from "react";

import MainLayout from "../../components/layout/MainLayout";
import ArtworkGrid from "../../components/artwork/ArtworkGrid";
import SkeletonGrid from "../../components/common/SkeletonGrid";
import ErrorState from "../../components/common/ErrorState";
import { searchArtwork } from "../../services/artworkService";

function Timeline() {
  const [year, setYear] = useState(1800);
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
          query: "",
          filters: {
            dateFrom: String(year),
            dateTo: String(year + 49),
            hasImage: true,
          },
          limit: 24,
          skip: 0,
        });

        if (!ignore) setArtworks(response.artworks);
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
  }, [year]);

  return (
    <MainLayout>
      <section className="section">
        <div className="page-heading">
          <span className="eyebrow-label">Timeline Explorer</span>
          <h1>{year}–{year + 49}</h1>
          <p>Move through time and let artworks change by creation date range.</p>
        </div>

        <div className="timeline-control">
          <span>1400</span>
          <input
            type="range"
            min="1400"
            max="1950"
            step="50"
            value={year}
            onChange={(event) => setYear(Number(event.target.value))}
          />
          <span>2000</span>
        </div>

        <div className="timeline-marks">
          {[1400, 1500, 1600, 1700, 1800, 1900].map((item) => (
            <button
              key={item}
              type="button"
              className={year === item ? "active" : ""}
              onClick={() => setYear(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        {loading && <SkeletonGrid />}
        {error && <ErrorState description={error.message} />}
        {!loading && !error && <ArtworkGrid artworks={artworks} />}
      </section>
    </MainLayout>
  );
}

export default Timeline;
