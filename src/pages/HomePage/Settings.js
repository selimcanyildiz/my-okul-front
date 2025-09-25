import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Grid,
    TextField,
    Button,
    Alert,
    Snackbar,
    IconButton,
    Tabs,
    Tab,
    useMediaQuery
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const [user, setUser] = useState({ platforms: {} });
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPlatform, setShowPlatform] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    // mobil kontrolü
    const isMobile = useMediaQuery("(max-width:900px)");
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser.id) {
            navigate("/");
            return;
        }
        const token = localStorage.getItem("token");

        fetch(`${apiUrl}/students/${storedUser.id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Öğrenci bilgileri alınamadı");
                return res.json();
            })
            .then((data) => {
                setUser({
                    id: storedUser.id,
                    name: `${data.ad} ${data.soyad}`,
                    tcNumber: data.tc,
                    password: data.password,
                    firstName: data.ad,
                    lastName: data.soyad,
                    schoolName: data.okul_adi,
                    classBranch: `${data.sube_sinif || ""} / ${data.sube_seviye || ""}`,
                    phone: data.parent_phone || "",
                    platforms: {
                        bilisimgaraji: {
                            username: data.bilisimgarajikull,
                            password: data.bilisimgarajisif,
                        },
                        kolibri: { username: data.kolibrikull, password: data.kolibrisif },
                        morpa: { username: data.morpakull, password: data.morpasif },
                        sınavza: { username: data.sınavzakull, password: data.sınavzasif },
                        cambridge: {
                            username: data.cambridgekull,
                            password: data.cambridgesif,
                        },
                    },
                });

                const initShow = {};
                ["bilisimgaraji", "kolibri", "morpa", "sınavza", "cambridge"].forEach(
                    (k) => (initShow[k] = false)
                );
                setShowPlatform(initShow);
            })
            .catch((err) => {
                console.error(err);
                setSnackbarMessage("Öğrenci bilgileri alınamadı.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            });
    }, [apiUrl, navigate]);

    const handleTogglePassword = async () => {
        if (isEditingPassword) {
            // kaydetme işlemi
            if (passwordData.oldPassword !== user.password) {
                setSnackbarMessage("Eski şifre yanlış!");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
                return;
            }

            if (passwordData.newPassword.length < 6) {
                setSnackbarMessage("Yeni şifre en az 6 karakter olmalıdır!");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
                return;
            }

            if (passwordData.newPassword !== passwordData.confirmPassword) {
                setSnackbarMessage("Yeni şifreler eşleşmiyor!");
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
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ new_password: passwordData.newPassword }),
                });
                if (!res.ok) throw new Error("Şifre güncellenirken hata oluştu");

                const updatedUser = { ...user, password: passwordData.newPassword };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));

                setSnackbarMessage("Şifre başarıyla güncellendi!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
                setShowPassword(false);

            } catch (err) {
                setSnackbarMessage(err.message || "Şifre güncellenirken hata oluştu");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        }
        setIsEditingPassword(!isEditingPassword);
    };


    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };

    const mask = (s) => {
        if (!s) return "-";
        return "*".repeat(s.length);
    };

    const togglePlatformVisibility = (platform) => {
        setShowPlatform((prev) => ({ ...prev, [platform]: !prev[platform] }));
    };

    /** --- KARTLAR --- */
    const PersonalInfoCard = (
        <Paper sx={{ p: 3, mb: 4, borderRadius: "12px" }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Kişisel Bilgiler
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Typography>Ad</Typography>
                    <TextField fullWidth value={user.firstName || ""} disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography>Soyad</Typography>
                    <TextField fullWidth value={user.lastName || ""} disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography>Telefon</Typography>
                    <TextField fullWidth value={user.phone || ""} disabled />
                </Grid>
                {isMobile && <> <Grid item xs={12} sm={6}>
                    <Typography>Okul Adı</Typography>
                    <TextField fullWidth value={user.schoolName || ""} disabled />
                </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Sınıf/Şube</Typography>
                        <TextField fullWidth value={user.classBranch || ""} disabled />
                    </Grid></>}

            </Grid>
        </Paper>
    );

    const PasswordCard = (
        <Paper sx={{ p: 3, mb: 4, borderRadius: "12px", position: "relative" }}>
            <Button
                onClick={handleTogglePassword}
                style={{
                    border: "1px solid gray",
                    borderRadius: "20px",
                    color: isEditingPassword ? "white" : "black",
                    backgroundColor: isEditingPassword ? "green" : "white",
                }}
                endIcon={<BorderColorIcon style={{ fontSize: "15px" }} />}
                sx={{ position: "absolute", top: 16, right: 16 }}
            >
                {isEditingPassword ? "Kaydet" : "Düzenle"}
            </Button>

            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Şifre Değiştir
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Eski Şifre"
                        name="oldPassword"
                        type="password"
                        value={passwordData.oldPassword}
                        onChange={handlePasswordChange}
                        disabled={!isEditingPassword}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Yeni Şifre"
                        name="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        disabled={!isEditingPassword}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Yeni Şifre Onay"
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        disabled={!isEditingPassword}
                    />
                </Grid>
            </Grid>
        </Paper>
    );

    const PlatformCard = (
        <Paper sx={{ p: 3, borderRadius: "12px" }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: !isMobile ? "bold" : undefined }}>
                Platform Bilgileri
            </Typography>
            {user?.platforms && (
                <>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            mb: 1,
                            fontWeight: !isMobile ? "bold" : undefined ,
                            pb: 1,
                            borderBottom: "2px solid #ccc",
                        }}
                    >
                        <Grid item xs={4}>
                            Panel Adı
                        </Grid>
                        <Grid item xs={4}>
                            Kullanıcı Adı
                        </Grid>
                        <Grid item xs={4}>
                            Şifre
                        </Grid>
                    </Grid>
                    {Object.keys(user.platforms).map((platform, index, array) => (
                        <Grid
                            container
                            spacing={2}
                            key={platform}
                            sx={{
                                mb: 1,
                                alignItems: "center",
                                borderBottom:
                                    index !== array.length - 1 ? "1px solid #eee" : "none",
                                py: 1,
                            }}
                        >
                            <Grid item xs={4} style={{ fontWeight: !isMobile ? "bold" : undefined  }}>
                                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </Grid>
                            <Grid item xs={4}>
                                {user.platforms[platform].username || "-"}
                            </Grid>
                            <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="body2" sx={{ mr: 1 }}>
                                    {showPlatform[platform]
                                        ? user.platforms[platform].password || "-"
                                        : mask(user.platforms[platform].password)}
                                </Typography>
                                <IconButton
                                    onClick={() => togglePlatformVisibility(platform)}
                                    size="small"
                                >
                                    {showPlatform[platform] ? (
                                        <VisibilityOff fontSize="small" />
                                    ) : (
                                        <Visibility fontSize="small" />
                                    )}
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                </>
            )}
        </Paper>
    );

    const SchoolInfoCard = (
        <Paper sx={{ p: 3, mb: 4, borderRadius: "12px" }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>Okul Bilgileri</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Typography>Kurum Adı</Typography>
                    <TextField fullWidth value={user.schoolName || "-"} disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography>Sınıf/Şube</Typography>
                    <TextField fullWidth value={user.classBranch || "-"} disabled />
                </Grid>
            </Grid>
        </Paper>
    );


    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", p: 2 }}>

            {/* Masaüstü: üst kart */}
            {!isMobile && (
                <Grid container spacing={2} alignItems="center"
                    sx={{
                        mb: 4,
                        mt: 2,
                        p: 3,
                        width: "100%",
                        maxWidth: 1000,
                        marginLeft: "5px",
                        borderRadius: "12px",
                        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
                    }}>
                    <Grid item xs={2}>
                        <PersonOutlineIcon style={{ fontSize: "45px" }} />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>{user.name}</Typography>
                        <Typography variant="body2" sx={{ color: "#666" }}>Öğrenci</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>TC Kimlik No</Typography>
                        <Typography variant="body2">{user.tcNumber}</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
                        <Box>
                            <Typography variant="h6" sx={{ color: "#666", fontWeight: "bold" }}>Şifre</Typography>
                            <Typography variant="body2" component="span" sx={{ mr: 1 }}>
                                {showPassword ? user.password || "-" : mask(user.password)}
                            </Typography>
                        </Box>
                        <IconButton onClick={() => setShowPassword(prev => !prev)} size="large">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </Grid>
                </Grid>
            )}

            {/* Mobilde 3 tab, masaüstünde alt alta kartlar */}
            {isMobile ? (
                <>
                    <Tabs
                        value={tabValue}
                        onChange={(e, newValue) => setTabValue(newValue)}
                        centered
                        variant="fullWidth"
                        sx={{ mb: 2 }}
                    >
                        <Tab label="Kişisel Bilgiler" />
                        <Tab label="Şifre" />
                        <Tab label="Platformlar" />
                    </Tabs>
                    <Box sx={{ mt: 2, width: "100%" }}>
                        {tabValue === 0 && PersonalInfoCard}
                        {tabValue === 1 && PasswordCard}
                        {tabValue === 2 && PlatformCard}
                    </Box>
                </>
            ) : (
                <>
                    <Box sx={{ width: "100%", maxWidth: 1000 }}>
                        {PersonalInfoCard}
                        {PasswordCard}
                        {SchoolInfoCard}
                        {PlatformCard}
                    </Box>
                </>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </Box>
    );
};

export default Settings;
