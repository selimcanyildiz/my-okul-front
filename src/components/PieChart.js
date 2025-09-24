import React from "react";
import {
    PieChart as RePieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";

const COLORS = ["#0088FE", "#FF8042"];

const PieChart = ({ data, total, selectedSchool, setSelectedSchool, schools, user, isMobileChart }) => {
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap" }}>
                <Typography variant="h6" sx={{ fontSize: { xs: "0.9rem", sm: "1.25rem" } }}>Öğrenciler</Typography>
                {user?.role === "sysadmin" && (
                    <FormControl size="small" sx={{ minWidth: 160, mt: { xs: 1, sm: 0 } }}>
                        <Select
                            value={selectedSchool ?? ""}
                            onChange={(e) => setSelectedSchool(e.target.value === "" ? "" : Number(e.target.value))}
                            variant="outlined"
                            sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
                        >
                            <MenuItem value="">Tümü</MenuItem>
                            {Array.isArray(schools) &&
                                schools.map((s) => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                )}
            </Box>

            <Box sx={{ width: "100%", height: { xs: 180, sm: 250 }, position: "relative" }}>
                <ResponsiveContainer>
                    <RePieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={isMobileChart ? 40 : 60}
                            outerRadius={isMobileChart ? 60 : 90}
                            paddingAngle={3}
                            dataKey="value"
                        >
                            {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                    </RePieChart>
                </ResponsiveContainer>

                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }}>
                        {total}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}>Toplam</Typography>
                </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 2, flexWrap: "wrap" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: COLORS[0] }} />
                    <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}>Aktif Öğrenci : {data[0]?.value ?? 0}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: COLORS[1] }} />
                    <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}>Pasif Öğrenci : {data[1]?.value ?? 0}</Typography>
                </Box>
            </Box>
        </>
    );
};

export default PieChart;
