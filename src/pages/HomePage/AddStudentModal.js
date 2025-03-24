import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddStudentModal = ({ openModal, handleCloseModal, handleInputChange, newStudent, handleAddStudent, isEditMode }) => {
    const navigate = useNavigate();

    const [userType, setUserType] = useState(null);
    const [schools, setSchools] = useState([]); // Okul listesi
    const [selectedSchool, setSelectedSchool] = useState(""); // Seçilen okul

    useEffect(() => {
        const storedUserType = localStorage.getItem("userType");
        if (storedUserType) {
            setUserType(storedUserType);
        } else {
            navigate("/");
        }

        // Örnek okul listesi (API'den çekilebilir)
        setSchools([
            { id: 1, name: "Abc Koleji" },
            { id: 2, name: "Def Koleji" },
            { id: 3, name: "Ghı Koleji" },
            { id: 4, name: "My Kolej" },
        ]);

        // Eğer kullanıcı manager ise, okul bilgisini otomatik doldur
        if (storedUserType === "manager") {
            setSelectedSchool("My Kolej İzmir"); // Örnek olarak sabit bir okul adı
        }
    }, [navigate]);

    return (
        <Modal open={openModal} onClose={handleCloseModal}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 24,
                    width: "400px",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    {isEditMode ? "Öğrenci Düzenle" : "Öğrenci Ekle"}
                </Typography>

                <Grid container spacing={2}>
                    {/* Admin ise okul seçme alanı göster */}
                    {userType === "admin" && (
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Okul Adı"
                                variant="outlined"
                                name="schoolName"
                                value={newStudent.schoolName}
                                onChange={handleInputChange}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                <option value="">Okul Seçin</option>
                                {schools.map((school) => (
                                    <option key={school.id} value={school.name}>
                                        {school.name}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    )}

                    {/* Manager ise okul adı otomatik doldurulmuş ve değiştirilemez olacak */}
                    {userType === "manager" && (
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Okul Adı"
                                variant="outlined"
                                name="schoolName"
                                value={selectedSchool}
                                InputProps={{
                                    readOnly: true, // Okul adı değiştirilemez
                                }}
                            />
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Öğrenci Adı"
                            variant="outlined"
                            name="studentName"
                            value={newStudent.studentName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="TC No"
                            variant="outlined"
                            name="tcNo"
                            value={newStudent.tcNo}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Sınıf"
                            variant="outlined"
                            name="branch"
                            value={newStudent.branch}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={handleCloseModal} sx={{ marginRight: 1 }}>
                        İptal
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleAddStudent}>
                        {isEditMode ? "Güncelle" : "Ekle"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddStudentModal;