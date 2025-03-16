import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import HomePage from "./pages/HomePage";
import MyAccount from "./pages/MyAccount/MyAccount";
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, SemiBold',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/giris" />} />
          <Route path="/giris" element={<Login />} />
          <Route path="/sifremi-unuttum" element={<ForgotPassword />} />
          <Route path="/anasayfa" element={<HomePage />} />
          <Route path="/hesabim" element={<MyAccount />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
