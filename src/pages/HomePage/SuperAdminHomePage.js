import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SuperAdminHomePage = () => {
    const navigate = useNavigate();

    const [userType, setUserType] = useState(null);
    const [selectedSchool, setSelectedSchool] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const totalStudents = 270;
    const activeStudents = 200;
    const inactiveStudents = 70;

    const students = [
        {
            id: 1,
            name: "Abdülhamit Yıldırım",
            school: "My Okul Ankara",
            branch: "8 / B",
            lastLogin: "24 Mart 2025 21:30",
            status: "active"
        },
        {
            id: 2,
            name: "Celal Sarı",
            school: "Def Koleji",
            branch: "8 / A",
            lastLogin: "22 Mart 2025 12:30",
            status: "active"
        },
        {
            id: 3,
            name: "Ahmet Yılmaz",
            school: "Ghı Koleji",
            branch: "9 / B",
            lastLogin: "11 Mart 2025 11:30",
            status: "inactive"
        },
        {
            id: 4,
            name: "Ayşe Kara",
            school: "My Kolej",
            branch: "7 / E",
            lastLogin: "1 Şubat 2025 15:00",
            status: "active"
        },
        {
            id: 5,
            name: "Ali Can",
            school: "XYZ Koleji",
            branch: "10 / C",
            lastLogin: "15 Nisan 2025 09:45",
            status: "inactive"
        }
    ];

    const filteredStudents = students.filter((student) => {
        const schoolMatch = selectedSchool ? student.school === selectedSchool : true;
        const statusMatch = selectedStatus ? student.status === selectedStatus : true;
        return schoolMatch && statusMatch;
    });

    useEffect(() => {
        const storedUserType = localStorage.getItem("userType");
        if (storedUserType) {
            setUserType(storedUserType);
        } else {
            navigate("/");
        }
    }, [navigate]);

    return (
        <Box sx={{ marginTop: 1, padding: 2 }}>
            <Grid container spacing={3}>
                {/* Toplam Öğrenci Sayısı */}
                {userType === "admin" && <Grid item xs={3}>
                    <Paper sx={{ padding: 1, textAlign: "center", borderRadius: "16px" }}>
                        <Typography variant="h6">Kurum Sayısı</Typography>
                        <Typography variant="h4" sx={{ color: "primary.main" }}>{15}</Typography>
                    </Paper>
                </Grid>}
                <Grid item xs={userType === "admin" ? 3 : 4}>
                    <Paper sx={{ padding: 1, textAlign: "center", borderRadius: "16px" }}>
                        <Typography variant="h6">Toplam Öğrenci</Typography>
                        <Typography variant="h4" sx={{ color: "primary.main" }}>{userType === "admin" ? 4000 : totalStudents}</Typography>
                    </Paper>
                </Grid>

                {/* Aktif Öğrenci Sayısı */}
                <Grid item xs={userType === "admin" ? 3 : 4}>
                    <Paper sx={{ padding: 1, textAlign: "center", borderRadius: "16px" }}>
                        <Typography variant="h6">Aktif Öğrenci</Typography>
                        <Typography variant="h4" sx={{ color: "green" }}>{userType === "admin" ? 3700 : activeStudents}</Typography>
                    </Paper>
                </Grid>

                {/* Pasif Öğrenci Sayısı */}
                <Grid item xs={userType === "admin" ? 3 : 4}>
                    <Paper sx={{ padding: 1, textAlign: "center", borderRadius: "16px" }}>
                        <Typography variant="h6">Pasif Öğrenci</Typography>
                        <Typography variant="h4" sx={{ color: "red" }}>{userType === "admin" ? 300 : inactiveStudents}</Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Öğrenci Tablosu */}
            <Box sx={{ marginTop: 4 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                    {/* Sol: Son Giriş Tarihleri Başlığı */}
                    <Grid item>
                        <Typography variant="h6">Son Giriş Tarihleri</Typography>
                    </Grid>

                    {/* Sağ: Filtreleme Seçenekleri */}
                    <Grid item sx={{ display: "flex", gap: 2 }}>
                        {/* Okul Seçme Dropdown'u */}
                        {userType === "admin" && <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel id="school-select-label">Okul Seçin</InputLabel>
                            <Select
                                labelId="school-select-label"
                                label="Okul Seçin"
                                value={selectedSchool}
                                onChange={(e) => setSelectedSchool(e.target.value)}
                                sx={{ borderRadius: "20px" }}
                            >
                                <MenuItem value="">Tüm Okullar</MenuItem>
                                <MenuItem value="My Okul Ankara">My Okul Ankara</MenuItem>
                                <MenuItem value="Def Koleji">Def Koleji</MenuItem>
                                <MenuItem value="Ghı Koleji">Ghı Koleji</MenuItem>
                                <MenuItem value="My Kolej">My Kolej</MenuItem>
                                <MenuItem value="XYZ Koleji">XYZ Koleji</MenuItem>
                            </Select>
                        </FormControl>}

                        {/* Durum Seçme Dropdown'u */}
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel id="status-select-label">Durum Seçin</InputLabel>
                            <Select
                                labelId="status-select-label"
                                label="Durum Seçin"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                sx={{ borderRadius: "20px" }}
                            >
                                <MenuItem value="">Tüm Durumlar</MenuItem>
                                <MenuItem value="active">Aktif</MenuItem>
                                <MenuItem value="inactive">Pasif</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Öğrenci Adı</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Okul</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Sınıf</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Son Giriş Tarihi</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Durum</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredStudents.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.school}</TableCell>
                                    <TableCell>{student.branch}</TableCell>
                                    <TableCell>{student.lastLogin}</TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                color: student.status === "active" ? "green" : "red",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            {student.status === "active" ? "Aktif" : "Pasif"}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default SuperAdminHomePage;