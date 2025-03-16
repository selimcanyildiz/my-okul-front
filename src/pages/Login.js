import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper, IconButton, InputAdornment, Checkbox, FormControlLabel } from "@mui/material";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from "react-router-dom";

const Giris = () => {
  const navigate = useNavigate();

  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [sifre, setSifre] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hata, setHata] = useState(""); // Hata mesajı için state
  const [beniHatirla, setBeniHatirla] = useState(false); // Beni hatırla state

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
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          width: "80%",
          maxWidth: 1200,
          height: "70%",
          borderRadius: 2,
          position: "relative",
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        {/* Sol Kısım: Geçişli Mavi Arka Plan ve Resim */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#f0f3f7",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Box
            sx={{
              width: "60%",
              height: "80%",
              backgroundImage: "url(/images/loginbg.png)", // Resim ekledik
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              // border: "1px solid black",
              borderRadius: "8px", // Kartın kenarları yuvarlak
            }}
          />
        </Box>

        {/* Sağ Kısım: Form Alanı */}
        <Box
          sx={{
            flex: 1,
            p: 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: 380,
            margin: "0 auto",
            backgroundColor: "white",
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2,
            boxShadow: 3,
            position: "relative",
          }}
        >
          <Box sx={{ mx: 3, mt: 2 }}>
            <Typography style={{ marginTop: "20px" }} variant="h5" gutterBottom align="center">
              GİRİŞ EKRANI
            </Typography>

            <Typography variant="h6" gutterBottom align="center" style={{ fontSize: "13px" }}>
              Hoşgeldiniz, hesabınızla giriş yapabilirsiniz.
            </Typography>
          </Box>

          <Box component="form" noValidate autoComplete="off" sx={{ mx: 7 }}>
            {/* Kullanıcı Adı */}
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

            {/* Şifre */}
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

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={beniHatirla}
                    onChange={(e) => setBeniHatirla(e.target.checked)}
                    sx={{ transform: "scale(0.8)" }} // Checkbox'ı küçültme
                  />
                }
                label={<Typography style={{ fontSize: "12px" }} variant="body2" color="textSecondary">Beni Hatırla</Typography>}
                sx={{ color: "gray" }}
              />
              <Button
                onClick={handleForgotPassword}
                variant="text"
                sx={{ color: "gray", fontSize: "12px", textTransform: "none" }}
              >
                Şifremi Unuttum ?
              </Button>
            </Box>



            {/* Giriş Yap Butonu */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ fontSize: "0.7rem", padding: "8px", fontSize: "10px" }}
              onClick={handleLogin}
            >
              Giriş Yap
            </Button>
          </Box>
        </Box>
        <Box sx={{ position: "absolute", top: 10, right: 10, display: "flex", flexDirection: "row", gap: 2 }}>
          <Button
            style={{ border: "1px solid gray", color: "black", borderRadius: "20px", fontSize: "12px", textTransform: "none" }}
            startIcon={<DownloadIcon />}
            onClick={() => {
              window.location.href = "https://denemeback.onrender.com/download-extension"; // Zip dosyasını indirme URL'sine git
            }}
          >
            Zip Dosyasını İndir
          </Button>

          {/* <Button
            style={{ border: "1px solid gray", color: "black", borderRadius: "20px", fontSize: "12px", textTransform: "none" }}
            startIcon={<ArrowOutwardIcon />}
          >
            Eklentiye Git
          </Button> */}

        </Box>
      </Paper>
    </Box>
  );
};

export default Giris;
