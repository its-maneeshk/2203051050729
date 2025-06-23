import { Routes, Route, Link } from "react-router-dom";
import ShortenPage from "./pages/ShortenPage";
import StatsPage from "./pages/StatsPage";
import RedirectHandler from "./routes/RedirectHandler";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <h1>URL Shortener</h1>
        <div className="nav-links">
          <Link to="/">Shorten</Link>
          <Link to="/stats">Stats</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ShortenPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </div>
  );
}

export default App;
