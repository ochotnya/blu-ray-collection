import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageHome from "./components/pages/PageHome";
import PageNewMovie from "./components/pages/PageNewMovie";
import PageMovieDetails from "./components/pages/PageMovieDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/newmovie" element={<PageNewMovie />} />
        <Route path="/moviedetails/:movieId" element={<PageMovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
