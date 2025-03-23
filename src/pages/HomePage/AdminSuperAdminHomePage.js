import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SchoolIcon from '@mui/icons-material/School';
import MessageIcon from '@mui/icons-material/Message';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from "react-router-dom";
import AdminHomePage from "./AdminHomePage";
import SuperAdminHomePage from "./SuperAdminHomePage";
import AddSchool from "./AddSchool";
import AddStudent from "./AddStudent";
import SmsSettings from "./SmsSettings";

const AdminSuperAdminHomePage = () => {
    const navigate = useNavigate();

    const [userType, setUserType] = useState(null);
    const [activeMenu, setActiveMenu] = useState('home');

    const handleMenuClick = (menu) => setActiveMenu(menu);

    const renderContent = () => {
        switch (activeMenu) {
            case 'home':
                return userType === "manager" ? <AdminHomePage /> : <SuperAdminHomePage />;
            case 'addSchool':
                return <AddSchool />;
            case 'addStudent':
                return <AddStudent />;
            case 'sms':
                return <SmsSettings />;
            default:
                return null;
        }
    };

    useEffect(() => {
        const storedUserType = localStorage.getItem("userType");
        if (storedUserType) {
            setUserType(storedUserType);
        } else {
            navigate("/");
        }
    }, [navigate]);

    const getMenuLabel = () => {
        switch (activeMenu) {
            case 'home':
                return "Ana Sayfa";
            case 'addSchool':
                return "Kurum Bilgileri";
            case 'addStudent':
                return "Öğrenci Bilgileri";
            case 'sms':
                return "Sms Ayarları";
            default:
                return "";
        }
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
            {/* Sol Menü */}
            <Box
                sx={{
                    width: "200px",
                    height: "100vh", // Tam ekran yüksekliği
                    backgroundColor: "white",
                    color: "black",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    paddingTop: 2,
                    paddingLeft: 2,
                    paddingRight: 2,
                    position: "fixed", // Sabit menü
                    left: 0,
                    top: 0,
                    overflowY: "auto", // Menü içeriği kaydırılabilir
                }}
            >
                <Box>
                    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                        {userType === "manager" ? <Box
                            component="img"
                            src="/images/school.jpg" // Logo dosyasının yolu
                            alt="Logo"
                            sx={{
                                width: "100%", // Logo genişliği
                                height: 40, // Logo yüksekliği
                                marginRight: 2, // Logo ile metin arasındaki boşluk
                            }}
                        /> : <Typography variant="h6" sx={{ color: "black" }}>
                            Admin Paneli
                        </Typography>}
                    </Box>

                    {/* Menü Butonları */}
                    <Button
                        sx={{
                            color: activeMenu === 'home' ? "primary.main" : "black",
                            marginBottom: 2,
                            display: 'flex', // Flex kullanarak içeriği yan yana hizala
                            alignItems: "center", // Dikeyde ortala
                            justifyContent: "flex-start", // Sola hizala
                            position: "relative",
                            textTransform: "capitalize",
                            textAlign: "left",
                            paddingLeft: "20px",
                            width: "100%",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                left: 0,
                                top: 0,
                                height: "100%",
                                width: "4px",
                                backgroundColor: activeMenu === 'home' ? "primary.main" : "transparent",
                                borderRadius: "2px",
                            },
                        }}
                        startIcon={<HomeIcon />} // İkonu ekle
                        onClick={() => handleMenuClick('home')}
                    >
                        Ana Sayfa
                    </Button>

                    {userType === "admin" && <Button
                        sx={{
                            color: activeMenu === 'addSchool' ? "primary.main" : "black",
                            marginBottom: 2,
                            display: 'flex', // Flex kullanarak içeriği yan yana hizala
                            alignItems: "center", // Dikeyde ortala
                            justifyContent: "flex-start", // Sola hizala
                            position: "relative",
                            textTransform: "capitalize",
                            textAlign: "left",
                            paddingLeft: "20px",
                            width: "100%",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                left: 0,
                                top: 0,
                                height: "100%",
                                width: "4px",
                                backgroundColor: activeMenu === 'addSchool' ? "primary.main" : "transparent",
                                borderRadius: "2px",
                            },
                        }}
                        startIcon={<SchoolIcon />} // İkonu ekle
                        onClick={() => handleMenuClick('addSchool')}
                    >
                        Kurum Bilgileri
                    </Button>}

                    <Button
                        sx={{
                            color: activeMenu === 'addStudent' ? "primary.main" : "black",
                            marginBottom: 2,
                            display: 'flex', // Flex kullanarak içeriği yan yana hizala
                            alignItems: "center", // Dikeyde ortala
                            justifyContent: "flex-start", // Sola hizala
                            position: "relative",
                            textTransform: "capitalize",
                            textAlign: "left",
                            paddingLeft: "20px",
                            width: "100%",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                left: 0,
                                top: 0,
                                height: "100%",
                                width: "4px",
                                backgroundColor: activeMenu === 'addStudent' ? "primary.main" : "transparent",
                                borderRadius: "2px",
                            },
                        }}
                        startIcon={<SupervisorAccountIcon />} // İkonu ekle
                        onClick={() => handleMenuClick('addStudent')}
                    >
                        Öğrenci Bilgileri
                    </Button>

                    <Button
                        sx={{
                            color: activeMenu === 'sms' ? "primary.main" : "black",
                            marginBottom: 2,
                            display: 'flex', // Flex kullanarak içeriği yan yana hizala
                            alignItems: "center", // Dikeyde ortala
                            justifyContent: "flex-start", // Sola hizala
                            position: "relative",
                            textTransform: "capitalize",
                            textAlign: "left",
                            paddingLeft: "20px",
                            width: "100%",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                left: 0,
                                top: 0,
                                height: "100%",
                                width: "4px",
                                backgroundColor: activeMenu === 'sms' ? "primary.main" : "transparent",
                                borderRadius: "2px",
                            },
                        }}
                        startIcon={<MessageIcon />} // İkonu ekle
                        onClick={() => handleMenuClick('sms')}
                    >
                        Sms Ayarları
                    </Button>
                </Box>

                {/* Ayarlar ve Çıkış Yap Butonları */}
                <Box sx={{ marginTop: "auto", marginBottom: 2 }}>
                    <Button
                        sx={{
                            color: "black",
                            display: 'flex', // Flex kullanarak içeriği yan yana hizala
                            alignItems: "center", // Dikeyde ortala
                            justifyContent: "flex-start", // Sola hizala
                            width: "100%", // Tam genişlik
                            textTransform: "capitalize", // Sadece baş harfler büyük
                            paddingLeft: "20px", // Sol padding
                        }}
                        startIcon={<SettingsApplicationsIcon />} // Ayarlar ikonu
                    >
                        Ayarlar
                    </Button>
                    <Button
                        sx={{
                            color: "black",
                            display: 'flex', // Flex kullanarak içeriği yan yana hizala
                            alignItems: "center", // Dikeyde ortala
                            justifyContent: "flex-start", // Sola hizala
                            width: "100%", // Tam genişlik
                            textTransform: "capitalize", // Sadece baş harfler büyük
                            paddingLeft: "20px", // Sol padding
                        }}
                        startIcon={<ExitToAppIcon />} // Çıkış Yap ikonu
                        onClick={() => navigate("/")}
                    >
                        Çıkış Yap
                    </Button>
                </Box>
            </Box>

            {/* Sağ İçerik Alanı */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    position: "fixed", // Sağ içerik alanını sabit tut
                    top: 0, // Yukarıya sabitle
                    left: "200px", // Sol menü genişliği kadar sağa kaydır
                    right: 0, // Sağa kadar genişlet
                    bottom: 0, // Aşağıya kadar genişlet
                    overflowY: "auto", // İçerik alanını kaydırılabilir yap
                }}
            >
                {/* Üst Menü */}
                <Box
                    sx={{
                        backgroundColor: "white",
                        padding: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "sticky", // Üst menüyü sabit tut
                        top: 0,
                        zIndex: 1, // Üst menüyü diğer içeriklerin üzerinde tut
                    }}
                >
                    <Box>
                        <Typography variant="body1" sx={{ color: "black", fontWeight: "bold" }}>
                            {getMenuLabel()}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <Typography variant="h5" sx={{ color: "black" }}>
                            {userType === "manager" ? "Selim Can" : "Celal Sarı"}
                        </Typography>
                        {userType === "manager" && <Typography variant="body2" sx={{ color: "gray" }}>
                            Özel ABC Okulu
                        </Typography>}
                    </Box>
                </Box>

                {/* İçerik Alanı (Scrollable) */}
                <Box sx={{ flex: 1, overflowY: "auto", padding: 2 }}>
                    {renderContent()}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminSuperAdminHomePage;