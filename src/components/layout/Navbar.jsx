import { useEffect, useRef, useState } from "react";

import {
  Archive,
  BarChart3,
  ChevronDown,
  Compass,
  Globe2,
  Heart,
  Home,
  Landmark,
  Library,
  Scale,
  Search,
  TimerReset,
} from "lucide-react";

import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";

import { useFavorites } from "../../context/FavoritesContext";
import { useCompare } from "../../context/CompareContext";
import ThemeToggle from "../theme/ThemeToggle";

function Navbar() {
  const { favorites } = useFavorites();
  const { compareItems } = useCompare();
  const { pathname } = useLocation();

  const [openMenu, setOpenMenu] = useState(null);
  const navbarRef = useRef(null);

  const isDiscoverActive =
    pathname.startsWith("/timeline") ||
    pathname.startsWith("/cultures") ||
    pathname.startsWith("/museum");

  const isLibraryActive =
    pathname.startsWith("/collections") ||
    pathname.startsWith("/favorites") ||
    pathname.startsWith("/compare") ||
    pathname.startsWith("/analytics");

  const toggleMenu = (menuName) => {
    setOpenMenu((currentMenu) =>
      currentMenu === menuName ? null : menuName
    );
  };

  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setOpenMenu(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <nav className="navbar-custom" ref={navbarRef}>
      <div className="container-xl">
        <div className="navbar-wrapper">
          <Link to="/" className="brand-logo">
            LakunaArt
          </Link>

          <div className="nav-links">
            <NavLink to="/" className="nav-item-custom">
              <Home size={18} />
              <span>Home</span>
            </NavLink>

            <NavLink to="/explore" className="nav-item-custom">
              <Compass size={18} />
              <span>Explore</span>
            </NavLink>

            <div className={`nav-dropdown ${isDiscoverActive ? "active" : ""}`}>
              <button
                type="button"
                className="nav-item-custom nav-dropdown-trigger"
                onClick={() => toggleMenu("discover")}
              >
                <Globe2 size={18} />
                <span>Discover</span>
                <ChevronDown
                  size={15}
                  className={openMenu === "discover" ? "chevron-open" : ""}
                />
              </button>

              {openMenu === "discover" && (
                <div className="nav-dropdown-menu">
                  <NavLink to="/timeline" className="nav-dropdown-item">
                    <TimerReset size={17} />
                    <div>
                      <strong>Timeline</strong>
                      <small>Explore artwork by period</small>
                    </div>
                  </NavLink>

                  <NavLink to="/cultures" className="nav-dropdown-item">
                    <Globe2 size={17} />
                    <div>
                      <strong>Culture Explorer</strong>
                      <small>Japanese, Chinese, Egyptian, and more</small>
                    </div>
                  </NavLink>

                  <NavLink to="/museum/cleveland" className="nav-dropdown-item">
                    <Landmark size={17} />
                    <div>
                      <strong>Museum</strong>
                      <small>Cleveland Museum collection overview</small>
                    </div>
                  </NavLink>
                </div>
              )}
            </div>

            <div className={`nav-dropdown ${isLibraryActive ? "active" : ""}`}>
              <button
                type="button"
                className="nav-item-custom nav-dropdown-trigger"
                onClick={() => toggleMenu("library")}
              >
                <Library size={18} />
                <span>Library</span>
                <ChevronDown
                  size={15}
                  className={openMenu === "library" ? "chevron-open" : ""}
                />
              </button>

              {openMenu === "library" && (
                <div className="nav-dropdown-menu">
                  <NavLink to="/collections" className="nav-dropdown-item">
                    <Archive size={17} />
                    <div>
                      <strong>Collections</strong>
                      <small>Your curated artwork groups</small>
                    </div>
                  </NavLink>

                  <NavLink to="/favorites" className="nav-dropdown-item">
                    <Heart size={17} />
                    <div>
                      <strong>
                        Favorites
                        {favorites.length > 0 && ` (${favorites.length})`}
                      </strong>
                      <small>Artwork you saved</small>
                    </div>
                  </NavLink>

                  <NavLink to="/compare" className="nav-dropdown-item">
                    <Scale size={17} />
                    <div>
                      <strong>
                        Compare
                        {compareItems.length > 0 && ` (${compareItems.length})`}
                      </strong>
                      <small>Side-by-side artwork comparison</small>
                    </div>
                  </NavLink>

                  <NavLink to="/analytics" className="nav-dropdown-item">
                    <BarChart3 size={17} />
                    <div>
                      <strong>Analytics</strong>
                      <small>Insight from your activity</small>
                    </div>
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          <div className="navbar-actions">
            <ThemeToggle />

            <NavLink to="/search" className="nav-item-custom search-nav-link">
              <Search size={18} />
              <span>Search</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;