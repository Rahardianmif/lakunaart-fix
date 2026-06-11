import MainLayout from "../../components/layout/MainLayout";

import EmptyState from "../../components/common/EmptyState";

import {
  useCompare,
} from "../../context/CompareContext";

function Compare() {
  const { compareItems } =
    useCompare();

  if (compareItems.length < 2) {
    return (
      <MainLayout>
        <EmptyState
          title="Select 2 artworks to compare"
        />
      </MainLayout>
    );
  }

  const [artA, artB] =
    compareItems;

  return (
    <MainLayout>

      <section className="section">

        <h1 className="mb-5">
          Compare Artworks
        </h1>

        <div className="row g-4">

          <div className="col-md-6">

            <img
              src={artA.image}
              alt={artA.title}
              className="img-fluid rounded-4"
            />

            <h3 className="mt-3">
              {artA.title}
            </h3>

          </div>

          <div className="col-md-6">

            <img
              src={artB.image}
              alt={artB.title}
              className="img-fluid rounded-4"
            />

            <h3 className="mt-3">
              {artB.title}
            </h3>

          </div>

        </div>

        <table className="table mt-5">

          <tbody>

            <tr>
              <th>Artist</th>
              <td>{artA.artist}</td>
              <td>{artB.artist}</td>
            </tr>

            <tr>
              <th>Year</th>
              <td>{artA.year}</td>
              <td>{artB.year}</td>
            </tr>

          </tbody>

        </table>

      </section>

    </MainLayout>
  );
}

export default Compare;