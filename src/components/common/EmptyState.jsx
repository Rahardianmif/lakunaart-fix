import { SearchX } from "lucide-react";

function EmptyState({
  title = "No Artwork Found",
  description = "Try different keywords or filters.",
}) {
  return (
    <div className="empty-state">

      <SearchX size={64} />

      <h3>{title}</h3>

      <p>{description}</p>

    </div>
  );
}

export default EmptyState;