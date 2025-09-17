import React, { useEffect, useState } from "react";
import { Button, Grid, Box, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import PersonIcon from '@mui/icons-material/Person';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useNavigate } from "react-router-dom";

const StudentHomePage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [school, setSchool] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // Menü anchor

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleHomePage = () => { handleClose(); navigate("/anasayfa"); };
  const handleMyAccount = () => { handleClose(); navigate("/hesabim"); };
  const handleLogout = () => { handleClose(); navigate("/"); };

  const platformNames = {
    bilisimgaraji: "Bilişim Garajı",
    kolibri: "Kolibri",
    morpa: "Morpa Kampüs",
    sınavza: "Sınavza",
    cambridge: "Cambridge"
  };


  const handleLoginClick = async (platformName) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/login-to-platform`, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ platformName }),
      });
      const data = await res.json();
      if (data.redirect_url) window.open(data.redirect_url, "_blank");
      else alert("Yönlendirme URL'si alınamadı.");
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu: " + error.message);
    }
  };

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
        } catch (err) {
          console.error("Okul bilgisi alınırken hata:", err.message);
        }
      } else {
        navigate("/");
      }
    };
    fetchData();
  }, [navigate]);

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
            style={{ width: "160px", height: "70px", marginRight: "16px" }}
          />
        </Box>

        {/* Kullanıcı ve Menü */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {user.ad} {user.soyad}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              {school?.name}
            </Typography>
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
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: "#152147" }}>
          MY Okulları'na Hoş Geldiniz!
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 500, color: "#152147", mt: 1 }}>
          Hesaplarınıza giriş yapmak için aşağıdaki butonları kullanabilirsiniz. İyi çalışmalar!
        </Typography>
      </Box>

      <Grid
        container
        spacing={10} // önceden 4 idi, artırdık
        sx={{
          maxWidth: "90%",
          margin: "0 auto",
          px: 2,
          marginBottom: "60px",
          justifyContent: "center",
          overflowX: "hidden",
          alignItems: "stretch",
        }}
      >
        {["bilisimgaraji", "kolibri", "sınavza", "morpa", "cambridge"].map((platform) => (
          <Grid item xs={12} md={5.75} key={platform} sx={{ display: "flex" }}>
            <Box
              onClick={() => handleLoginClick(platform)}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                border: 1,
                borderColor: "grey.300",
                borderRadius: "30px",
                cursor: "pointer",
                p: "30px",
                backgroundColor: (() => {
                  switch (platform) {
                    case "bilisimgaraji": return "#F6E902";
                    case "kolibri": return "#2196F3";
                    case "sınavza": return "#7330A6";
                    case "morpa": return "#9D47FF";
                    case "cambridge": return "#6abaad";
                    default: return "#ccc";
                  }
                })(),
                color: "white",
                minHeight: "150px",
                overflow: "hidden",
              }}
            >
              {/* Sol: Metin ve kullanıcı bilgileri */}
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, pr: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  {platformNames[platform]}
                </Typography>

                <Typography variant="body2" sx={{ mb: 2, fontWeight: 550, fontSize: 16 }}>
                  Platforma giriş yapmak için tıklayınız.
                </Typography>

                <Box sx={{ display: "flex", gap: 7, mt: 3 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold",  fontSize:"20px" }}>
                    Kullanıcı Adı: <Typography component="span" sx={{ fontWeight: "normal" }}>{user[platform + "kull"] || "kullanıcı"}</Typography>
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold",  fontSize:"20px" }}>
                    Şifre: <Typography component="span" sx={{ fontWeight: "normal" }}>{user[platform + "sif"] || "*****"}</Typography>
                  </Typography>
                </Box>

              </Box>

              {/* Sağ: Logo */}
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={`/images/${platform}-logo.png`}
                  alt={`${platform} Logo`}
                  style={{ width: 220, height: 120, objectFit: "contain" }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

    </Box>

  );
};

export default StudentHomePage;