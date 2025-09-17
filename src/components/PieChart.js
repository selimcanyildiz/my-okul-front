import React from "react";
import {
    PieChart as RePieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";

const COLORS = ["#0088FE", "#FF8042"]; // aktif - pasif renkler

const PieChart = ({ data, total, selectedSchool, setSelectedSchool, schools, user }) => {
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6">Öğrenciler</Typography>
                {user?.role === "sysadmin" && (
                    <FormControl size="small" sx={{ minWidth: 160 }}>
                        <Select
                            value={selectedSchool ?? ""}
                            onChange={(e) => {
                                const v = e.target.value === "" ? "" : Number(e.target.value);
                                setSelectedSchool(v);
                            }}
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none", // border çizgisini kaldırır
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                },
                            }}
                        >
                            <MenuItem value="">Tümü</MenuItem>
                            {Array.isArray(schools) &&
                                schools.map((s) => (
                                    <MenuItem key={s.id} value={s.id}>
                                        {s.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                )}
            </Box>

            {/* Chart */}
            <Box sx={{ width: "100%", height: 250, position: "relative" }}>
                <ResponsiveContainer>
                    <RePieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={3}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </RePieChart>
                </ResponsiveContainer>

                {/* Ortadaki toplam öğrenci sayısı */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h6" fontWeight="bold">
                        {total}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Toplam
                    </Typography>
                </Box>
            </Box>

            {/* Alt açıklamalar */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: COLORS[0] }} />
                    <Typography variant="body2">Aktif Öğrenci : {data[0]?.value ?? 0}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: COLORS[1] }} />
                    <Typography variant="body2">Pasif Öğrenci : {data[1]?.value ?? 0}</Typography>
                </Box>
            </Box>
        </>
    );
};

export default PieChart;
