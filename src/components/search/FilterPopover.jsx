import { useEffect, useMemo, useRef, useState } from "react";
import {
  SlidersHorizontal,
  X,
} from "lucide-react";

import FilterBar from "./FilterBar";

const DEFAULT_FILTERS = {
  culture: [],
  medium: [],
  department: "",
  createdAfter: "",
  createdBefore: "",
  hasImage: true,
};

function normalizeFilters(filters) {
  return {
    culture: Array.isArray(filters?.culture) ? filters.culture : [],
    medium: Array.isArray(filters?.medium) ? filters.medium : [],
    department: filters?.department || "",
    createdAfter: filters?.createdAfter || "",
    createdBefore: filters?.createdBefore || "",
    hasImage: filters?.hasImage !== false,
  };
}

function countActiveFilters(filters) {
  const normalized = normalizeFilters(filters);

  let total = 0;

  total += normalized.culture.length;
  total += normalized.medium.length;

  if (normalized.department) total += 1;
  if (normalized.createdAfter) total += 1;
  if (normalized.createdBefore) total += 1;

  /*
    Default hasImage adalah true.
    Jadi baru dihitung aktif jika user mematikan filter gambar.
  */
  if (normalized.hasImage === false) total += 1;

  return total;
}

function FilterPopover({
  filters,
  onChange,
  onReset,
}) {
  const [open, setOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState(() =>
    normalizeFilters(filters)
  );

  const popoverRef = useRef(null);

  const activeCount = useMemo(
    () => countActiveFilters(filters),
    [filters]
  );

  useEffect(() => {
    setDraftFilters(normalizeFilters(filters));
  }, [filters]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleApply = () => {
    onChange(draftFilters);
    setOpen(false);
  };

  const handleReset = () => {
    setDraftFilters(DEFAULT_FILTERS);
    onReset();
    setOpen(false);
  };

  return (
    <div className="filter-popover" ref={popoverRef}>
      <button
        type="button"
        className={`filter-trigger ${activeCount > 0 ? "active" : ""}`}
        onClick={() => setOpen((current) => !current)}
      >
        <SlidersHorizontal size={18} />
        <span>Filter</span>

        {activeCount > 0 && (
          <strong>{activeCount}</strong>
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="filter-mobile-backdrop"
            aria-label="Close filter"
            onClick={() => setOpen(false)}
          />

          <div className="filter-popover-panel">
            <div className="filter-popover-header">
              <div>
                <h3>Filters</h3>
                <p>Refine artworks by culture, medium, date, and collection.</p>
              </div>

              <button
                type="button"
                className="filter-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close filter"
              >
                <X size={18} />
              </button>
            </div>

            <FilterBar
              filters={draftFilters}
              onChange={setDraftFilters}
              onReset={handleReset}
              onApply={handleApply}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default FilterPopover;