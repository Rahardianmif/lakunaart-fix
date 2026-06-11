const CULTURE_OPTIONS = [
  "French",
  "Japanese",
  "Chinese",
  "Egyptian",
  "Greek",
  "Islamic",
  "African",
  "American",
  "Italian",
  "Dutch",
];

const MEDIUM_OPTIONS = [
  "Oil Painting",
  "Watercolor",
  "Ink",
  "Print",
  "Drawing",
  "Sculpture",
  "Photograph",
  "Textile",
];

const DEPARTMENT_OPTIONS = [
  "American Painting and Sculpture",
  "Chinese Art",
  "Contemporary Art",
  "Decorative Art and Design",
  "Drawings",
  "Egyptian and Ancient Near Eastern Art",
  "European Painting and Sculpture",
  "Greek and Roman Art",
  "Islamic Art",
  "Japanese Art",
  "Medieval Art",
  "Modern European Painting and Sculpture",
  "Photography",
  "Prints",
  "Textiles",
];

function FilterBar({
  filters,
  onChange,
  onReset,
  onApply,
}) {
  const selectedCultures = Array.isArray(filters.culture)
    ? filters.culture
    : [];

  const selectedMediums = Array.isArray(filters.medium)
    ? filters.medium
    : [];

  const handleValueChange = (key, value) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  const handleCheckboxGroupChange = (key, value) => {
    const currentValues = Array.isArray(filters[key])
      ? filters[key]
      : [];

    const nextValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    onChange({
      ...filters,
      [key]: nextValues,
    });
  };

  return (
    <div className="filter-menu-content">
      <div className="filter-section">
        <div className="filter-section-heading">
          <h4>Culture</h4>
          <span>Select one or more cultures</span>
        </div>

        <div className="checkbox-grid">
          {CULTURE_OPTIONS.map((culture) => (
            <label className="filter-check-option" key={culture}>
              <input
                type="checkbox"
                checked={selectedCultures.includes(culture)}
                onChange={() =>
                  handleCheckboxGroupChange("culture", culture)
                }
              />
              <span>{culture}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-section-heading">
          <h4>Medium</h4>
          <span>Choose popular artwork mediums</span>
        </div>

        <div className="checkbox-grid">
          {MEDIUM_OPTIONS.map((medium) => (
            <label className="filter-check-option" key={medium}>
              <input
                type="checkbox"
                checked={selectedMediums.includes(medium)}
                onChange={() =>
                  handleCheckboxGroupChange("medium", medium)
                }
              />
              <span>{medium}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-section-heading">
          <h4>Department</h4>
          <span>Filter by museum department</span>
        </div>

        <select
          value={filters.department || ""}
          onChange={(event) =>
            handleValueChange("department", event.target.value)
          }
        >
          <option value="">All Departments</option>

          {DEPARTMENT_OPTIONS.map((department) => (
            <option value={department} key={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <div className="filter-section-heading">
          <h4>Date</h4>
          <span>Use artwork creation year range</span>
        </div>

        <div className="date-filter-grid">
          <label>
            <span>From</span>
            <input
              type="number"
              placeholder="1400"
              value={filters.createdAfter || ""}
              onChange={(event) =>
                handleValueChange("createdAfter", event.target.value)
              }
            />
          </label>

          <label>
            <span>To</span>
            <input
              type="number"
              placeholder="1900"
              value={filters.createdBefore || ""}
              onChange={(event) =>
                handleValueChange("createdBefore", event.target.value)
              }
            />
          </label>
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-check-option filter-check-option-wide">
          <input
            type="checkbox"
            checked={filters.hasImage !== false}
            onChange={(event) =>
              handleValueChange("hasImage", event.target.checked)
            }
          />
          <span>Only show artworks with image</span>
        </label>
      </div>

      <div className="filter-actions-row">
        <button
          type="button"
          className="btn-secondary-custom"
          onClick={onReset}
        >
          Reset
        </button>

        <button
          type="button"
          className="btn-primary-custom"
          onClick={onApply}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default FilterBar;