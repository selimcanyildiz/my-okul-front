import React from "react";
import { Button, Container, Grid, Box, Typography } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const Anasayfa = () => {
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
    <Container maxWidth="xl">
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
            p={2}
            sx={{
              backgroundColor: "orange",
              color: "white",
              borderRadius:"20px"
            }}
          >
            <Box>
              <Typography variant="h3" style={{ fontWeight: 550 }}>Eğitim Parkı</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom style={{ marginTop: "10px", marginBottom: "40px", color: "white", fontWeight: 550, fontSize: "12px", letterSpacing: "1px" }}>
                Platforma giriş yapmak için tıklayınız.
              </Typography>
              <Button
                onClick={() => handleLoginClick("egitimparki")}
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
                src="/images/egtmpark.png" // Eğitim Parkı logosu URL'si
                alt="Eğitim Parkı Logo"
                style={{ width: 100, height: 100 }}
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
            p={2}
            sx={{
              backgroundColor: "blue",
              color: "white",
              borderRadius:"20px"
            }}
          >
            <Box>
              <Typography variant="h3" style={{ fontWeight: 550 }}>Bookr Class</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom style={{ marginTop: "10px", marginBottom: "40px", color: "white", fontWeight: 550, fontSize: "12px", letterSpacing: "1px" }}>
                Platforma giriş yapmak için tıklayınız.
              </Typography>
              <Button
                onClick={() => handleLoginClick("bookr")}
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
                style={{ width: 100, height: 100 }}
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
            p={2}
            sx={{
              backgroundColor: "purple",
              color: "white",
              borderRadius:"20px"
            }}
          >
            <Box>
              <Typography variant="h3" style={{ fontWeight: 550 }}>Rokodemi</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom style={{ marginTop: "10px", marginBottom: "40px", color: "white", fontWeight: 550, fontSize: "12px", letterSpacing: "1px" }}>
                Platforma giriş yapmak için tıklayınız.
              </Typography>
              <Button
                onClick={() => handleLoginClick("rokodemi")}
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
                src="/images/rokodemi.jpg" // Eğitim Parkı logosu URL'si
                alt="Eğitim Parkı Logo"
                style={{ width: 100, height: 100 }}
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
            p={2}
            sx={{
              backgroundColor: "#994C00",
              color: "white",
              borderRadius:"20px"
            }}
          >
            <Box>
              <Typography variant="h3" style={{ fontWeight: 550 }}>Eyotek</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom style={{ marginTop: "10px", marginBottom: "40px", color: "white", fontWeight: 550, fontSize: "12px", letterSpacing: "1px" }}>
                Platforma giriş yapmak için tıklayınız.
              </Typography>
              <Button
                onClick={() => handleLoginClick("eyotek")}
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
                style={{ width: 100, height: 100 }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* ZIP Dosyasını İndirme Linki */}
      <Box mt={4}>
        <a href="https://denemeback.onrender.com/download-extension" download>
          ZIP Dosyasını İndir
        </a>
      </Box>
    </Container>
  );
};

export default Anasayfa;