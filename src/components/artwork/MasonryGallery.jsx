import ArtworkCard from "./ArtworkCard";

function MasonryGallery({ artworks }) {
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

export default MasonryGallery;