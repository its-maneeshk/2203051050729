import { Routes, Route, Link } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
} from "@mui/material";
import ShortenPage from "./pages/ShortenPage";
import StatsPage from "./pages/StatsPage";
import RedirectHandler from "./routes/RedirectHandler";

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{ bgcolor: "#1565c0" }} // Custom primary blue
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
           URL Shortener
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              "&:hover": {
                backgroundColor: "#0d47a1",
              },
            }}
          >
            Shorten
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/stats"
            sx={{
              "&:hover": {
                backgroundColor: "#0d47a1",
              },
            }}
          >
            Stats
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<ShortenPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/:shortcode" element={<RedirectHandler />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
