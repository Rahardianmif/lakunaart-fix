import { useMemo } from "react";

import MainLayout from "../../components/layout/MainLayout";

import {
  useSearchParams,
} from "react-router-dom";

import useSearchArtworks from "../../hooks/useSearchArtworks";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import SearchBar from "../../components/search/SearchBar";
import FilterPopover from "../../components/search/FilterPopover";
import ArtworkGrid from "../../components/artwork/ArtworkGrid";
import SkeletonGrid from "../../components/common/SkeletonGrid";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import { parseSearchFilters } from "../../services/searchService";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const filters = useMemo(
    () => parseSearchFilters(searchParams),
    [searchParams]
  );

  const {
    results,
    loading,
    loadingMore,
    error,
    hasMore,
    total,
    loadMore,
  } = useSearchArtworks({
    query,
    filters,
  });

  const sentinelRef = useInfiniteScroll(
    loadMore,
    hasMore && !loading && !loadingMore
  );

  const handleFilterChange = (nextFilters) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(nextFilters).forEach(([key, value]) => {
      if (key === "hasImage") {
        if (value === false) {
          params.set("hasImage", "0");
        } else {
          params.delete("hasImage");
        }

        return;
      }

      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.set(key, value.join(","));
        } else {
          params.delete(key);
        }

        return;
      }

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams();

    if (query) {
      params.set("q", query);
    }

    setSearchParams(params);
  };

  return (
    <MainLayout>
      <div className="container-xl py-5">
        <div className="page-heading">
          <span className="eyebrow-label">Advanced Search</span>
          <h1>Search Artworks</h1>
          <p>
            Search across artworks and refine results with culture, medium,
            date, department, and image availability.
          </p>
        </div>

        <div className="search-toolbar">
          <div className="search-toolbar-main">
            <SearchBar />
          </div>

          <FilterPopover
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        {(query || results.length > 0) && (
          <div className="result-summary">
            <div>
              {query ? (
                <>
                  Search Result: <strong>{query}</strong>
                </>
              ) : (
                <strong>Filtered Artworks</strong>
              )}
            </div>

            <span>
              Showing {results.length}
              {total ? ` of ${total}` : ""} artworks
            </span>
          </div>
        )}

        {loading && <SkeletonGrid />}

        {error && (
          <ErrorState description={error.message} />
        )}

        {!loading &&
          !error &&
          (query || results.length > 0) &&
          results.length === 0 && (
            <EmptyState
              title="No artworks found"
              description={`No results found for "${
                query || "selected filters"
              }"`}
            />
          )}

        {!loading && !error && results.length > 0 && (
          <>
            <ArtworkGrid artworks={results} />

            <div ref={sentinelRef} className="infinite-sentinel">
              {loadingMore && <span>Loading more artworks...</span>}
              {!hasMore && <span>No more artworks to load.</span>}
            </div>
          </>
        )}

        {!query && results.length === 0 && !loading && !error && (
          <EmptyState
            title="Start Searching"
            description="Search artworks, artists, cultures, or museums. You can also use filters without a keyword."
          />
        )}
      </div>
    </MainLayout>
  );
}

export default Search;