import React from "react";
import { Button, Container, Grid, Box, Typography } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { useNavigate } from "react-router-dom";

const Anasayfa = () => {
  const navigate = useNavigate();

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

  const handleMyAccount = () => navigate("/hesabim");

  return (
    <Container maxWidth="xl">
      <Grid container justifyContent="flex-end" alignItems="center" spacing={2}>
        {/* <Grid item>
          <Box mt={4}>
            <Button
              variant="contained"
              color="primary"
              href="https://denemeback.onrender.com/download-extension"
              download
              startIcon={<CloudDownloadIcon />}
            >
              ZIP Dosyasını İndir
            </Button>
          </Box>

          <Box mt={4}>
            <Button
              variant="contained"
              color="primary"
              href="https://denemeback.onrender.com/download-extension"
              download
              startIcon={<ArrowOutwardIcon />}
            >
              Eklenti sayfası
            </Button>
          </Box>
        </Grid> */}

        <Grid item>
          <Button
            startIcon={<PermIdentityOutlinedIcon />}
            style={{ color: "#152147" }}
            onClick={handleMyAccount}
          >
            Hesabım
          </Button>
        </Grid>
      </Grid>

      <Grid>
        <Typography style={{ textAlign: "center", fontSize: "30px", color: "#152147", marginTop: "-20px", marginBottom: "20px" }}>MY Okulları'na Hoşgeldiniz</Typography>
      </Grid>

      <Grid container spacing={4} >
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
              cursor:"pointer"
            }}
          >
            <Box>
              <Typography variant="h3" style={{ fontWeight: 550 }}>Eğitim Parkı</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom style={{ marginTop: "10px", marginBottom: "40px", color: "white", fontWeight: 550, fontSize: "12px", letterSpacing: "1px" }}>
                Platforma giriş yapmak için tıklayınız.
              </Typography>
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
                style={{ width: 130, height: 80, marginRight:"10px" }}
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
              cursor:"pointer"
            }}
          >
            <Box>
              <Typography variant="h3" style={{ fontWeight: 550 }}>Bookr Class</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom style={{ marginTop: "10px", marginBottom: "40px", color: "white", fontWeight: 550, fontSize: "12px", letterSpacing: "1px" }}>
                Platforma giriş yapmak için tıklayınız.
              </Typography>
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
                style={{ width: 150, height: 140, marginRight:"10px" }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4} style={{ marginTop: "20px" }}>
        {/* Eğitim Parkı Butonu */}
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
              cursor:"pointer"
            }}
          >
            <Box>
              <Typography variant="h3" style={{ fontWeight: 550 }}>Rokodemi</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom style={{ marginTop: "10px", marginBottom: "40px", color: "white", fontWeight: 550, fontSize: "12px", letterSpacing: "1px" }}>
                Platforma giriş yapmak için tıklayınız.
              </Typography>
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
                style={{ width: 200, height: 100, marginRight:"-30px" }}
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
              cursor:"pointer"
            }}
          >
            <Box>
              <Typography variant="h3" style={{ fontWeight: 550 }}>Eyotek</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom style={{ marginTop: "10px", marginBottom: "40px", color: "white", fontWeight: 550, fontSize: "12px", letterSpacing: "1px" }}>
                Platforma giriş yapmak için tıklayınız.
              </Typography>
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
                style={{ width: 200, height: 46, marginRight:"10px" }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

    </Container>
  );
};

export default Anasayfa;