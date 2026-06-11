import { TriangleAlert } from "lucide-react";

function ErrorState({
  title = "Something went wrong",
  description = "Unable to load artworks.",
}) {
  return (
    <div className="error-state">

      <TriangleAlert size={64} />

      <h3>{title}</h3>

      <p>{description}</p>

    </div>
  );
}

export default ErrorState;