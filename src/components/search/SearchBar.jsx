import {
  Clock3,
  Search,
  X,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import useSearchSuggestions from "../../hooks/useSearchSuggestions";
import { useSearchHistory } from "../../context/SearchContext";

function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const [keyword, setKeyword] = useState(query);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);
  const suggestions = useSearchSuggestions(keyword);
  const {
    history,
    saveSearch,
    removeSearch,
    clearHistory,
  } = useSearchHistory();

  useEffect(() => {
    setKeyword(query);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToSearch = (value) => {
    const cleanKeyword = value.trim();
    if (!cleanKeyword) return;

    saveSearch(cleanKeyword);
    setShowSuggestions(false);

    const params = new URLSearchParams(searchParams);
    params.set("q", cleanKeyword);

    navigate(`/search?${params.toString()}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    goToSearch(keyword);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <form className="search-wrapper" onSubmit={handleSubmit}>
        <Search size={20} />

        <input
          type="text"
          className="search-input"
          placeholder="Search artwork, artist, culture..."
          value={keyword}
          onFocus={() => setShowSuggestions(true)}
          onChange={(event) => {
            setKeyword(event.target.value);
            setShowSuggestions(true);
          }}
        />
      </form>

      {showSuggestions && (
        <div className="search-suggestions">
          {history.length > 0 && (
            <div className="suggestion-section">
              <div className="suggestion-section-title">
                <span>Recent Searches</span>
                <button type="button" onClick={clearHistory}>
                  Clear
                </button>
              </div>

              {history.map((item) => (
                <div className="suggestion-row" key={item}>
                  <button
                    type="button"
                    className="suggestion-item history-item"
                    onClick={() => goToSearch(item)}
                  >
                    <Clock3 size={16} />
                    <strong>{item}</strong>
                  </button>

                  <button
                    type="button"
                    className="suggestion-remove"
                    onClick={() => removeSearch(item)}
                    aria-label={`Remove ${item} from history`}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="suggestion-section">
              <div className="suggestion-section-title">
                <span>Suggestions</span>
              </div>

              {suggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="suggestion-item"
                  onClick={() => goToSearch(item.title)}
                >
                  <strong>{item.title}</strong>
                  <small>{item.artist}</small>
                </button>
              ))}
            </div>
          )}

          {history.length === 0 && suggestions.length === 0 && (
            <div className="suggestion-empty">
              Type a keyword to search artworks, artists, cultures, or media.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
