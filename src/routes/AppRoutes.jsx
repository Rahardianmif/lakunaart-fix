import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";
import Favorites from "../pages/Favorites/Favorites";
import Analytics from "../pages/Analytics/Analytics";
import Compare from "../pages/Compare/Compare";
import ArtworkDetail from "../pages/ArtworkDetail/ArtworkDetail";
import Search from "../pages/Search/Search";
import Collections from "../pages/Collections/Collections";
import Artist from "../pages/Artist/Artist";
import Museum from "../pages/Museum/Museum";
import Timeline from "../pages/Timeline/Timeline";
import Cultures from "../pages/Cultures/Cultures";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/artwork/:id" element={<ArtworkDetail />} />
      <Route path="/search" element={<Search />} />
      <Route path="/artist/:slug" element={<Artist />} />
      <Route path="/museum/:slug" element={<Museum />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/cultures" element={<Cultures />} />
    </Routes>
  );
}

export default AppRoutes;
