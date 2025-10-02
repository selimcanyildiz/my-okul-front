import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SchoolIcon from "@mui/icons-material/School";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MessageIcon from "@mui/icons-material/Message";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useNavigate } from "react-router-dom";
import AdminHomePage from "./AdminHomePage";
import SuperAdminHomePage from "./SuperAdminHomePage";
import AddSchool from "./AddSchool";
import AddStudent from "./AddStudent";
import SmsSettings from "./SmsSettings";
import Settings from "./Settings";
import Report from "./Report";

const AdminSuperAdminHomePage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState({});
  const [school, setSchool] = useState(null); // Okul bilgisi
  const [activeMenu, setActiveMenu] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setMobileOpen(false); // mobilde menü kapansın
  };

  const renderContent = () => {
    if (activeMenu === "home") {
      if (user.role === "sysadmin") return <AdminHomePage />;
      if (!school) return <Typography>Okul bilgisi yükleniyor...</Typography>;
      return <SuperAdminHomePage schoolId={school.id} />;
    }
    if (activeMenu === "addSchool") return <AddSchool />;
    if (activeMenu === "addStudent") return <AddStudent />;
    if (activeMenu === "report") return <Report schoolId={school.id} />;
    if (activeMenu === "sms") return <SmsSettings />;
    if (activeMenu === "settings") return <Settings />;
    return null;
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);

    if (user) {
      setUserType(user.role);

      if (user.role === "yetkili") {
        fetch(`${apiUrl}/schools/by_admin/${user.id}`)
          .then((res) => {
            if (!res.ok) throw new Error("Okul bilgisi alınamadı");
            return res.json();
          })
          .then((data) => setSchool(data.school))
          .catch((err) => console.error("Okul bilgisi çekilirken hata:", err));
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  const getMenuLabel = () => {
    switch (activeMenu) {
      case "home":
        return "Ana Sayfa";
      case "addSchool":
        return "Kurum Bilgileri";
      case "addStudent":
        return "Öğrenci Bilgileri";
      case "sms":
        return "SMS Ayarları";
      case "report":
        return "Raporlama";
      case "settings":
        return "Ayarlar";
      default:
        return "";
    }
  };

  const menuContent = (
    <Box sx={{ width: 200, bgcolor: "white", height: "100%", p: 2, display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 2 }}>
        <Box component="img" src="/images/school.png" alt="Logo" sx={{ width: "100%", height: 70, mb: 2 }} />
      </Box>

      <Button
        sx={{
          color: activeMenu === "home" ? "#28245c" : "gray",
          mb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          textTransform: "capitalize",
          pl: 2,
          width: "100%",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "4px",
            bgcolor: activeMenu === "home" ? "#28245c" : "transparent",
            borderRadius: "2px",
          },
        }}
        startIcon={<HomeIcon />}
        onClick={() => handleMenuClick("home")}
      >
        Ana Sayfa
      </Button>

      {user.role === "sysadmin" && (
        <Button
          sx={{
            color: activeMenu === "addSchool" ? "#28245c" : "gray",
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            textTransform: "capitalize",
            pl: 2,
            width: "100%",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: "4px",
              bgcolor: activeMenu === "addSchool" ? "#28245c" : "transparent",
              borderRadius: "2px",
            },
          }}
          startIcon={<SchoolIcon />}
          onClick={() => handleMenuClick("addSchool")}
        >
          Kurum Bilgileri
        </Button>
      )}

      <Button
        sx={{
          color: activeMenu === "addStudent" ? "#28245c" : "gray",
          mb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          textTransform: "capitalize",
          pl: 2,
          width: "100%",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "4px",
            bgcolor: activeMenu === "addStudent" ? "#28245c" : "transparent",
            borderRadius: "2px",
          },
        }}
        startIcon={<SupervisorAccountIcon />}
        onClick={() => handleMenuClick("addStudent")}
      >
        Öğrenci Bilgileri
      </Button>

      <Button
        sx={{
          color: activeMenu === "report" ? "#28245c" : "gray",
          mb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          textTransform: "capitalize",
          pl: 2,
          width: "100%",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "4px",
            bgcolor: activeMenu === "report" ? "#28245c" : "transparent",
            borderRadius: "2px",
          },
        }}
        startIcon={<AssessmentIcon />}
        onClick={() => handleMenuClick("report")}
      >
        Raporlama
      </Button>

      {user.role === "sysadmin" && (
        <Button
          sx={{
            color: activeMenu === "sms" ? "#28245c" : "gray",
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            textTransform: "capitalize",
            pl: 2,
            width: "100%",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: "4px",
              bgcolor: activeMenu === "sms" ? "#28245c" : "transparent",
              borderRadius: "2px",
            },
          }}
          startIcon={<MessageIcon />}
        >
          SMS Ayarları
        </Button>
      )}

      <Box sx={{ mt: "auto" }}>
        <Button
          sx={{
            color: activeMenu === "settings" ? "#28245c" : "gray",
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            textTransform: "capitalize",
            pl: 2,
            width: "100%",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: "4px",
              bgcolor: activeMenu === "settings" ? "#28245c" : "transparent",
              borderRadius: "2px",
            },
          }}
          startIcon={<SettingsApplicationsIcon />}
          onClick={() => handleMenuClick("settings")}
        >
          Ayarlar
        </Button>

        <Button
          sx={{
            color: "gray",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            textTransform: "capitalize",
            pl: 2,
          }}
          startIcon={<ExitToAppIcon />}
          onClick={() => navigate("/")}
        >
          Çıkış Yap
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Mobil Menü Icon */}
      <IconButton
        sx={{ display: { xs: "block", md: "none" }, position: "fixed", top: 10, left: 10, zIndex: 2000 }}
        onClick={() => setMobileOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      {/* Mobil Drawer */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
      >
        {menuContent}
      </Drawer>

      {/* Masaüstü Sol Menü */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>{menuContent}</Box>

      {/* Sağ İçerik */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          width: "100%",
          minHeight: "100vh",
          ml: { xs: 0, md: "0px" },
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
          <Typography variant="body1" sx={{ color: "black", fontWeight: "bold" }}>
            {getMenuLabel()}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <Typography variant="h6" sx={{ color: "black", fontSize: "18px" }}>
              {user?.full_name || "Recep Özgül"}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              {school?.name || "Sistem Admini"}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>{renderContent()}</Box>
      </Box>
    </Box>
  );
};

export default AdminSuperAdminHomePage;
