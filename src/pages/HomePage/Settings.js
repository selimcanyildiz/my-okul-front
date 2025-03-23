import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("");
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        school: ""
    });

    // localStorage'dan kullanıcı tipini al
    useEffect(() => {
        const storedUserType = localStorage.getItem("userType");
        if (storedUserType) {
            setUserType(storedUserType);
            // Kullanıcı tipine göre örnek verileri yükle
            if (storedUserType === "admin") {
                setUserData({
                    username: "Celal Sarı",
                    password: "admin123",
                    school: ""
                });
            } else if (storedUserType === "manager") {
                setUserData({
                    username: "Selim Can",
                    password: "manager123",
                    school: "Özel Abc Okulu"
                });
            }
        } else {
            navigate("/"); // Kullanıcı tipi yoksa ana sayfaya yönlendir
        }
    }, [navigate]);

    // Input değişikliklerini handle etme
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    // Bilgileri güncelleme işlemi
    const handleUpdate = () => {
        // Burada API çağrısı yaparak bilgileri güncelleyebilirsiniz
        console.log("Güncellenen Bilgiler:", userData);
        alert("Bilgileriniz güncellendi!");
    };

    return (
        <Box sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
        }}>
            <Paper sx={{ 
                padding: 4, 
                borderRadius: "16px", 
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", 
                maxWidth: "600px", 
                width: "100%", 
                background: "#ffffff"
            }}>
                <Typography variant="h4" sx={{ 
                    marginBottom: 3, 
                    fontWeight: "bold", 
                    color: "#333", 
                    textAlign: "center"
                }}>
                    Kullanıcı Bilgileri
                </Typography>

                <Grid container spacing={3}>
                    {/* Kullanıcı Adı */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Kullanıcı Adı"
                            name="username"
                            value={userData.username}
                            onChange={handleInputChange}
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                },
                                "& .MuiInputLabel-outlined": {
                                    color: "#666",
                                },
                                "& .MuiOutlinedInput-input": {
                                    color: "#333",
                                },
                            }}
                        />
                    </Grid>

                    {/* Şifre */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Şifre"
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                },
                                "& .MuiInputLabel-outlined": {
                                    color: "#666",
                                },
                                "& .MuiOutlinedInput-input": {
                                    color: "#333",
                                },
                            }}
                        />
                    </Grid>

                    {/* Manager ise Okul Bilgisi */}
                    {userType === "manager" && (
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Okul"
                                name="school"
                                value={userData.school}
                                variant="outlined"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                    },
                                    "& .MuiInputLabel-outlined": {
                                        color: "#666",
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        color: "#333",
                                    },
                                }}
                            />
                        </Grid>
                    )}

                    {/* Bilgileri Güncelleme Butonu */}
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleUpdate}
                            sx={{
                                padding: "12px",
                                borderRadius: "12px",
                                background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                                color: "#fff",
                                marginLeft:"25%",
                                width:"50%",
                                fontWeight: "bold",
                                "&:hover": {
                                    background: "linear-gradient(135deg, #2575fc, #6a11cb)",
                                },
                            }}
                        >
                            Bilgileri Güncelle
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Settings;