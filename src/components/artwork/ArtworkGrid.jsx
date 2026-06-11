import ArtworkCard from "./ArtworkCard";

function ArtworkGrid({
  artworks = [],
}) {
  return (
    <div className="masonry-grid">

      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
          {...artwork}
        />
      ))}

    </div>
  );
}

export default ArtworkGrid;