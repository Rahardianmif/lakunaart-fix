import {
  X,
} from "lucide-react";

function ArtworkLightbox({
  image,
  title,
  onClose,
}) {
  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
    >

      <button
        className="lightbox-close"
        onClick={onClose}
      >
        <X size={24} />
      </button>

      <img
        src={image}
        alt={title}
        className="lightbox-image"
      />

    </div>
  );
}

export default ArtworkLightbox;