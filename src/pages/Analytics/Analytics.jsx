import MainLayout from "../../components/layout/MainLayout";

function Analytics() {
  return (
    <MainLayout>
      <section className="section">
        <div className="page-heading">
          <span className="eyebrow-label">Portfolio Analytics</span>
          <h1>Analytics</h1>
          <p>
            This page is prepared for future visual analytics such as favorite cultures, dominant media, and collection trends.
          </p>
        </div>

        <div className="stats-grid">
          <article>
            <strong>Search Behavior</strong>
            <p>Connect this to search history for frequent artists and keywords.</p>
          </article>

          <article>
            <strong>Collection Insights</strong>
            <p>Analyze saved artworks by medium, culture, department, and period.</p>
          </article>

          <article>
            <strong>Recommendation Signals</strong>
            <p>Use recently viewed and favorites as simple recommendation inputs.</p>
          </article>
        </div>
      </section>
    </MainLayout>
  );
}

export default Analytics;
