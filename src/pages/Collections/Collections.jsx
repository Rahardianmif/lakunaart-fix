import { useState } from "react";

import MainLayout from "../../components/layout/MainLayout";
import ArtworkGrid from "../../components/artwork/ArtworkGrid";
import EmptyState from "../../components/common/EmptyState";
import { useCollections } from "../../context/CollectionsContext";

function Collections() {
  const {
    collections,
    createCollection,
    deleteCollection,
  } = useCollections();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = (event) => {
    event.preventDefault();

    const collection = createCollection(name, description);
    if (!collection) return;

    setName("");
    setDescription("");
  };

  return (
    <MainLayout>
      <section className="section">
        <div className="page-heading">
          <span className="eyebrow-label">Personal Curation</span>
          <h1>User Collections</h1>
          <p>
            Build thematic collections beyond simple favorites, such as Japanese Art, Renaissance, or Inspiration.
          </p>
        </div>

        <form className="collection-form" onSubmit={handleCreate}>
          <input
            value={name}
            placeholder="Collection name"
            onChange={(event) => setName(event.target.value)}
          />

          <input
            value={description}
            placeholder="Short description"
            onChange={(event) => setDescription(event.target.value)}
          />

          <button type="submit" className="btn-primary-custom">
            Create Collection
          </button>
        </form>

        {!collections.length && (
          <EmptyState
            title="No collections yet"
            description="Create your first collection to curate artworks by topic or inspiration."
          />
        )}

        <div className="collection-list">
          {collections.map((collection) => (
            <article className="collection-card" key={collection.id}>
              <div className="collection-card-header">
                <div>
                  <h3>{collection.name}</h3>
                  <p>{collection.description || "No description yet."}</p>
                </div>

                <button
                  type="button"
                  className="btn-link-custom"
                  onClick={() => deleteCollection(collection.id)}
                >
                  Delete
                </button>
              </div>

              {collection.artworks.length > 0 ? (
                <ArtworkGrid artworks={collection.artworks} />
              ) : (
                <EmptyState
                  title="No artworks in this collection"
                  description="Open an artwork detail page and use the Collection button."
                />
              )}
            </article>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}

export default Collections;
