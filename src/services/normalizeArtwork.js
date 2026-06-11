function firstValue(value, fallback = "-") {
  if (Array.isArray(value)) {
    return value.length > 0 ? value[0] : fallback;
  }

  if (typeof value === "object" && value !== null) {
    return fallback;
  }

  return value || fallback;
}

function toDisplayText(value, fallback = "-") {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (Array.isArray(value)) {
    const text = value
      .map((item) => toDisplayText(item, ""))
      .filter(Boolean)
      .join(", ");

    return text || fallback;
  }

  if (typeof value === "object") {
    if (value.description) return value.description;
    if (value.name) return value.name;
    if (value.title) return value.title;
    if (value.value) return value.value;
    if (value.text) return value.text;

    const text = Object.entries(value)
      .map(([key, itemValue]) => {
        const formattedValue = toDisplayText(itemValue, "");

        if (!formattedValue) return "";

        const label = key
          .replace(/_/g, " ")
          .replace(/\b\w/g, (letter) => letter.toUpperCase());

        return `${label}: ${formattedValue}`;
      })
      .filter(Boolean)
      .join(" | ");

    return text || fallback;
  }

  return fallback;
}

function normalizeDimensions(artwork = {}) {
  const measurementDescription =
    artwork.measurements?.[0]?.description ||
    artwork.measurements?.[0]?.formatted ||
    artwork.measurements?.[0]?.value;

  if (measurementDescription) {
    return toDisplayText(measurementDescription);
  }

  if (artwork.dimensions) {
    return toDisplayText(artwork.dimensions);
  }

  return "-";
}

function normalizeCreator(creator) {
  if (!creator) {
    return {
      id: null,
      name: "Unknown Artist",
      description: "Unknown Artist",
      biography: "Biography is not available for this artist.",
      birthYear: null,
      deathYear: null,
      nationality: "-",
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
      toDisplayText(artwork.title, "Untitled"),

    artist:
      toDisplayText(creator.description, "Unknown Artist"),

    artistName:
      toDisplayText(creator.name, "Unknown Artist"),

    artistId:
      creator.id,

    artistBiography:
      toDisplayText(
        creator.biography,
        "Biography is not available for this artist."
      ),

    artistBirthYear:
      creator.birthYear,

    artistDeathYear:
      creator.deathYear,

    artistNationality:
      toDisplayText(creator.nationality),

    creators:
      (artwork.creators || []).map(normalizeCreator),

    image:
      artwork.images?.web?.url ||
      artwork.images?.print?.url ||
      "",

    imageAlt:
      toDisplayText(artwork.title, "Artwork image"),

    year:
      toDisplayText(artwork.creation_date),

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
      Array.isArray(artwork.culture)
        ? artwork.culture
        : [],

    medium:
      toDisplayText(
        artwork.technique ||
        artwork.medium
      ),

    type:
      toDisplayText(artwork.type),

    department:
      toDisplayText(artwork.department),

    collection:
      toDisplayText(
        artwork.collection ||
        artwork.department
      ),

    period:
      toDisplayText(artwork.period),

    description:
      toDisplayText(
        artwork.wall_description ||
        artwork.description,
        "No description available."
      ),

    creditLine:
      toDisplayText(artwork.creditline),

    dimensions:
      normalizeDimensions(artwork),

    url:
      artwork.url ||
      "",

    accessionNumber:
      toDisplayText(artwork.accession_number),

    shareLicenseStatus:
      toDisplayText(artwork.share_license_status),

    raw:
      artwork,
  };
}