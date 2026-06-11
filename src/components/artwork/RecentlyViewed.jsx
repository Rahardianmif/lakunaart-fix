import ArtworkGrid from "./ArtworkGrid";
import SectionTitle from "../common/SectionTitle";
import { useRecentlyViewed } from "../../context/RecentlyViewedContext";

function RecentlyViewed() {
  const {
    recentlyViewed,
    clearRecentlyViewed,
  } = useRecentlyViewed();

  if (!recentlyViewed.length) {
    return null;
  }

  return (
    <section className="section section-compact">
      <div className="section-header-row">
        <SectionTitle>Recently Viewed</SectionTitle>

        <button
          type="button"
          className="btn-link-custom"
          onClick={clearRecentlyViewed}
        >
          Clear
        </button>
      </div>

      <ArtworkGrid artworks={recentlyViewed.slice(0, 8)} />
    </section>
  );
}

export default RecentlyViewed;
