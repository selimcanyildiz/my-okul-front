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
    TablePagination,
    Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PieChart from "../../components/PieChart";

const Report = ({ schoolId }) => {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const [userType, setUserType] = useState(null);
    const [user, setUser] = useState();
    const [selectedSchool, setSelectedSchool] = useState("");
    const [schools, setSchools] = useState([]);
    const [students, setStudents] = useState([]);
    const [stats, setStats] = useState({
        total_students: 0,
        active_students: 0,
        passive_students: 0,
        total_schools: 0,
    });
    const [page, setPage] = useState(0);       // sayfa numarası
    const [rowsPerPage, setRowsPerPage] = useState(10);  // sayfa başına öğrenci sayısı


    const fetchStats = async (school, limit = 0) => {
        try {
            const res = await fetch(`${apiUrl}/stats?school_id=${school}&limit=${limit}`);
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
                    const res = await fetch(`${apiUrl}/schools/`);
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
        // else fetchStats(user.id)
    }, [selectedSchool]);

    // const statCards = [
    //     { label: "Kurum Sayısı", value: stats.total_schools, icon: "/images/kurum-sayisi.png" },
    //     { label: "Toplam Öğrenci Sayısı", value: stats.total_students, icon: "/images/toplam-sayisi.png" },
    //     { label: "Aktif Öğrenci Sayısı", value: stats.active_students, icon: "/images/aktif-sayisi.png" },
    //     { label: "Pasif Öğrenci Sayısı", value: stats.passive_students, icon: "/images/pasif-sayisi.png" },
    // ];

    const statCards = [
        ...(user?.role === "sysadmin"
            ? [{ label: "Kurum Sayısı", value: stats.total_schools, icon: "/images/kurum-sayisi.png" }]
            : []),
        { label: "Toplam Öğrenci Sayısı", value: stats.total_students, icon: "/images/toplam-sayisi.png" },
        { label: "Aktif Öğrenci Sayısı", value: stats.active_students, icon: "/images/aktif-sayisi.png" },
        { label: "Pasif Öğrenci Sayısı", value: stats.passive_students, icon: "/images/pasif-sayisi.png" },
    ];

    return (
        <Box sx={{ marginTop: 1, padding: 2 }}>
            {/* Stat Cards */}
            <Grid container spacing={2}>
                {statCards.map((card, index) => (
                    <Grid key={index} item xs={12} sm={6} md={user?.role === "sysadmin" ? 3 : 4}>
                        <Paper
                            sx={{
                                padding: { xs: 1, sm: 2 },
                                borderRadius: "16px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Box sx={{ mr: { xs: 1, sm: 2 } }}>
                                <img
                                    src={card.icon}
                                    alt={card.label}
                                    style={{ width: { xs: 2, sm: 50 }, height: { xs: 2, sm: 50 } }}
                                />
                            </Box>
                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: "bold", fontSize: { xs: "0.75rem", sm: "1rem" } }}
                                >
                                    {card.label}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{ color: "primary.main", fontSize: { xs: "1rem", sm: "1.5rem" } }}
                                >
                                    {card.value}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Öğrenci Tablosu */}
            <Box sx={{ marginTop: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h6" sx={{ mb: 1 }}>Son Giriş Tarihleri</Typography>

                        {/* Mobil için kart format */}
                        {/* Mobil için kart format */}
                        <Box sx={{ display: { xs: "block", md: "none" } }}>
                            {students
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((student) => (
                                    <Paper key={student.id} sx={{ p: 1, mb: 1, borderRadius: "12px" }}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <Typography variant="caption" fontWeight="bold" sx={{ fontSize: "0.7rem" }}>Öğrenci Adı</Typography>
                                                <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>{student.name}</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="caption" fontWeight="bold" sx={{ fontSize: "0.7rem" }}>Okul</Typography>
                                                <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>{student.school}</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="caption" fontWeight="bold" sx={{ fontSize: "0.7rem" }}>Tarih</Typography>
                                                <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>{student.lastLogin}</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="caption" fontWeight="bold" sx={{ fontSize: "0.7rem" }}>Sınıf Şube</Typography>
                                                <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>{student.branch}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                ))}

                            {/* Mobil sayfalama */}
                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    disabled={page === 0}
                                    onClick={() => setPage(page - 1)}
                                >
                                    Önceki
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    disabled={(page + 1) * rowsPerPage >= students.length}
                                    onClick={() => setPage(page + 1)}
                                >
                                    Sonraki
                                </Button>
                            </Box>
                        </Box>


                        {/* Masaüstü tablo */}
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                            <TableContainer>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Öğrenci Adı</TableCell>
                                            <TableCell>Okul</TableCell>
                                            <TableCell>Sınıf</TableCell>
                                            <TableCell>Son Giriş Tarihi</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {students
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((student) => (
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

                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                component="div"
                                count={students.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={(event, newPage) => setPage(newPage)}
                                onRowsPerPageChange={(event) => {
                                    setRowsPerPage(parseInt(event.target.value, 10));
                                    setPage(0);
                                }}
                                labelRowsPerPage="Sayfa başına"
                                labelDisplayedRows={({ from, to, count }) =>
                                    `Toplam ${count !== -1 ? count : `>${to}`} kayıttan ${from}–${to} arası`
                                }
                            />

                        </Box>
                    </Grid>

                    {/* Chart */}
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
                                isMobileChart={true}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Report;
