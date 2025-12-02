import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Giris = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [sifre, setSifre] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hata, setHata] = useState("");
  const [beniHatirla, setBeniHatirla] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogin = async () => {
    setLoading(true); // ✅ giriş başladığında aktif
    setHata("");

    try {
      const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: kullaniciAdi, password: sifre }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("userType", data.user.role || "student");
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/anasayfa");
      } else {
        setHata(data.message || "Kullanıcı adı veya şifre hatalı.");
      }
    } catch (error) {
      setHata("Sunucuyla bağlantı kurulamadı. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false); // ✅ işlem bittiğinde kapat
    }
  };

  const handleForgotPassword = () => {
    navigate("/sifremi-unuttum");
  };

  return (
    <Box
      sx={{
        minHeight: { xs: "", md:"100vh"},
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: "url(/images/background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        // py: { xs: 4, md: 0 },
      }}
    >
      {/* 📱 Mobilde logo Paper dışında */}
      {isMobile && (
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src="/images/loginbg.png"
            alt="Logo"
            sx={{
              width: "200px",
              height: "200px",
              objectFit: "contain",
            }}
          />
        </Box>
      )}

      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: { xs: "100%", md: "70%" }, // mobilde full width
          height: { xs: "auto", md: "70%" },
          borderRadius: { xs: "24px 24px 0 0", md: "24px" }, // mobilde sadece üst köşe radius
          overflow: "hidden",
          backgroundColor: "white",
          mx: { xs: 0, md: "auto" }, // mobilde margin yok, md'de yatay ortala
          my: { xs: 0, md: "auto" }, // mobilde alt üst margin yok, md'de dikey ortala
        }}
      >
        {/* 💻 Masaüstünde sol taraf görünsün */}
        {!isMobile && (
          <Box
            sx={{
              flex: 1,
              background: "linear-gradient(135deg, #141A30, #5038ED)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 1,
            }}
          >
            <Box
              sx={{
                width: "70%",
                height: "80%",
                // border: "1px solid white",
                // backgroundColor: "#5a529e",
                backgroundImage: "url(/images/mylogo.png)",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                borderRadius: "30px",
              }}
            />
          </Box>
        )}

        {/* Sağ Kısım: Form Alanı */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            minHeight:"70vh",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: { xs: "24px", md: "0 24px 24px 0" },
            py: { xs: 3, md: 4 },
            px: 4,
          }}
        >
          <Box sx={{ mx: 2 }}>
            <Typography
              sx={{ mt: 2, fontWeight: 900 }}
              variant="h5"
              gutterBottom
              align="center"
            >
              GİRİŞ EKRANI
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              align="center"
              sx={{ fontSize: "13px" }}
            >
              Hoşgeldiniz, hesabınızla giriş yapabilirsiniz.
            </Typography>
          </Box>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ mx: { xs: 2, md: 7 }, width: "100%", maxWidth: 400 }}
            onSubmit={(e) => {
              e.preventDefault();
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
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 11) {
                  setKullaniciAdi(value);
                }
                setHata("");
              }}
              error={
                !!hata ||
                (kullaniciAdi.length > 0 && kullaniciAdi.length < 11)
              }
              helperText={
                hata ||
                (kullaniciAdi.length > 0 && kullaniciAdi.length < 11
                  ? "TC kimlik numarası 11 haneli olmalıdır."
                  : "")
              }
              inputProps={{ maxLength: 11 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person style={{ color: "#1C1C1C" }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "12px",
                  backgroundColor: "#F0EDFFCC",
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
                    <Lock style={{ color: "#1C1C1C" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "12px",
                  backgroundColor: "#F0EDFFCC",
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={beniHatirla}
                    onChange={(e) => setBeniHatirla(e.target.checked)}
                    sx={{ transform: "scale(0.8)" }}
                  />
                }
                label={
                  <Typography
                    sx={{ fontSize: "12px" }}
                    variant="body2"
                    color="textSecondary"
                  >
                    Beni Hatırla
                  </Typography>
                }
                sx={{ color: "gray" }}
              />
              <Button
                onClick={handleForgotPassword}
                variant="text"
                sx={{
                  color: "gray",
                  fontSize: "12px",
                  textTransform: "none",
                }}
              >
                Şifremi Unuttum ?
              </Button>
            </Box>

            {/* Giriş Yap Butonu */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                type="submit"
                loading={loading}
                variant="contained"
                sx={{
                  backgroundColor: "#141A30",
                  color: "#ffffff",
                  fontSize: "0.8rem",
                  px: 4,
                  py: 1.5,
                  borderRadius: "12px",
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                  "&:hover": {
                    backgroundColor: "#333333",
                    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.5)",
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
