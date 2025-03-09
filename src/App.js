import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import HomePage from "./pages/HomePage";
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/giris" />} />
        <Route path="/giris" element={<Login />} />
        <Route path="/sifremi-unuttum" element={<ForgotPassword />} />
        <Route path="/anasayfa" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
