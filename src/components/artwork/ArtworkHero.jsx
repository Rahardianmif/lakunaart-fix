import { ArrowRight } from "lucide-react";

function ArtworkHero({ artwork }) {
  if (!artwork) return null;

  return (
    <section className="hero-section">

      <div className="hero-image">
        <img
          src={artwork.image}
          alt={artwork.title}
        />
      </div>

      <div className="hero-content">

        <div className="hero-content-inner">

          <span className="hero-museum">
            {artwork.museum}
          </span>

          <h1 className="hero-title">
            {artwork.title}
          </h1>

          <p className="hero-artist">
            {artwork.artist}
          </p>

          <p className="hero-description">
            Explore thousands of artworks,
            artists, cultures and museums
            from around the world.
          </p>

          <button className="hero-button">
            Explore Collection
            <ArrowRight size={18} />
          </button>

        </div>

      </div>

    </section>
  );
}

export default ArtworkHero;