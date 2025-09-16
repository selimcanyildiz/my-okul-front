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

const SuperAdminHomePage = ({ schoolId }) => {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const [userType, setUserType] = useState(null);
    const [selectedSchool, setSelectedSchool] = useState("");
    const [schools, setSchools] = useState([]); // okul listesi
    const [selectedStatus, setSelectedStatus] = useState("");
    const [students, setStudents] = useState([]);
    const [stats, setStats] = useState({
        total_students: 0,
        active_students: 0,
        passive_students: 0,
        total_schools: 0,
    });

    // stats verisini çek
    const fetchStats = async (school) => {
        try {
            const res = await fetch(`${apiUrl}/stats?school_id=${school}`);
            if (!res.ok) throw new Error("Stats verisi alınamadı");
            const data = await res.json();
            setStats(data);
            setStudents(data.recent_logins || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const storedUserType = localStorage.getItem("userType");
        if (storedUserType) {
            setUserType(storedUserType);
        } else {
            navigate("/");
            return;
        }

        if (storedUserType === "sysadmin") {
            const fetchSchools = async () => {
                try {
                    const res = await fetch(`${apiUrl}/schools`);
                    if (!res.ok) throw new Error("Okullar alınamadı");
                    const data = await res.json();
                    const allOption = { id: 0, name: "Tümü" };
                    setSchools([allOption, ...data]);
                    setSelectedSchool(0);
                    fetchStats(0);
                } catch (err) {
                    console.error(err);
                }
            };

            fetchSchools();
        } else {
            fetchStats(schoolId);
        }
    }, [navigate, apiUrl, schoolId]);

    useEffect(() => {
        if (userType === "sysadmin" && selectedSchool) {
            fetchStats(selectedSchool);
        }
    }, [selectedSchool]);

    return (
        <Box sx={{ marginTop: 1, padding: 2 }}>
            <Grid container spacing={3} alignItems="center">
                {userType === "sysadmin" && (
                    <Grid item xs={12}>
                        <FormControl sx={{ minWidth: 300 }}>
                            <InputLabel id="school-select-label">Okul Seçin</InputLabel>
                            <Select
                                labelId="school-select-label"
                                value={selectedSchool} // number olarak state
                                onChange={(e) => {
                                    const schoolId = Number(e.target.value); // string → number
                                    setSelectedSchool(schoolId); // state değişiyor
                                    fetchStats(schoolId);        // yeni okul verilerini çek
                                }}
                                sx={{ borderRadius: "20px" }}
                            >
                                {schools.map((school) => (
                                    <MenuItem key={school.id} value={school.id}>
                                        {school.name}
                                    </MenuItem>
                                ))}
                            </Select>

                        </FormControl>
                    </Grid>
                )}

                {/* Kartlar */}
                {userType === "sysadmin" && (
                    <Grid item xs={3}>
                        <Paper sx={{ padding: 1, textAlign: "center", borderRadius: "16px" }}>
                            <Typography variant="h6">Kurum Sayısı</Typography>
                            <Typography variant="h4" sx={{ color: "primary.main" }}>{stats.total_schools}</Typography>
                        </Paper>
                    </Grid>
                )}
                <Grid item xs={userType === "sysadmin" ? 3 : 4}>
                    <Paper sx={{ padding: 1, textAlign: "center", borderRadius: "16px" }}>
                        <Typography variant="h6">Toplam Öğrenci</Typography>
                        <Typography variant="h4" sx={{ color: "primary.main" }}>{stats.total_students}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={userType === "sysadmin" ? 3 : 4}>
                    <Paper sx={{ padding: 1, textAlign: "center", borderRadius: "16px" }}>
                        <Typography variant="h6">Aktif Öğrenci</Typography>
                        <Typography variant="h4" sx={{ color: "green" }}>{stats.active_students}</Typography>
                    </Paper>
                </Grid>
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
                    <Grid item>
                        <Typography variant="h6">Son Giriş Tarihleri</Typography>
                    </Grid>
                </Grid>

                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
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
                                                fontWeight: "bold",
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
