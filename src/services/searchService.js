import { searchArtwork } from "./artworkService";

const parseArrayParam = (value) => {
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

export function parseSearchFilters(searchParams) {
  return {
    culture: parseArrayParam(searchParams.get("culture")),
    medium: parseArrayParam(searchParams.get("medium")),
    department: searchParams.get("department") || "",
    createdAfter: searchParams.get("createdAfter") || "",
    createdBefore: searchParams.get("createdBefore") || "",
    hasImage: searchParams.get("hasImage") !== "0",
  };
}

export function hasActiveFilters(filters = {}) {
  const hasCulture =
    Array.isArray(filters.culture) && filters.culture.length > 0;

  const hasMedium =
    Array.isArray(filters.medium) && filters.medium.length > 0;

  const hasDepartment = Boolean(filters.department);

  const hasCreatedAfter = Boolean(filters.createdAfter);

  const hasCreatedBefore = Boolean(filters.createdBefore);

  const hasImageFilterChanged = filters.hasImage === false;

  return (
    hasCulture ||
    hasMedium ||
    hasDepartment ||
    hasCreatedAfter ||
    hasCreatedBefore ||
    hasImageFilterChanged
  );
}

export function filtersToKey(filters = {}) {
  return JSON.stringify({
    culture: Array.isArray(filters.culture) ? filters.culture : [],
    medium: Array.isArray(filters.medium) ? filters.medium : [],
    department: filters.department || "",
    createdAfter: filters.createdAfter || "",
    createdBefore: filters.createdBefore || "",
    hasImage: filters.hasImage !== false,
  });
}

export async function runArtworkSearch(args) {
  return searchArtwork(args);
}