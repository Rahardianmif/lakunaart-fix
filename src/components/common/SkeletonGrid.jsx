import SkeletonCard from "./SkeletonCard";

function SkeletonGrid() {
  return (
    <div className="masonry-grid">

      {Array.from({ length: 8 }).map(
        (_, index) => (
          <SkeletonCard
            key={index}
          />
        )
      )}

    </div>
  );
}

export default SkeletonGrid;