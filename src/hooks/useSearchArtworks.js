import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  runArtworkSearch,
  filtersToKey,
} from "../services/searchService";

import { SEARCH_LIMIT } from "../utils/constants";

function dedupeById(items) {
  return Array.from(
    new Map(items.map((item) => [item.id, item])).values()
  );
}

export default function useSearchArtworks({
  query = "",
  filters = {},
  limit = SEARCH_LIMIT,
} = {}) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const skipRef = useRef(0);
  const filtersRef = useRef(filters);
  const filterKey = filtersToKey(filters);
  const emptyFilterKey = filtersToKey({});
  const requestKey = `${query}|${filterKey}|${limit}`;
  const canSearch = Boolean(query || filterKey !== emptyFilterKey);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filterKey, filters]);

  useEffect(() => {
    let ignore = false;

    async function loadInitial() {
      if (!canSearch) {
        setResults([]);
        setHasMore(false);
        setTotal(0);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        skipRef.current = 0;

        const response = await runArtworkSearch({
          query,
          filters: filtersRef.current,
          limit,
          skip: 0,
        });

        if (ignore) return;

        setResults(response.artworks);
        setTotal(response.info?.total || response.artworks.length);
        setHasMore(response.artworks.length >= limit);
        skipRef.current = response.artworks.length;
      } catch (err) {
        if (!ignore) {
          setError(err);
          setResults([]);
          setHasMore(false);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadInitial();

    return () => {
      ignore = true;
    };
  }, [requestKey, canSearch, query, limit]);

  const loadMore = useCallback(async () => {
    if (loading || loadingMore || !hasMore || !canSearch) return;

    try {
      setLoadingMore(true);
      setError(null);

      const response = await runArtworkSearch({
        query,
        filters: filtersRef.current,
        limit,
        skip: skipRef.current,
      });

      setResults((prev) => {
        const merged = dedupeById([...prev, ...response.artworks]);
        skipRef.current = merged.length;
        return merged;
      });

      setTotal((prev) => response.info?.total || prev);
      setHasMore(response.artworks.length >= limit);
    } catch (err) {
      setError(err);
    } finally {
      setLoadingMore(false);
    }
  }, [loading, loadingMore, hasMore, canSearch, query, limit]);

  return {
    results,
    loading,
    loadingMore,
    error,
    hasMore,
    total,
    loadMore,
  };
}
