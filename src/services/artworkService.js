import {
  getArtworks,
  searchArtworks,
  searchSuggestions,
  getArtwork,
} from "../api/clevelandApi";

import {
  normalizeArtwork,
} from "./normalizeArtwork";

function normalizeList(artworks = []) {
  return artworks
    .filter((artwork) =>
      artwork.images?.web?.url ||
      artwork.images?.print?.url
    )
    .map(normalizeArtwork);
}

export async function getFeaturedArtworks() {
  const artworks = await getArtworks(24, 0);
  return normalizeList(artworks);
}

export async function getExploreArtworks(skip = 0, limit = 50) {
  const artworks = await getArtworks(limit, skip);
  return normalizeList(artworks);
}

export async function searchArtwork({
  query = "",
  filters = {},
  limit = 24,
  skip = 0,
} = {}) {
  const response = await searchArtworks({
    query,
    filters,
    limit,
    skip,
  });

  return {
    artworks: normalizeList(response.data),
    info: response.info,
  };
}

export async function getSuggestions(query) {
  const artworks = await searchSuggestions(query);
  return normalizeList(artworks);
}

export async function getArtworkDetail(id) {
  const artwork = await getArtwork(id);
  return normalizeArtwork(artwork);
}
