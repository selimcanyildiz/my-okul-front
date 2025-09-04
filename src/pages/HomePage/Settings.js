import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Grid,
    TextField,
    Button,
    Avatar,
} from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from "react-router-dom";

// Placeholder logo (replace with your actual logo URL)
const logoUrl = "https://via.placeholder.com/40";

const Settings = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("");
    const [userData, setUserData] = useState({
        name: "",
        tcNumber: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });
    const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // Fetch user type from localStorage
    useEffect(() => {
        const storedUserType = localStorage.getItem("userType");
        if (storedUserType) {
            setUserType(storedUserType);
            // Load sample data based on user type
            if (storedUserType === "admin") {
                setUserData({
                    name: "Ali Yılmaz",
                    tcNumber: "12345678901",
                    password: "admin123",
                    firstName: "Ali",
                    lastName: "Yılmaz",
                    email: "aliyilmaz@example.com",
                    phone: "0 (550) 123 45 67",
                });
            } else if (storedUserType === "manager") {
                setUserData({
                    name: "Selim Can",
                    tcNumber: "98765432109",
                    password: "manager123",
                    firstName: "Selim",
                    lastName: "Can",
                    email: "selimcan@example.com",
                    phone: "0 (555) 987 65 43",
                });
            } else if (storedUserType === "student") {
                setUserData({
                    name: "Selim Can Yıldız",
                    tcNumber: "62458456123",
                    password: "student123",
                    firstName: "Selim Can",
                    lastName: "Yıldız",
                    email: "selimcan@example.com",
                    phone: "0 (535) 154 95 84",
                });
            }
        } else {
            navigate("/"); // Redirect to homepage if no user type
        }
    }, [navigate]);

    // Handle input changes for personal info
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    // Handle input changes for password
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value,
        });
    };

    // Handle update action for personal info
    const handleUpdatePersonalInfo = () => {
        if (isEditingPersonalInfo) {
            console.log("Updated Personal Information:", userData);
            alert("Kişisel bilgileriniz güncellendi!");
        }
        setIsEditingPersonalInfo(!isEditingPersonalInfo);
    };

    // Handle update action for password
    const handleUpdatePassword = () => {
        if (isEditingPassword) {
            if (passwordData.newPassword !== passwordData.confirmPassword) {
                alert("Yeni şifreler eşleşmiyor!");
                return;
            }
            console.log("Updated Password:", passwordData);
            alert("Şifreniz güncellendi!");
        }
        setIsEditingPassword(!isEditingPassword);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                padding: 2,
            }}
        >
            <Paper
                sx={{
                    padding: 4,
                    borderRadius: "16px",
                    width: "100%",
                }}
            >
                {/* First Card: Logo, Name, TC, and Password */}
                <Paper
                    sx={{
                        padding: 3,
                        marginBottom: 4,
                        borderRadius: "12px",
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Grid container spacing={2} alignItems="center">
                        {/* Logo */}
                        <Grid item xs={2}>
                            <Avatar
                                src={logoUrl}
                                sx={{ width: 40, height: 40 }}
                            />
                        </Grid>

                        {/* Name and Role */}
                        <Grid item xs={3}>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", color: "#333" }}
                            >
                                {userData.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#666" }}
                            >
                                {userType === "admin" ? "Admin" : userType === "manager" ? "Yetkili" : "Öğrenci"}
                            </Typography>
                        </Grid>

                        {/* TC Kimlik No */}
                        <Grid item xs={3}>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: "bold", color: "#333" }}
                            >
                                TC Kimlik No
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#333" }}>
                                {userData.tcNumber}
                            </Typography>
                        </Grid>

                        {/* Password */}
                        <Grid item xs={4}>
                            <Typography
                                variant="body2"
                                sx={{ color: "#666", fontWeight: "bold" }}
                            >
                                Şifre
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#333" }}>
                                {userData.password}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Second Card: Personal Information */}
                <Paper
                    sx={{
                        padding: 3,
                        marginBottom: 4,
                        borderRadius: "12px",
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                        position: "relative",
                    }}
                >
                    {/* Edit Button */}
                    <Button
                        onClick={handleUpdatePersonalInfo}
                        endIcon={<BorderColorIcon style={{ fontSize: "15px" }} />}
                        sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            padding: "8px 16px",
                            borderRadius: "20px",
                            bgcolor: "white",
                            color: "gray",
                            border: "1px solid gray",
                            textTransform: "none",
                            fontSize: "13px"
                        }}
                    >
                        {isEditingPersonalInfo ? "Kaydet" : "Düzenle"}
                    </Button>

                    <Typography
                        variant="h5"
                        sx={{
                            marginBottom: 3,
                            fontWeight: "bold",
                            fontSize: "16px",
                            color: "#333",
                        }}
                    >
                        Kişisel Bilgiler
                    </Typography>

                    <Grid container spacing={3} style={{ marginTop: "5px" }}>
                        {/* First Name and Last Name */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="İsim"
                                name="firstName"
                                value={userData.firstName}
                                onChange={handleInputChange}
                                variant="outlined"
                                disabled={!isEditingPersonalInfo}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Soyisim"
                                name="lastName"
                                value={userData.lastName}
                                onChange={handleInputChange}
                                variant="outlined"
                                disabled={!isEditingPersonalInfo}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                    },
                                }}
                            />
                        </Grid>

                        {/* Email and Phone */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="E-Mail"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                disabled={!isEditingPersonalInfo}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Telefon"
                                name="phone"
                                value={userData.phone}
                                onChange={handleInputChange}
                                variant="outlined"
                                disabled={!isEditingPersonalInfo}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                </Paper>

                {/* Third Card: Password Change */}
                <Paper
                    sx={{
                        padding: 3,
                        borderRadius: "12px",
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                        position: "relative",
                    }}
                >
                    {/* Edit Button */}
                    <Button
                        onClick={handleUpdatePassword}
                        endIcon={<BorderColorIcon style={{ fontSize: "15px" }} />}
                        sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            padding: "8px 16px",
                            borderRadius: "20px",
                            bgcolor: "white",
                            color: "gray",
                            border: "1px solid gray",
                            textTransform: "none",
                            fontSize: "13px"
                        }}
                    >
                        {isEditingPassword ? "Kaydet" : "Düzenle"}
                    </Button>

                    <Typography
                        variant="h5"
                        sx={{
                            marginBottom: 3,
                            fontWeight: "bold",
                            fontSize: "16px",
                            color: "#333",
                        }}
                    >
                        Şifre Değiştir
                    </Typography>

                    <Grid container spacing={3} style={{ marginTop: "5px" }}>
                        {/* Old Password */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Eski Şifre"
                                name="oldPassword"
                                type="password"
                                value={passwordData.oldPassword}
                                onChange={handlePasswordChange}
                                variant="outlined"
                                disabled={!isEditingPassword}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                    },
                                }}
                            />
                        </Grid>

                        {/* New Password */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Yeni Şifre"
                                name="newPassword"
                                type="password"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                variant="outlined"
                                disabled={!isEditingPassword}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                    },
                                }}
                            />
                        </Grid>

                        {/* Confirm New Password */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Yeni Şifre Onay"
                                name="confirmPassword"
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                variant="outlined"
                                disabled={!isEditingPassword}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                </Paper>

                {/* Fourth Card: Platform Info */}
                {userType === "student" && <Paper
                    sx={{
                        padding: 3,
                        marginTop: 4,
                        borderRadius: "12px",
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Grid container spacing={2} alignItems="center">
                        {/* Platform 1 */}
                        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", color: "#333", textAlign: 'center' }}
                            >
                                Bilişim Garajı
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#666", textAlign: 'center' }}
                            >
                                kullanici_adi_egitim
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#666", textAlign: 'center' }}
                            >
                                şifre_egitim
                            </Typography>
                        </Grid>

                        {/* Platform 2 */}
                        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", color: "#333", textAlign: 'center' }}
                            >
                                Bookr Class
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#666", textAlign: 'center' }}
                            >
                                kullanici_adi_bookr
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#666", textAlign: 'center' }}
                            >
                                şifre_bookr
                            </Typography>
                        </Grid>

                        {/* Platform 3 */}
                        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", color: "#333", textAlign: 'center' }}
                            >
                                Rokodemi
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#666", textAlign: 'center' }}
                            >
                                kullanici_adi_rokodemi
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#666", textAlign: 'center' }}
                            >
                                şifre_rokodemi
                            </Typography>
                        </Grid>

                        {/* Platform 4 */}
                        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", color: "#333", textAlign: 'center' }}
                            >
                                Eyotek
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#666", textAlign: 'center' }}
                            >
                                kullanici_adi_eyotek
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#666", textAlign: 'center' }}
                            >
                                şifre_eyotek
                            </Typography>
                        </Grid>

                    </Grid>
                </Paper>}
                
            </Paper>
        </Box>
    );
};

export default Settings;