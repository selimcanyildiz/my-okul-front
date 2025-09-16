import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper, IconButton, InputAdornment, Checkbox, FormControlLabel } from "@mui/material";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Giris = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [sifre, setSifre] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hata, setHata] = useState(""); // Hata mesajı için state
  const [beniHatirla, setBeniHatirla] = useState(false); // Beni hatırla state

  const handleLogin = async () => {
    try {
      const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: kullaniciAdi, password: sifre }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("userType", data.user.role ? data.user.role : "student");
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/anasayfa");
      } else {
        setHata(data.message || "Kullanıcı adı veya şifre hatalı.");
      }
    } catch (error) {
      setHata("Sunucuyla bağlantı kurulamadı. Lütfen tekrar deneyin.");
    }
  };

  const handleForgotPassword = () => {
    navigate("/sifremi-unuttum");
  };

  const handleKullaniciAdiChange = (e) => {
    const value = e.target.value;
    setKullaniciAdi(value);
    setHata(""); // Hata mesajını temizle
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/images/background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          width: "70%",
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
            background: "linear-gradient(135deg, #141A30, #5038ED)",
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
          <Box sx={{ mx: 2 }}>
            <Typography style={{ marginTop: "20px", fontWeight: 900 }} variant="h5" gutterBottom align="center">
              GİRİŞ EKRANI
            </Typography>

            <Typography variant="h6" gutterBottom align="center" style={{ fontSize: "13px" }}>
              Hoşgeldiniz, hesabınızla giriş yapabilirsiniz.
            </Typography>
          </Box>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ mx: 7 }}
            onSubmit={(e) => {
              e.preventDefault(); // Sayfa yenilenmesini engelle
              handleLogin();
            }}
          >
            {/* Kullanıcı Adı */}
            <TextField
              fullWidth
              placeholder="TC Kimlik Numarası"
              variant="outlined"
              margin="normal"
              value={kullaniciAdi}
              onChange={handleKullaniciAdiChange}
              error={!!hata}
              helperText={hata}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person style={{color:"#1C1C1C"}} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "12px",  // Yuvarlak köşeler
                  backgroundColor:"#F0EDFFCC"
                },
              }}
            />

            {/* Şifre */}
            <TextField
              fullWidth
              placeholder="Şifre"
              variant="outlined"
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={sifre}
              onChange={(e) => setSifre(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock style={{color:"#1C1C1C"}}/>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "12px", // Yuvarlak köşeler
                  backgroundColor:"#F0EDFFCC"
                },
              }}
            />


            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={beniHatirla}
                    onChange={(e) => setBeniHatirla(e.target.checked)}
                    sx={{ transform: "scale(0.8)" }}
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
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#141A30", // siyah arka plan
                  color: "#ffffff",           // beyaz yazı
                  fontSize: "0.8rem",
                  padding: "10px 30px",
                  borderRadius: "12px",       // yuvarlak köşeler
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)", // gölge ekledik
                  "&:hover": {
                    backgroundColor: "#333333", // hover rengi
                    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.5)", // hover sırasında gölge artar
                  },
                }}
              >
                Giriş Yap
              </Button>
            </Box>


          </Box>

        </Box>
      </Paper>
    </Box>
  );
};

export default Giris;