import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import Home from "./components/pages/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newmovie" element={<AddMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
