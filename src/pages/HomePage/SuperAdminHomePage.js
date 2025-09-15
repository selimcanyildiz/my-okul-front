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
    const apiUrl = process.env.REACT_APP_API_URL;

    const [userType, setUserType] = useState(null);
    const [selectedSchool, setSelectedSchool] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [students, setStudents] = useState([]);
    const [stats, setStats] = useState({
        total_students: 0,
        active_students: 0,
        passive_students: 0,
        total_schools: 0,
    });

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

        // backendden stats bilgilerini çek
        const fetchStats = async () => {
            try {
                const res = await fetch(`${apiUrl}/stats`); // endpointini buraya yaz
                if (!res.ok) throw new Error("Stats verisi alınamadı");
                const data = await res.json();
                setStats(data);
                setStudents(data.recent_logins)
            } catch (err) {
                console.error(err);
            }
        };

        fetchStats();
    }, [navigate]);

    return (
        <Box sx={{ marginTop: 1, padding: 2 }}>
            <Grid container spacing={3}>
                {/* Toplam Öğrenci Sayısı */}
                {userType === "sysadmin" && <Grid item xs={3}>
                    <Paper sx={{ padding: 1, textAlign: "center", borderRadius: "16px" }}>
                        <Typography variant="h6">Kurum Sayısı</Typography>
                        <Typography variant="h4" sx={{ color: "primary.main" }}>{stats.total_schools}</Typography>
                    </Paper>
                </Grid>}
                <Grid item xs={userType === "sysadmin" ? 3 : 4}>
                    <Paper sx={{ padding: 1, textAlign: "center", borderRadius: "16px" }}>
                        <Typography variant="h6">Toplam Öğrenci</Typography>
                        <Typography variant="h4" sx={{ color: "primary.main" }}>{stats.total_students}</Typography>
                    </Paper>
                </Grid>

                {/* Aktif Öğrenci Sayısı */}
                <Grid item xs={userType === "sysadmin" ? 3 : 4}>
                    <Paper sx={{ padding: 1, textAlign: "center", borderRadius: "16px" }}>
                        <Typography variant="h6">Aktif Öğrenci</Typography>
                        <Typography variant="h4" sx={{ color: "green" }}>{stats.active_students}</Typography>
                    </Paper>
                </Grid>

                {/* Pasif Öğrenci Sayısı */}
                <Grid item xs={userType === "sysadmin" ? 3 : 4}>
                    <Paper sx={{ padding: 1, textAlign: "center", borderRadius: "16px" }}>
                        <Typography variant="h6">Pasif Öğrenci</Typography>
                        <Typography variant="h4" sx={{ color: "red" }}>{stats.passive_students}</Typography>
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
                                <MenuItem value="">Aktif</MenuItem>
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
                                                color: student.status !== "active" ? "green" : "red",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            {student.status !== "active" ? "Aktif" : "Pasif"}
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