import { Link } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";
import ArtworkHero from "../../components/artwork/ArtworkHero";
import ArtworkGrid from "../../components/artwork/ArtworkGrid";
import TrendingArtists from "../../components/artwork/TrendingArtists";
import SearchBar from "../../components/search/SearchBar";
import SectionTitle from "../../components/common/SectionTitle";
import TagGroup from "../../components/common/TagGroup";
import MuseumSources from "../../components/common/MuseumSources";
import RecentlyViewed from "../../components/artwork/RecentlyViewed";
import RecommendedForYou from "../../components/artwork/RecommendedForYou";
import useFeaturedArtworks from "../../hooks/useFeaturedArtworks";
import SkeletonGrid from "../../components/common/SkeletonGrid";

function Home() {
  const {
    artworks,
    loading,
  } = useFeaturedArtworks();

  return (
    <MainLayout>
      {!loading && artworks.length > 0 && (
        <ArtworkHero artwork={artworks[0]} />
      )}

      <SearchBar />

      <RecentlyViewed />
      <RecommendedForYou />

      <section className="section">
        <SectionTitle>Featured Artworks</SectionTitle>

        {loading ? (
          <SkeletonGrid />
        ) : (
          <ArtworkGrid artworks={artworks.slice(1)} />
        )}
      </section>

      <section className="section">
        <SectionTitle>Trending Artists</SectionTitle>
        <TrendingArtists />
      </section>

      <section className="section">
        <SectionTitle>Explore By Era</SectionTitle>
        <TagGroup
          items={[
            { label: "Renaissance", to: "/search?q=Renaissance&dateFrom=1400&dateTo=1600" },
            { label: "Baroque", to: "/search?q=Baroque&dateFrom=1600&dateTo=1750" },
            { label: "Modernism", to: "/search?q=Modernism&dateFrom=1850&dateTo=1950" },
            { label: "Contemporary", to: "/search?q=Contemporary&dateFrom=1950" },
          ]}
        />
      </section>

      <section className="section">
        <div className="section-header-row">
          <SectionTitle>Culture Explorer</SectionTitle>
          <Link to="/cultures" className="btn-link-custom">
            Open Culture Explorer
          </Link>
        </div>

        <TagGroup
          items={[
            { label: "Japanese", to: "/search?culture=Japanese" },
            { label: "Chinese", to: "/search?culture=Chinese" },
            { label: "Egyptian", to: "/search?culture=Egyptian" },
            { label: "Greek", to: "/search?culture=Greek" },
          ]}
        />
      </section>

      <section className="section">
        <SectionTitle>Explore By Medium</SectionTitle>
        <TagGroup
          items={[
            { label: "Painting", to: "/search?medium=Oil+Painting" },
            { label: "Sculpture", to: "/search?q=Sculpture" },
            { label: "Drawing", to: "/search?medium=Graphite" },
            { label: "Textile", to: "/search?medium=Textile" },
          ]}
        />
      </section>

      <section className="section">
        <div className="section-header-row">
          <SectionTitle>Museum Sources</SectionTitle>
          <Link to="/museum/cleveland" className="btn-link-custom">
            View Museum Page
          </Link>
        </div>

        <MuseumSources />
      </section>
    </MainLayout>
  );
}

export default Home;
