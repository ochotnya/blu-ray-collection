import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/PageHome";
import NewMovie from "./components/pages/PageNewMovie";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newmovie" element={<NewMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
