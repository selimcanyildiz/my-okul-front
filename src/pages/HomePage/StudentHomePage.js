import React, { useState } from "react";
import { Button, Grid, Box, Typography, Menu, MenuItem } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import DownloadIcon from '@mui/icons-material/Download';
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
      const response = await fetch("https://denemeback.onrender.com/login-to-platform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ platformName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      window.postMessage(
        {
          source: "selim-front",
          action: "login",
          data: data,
        },
        "https://my-okul-front.vercel.app"
      );

      alert("Eklentiye mesaj gönderildi. Eğer eklenti yüklüyse, giriş işlemi gerçekleşecek.");
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu: " + error.message);
    }
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" style={{ padding: '10px 0', borderBottom: "1px solid gray" }}>
        <Grid item>
          <img src="/images/loginbg.png" alt="Logo" style={{ height: '50px', width: "70px" }} />
        </Grid>

        <Grid item>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              style={{ border: "1px solid gray", color: "black", borderRadius: "20px", fontSize: "12px", textTransform: "none" }}
              startIcon={<DownloadIcon />}
              onClick={() => {
                window.location.href = "https://denemeback.onrender.com/download-extension";
              }}
            >
              Zip Dosyasını İndir
            </Button>

            <div style={{ marginLeft: "20px" }}>
              <Button
                startIcon={<PermIdentityOutlinedIcon />}
                style={{ color: "#152147", marginRight: "20px", border: "1px solid gray", borderRadius: "20px", fontSize: "12px", textTransform: "none" }}
                onClick={handleClick} // Butona tıklanınca menüyü aç
              >
                Hesabım
              </Button>

              <Menu
                anchorEl={anchorEl} // Menü açılacak yer
                open={Boolean(anchorEl)} // Menü açılma durumu
                onClose={handleClose} // Menü kapanınca
              >
                <MenuItem onClick={handleMyAccount}>Hesabım</MenuItem>
                <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
              </Menu>
            </div>
          </div>
        </Grid>

      </Grid>


      <Grid>
        <Typography style={{ textAlign: "center", fontSize: "30px", color: "#152147" }}>MY Okulları'na Hoşgeldiniz</Typography>
      </Grid>

      <Grid container spacing={4} style={{ padding: 20 }} >
        {/* Eğitim Parkı Butonu */}
        <Grid item xs={12} md={5.75}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            border={1}
            borderColor="grey.300"
            borderRadius={2}
            onClick={() => handleLoginClick("egitimparki")}
            p={2}
            sx={{
              backgroundColor: "#ED6D2D",
              color: "white",
              borderRadius: "20px",
              cursor: "pointer"
            }}
          >
            <Box>
              <Typography variant="h3" style={{ fontWeight: 550 }}>Eğitim Parkı</Typography>
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
                <Typography variant="body1" sx={{ color: "white" }}>
                  Kullanıcı Adı: <Typography component="span" sx={{ color: "white", fontWeight: "normal" }}>kullanici_adi</Typography>
                </Typography>
                <Typography variant="body1" sx={{ color: "white" }}>
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
                src="/images/egitimpark.png" // Eğitim Parkı logosu URL'si
                alt="Eğitim Parkı Logo"
                style={{ width: 130, height: 80, marginRight: "10px" }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={0.5}>
        </Grid>

        <Grid item xs={12} md={5.75}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            border={1}
            borderColor="grey.300"
            borderRadius={2}
            onClick={() => handleLoginClick("bookr")}
            p={2}
            sx={{
              backgroundColor: "#436BF0",
              color: "white",
              borderRadius: "20px",
              cursor: "pointer"
            }}
          >
            <Box>
              <Typography variant="h3" style={{ fontWeight: 550 }}>Bookr Class</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom style={{ marginTop: "10px", marginBottom: "40px", color: "white", fontWeight: 550, fontSize: "12px", letterSpacing: "1px" }}>
                Platforma giriş yapmak için tıklayınız.
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body1" sx={{ color: "white" }}>
                  Kullanıcı Adı: <Typography component="span" sx={{ color: "white", fontWeight: "normal" }}>kullanici_adi</Typography>
                </Typography>
                <Typography variant="body1" sx={{ color: "white" }}>
                  Şifre: <Typography component="span" sx={{ color: "white", fontWeight: "normal" }}>********</Typography>
                </Typography>
              </Box>
              <Button
                startIcon={<ArrowOutwardIcon />}
                sx={{
                  backgroundColor: "none",
                  border: "none",
                  color: "white",
                  fontSize: "16px"
                }}
              >
                GİRİŞ YAP
              </Button>
            </Box>
            <Box>
              <img
                src="/images/bookr.png"
                alt="Eğitim Parkı Logo"
                style={{ width: 150, height: 140, marginRight: "10px" }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4} style={{ padding: 20 }}>
        <Grid item xs={12} md={5.75}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            border={1}
            borderColor="grey.300"
            borderRadius={2}
            onClick={() => handleLoginClick("rokodemi")}
            p={2}
            sx={{
              backgroundColor: "#A46FA6",
              color: "white",
              borderRadius: "20px",
              cursor: "pointer"
            }}
          >
            <Box>
              <Typography variant="h3" style={{ fontWeight: 550 }}>Rokodemi</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom style={{ marginTop: "10px", marginBottom: "40px", color: "white", fontWeight: 550, fontSize: "12px", letterSpacing: "1px" }}>
                Platforma giriş yapmak için tıklayınız.
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body1" sx={{ color: "white" }}>
                  Kullanıcı Adı: <Typography component="span" sx={{ color: "white", fontWeight: "normal" }}>kullanici_adi</Typography>
                </Typography>
                <Typography variant="body1" sx={{ color: "white" }}>
                  Şifre: <Typography component="span" sx={{ color: "white", fontWeight: "normal" }}>********</Typography>
                </Typography>
              </Box>
              <Button
                startIcon={<ArrowOutwardIcon />}
                sx={{
                  backgroundColor: "none", // Buton arka planı beyaz
                  border: "none",
                  color: "white",
                  fontSize: "16px"
                }}
              >
                GİRİŞ YAP
              </Button>
            </Box>
            <Box>
              <img
                src="/images/rokodemi.png"
                alt="Eğitim Parkı Logo"
                style={{ width: 200, height: 100, marginRight: "-30px" }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={0.5}>
        </Grid>

        <Grid item xs={12} md={5.75}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            border={1}
            borderColor="grey.300"
            borderRadius={2}
            onClick={() => handleLoginClick("eyotek")}
            p={2}
            sx={{
              backgroundColor: "#D97E1C",
              color: "white",
              borderRadius: "20px",
              cursor: "pointer"
            }}
          >
            <Box>
              <Typography variant="h3" style={{ fontWeight: 550 }}>Eyotek</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom style={{ marginTop: "10px", marginBottom: "40px", color: "white", fontWeight: 550, fontSize: "12px", letterSpacing: "1px" }}>
                Platforma giriş yapmak için tıklayınız.
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body1" sx={{ color: "white" }}>
                  Kullanıcı Adı: <Typography component="span" sx={{ color: "white", fontWeight: "normal" }}>kullanici_adi</Typography>
                </Typography>
                <Typography variant="body1" sx={{ color: "white" }}>
                  Şifre: <Typography component="span" sx={{ color: "white", fontWeight: "normal" }}>********</Typography>
                </Typography>
              </Box>
              <Button
                startIcon={<ArrowOutwardIcon />}
                sx={{
                  backgroundColor: "none",
                  border: "none",
                  color: "white",
                  fontSize: "16px"
                }}
              >
                GİRİŞ YAP
              </Button>
            </Box>
            <Box>
              <img
                src="/images/eyotek.png"
                alt="Eğitim Parkı Logo"
                style={{ width: 200, height: 46, marginRight: "10px" }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default StudentHomePage;