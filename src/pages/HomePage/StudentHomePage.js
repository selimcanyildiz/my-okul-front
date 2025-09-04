import React, { useState } from "react";
import { Button, Grid, Box, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";

const StudentHomePage = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null); // Menü anchor elementi

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Menü aç
  };

  const handleClose = () => {
    setAnchorEl(null); // Menüyi kapat
  };

  const handleHomePage = () => {
    handleClose(); // Menü kapat
    navigate("/anasayfa"); // Ana sayfaya git
  };

  const handleMyAccount = () => {
    handleClose(); // Menü kapat
    navigate("/hesabim"); // Hesabım sayfasına git
  };

  const handleLogout = () => {
    handleClose(); // Menü kapat
    navigate("/");
  };

  const handleLoginClick = async (platformName) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://my-okul-back.onrender.com/login-to-platform", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ platformName }),
      });

      const data = await res.json();
      console.log("BookR URL:", data.redirect_url);

      if (data.redirect_url) {
        window.open(data.redirect_url, "_blank");
      } else {
        alert("Yönlendirme URL'si alınamadı.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu: " + error.message);
    }
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

          {/* Öğrenci Bilgileri */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginLeft: "10px" }}>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Abdülhamit Yıldırım
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

      <Grid style={{ marginTop: "20px" }}>
        <Typography style={{ textAlign: "center", fontSize: "30px", color: "#152147" }}>MY Okulları'na Hoşgeldiniz</Typography>
      </Grid>

      <Grid container spacing={4} style={{ padding: 20 }} >
        {/* Bilişim Garajı Butonu */}
        <Grid item xs={12} md={5.75}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            border={1}
            borderColor="grey.300"
            borderRadius={2}
            onClick={() => handleLoginClick("bilisimgaraji")}
            p={2}
            sx={{
              backgroundColor: "#F6E902",
              color: "white",
              borderRadius: "20px",
              cursor: "pointer"
            }}
          >
            <Box>
              <Typography variant="h3" style={{ fontWeight: 550 }}>Bilişim Garajı</Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                gutterBottom
                style={{ marginTop: "10px", marginBottom: "40px", color: "white", fontWeight: 550, fontSize: "12px", letterSpacing: "1px" }}
              >
                Platforma giriş yapmak için tıklayınız.
              </Typography>

              {/* Kullanıcı Adı ve Şifre Alanları */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                  Kullanıcı Adı: <Typography component="span" sx={{ color: "white", fontWeight: "normal" }}>kullanici_adi</Typography>
                </Typography>
                <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                  Şifre: <Typography component="span" sx={{ color: "white", fontWeight: "normal" }}>********</Typography>
                </Typography>
              </Box>

              {/* Giriş Yap Butonu */}
              <Button
                startIcon={<ArrowOutwardIcon />}
                sx={{
                  backgroundColor: "none", // Buton arka planı beyaz
                  border: "none",
                  color: "white",
                  fontSize: "16px",
                  width: "788",
                  height: "282"
                }}
              >
                GİRİŞ YAP
              </Button>
            </Box>
            <Box>
              <img
                src="/images/bilisimgaraji.png" // Bilişim Garajı logosu URL'si
                alt="Bilişim Garajı Logo"
                style={{ width: 130, height: 80, marginRight: "10px" }}
              />
            </Box>
          </Box>
        </Grid>

        {/* BookR Class Butonu */}
        <Grid item xs={12} md={5.75}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            border={1}
            borderColor="grey.300"
            borderRadius={2}
            onClick={() => handleLoginClick("kolibri")}  // Buradaki isim backend'deki platform kontrolüyle uyuşmalı
            p={2}
            sx={{
              backgroundColor: "#2196F3",  // Mavi arkaplan
              color: "white",
              borderRadius: "20px",
              cursor: "pointer"
            }}
          >
            <Box>
              <Typography variant="h3" style={{ fontWeight: 550 }}>Kolibri</Typography>
              <Typography
                variant="body2"
                gutterBottom
                style={{ marginTop: "10px", marginBottom: "40px", color: "white", fontWeight: 550, fontSize: "12px", letterSpacing: "1px" }}
              >
                Platforma giriş yapmak için tıklayınız.
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                  Kullanıcı Adı: <Typography component="span" sx={{ color: "white", fontWeight: "normal" }}>kullanici_adi</Typography>
                </Typography>
                <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                  Şifre: <Typography component="span" sx={{ color: "white", fontWeight: "normal" }}>********</Typography>
                </Typography>
              </Box>

              <Button
                startIcon={<ArrowOutwardIcon />}
                sx={{
                  backgroundColor: "none",
                  border: "none",
                  color: "white",
                  fontSize: "16px",
                }}
              >
                GİRİŞ YAP
              </Button>
            </Box>
            <Box>
              <img
                src="/images/bookr.png"  // Kendi BookR logonu buraya yerleştirebilirsin
                alt="BookR Logo"
                style={{ width: 130, height: 80, marginRight: "10px" }}
              />
            </Box>
          </Box>
        </Grid>



      </Grid>

    </>
  );
};

export default StudentHomePage;