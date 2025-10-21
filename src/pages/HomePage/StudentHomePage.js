import React, { useEffect, useState } from "react";
import { Button, Grid, Box, Typography, Menu, MenuItem, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Alert, Snackbar } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import PersonIcon from '@mui/icons-material/Person';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

const StudentHomePage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [school, setSchool] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // sm ve altı için mobil


  // Şifre değişikliği ile ilgili state
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleHomePage = () => { handleClose(); navigate("/anasayfa"); };
  const handleMyAccount = () => { handleClose(); navigate("/hesabim"); };
  const handleLogout = () => { handleClose(); navigate("/"); };

  useEffect(() => {
    const fetchData = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setUser(userData);
        const token = localStorage.getItem("token");
        try {
          const res = await fetch(`${apiUrl}/schools/${userData.school_id}`, {
            headers: { "Authorization": `Bearer ${token}` },
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          setSchool(data);

          // Şifre default mu kontrol et
          if (userData.password === "123456") {
            setOpenPasswordDialog(true);
          }
        } catch (err) {
          console.error("Okul bilgisi alınırken hata:", err.message);
        }
      } else {
        navigate("/");
      }
    };
    fetchData();
  }, [navigate, apiUrl]);

  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      setSnackbarMessage("Lütfen yeni şifreyi giriniz.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setSnackbarMessage("Şifreler eşleşmiyor!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${apiUrl}/students/update_password/${user.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_password: newPassword }),
      });


      if (!res.ok) throw new Error("Şifre güncellenirken hata oluştu");

      // Başarılı
      const updatedUser = { ...user, password: newPassword };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setOpenPasswordDialog(false);
      setSnackbarMessage("Şifreniz başarıyla güncellendi!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

    } catch (err) {
      console.error(err);
      setSnackbarMessage(err.message || "Şifre güncellenirken hata oluştu");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // const handleLoginClick = async (platformName) => {
  //   try {
  //     const staticPlatform = parseInt(user.sube_seviye.split("/")[0]);
  //     if (platformName === "sinavza") {
  //       window.open(staticPlatform >= 1 && staticPlatform <= 4
  //         ? school.url_ilkokul || "https://edesis.com/"
  //         : staticPlatform >= 5 && staticPlatform <= 8
  //           ? school.url_ortaokul || "https://edesis.com/"
  //           : staticPlatform >= 9 && staticPlatform <= 12
  //             ? school.url_lise || "https://edesis.com/"
  //             : school.url_anaokul || "https://edesis.com/", "_blank");
  //       return;
  //     }
  //     else if (platformName === "eyotek") {
  //       window.open("https://mykolej.eyotek.com/v1/", "_blank");
  //       return;
  //     }
  //     else if (platformName === "cambridge") {
  //       window.open("https://www.cambridgeone.org/", "_blank");
  //       return;
  //     }

  //     // SSO entegrasyonu olan platformlar için backend'e istek at
  //     const token = localStorage.getItem("token");
  //     const res = await fetch(`${apiUrl}/login-to-platform`, {
  //       method: "POST",
  //       headers: {
  //         "Authorization": `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ platformName }),
  //     });

  //     const data = await res.json();

  //     if (res.ok && data.redirect_url) {
  //       window.open(data.redirect_url, "_blank");
  //     } else {
  //       const errorMsg = data.detail || data.error || "Bilinmeyen bir hata oluştu.";
  //       setSnackbarMessage(errorMsg);
  //       setSnackbarSeverity("error");
  //       setSnackbarOpen(true);
  //     }
  //   } catch (error) {
  //     console.error("Hata:", error);
  //     alert("Bir hata oluştu: " + error.message);
  //   }
  // };

  const handleLoginClick = async (platformName) => {
    // Kullanıcı tıklayınca hemen yeni sekmeyi aç
    const newTab = window.open("", "_blank");

    try {
      const staticPlatform = parseInt(user.sube_seviye.split("/")[0]);

      // Platformlara göre ön tanımlı URL yönlendirmesi
      if (platformName === "sinavza") {
        const url =
          staticPlatform >= 1 && staticPlatform <= 4
            ? school.url_ilkokul || "https://edesis.com/"
            : staticPlatform >= 5 && staticPlatform <= 8
              ? school.url_ortaokul || "https://edesis.com/"
              : staticPlatform >= 9 && staticPlatform <= 12
                ? school.url_lise || "https://edesis.com/"
                : school.url_anaokul || "https://edesis.com/";

        newTab.location.href = url;
        return;
      } else if (platformName === "kolibri") {
        newTab.location.href = "https://onepasslearning.com";
        return;
      } else if (platformName === "eyotek") {
        newTab.location.href = "https://mykolej.eyotek.com/v1/";
        return;
      } else if (platformName === "cambridge") {
        newTab.location.href = "https://www.cambridgeone.org/";
        return;
      }

      // SSO entegrasyonu olan platformlar için backend'e istek at
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/login-to-platform`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ platformName }),
      });

      const data = await res.json();

      if (res.ok && data.redirect_url) {
        // Yeni sekmeyi backend'den gelen URL'ye yönlendir
        newTab.location.href = data.redirect_url;
      } else {
        const errorMsg = data.detail || data.error || "Bilinmeyen bir hata oluştu.";
        newTab.close(); // Hata varsa sekmeyi kapat
        setSnackbarMessage(errorMsg);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Hata:", error);
      newTab.close();
      alert("Bir hata oluştu: " + error.message);
    }
  };

  const anaSiniflar = [
    "Anasınıfı",
    "Ana Sınıf",
    "Anasnf",
    "Anasnf 3-4 yaş",
    "Anasnf 5-6 yaş",
    "ANS",
    "[A] Sarı Sınıf",
    "[B] Yeşil Sınıf",
    "[C] Mavi Sınıf",
    "[D] Kırmızı Sınıf"
  ];

  const platformNames = { bilisimgaraji: "Bilişim Garajı", kolibri: "Kolibri", morpa: "Morpa Kampüs", sinavza: "Sınavza", cambridge: "Cambridge", eyotek: "Eyotek" };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url(/images/background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: 2,
          width: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/images/school.png"
            alt="School Logo"
            style={{
              width: isMobile ? "150px" : "250px",  // mobilde 150px, normalde 250px
              height: isMobile ? "50px" : "70px",   // mobilde 50px, normalde 70px
              marginRight: "16px",
            }}
          />
        </Box>

        {/* Kullanıcı ve Menü */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ textAlign: "right" }}>
            {/* Kullanıcı ve okul bilgisi: sadece masaüstünde göster */}
            {!isMobile && (
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {user.ad} {user.soyad}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  {school?.name}
                </Typography>
              </Box>
            )}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleHomePage}>Ana Sayfa</MenuItem>
              <MenuItem onClick={handleMyAccount}>Hesabım</MenuItem>
              <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
            </Menu>
          </Box>
          <IconButton onClick={handleClick} sx={{ color: "black" }}>
            <ClearAllIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Başlık */}
      <Box
        sx={{
          textAlign: "center",
          px: { xs: 2, md: 0 },
          mb: 4,
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h3"} // Mobilde h6, masaüstünde h3
          sx={{ fontWeight: 700, color: "#152147" }}
        >
          MY Okulları'na Hoş Geldiniz!
        </Typography>
        <Typography
          variant={isMobile ? "body1" : "h6"} // Mobilde body1, desktop h6
          sx={{ fontWeight: 500, color: "#152147", mt: 1 }}
        >
          Hesaplarınıza giriş yapmak için aşağıdaki butonları kullanabilirsiniz. İyi çalışmalar!
        </Typography>
      </Box>

      <Grid
        container
        spacing={4}
        sx={{
          maxWidth: "90%",
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {["bilisimgaraji", "kolibri", "morpa", "sinavza", "cambridge", "eyotek"]
          .filter((platform) => {
            if (
              platform === "sinavza" &&
              anaSiniflar.some(
                (s) =>
                  s.toLowerCase().replace(/\s+/g, "") ===
                  (user.sube_sinif || "").toLowerCase().replace(/\s+/g, "")
              )
            ) {
              return false;
            }
            return true;
          })
          .map((platform) => (
            <Grid
              item
              key={platform}
              xs={12} // mobilde tam genişlik
              md={5.75}
              sx={{
                display: "flex",
                justifyContent: "center", // mobil ve desktop ortala
              }}
            >
              <Box
                onClick={() => handleLoginClick(platform)}
                sx={{
                  width: { xs: "100%", md: "100%" },
                  height: 200, // tüm kartlar için sabit yükseklik
                  display: "flex",
                  margin: "0 15px 20px -15px",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: 1,
                  borderColor: "grey.300",
                  borderRadius: "30px",
                  cursor: "pointer",
                  p: !isMobile ? "20px" : "10px",
                  backgroundColor: (() => {
                    switch (platform) {
                      case "bilisimgaraji":
                        return "#F6E902";
                      case "kolibri":
                        return "#2196F3";
                      case "sinavza":
                        return "#7330A6";
                      case "morpa":
                        return "#9D47FF";
                      case "cambridge":
                        return "#6abaad";
                      case "eyotek":
                        return "#D78022";
                      default:
                        return "#ccc";
                    }
                  })(),
                  color: "white",
                  boxSizing: "border-box",
                }}
              >
                {/* Üst: Platform adı ve açıklama */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {platformNames[platform]}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Platforma giriş yapmak için tıklayınız.
                    </Typography>

                    {platform === "kolibri" && (
                      <Typography
                        variant="body2"
                        sx={{ mt: 1, fontSize: "12px" }}
                      >
                        Masaüstü cihazlardan direkt giriş yapılır. Mobil cihazlardan
                        uygulamaya yönlendirilirsiniz.
                      </Typography>
                    )}

                    {(platform === "sinavza" ||
                      platform === "cambridge" ||
                      platform === "eyotek") && (
                        <Typography
                          variant="body2"
                          sx={{ mt: 1, fontSize: "12px" }}
                        >
                          Platforma yönlendirilirsiniz. Kullanıcı adınızı ve şifrenizi
                          kendiniz girmeniz gerekmektedir.
                        </Typography>
                      )}
                  </Box>

                  <Box>
                    <img
                      src={`/images/${platform}-logo.png`}
                      alt={`${platform} Logo`}
                      style={{ width: 120, height: 60, objectFit: "contain" }}
                    />
                  </Box>
                </Box>

                {/* Alt: Kullanıcı adı ve şifre veya Kolibri kodu */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: !isMobile ? 2 : 0,
                  }}
                >
                  {platform === "kolibri" ? (
                    // 🔹 Kolibri için özel görünüm
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      Kolibri Kodunuz:{" "}
                      <Typography
                        component="span"
                        sx={{
                          fontWeight: "normal",
                          backgroundColor: "rgba(255,255,255,0.2)",
                          padding: "2px 8px",
                          borderRadius: "8px",
                        }}
                      >
                        {user.klbcode || "Kod atanmamış"}
                      </Typography>
                    </Typography>
                  ) : (
                    // 🔹 Diğer platformlar için kullanıcı adı ve şifre
                    <>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Kullanıcı Adı:{" "}
                        <Typography component="span" sx={{ fontWeight: "normal" }}>
                          {user[platform + "kull"] || "kullanıcı"}
                        </Typography>
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Şifre:{" "}
                        <Typography component="span" sx={{ fontWeight: "normal" }}>
                          {user[platform + "sif"] || "*****"}
                        </Typography>
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
          ))}
      </Grid>


      <Dialog open={openPasswordDialog} onClose={() => { }} disableEscapeKeyDown>
        <DialogTitle>Zorunlu Şifre Değişikliği</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>Lütfen default şifrenizi değiştirin.</Typography>
          <TextField
            label="Yeni Şifre"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={newPassword.length > 0 && newPassword.length < 6}
            helperText={newPassword.length > 0 && newPassword.length < 6 ? "Şifre en az 6 karakter olmalıdır" : ""}
          />
          <TextField
            label="Yeni Şifre (Tekrar)"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPassword.length > 0 && confirmPassword !== newPassword}
            helperText={confirmPassword.length > 0 && confirmPassword !== newPassword ? "Şifreler eşleşmiyor" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePasswordChange}
            variant="contained"
            color="primary"
            disabled={newPassword.length < 6 || newPassword !== confirmPassword} // butonu disable ediyoruz
          >
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>


      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </Box>

  );
};

export default StudentHomePage;