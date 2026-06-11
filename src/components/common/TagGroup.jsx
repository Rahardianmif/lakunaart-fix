import { Link } from "react-router-dom";

function TagGroup({ items }) {
  return (
    <div className="d-flex flex-wrap gap-2">
      {items.map((item) => {
        const label = typeof item === "string" ? item : item.label;
        const to = typeof item === "string" ? `/search?q=${encodeURIComponent(item)}` : item.to;

        return (
          <Link
            key={label}
            to={to}
            className="btn-secondary-custom"
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

export default TagGroup;
