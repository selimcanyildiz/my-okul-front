import React, { useState } from "react";
import { 
  Container, TextField, Button, Typography, 
  Box, Paper, IconButton, InputAdornment 
} from "@mui/material";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Giris = () => {
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [sifre, setSifre] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hata, setHata] = useState(""); // Hata mesajı için state
  const navigate = useNavigate();

  const handleLogin = () => {
    if (kullaniciAdi.length !== 11) {
      setHata("TC Kimlik No 11 haneli olmalıdır.");
      return;
    }
    if (kullaniciAdi === "11111111111" && sifre === "1") {
      navigate("/anasayfa");  
    } else {
      alert("Kullanıcı adı veya şifre hatalı.");
    }
  };

  const handleForgotPassword = () => {
    navigate("/sifremi-unuttum");
  };

  const handleKullaniciAdiChange = (e) => {
    const value = e.target.value;
    // Sadece sayıları kabul et ve en fazla 11 karaktere izin ver
    if (/^\d*$/.test(value) && value.length <= 11) {
      setKullaniciAdi(value);
      setHata(""); // Hata mesajını temizle
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
            label="TC Kimlik No"
            variant="outlined"
            margin="normal"
            value={kullaniciAdi}
            onChange={handleKullaniciAdiChange}
            error={!!hata} // Hata varsa kırmızı çerçeve
            helperText={hata} // Hata mesajını göster
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Şifre"
            variant="outlined"
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
