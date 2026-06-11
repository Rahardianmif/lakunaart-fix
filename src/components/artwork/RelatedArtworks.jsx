import SectionTitle
  from "../common/SectionTitle";

import ArtworkGrid
  from "./ArtworkGrid";

import SkeletonGrid
  from "../common/SkeletonGrid";

import useRelatedArtworks
  from "../../hooks/useRelatedArtworks";

function RelatedArtworks({
  currentId,
}) {
  const {
    artworks,
    loading,
  } =
    useRelatedArtworks(
      currentId
    );

  return (
    <section className="section">

      <SectionTitle>
        Related Artworks
      </SectionTitle>

      {loading ? (
        <SkeletonGrid />
      ) : (
        <ArtworkGrid
          artworks={artworks}
        />
      )}

    </section>
  );
}

export default RelatedArtworks;