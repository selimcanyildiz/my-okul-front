import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Giris from "./pages/Giris";
import AnaSayfa from "./pages/AnaSayfa";
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/giris" />} />
        <Route path="/giris" element={<Giris />} />
        <Route path="/anasayfa" element={<AnaSayfa />} />
      </Routes>
    </Router>
  );
};

export default App;
