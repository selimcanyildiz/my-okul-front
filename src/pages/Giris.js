import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Link, Paper } from "@mui/material";
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

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 10, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Öğrenci Giriş
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Kullanıcı Adı"
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
        <Link href="#" variant="body2" sx={{ display: "block", mt: 2 }}>
          Şifremi Unuttum
        </Link>
      </Paper>
    </Container>
  );
};

export default Giris;
