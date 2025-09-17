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
import PieChart from "../../components/PieChart";

const SuperAdminHomePage = ({ schoolId }) => {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const [userType, setUserType] = useState(null);
    const [user, setUser] = useState();
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
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData)
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
                {user?.role === "sysadmin" && <Grid item xs={user.role === "sysadmin" ? 3 : 4}>
                    <Paper sx={{ padding: 2, borderRadius: "16px", display: "flex", alignItems: "center" }}>
                        <Box sx={{ mr: 2 }}>
                            <img
                                src="/images/kurum-sayisi.png"
                                alt="Kurum"
                                style={{ width: 50, height: 50 }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Kurum Sayısı</Typography>
                            <Typography variant="h5" sx={{ color: "primary.main" }}>{stats.total_schools}</Typography>
                        </Box>
                    </Paper>
                </Grid>}


                <Grid item xs={user?.role === "sysadmin" ? 3 : 4}>
                    <Paper sx={{ padding: 2, borderRadius: "16px", display: "flex", alignItems: "center" }}>
                        <Box sx={{ mr: 2 }}>
                            <img
                                src="/images/toplam-sayisi.png"
                                alt="Kurum"
                                style={{ width: 50, height: 50 }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Toplam Öğrenci Sayısı</Typography>
                            <Typography variant="h5" sx={{ color: "primary.main" }}>{stats.total_students}</Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={user?.role === "sysadmin" ? 3 : 4}>
                    <Paper sx={{ padding: 2, borderRadius: "16px", display: "flex", alignItems: "center" }}>
                        <Box sx={{ mr: 2 }}>
                            <img
                                src="/images/aktif-sayisi.png"
                                alt="Kurum"
                                style={{ width: 50, height: 50 }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Aktif Öğrenci Sayısı</Typography>
                            <Typography variant="h5" sx={{ color: "primary.main" }}>{stats.active_students}</Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={user?.role === "sysadmin" ? 3 : 4}>
                    <Paper sx={{ padding: 2, borderRadius: "16px", display: "flex", alignItems: "center" }}>
                        <Box sx={{ mr: 2 }}>
                            <img
                                src="/images/pasif-sayisi.png"
                                alt="Kurum"
                                style={{ width: 50, height: 50 }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Pasif Öğrenci Sayısı</Typography>
                            <Typography variant="h5" sx={{ color: "primary.main" }}>{stats.passive_students}</Typography>
                        </Box>
                    </Paper>
                </Grid>



            </Grid>

            {/* Öğrenci Tablosu */}
            <Box sx={{ marginTop: 4 }}>
                <Grid container spacing={2}>
                    {/* Sol taraf: Tablo */}
                    <Grid item xs={12} md={8}>
                        <Typography variant="h6">Son Giriş Tarihleri</Typography>

                        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>Öğrenci Adı</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Okul</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Sınıf</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Son Giriş Tarihi</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>{student.school}</TableCell>
                                            <TableCell>{student.branch}</TableCell>
                                            <TableCell>{student.lastLogin}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    {/* Sağ taraf: Chart */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, textAlign: "center" }}>
                            <PieChart
                                data={[
                                    { name: "Aktif Öğrenci", value: stats.active_students },
                                    { name: "Pasif Öğrenci", value: stats.passive_students },
                                ]}
                                total={stats.active_students + stats.passive_students}
                                selectedSchool={selectedSchool}
                                setSelectedSchool={setSelectedSchool}
                                schools={schools}
                                user={user}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>



        </Box>
    );
};

export default SuperAdminHomePage;
