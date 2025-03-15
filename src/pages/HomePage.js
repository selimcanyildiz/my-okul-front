import React from "react";
import { Button, Container, Grid } from "@mui/material";

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
      <Grid container spacing={2} style={{ marginBottom: "20px", marginTop: "20px" }}>
        <Grid item xs={12}>
          <Button onClick={() => handleLoginClick("egitimparki")} variant="contained" color="primary">
            Eğitim Parkı
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button onClick={() => handleLoginClick("rokodemi")} variant="contained" color="primary">
            Rokodemi
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Anasayfa;