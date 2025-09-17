import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Grid,
    TextField,
    Button,
    Avatar,
    Alert,
    Snackbar
} from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate } from "react-router-dom";

const logoUrl = "https://via.placeholder.com/40";

const Settings = () => {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const [user, setUser] = useState({
        platforms: {}
    });
    const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser.id) {
            navigate("/");
            return;
        }
        const token = localStorage.getItem("token");

        fetch(`${apiUrl}/students/${storedUser.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) throw new Error("Öğrenci bilgileri alınamadı");
                return res.json();
            })
            .then(data => {
                setUser({
                    id: storedUser.id,
                    name: `${data.ad} ${data.soyad}`,
                    tcNumber: data.tc,
                    password: data.password,
                    firstName: data.ad,
                    lastName: data.soyad,
                    email: data.email || "",
                    phone: data.parent_phone || "",
                    platforms: {
                        bilisimgaraji: { username: data.bilisimgarajikull, password: data.bilisimgarajisif },
                        kolibri: { username: data.kolibrikull, password: data.kolibrisif },
                        morpa: { username: data.morpakull, password: data.morpasif },
                        sınavza: { username: data.sınavzakull, password: data.sınavzasif },
                        cambridge: { username: data.cambridgekull, password: data.cambridgesif },
                    }
                });
            })
            .catch(err => {
                console.error(err);
                setSnackbarMessage("Öğrenci bilgileri alınamadı.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            });

    }, [apiUrl, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleTogglePassword = async () => {
    if (isEditingPassword) {
        if (passwordData.oldPassword !== user.password) {
            setSnackbarMessage("Eski şifreniz yanlış!");
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
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ new_password: passwordData.newPassword }),
            });
            if (!res.ok) throw new Error("Şifre güncellenirken hata oluştu");

            const updatedUser = { ...user, password: passwordData.newPassword };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setSnackbarMessage("Şifreniz başarıyla güncellendi!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            setSnackbarMessage(err.message || "Şifre güncellenirken hata oluştu");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    }
    setIsEditingPassword(!isEditingPassword);
};


    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <Paper sx={{ padding: "150px", borderRadius: "16px", width: "100%", marginTop: "-100px" }}>

                    {/* First Card */}
                    <Paper sx={{ padding: 3, marginBottom: 4, borderRadius: "12px", boxShadow: "0px 2px 10px rgba(0,0,0,0.1)" }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={2}><PersonOutlineIcon style={{fontSize:"45px", padding:"10px", marginTop:"10px"}} /></Grid>
                            <Grid item xs={3}>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{user.name}</Typography>
                                <Typography variant="body2" sx={{ color: "#666" }}>Öğrenci</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>TC Kimlik No</Typography>
                                <Typography variant="body2">{user.tcNumber}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" sx={{ color: "#666", fontWeight: "bold" }}>Şifre</Typography>
                                <Typography variant="body2">{user.password}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Personal Info Card */}
                    <Paper sx={{ padding: 3, marginBottom: 4, borderRadius: "12px", boxShadow: "0px 2px 10px rgba(0,0,0,0.1)", position: "relative" }}>
                        <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: "bold", fontSize: "16px" }}>Kişisel Bilgiler</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Typography>Ad</Typography>
                                <TextField fullWidth name="firstName" value={user.firstName} onChange={handleInputChange} disabled={!isEditingPersonalInfo} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Soyad</Typography>
                                <TextField fullWidth name="lastName" value={user.lastName} onChange={handleInputChange} disabled={!isEditingPersonalInfo} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography>Telefon</Typography>
                                <TextField fullWidth name="phone" value={user.phone} onChange={handleInputChange} disabled={!isEditingPersonalInfo} />
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Password Card */}
                    <Paper sx={{ padding: 3, borderRadius: "12px", boxShadow: "0px 2px 10px rgba(0,0,0,0.1)", position: "relative" }}>
                        <Button style={{ border: "1px solid gray", borderRadius: "20px", color: isEditingPassword ? "white" : "black", backgroundColor: isEditingPassword ? "green" : "white" }} onClick={handleTogglePassword} endIcon={<BorderColorIcon style={{ fontSize: "15px" }} />}
                            sx={{ position: "absolute", top: 16, right: 16 }}>
                            {isEditingPassword ? "Kaydet" : "Düzenle"}
                        </Button>
                        <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: "bold", fontSize: "16px" }}>Şifre Değiştir</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth label="Eski Şifre" name="oldPassword" type="password" value={passwordData.oldPassword} onChange={handlePasswordChange} disabled={!isEditingPassword} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth label="Yeni Şifre" name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} disabled={!isEditingPassword} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth label="Yeni Şifre Onay" name="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} disabled={!isEditingPassword} />
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Platforms Card */}
                    <Paper sx={{ padding: 3, borderRadius: "12px", boxShadow: "0px 2px 10px rgba(0,0,0,0.1)", marginTop: 4 }}>
                        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold", fontSize: "16px" }}>
                            Platform Bilgileri
                        </Typography>

                        {user?.platforms && (
                            <>
                                {/* Başlık Satırı */}
                                <Grid container spacing={2} sx={{ mb: 1, fontWeight: "600", pb: 1, borderBottom: "2px solid #ccc" }}>
                                    <Grid item xs={4}>Panel Adı</Grid>
                                    <Grid item xs={4}>Kullanıcı Adı</Grid>
                                    <Grid item xs={4}>Şifre</Grid>
                                </Grid>

                                {/* Platform Satırları */}
                                {Object.keys(user.platforms).map((platform, index, array) => (
                                    <Grid
                                        container
                                        spacing={2}
                                        key={platform}
                                        sx={{
                                            mb: 1,
                                            alignItems: "center",
                                            borderBottom: index !== array.length - 1 ? "1px solid #eee" : "none", // son satır hariç çizgi
                                            py: 1
                                        }}
                                    >
                                        <Grid item xs={4} style={{ fontWeight: "bold" }}>
                                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                        </Grid>
                                        <Grid item xs={4}>
                                            {user.platforms[platform].username || "-"}
                                        </Grid>
                                        <Grid item xs={4}>
                                            {user.platforms[platform].password || "-"}
                                        </Grid>
                                    </Grid>
                                ))}
                            </>
                        )}
                    </Paper>



                </Paper>
            </Box>

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
        </>
    );
};

export default Settings;
