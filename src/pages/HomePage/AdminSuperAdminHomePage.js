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
import Settings from "./Settings";

const AdminSuperAdminHomePage = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();

    const [userType, setUserType] = useState(null);
    const [user, setUser] = useState({});
    const [school, setSchool] = useState(null); // Okul bilgisi için state
    const [activeMenu, setActiveMenu] = useState('home');

    const handleMenuClick = (menu) => setActiveMenu(menu);

    const renderContent = () => {
        if (activeMenu === "home") {
            if (user.role === "sysadmin") {
                return <AdminHomePage />;
            } else {
                if (!school) {
                    return <Typography>Okul bilgisi yükleniyor...</Typography>;
                }
                return <SuperAdminHomePage schoolId={school.id} />;
            }
        }
        if (activeMenu === "addSchool") return <AddSchool />;
        if (activeMenu === "addStudent") return <AddStudent />;
        if (activeMenu === "sms") return <SmsSettings />;
        if (activeMenu === "settings") return <Settings />;
        return null;
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);

        if (user) {
            setUserType(user.role);

            // Yetkili ise okul bilgisini çek
            if (user.role === "yetkili") {
                fetch(`${apiUrl}/schools/by_admin/${user.id}`)
                    .then(res => {
                        if (!res.ok) throw new Error("Okul bilgisi alınamadı");
                        return res.json();
                    })
                    .then(data => {
                        console.log(data)
                        setSchool(data.school);
                    })
                    .catch(err => {
                        console.error("Okul bilgisi çekilirken hata:", err);
                    });
            }

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
            case 'settings':
                return "Ayarlar";
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
                    height: "100vh",
                    backgroundColor: "white",
                    color: "black",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    paddingTop: 2,
                    paddingLeft: 2,
                    paddingRight: 2,
                    position: "fixed",
                    left: 0,
                    top: 0,
                    overflowY: "auto",
                }}
            >
                <Box>
                    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                        <Box
                            component="img"
                            src="/images/school.jpg"
                            alt="Logo"
                            sx={{ height: 70, marginRight: 2 }}
                        />
                    </Box>

                    <Button
                        sx={{
                            color: activeMenu === 'home' ? "#28245c" : "gray",
                            marginBottom: 2,
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "flex-start",
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
                                backgroundColor: activeMenu === 'home' ? "#28245c" : "transparent",
                                borderRadius: "2px",
                            },
                        }}
                        startIcon={<HomeIcon />}
                        onClick={() => handleMenuClick('home')}
                    >
                        Ana Sayfa
                    </Button>

                    {user.role === "sysadmin" && <Button
                        sx={{
                            color: activeMenu === 'addSchool' ? "#28245c" : "gray",
                            marginBottom: 2,
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "flex-start",
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
                                backgroundColor: activeMenu === 'addSchool' ? "#28245c" : "transparent",
                                borderRadius: "2px",
                            },
                        }}
                        startIcon={<SchoolIcon />}
                        onClick={() => handleMenuClick('addSchool')}
                    >
                        Kurum Bilgileri
                    </Button>}

                    <Button
                        sx={{
                            color: activeMenu === 'addStudent' ? "#28245c" : "gray",
                            marginBottom: 2,
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "flex-start",
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
                                backgroundColor: activeMenu === 'addStudent' ? "#28245c" : "transparent",
                                borderRadius: "2px",
                            },
                        }}
                        startIcon={<SupervisorAccountIcon />}
                        onClick={() => handleMenuClick('addStudent')}
                    >
                        Öğrenci Bilgileri
                    </Button>
                </Box>

                <Box sx={{ marginTop: "auto", marginBottom: 2 }}>
                    <Button
                        sx={{
                            color: activeMenu === 'settings' ? "#28245c" : "gray",
                            marginBottom: 2,
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "flex-start",
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
                                backgroundColor: activeMenu === 'settings' ? "#28245c" : "transparent",
                                borderRadius: "2px",
                            },
                        }}
                        startIcon={<SettingsApplicationsIcon />}
                        onClick={() => handleMenuClick('settings')}
                    >
                        Ayarlar
                    </Button>
                    <Button
                        sx={{
                            color: "gray",
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "flex-start",
                            width: "100%",
                            textTransform: "capitalize",
                            paddingLeft: "20px",
                        }}
                        startIcon={<ExitToAppIcon />}
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
                    position: "fixed",
                    top: 0,
                    left: "200px",
                    right: 0,
                    bottom: 0,
                    overflowY: "auto",
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
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                    }}
                >
                    <Box>
                        <Typography variant="body1" sx={{ color: "black", fontWeight: "bold" }}>
                            {getMenuLabel()}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <Typography variant="h5" sx={{ color: "black" }}>
                            {user?.full_name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "gray" }}>
                            {school?.name}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ flex: 1, overflowY: "auto", padding: 2 }}>
                    {renderContent()}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminSuperAdminHomePage;
