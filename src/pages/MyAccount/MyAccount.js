import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Grid, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const MyAccount = () => {
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    ad: "Ali",
    soyad: "Yılmaz",
    sifre: "password123",
    okul: "Örnek Üniversitesi",
    mail: "ali.yilmaz@example.com",
    telefon: "555-123-4567",
    paneller: [
      { ad: "A Panel", kullaniciAdi: "Selim", sifre: "password1" },
      { ad: "B Panel", kullaniciAdi: "Selim1", sifre: "password2" },
      { ad: "C Panel", kullaniciAdi: "Selim2", sifre: "password3" },
      { ad: "D Panel", kullaniciAdi: "Selim3", sifre: "password4" },
    ],
  });

  // Her panel için ayrı bir şifre göster/gizle durumu
  const [showPasswords, setShowPasswords] = useState({});

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handlePanelChange = (index, field, value) => {
    const updatedPanels = [...userInfo.paneller];
    updatedPanels[index][field] = value;
    setUserInfo({ ...userInfo, paneller: updatedPanels });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Yalnızca ilgili şifreyi açıp kapatır
  const togglePasswordVisibility = (index) => {
    setShowPasswords((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <Card sx={{ maxWidth: 700, mx: "auto", mt: 5, p: 3 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Hesabım
        </Typography>

        {/* Kullanıcı Bilgileri */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Kullanıcı Bilgileri
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField label="Ad" name="ad" value={userInfo.ad} onChange={handleChange} fullWidth InputProps={{ readOnly: !editMode }} />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Soyad" name="soyad" value={userInfo.soyad} onChange={handleChange} fullWidth InputProps={{ readOnly: !editMode }} />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Şifre"
              name="sifre"
              type="password"
              value={userInfo.sifre}
              onChange={handleChange}
              fullWidth
              InputProps={{ readOnly: !editMode }}
            />
          </Grid>
        </Grid>

        {/* Okul Bilgisi */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Okul Bilgisi
        </Typography>
        <TextField label="Okul" name="okul" value={userInfo.okul} onChange={handleChange} fullWidth InputProps={{ readOnly: !editMode }} />

        {/* İletişim Bilgileri */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          İletişim Bilgileri
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="Telefon" name="telefon" value={userInfo.telefon} onChange={handleChange} fullWidth InputProps={{ readOnly: !editMode }} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Mail" name="mail" value={userInfo.mail} onChange={handleChange} fullWidth InputProps={{ readOnly: !editMode }} />
          </Grid>
        </Grid>

        {/* Platform Bilgileri */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Platform Bilgileri
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {userInfo.paneller.map((panel, index) => (
            <Grid container item xs={12} spacing={1} key={index} alignItems="center">
              <Grid item xs={4}>
                <Typography>{panel.ad}</Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={panel.kullaniciAdi}
                  onChange={(e) => handlePanelChange(index, "kullaniciAdi", e.target.value)}
                  fullWidth
                  InputProps={{ readOnly: !editMode }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type={showPasswords[index] ? "text" : "password"}
                  value={panel.sifre}
                  onChange={(e) => handlePanelChange(index, "sifre", e.target.value)}
                  fullWidth
                  InputProps={{
                    readOnly: !editMode,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => togglePasswordVisibility(index)} edge="end">
                          {showPasswords[index] ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>

        {/* Düzenle/Kaydet Butonu */}
        <Button variant="contained" color="primary" onClick={toggleEditMode} fullWidth sx={{ mt: 3 }}>
          {editMode ? "Kaydet" : "Düzenle"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MyAccount;
