import React from "react";
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const SuperAdminHomePage = () => {
    // Örnek veriler
    const totalStudents = 270;
    const activeStudents = 200;
    const inactiveStudents = 70;

    const students = [
        {
            id: 1,
            name: "Selimcan Yıldız",
            school: "Abc Koleji",
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

    return (
        <Box sx={{ marginTop: 1, padding: 2 }}>
            <Grid container spacing={3}>
                {/* Toplam Öğrenci Sayısı */}
                <Grid item xs={4}>
                    <Paper sx={{ padding: 1, textAlign: "center", borderRadius: "16px" }}>
                        <Typography variant="h6">Toplam Öğrenci</Typography>
                        <Typography variant="h4" sx={{ color: "primary.main" }}>{totalStudents}</Typography>
                    </Paper>
                </Grid>

                {/* Aktif Öğrenci Sayısı */}
                <Grid item xs={4}>
                    <Paper sx={{ padding: 1, textAlign: "center", borderRadius: "16px" }}>
                        <Typography variant="h6">Aktif Öğrenci</Typography>
                        <Typography variant="h4" sx={{ color: "green" }}>{activeStudents}</Typography>
                    </Paper>
                </Grid>

                {/* Pasif Öğrenci Sayısı */}
                <Grid item xs={4}>
                    <Paper sx={{ padding: 1, textAlign: "center", borderRadius: "16px" }}>
                        <Typography variant="h6">Pasif Öğrenci</Typography>
                        <Typography variant="h4" sx={{ color: "red" }}>{inactiveStudents}</Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Öğrenci Tablosu */}
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>Son Giriş Tarihleri</Typography>
                <TableContainer component={Paper}>
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
                            {students.map((student) => (
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