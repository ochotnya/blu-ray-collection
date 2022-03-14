import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import Home from "./components/pages/Home";
import NewMovie from "./components/pages/NewMovie";
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
