function firstValue(value, fallback = "-") {
  if (Array.isArray(value)) {
    return value.length > 0 ? value[0] : fallback;
  }

  return value || fallback;
}

function normalizeCreator(creator) {
  if (!creator) {
    return {
      id: null,
      name: "Unknown Artist",
      description: "Unknown Artist",
      biography: "Biography is not available for this artist.",
    };
  }

  return {
    id: creator.id || null,
    name:
      creator.name ||
      creator.description ||
      "Unknown Artist",
    description:
      creator.description ||
      creator.name ||
      "Unknown Artist",
    biography:
      creator.biography ||
      creator.description ||
      "Biography is not available for this artist.",
    birthYear:
      creator.birth_year ||
      creator.birth_date ||
      null,
    deathYear:
      creator.death_year ||
      creator.death_date ||
      null,
    nationality:
      creator.nationality ||
      "-",
  };
}

export function normalizeArtwork(artwork = {}) {
  const creator = normalizeCreator(artwork.creators?.[0]);

  return {
    id: artwork.id,

    title:
      artwork.title ||
      "Untitled",

    artist: creator.description,
    artistName: creator.name,
    artistId: creator.id,
    artistBiography: creator.biography,
    artistBirthYear: creator.birthYear,
    artistDeathYear: creator.deathYear,
    artistNationality: creator.nationality,
    creators: (artwork.creators || []).map(normalizeCreator),

    image:
      artwork.images?.web?.url ||
      artwork.images?.print?.url ||
      "",

    imageAlt:
      artwork.title ||
      "Artwork image",

    year:
      artwork.creation_date ||
      "-",

    creationDateEarliest:
      artwork.creation_date_earliest ||
      null,

    creationDateLatest:
      artwork.creation_date_latest ||
      null,

    museum:
      "Cleveland Museum of Art",

    museumSlug:
      "cleveland",

    culture:
      firstValue(artwork.culture),

    cultures:
      artwork.culture || [],

    medium:
      artwork.technique ||
      artwork.medium ||
      "-",

    type:
      artwork.type ||
      "-",

    department:
      artwork.department ||
      "-",

    collection:
      artwork.collection ||
      artwork.department ||
      "-",

    period:
      artwork.period ||
      "-",

    description:
      artwork.wall_description ||
      artwork.description ||
      "No description available.",

    creditLine:
      artwork.creditline ||
      "-",

    dimensions:
      artwork.measurements?.[0]?.description ||
      artwork.dimensions ||
      "-",

    url:
      artwork.url ||
      "",

    accessionNumber:
      artwork.accession_number ||
      "-",

    shareLicenseStatus:
      artwork.share_license_status ||
      "-",

    raw: artwork,
  };
}
