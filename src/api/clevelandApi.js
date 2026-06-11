import axiosClient from "./axiosClient";

const CLEVELAND_BASE = "/api/cleveland";

function cleanParams(params = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) =>
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== false
    )
  );
}

function normalizeArray(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return [value].filter(Boolean);
}

function buildSearchQuery(query = "", filters = {}) {
  const cultures = normalizeArray(filters.culture);
  const mediums = normalizeArray(filters.medium);

  return [
    query,
    ...cultures,
    mediums.length > 1 ? mediums.join(" ") : "",
  ]
    .filter(Boolean)
    .join(" ")
    .trim();
}

export async function fetchArtworks(params = {}) {
  const response = await axiosClient.get(
    `${CLEVELAND_BASE}/artworks`,
    {
      params: cleanParams(params),
    }
  );

  return {
    data: response.data.data || [],
    info: response.data.info || {},
  };
}

export async function getArtworks(limit = 24, skip = 0) {
  const response = await fetchArtworks({
    limit,
    skip,
    has_image: 1,
  });

  return response.data;
}

export async function searchArtworks({
  query = "",
  filters = {},
  limit = 24,
  skip = 0,
} = {}) {
  const mediums = normalizeArray(filters.medium);

  const params = {
    q: buildSearchQuery(query, filters),
    limit,
    skip,
    has_image: filters.hasImage === false ? undefined : 1,
    department: filters.department,
    technique: mediums.length === 1 ? mediums[0] : undefined,
    created_after: filters.createdAfter,
    created_before: filters.createdBefore,
  };

  return fetchArtworks(params);
}

export async function searchSuggestions(query) {
  const response = await fetchArtworks({
    q: query,
    has_image: 1,
    limit: 5,
  });

  return response.data;
}

export async function getArtwork(id) {
  const response = await axiosClient.get(
    `${CLEVELAND_BASE}/artworks/${id}`
  );

  return response.data.data;
}