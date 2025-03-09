import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Giris = () => {
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [sifre, setSifre] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (kullaniciAdi === "1" && sifre === "1") {
      navigate("/anasayfa");  // Ana sayfaya yönlendir
    } else {
      alert("Kullanıcı adı veya şifre hatalı.");
    }
  };

  const handleForgotPassword = () => {
    navigate("/sifremi-unuttum");
  }

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 10, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Öğrenci Giriş
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="TC Kimlik No"
            variant="outlined"
            margin="normal"
            value={kullaniciAdi}
            onChange={(e) => setKullaniciAdi(e.target.value)}
          />
          <TextField
            fullWidth
            label="Şifre"
            variant="outlined"
            margin="normal"
            type="password"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Giriş Yap
          </Button>
        </Box>
        <Button onClick={handleForgotPassword} variant="contained" sx={{ display: "block", mt:2 }}>
          Şifremi Unuttum
        </Button>
      </Paper>
    </Container>
  );
};

export default Giris;
