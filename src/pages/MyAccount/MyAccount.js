import React, { useState } from "react";
import { Button, Grid, Box, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import Settings from "../HomePage/Settings";

const MyAccount = () => {

const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null); // Menü anchor elementi

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Menü aç
  };

  const handleClose = () => {
    setAnchorEl(null); // Menüyi kapat
  };

  const handleMyAccount = () => {
    handleClose(); // Menü kapat
    navigate("/hesabim"); // Hesabım sayfasına git
  };

  const handleLogout = () => {
    handleClose(); // Menü kapat
    navigate("/");
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 1,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Hafif bir gölge efekti
        }}
      >
        {/* Sol: Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/images/school.jpg" // Logo resmi
            alt="School Logo"
            style={{ width: "170px", height: "60px", marginRight: "16px" }} // Logo boyutu ve sağ boşluk
          />
        </Box>

        {/* Sağ: Butonlar ve Öğrenci Bilgileri */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Butonlar */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              sx={{
                borderRadius: "100%", // Tam yuvarlak buton
                minWidth: "36px", // Butonun minimum genişliği
                height: "36px", // Butonun yüksekliği
                bgcolor: "primary.main", // Arka plan rengi
                background: "#E0E0E0", // Gradient arka plan
                color: "black", // İkon rengi
                // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Gölge efekti
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DownloadIcon onClick={() => {
                window.location.href = "https://denemeback.onrender.com/download-extension"; // Zip dosyasını indirme URL'sine git
              }} sx={{ fontSize: "24px" }} /> {/* İkonu direkt butonun içine ekle */}
            </Button>

            <Button
              sx={{
                borderRadius: "100%", // Tam yuvarlak buton
                minWidth: "36px", // Butonun minimum genişliği
                height: "36px", // Butonun yüksekliği
                bgcolor: "primary.main", // Arka plan rengi
                background: "#E0E0E0", // Gradient arka plan
                color: "black", // İkon rengi
                marginLeft: "10px",
                // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Gölge efekti
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowOutwardIcon sx={{ fontSize: "24px" }} /> {/* İkonu direkt butonun içine ekle */}
            </Button>
          </Box>

          {/* Öğrenci Bilgileri */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginLeft: "10px" }}>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Selimcan Yıldız
              </Typography>

              <Menu
                anchorEl={anchorEl} // Menü açılacak yer
                open={Boolean(anchorEl)} // Menü açılma durumu
                onClose={handleClose} // Menü kapanınca
              >
                <MenuItem onClick={handleMyAccount}>Hesabım</MenuItem>
                <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
              </Menu>
              <Typography variant="body2" sx={{ color: "gray" }}>
                My Kolej İzmir
              </Typography>
            </Box>
          </Box>

          <Box>
            <IconButton onClick={handleClick} sx={{ color: "black" }}>
              <PersonIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Settings />
    </>
  );
};

export default MyAccount;
