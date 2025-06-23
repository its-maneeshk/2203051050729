import { Routes, Route, Link } from "react-router-dom";

import ShortenPage from "./pages/ShortenPage";

function App() {
  return (
    <Container>


      <Routes>
        <Route path="/" element={<ShortenPage />} />
      </Routes>
    </Container>
  );
}

export default App;
