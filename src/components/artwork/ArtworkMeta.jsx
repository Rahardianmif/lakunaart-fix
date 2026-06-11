import {
  Heart,
  Share2,
  GitCompareArrows,
} from "lucide-react";

function ArtworkMeta() {
  return (
    <div>

      <span className="badge bg-secondary mb-3">
        Museum of Modern Art
      </span>

      <h1 className="mb-3">
        The Starry Night
      </h1>

      <h5 className="text-secondary mb-4">
        Vincent van Gogh
      </h5>

      <div className="d-flex gap-2 mb-4">

        <button className="btn-primary-custom">
          <Heart size={18} />
        </button>

        <button className="btn-secondary-custom">
          <GitCompareArrows size={18} />
        </button>

        <button className="btn-secondary-custom">
          <Share2 size={18} />
        </button>

      </div>

      <p>
        The Starry Night is one of the
        most recognized paintings in
        Western art.
      </p>

      <hr />

      <div className="metadata-list">

        <div>
          <strong>Year</strong>
          <p>1889</p>
        </div>

        <div>
          <strong>Medium</strong>
          <p>Oil on Canvas</p>
        </div>

        <div>
          <strong>Culture</strong>
          <p>Dutch</p>
        </div>

        <div>
          <strong>Museum</strong>
          <p>Museum of Modern Art</p>
        </div>

      </div>

    </div>
  );
}

export default ArtworkMeta;