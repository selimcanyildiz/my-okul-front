import React, { useEffect, useState } from "react";
import { Button, Grid, Box, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import Settings from "../HomePage/Settings";

const MyAccount = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [school, setSchool] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null); // Menü anchor elementi

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Menü aç
  };

  const handleClose = () => {
    setAnchorEl(null); // Menüyi kapat
  };

  const handleHomePage = () => {
    handleClose(); // Menü kapat
    navigate("/anasayfa"); // Hesabım sayfasına git
  }

  const handleMyAccount = () => {
    handleClose(); // Menü kapat
    navigate("/hesabim"); // Hesabım sayfasına git
  };

  const handleLogout = () => {
    handleClose(); // Menü kapat
    navigate("/");
  };

  useEffect(() => {
      const fetchData = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          setUser(user);
  
          const token = localStorage.getItem("token");
          try {
            const res = await fetch(`${apiUrl}/schools/${user.school_id}`, {
              headers: {
                "Authorization": `Bearer ${token}`,
              },
            });
  
            if (!res.ok) {
              const errorText = await res.text();
              throw new Error(`HTTP ${res.status}: ${errorText}`);
            }
  
            const data = await res.json();
            setSchool(data); // 🔹 school state'i güncelleniyor
          } catch (err) {
            console.error("Okul bilgisi alınırken hata:", err.message);
          }
  
        } else {
          navigate("/");
        }
      };
  
      fetchData();
    }, [navigate]);


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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginLeft: "10px" }}>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {user.ad} {user.soyad}
              </Typography>

              <Menu
                anchorEl={anchorEl} // Menü açılacak yer
                open={Boolean(anchorEl)} // Menü açılma durumu
                onClose={handleClose} // Menü kapanınca
              >
                <MenuItem onClick={handleHomePage}>Ana Sayfa</MenuItem>
                <MenuItem onClick={handleMyAccount}>Hesabım</MenuItem>
                <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
              </Menu>
              <Typography variant="body2" sx={{ color: "gray" }}>
                {school?.name}
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
