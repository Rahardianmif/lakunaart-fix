import axiosClient from "./axiosClient";

const CLEVELAND_BASE =
  "https://openaccess-api.clevelandart.org/api";

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
  const qParts = [query, filters.culture]
    .filter(Boolean)
    .join(" ")
    .trim();

  const params = {
    q: qParts,
    limit,
    skip,
    has_image: filters.hasImage === false ? undefined : 1,
    department: filters.department,
    technique: filters.medium,
    created_after: filters.dateFrom,
    created_before: filters.dateTo,
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
