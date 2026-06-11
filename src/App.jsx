import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CompareProvider } from "./context/CompareContext";
import { SearchProvider } from "./context/SearchContext";
import { ThemeProvider } from "./context/ThemeContext";
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";
import { CollectionsProvider } from "./context/CollectionsContext";

function App() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <RecentlyViewedProvider>
          <FavoritesProvider>
            <CompareProvider>
              <CollectionsProvider>
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </CollectionsProvider>
            </CompareProvider>
          </FavoritesProvider>
        </RecentlyViewedProvider>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
