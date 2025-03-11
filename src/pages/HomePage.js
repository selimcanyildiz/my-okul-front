import React, { useState } from "react";
import { Container, Button, Drawer, Box, TextField, Typography, IconButton, Divider, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router-dom";

const Anasayfa = () => {
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const userInfo = {
    ad: "Selim",
    soyad: "Can",
    tc: "1548795126",
    sifre: "******",
    okulAdi: "My Okul",
    mail: "example@example.com",
    telefon: "+90 123 456 7890",
  };

  const handleRouter = async (url, userName, password, userNameClassName, passwordClassName, loginBtnClassName) => {
    const data = {
      url: url,
      username: userName,
      password: password,
      usernameInput: userNameClassName,
      passwordInput: passwordClassName,
      loginBtn: loginBtnClassName,
    };

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response1 = await response.json();
      console.log(response1.message);
    } catch (error) {
      console.log(error);
    }
  };

  const buttons = [
    {
      label: "Eğitim Parkı",
      onClick: () => {
        handleRouter(
          "https://www.egitimparki.com/Login",
          "1535-175",
          "9A01E",
          "txtUserName",
          "txtPassword",
          "btnLogin"
        );
      },
    },
    {
      label: "Bookr Class",
      url: "https://www.bookrclass.com",
      onClick: () => window.open("https://www.bookrclass.com", "_blank"),
    },
    {
      label: "Rokodemi",
      url: "https://www.rokodemi.com/Login",
      userName: "MEHMETAKIFMERMER",
      password: "1905gs",
      userNameClassName: "Email",
      passwordClassName: "Password",
      loginBtnClassName: "submit",
      onClick: () => {
        handleRouter(
          "https://www.rokodemi.com/Login",
          "MEHMETAKIFMERMER",
          "1905gs",
          "Email",
          "Password",
          "submit"
        );
      },
    },
    {
      label: "Eyotek",
      url: "https://www.eyotek.com",
      onClick: () => window.open("https://www.eyotek.com", "_blank"),
    },
  ];

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleMyAccount = () => navigate("/hesabim");

  return (
    <Container
      maxWidth="xl"
      sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: 0 }}
    >
      <IconButton onClick={() => navigate("/")} sx={{ position: "absolute", top: 10, right: 10, padding: 0 }}>
        <CloseIcon fontSize="large" />
      </IconButton>

      <IconButton onClick={toggleDrawer(true)} color="primary" sx={{ position: "absolute", top: 10, right: 50, padding: 0 }}>
        <AccountCircleIcon fontSize="large" />
      </IconButton>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 300, padding: 2, margin: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h6">Hesabım</Typography>
            <IconButton onClick={handleMyAccount} color="primary">
              <ArrowCircleRightIcon fontSize="large" />
            </IconButton>
          </Box>
          <Divider sx={{ my: 1 }} />
          <TextField label="Ad" fullWidth margin="dense" value={userInfo.ad} />
          <TextField label="Soyad" fullWidth margin="dense" value={userInfo.soyad} />
          <TextField label="TC" fullWidth margin="dense" value={userInfo.tc} />
          <TextField label="Şifre" fullWidth margin="dense" value={userInfo.sifre} />
          <TextField label="Okul Adı" fullWidth margin="dense" value={userInfo.okulAdi} />
          <TextField label="Mail" fullWidth margin="dense" value={userInfo.mail} />
          <TextField label="Telefon" fullWidth margin="dense" value={userInfo.telefon} />
          <TextField label="Son Giriş Tarihi" fullWidth margin="dense" value={"12 / 03 / 2025"} />
        </Box>
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          margin: 0,
          padding: 0,
        }}
      >
        <Grid container spacing={2} sx={{ maxWidth: "100%", margin: 0 }}>
          {buttons.map((button, index) => (
            <Grid item sm={12} md={6} key={index} sx={{ margin: 0, padding: 1 }}>
              <Button
                className="button-89"
                sx={{
                  mb: 2,
                  margin: "20px 0",
                  padding: 0,
                  width: "550px",
                  height: "150px",
                  fontSize: "18px",
                  textTransform: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={button.onClick}
              >
                {button.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Anasayfa;
