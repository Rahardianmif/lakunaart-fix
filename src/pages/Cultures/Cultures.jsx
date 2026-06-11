import { Link } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";
import { CULTURE_EXPLORER_ITEMS } from "../../utils/constants";

function Cultures() {
  return (
    <MainLayout>
      <section className="section">
        <div className="page-heading">
          <span className="eyebrow-label">Culture Explorer</span>
          <h1>Explore Art by Culture</h1>
          <p>
            Enter collections through cultural pathways, then continue with advanced search filters.
          </p>
        </div>

        <div className="culture-grid">
          {CULTURE_EXPLORER_ITEMS.map((item) => (
            <Link
              key={item.name}
              className="culture-card"
              to={`/search?culture=${encodeURIComponent(item.name)}`}
            >
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span>Explore {item.name} Art →</span>
            </Link>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}

export default Cultures;
