import React, { useState } from "react";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Grid } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import EditIcon from '@mui/icons-material/Edit';
import AddStudentModal from "./AddStudentModal";

const AddStudent = () => {
    const [students, setStudents] = useState([
        {
            id: 1,
            studentName: "Abdülhamit Yıldırım",
            schoolName: "My Okul Ankara",
            tcNo: "15489548745",
            branch: "8 / B",
            date: "24 Mart 2025 21:30",
        },
        {
            id: 2,
            studentName: "Celal Sarı",
            schoolName: "Def Koleji",
            tcNo: "98745562134",
            branch: "8 / A",
            date: "22 Mart 2025 12:30",
        },
        {
            id: 3,
            studentName: "Ahmet Yılmaz",
            schoolName: "Ghı Koleji",
            tcNo: "74859621358",
            branch: "9 / B",
            date: "11 Mart 2025 11:30",
        },
        {
            id: 4,
            studentName: "Ayşe Kara",
            schoolName: "My Kolej",
            tcNo: "45261547853",
            branch: "7 / E",
            date: "1 Şubat 2025 15:00",
        }
    ]);

    const [openModal, setOpenModal] = useState(false);
    const [newStudent, setNewStudent] = useState({
        id: null,
        studentName: "",
        schoolName: "",
        tcNo: "",
        branch: "",
        date: ""
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchText, setSearchText] = useState(""); // Arama metni state'i

    const handleOpenModal = () => {
        setOpenModal(true); // Modal'ı açma
        setIsEditMode(false); // Yeni ekleme modu
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Modal'ı kapama
        setNewStudent({
            id: null,
            studentName: "",
            schoolName: "",
            tcNo: "",
            branch: "",
            date: ""
        });
    };

    const handleInputChange = (e) => {
        setNewStudent({
            ...newStudent,
            [e.target.name]: e.target.value
        });
    };

    const handleAddStudent = () => {
        if (isEditMode) {
            // Öğrenci güncelleme işlemi
            const updatedStudents = students.map(student =>
                student.id === newStudent.id ? newStudent : student
            );
            setStudents(updatedStudents);
        } else {
            // Yeni öğrenci ekleme işlemi
            const newStudentData = { ...newStudent, id: students.length + 1 };
            setStudents([...students, newStudentData]);
        }
        handleCloseModal();
    };

    const handleEditStudent = (student) => {
        setNewStudent(student); // Düzenlenecek öğrencinin verilerini state'e aktar
        setIsEditMode(true); // Düzenleme modunu aktif et
        setOpenModal(true); // Modal'ı aç
    };

    // Arama metnine göre öğrencileri filtrele
    const filteredStudents = students.filter((student) =>
        student.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
        student.schoolName.toLowerCase().includes(searchText.toLowerCase()) ||
        student.tcNo.toLowerCase().includes(searchText.toLowerCase()) ||
        student.branch.toLowerCase().includes(searchText.toLowerCase()) ||
        student.date.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <>
            <Box sx={{ marginTop: 1, padding: 2 }}>
                <Box sx={{ marginBottom: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                        {/* Sol: Öğrenci Ekle Butonu */}
                        <Grid item xs={2}>
                            <Button variant="contained" color="primary" onClick={handleOpenModal} fullWidth>
                                Öğrenci Ekle
                            </Button>
                        </Grid>
                        <Grid item xs={1.5}></Grid>

                        {/* Orta: Arama Inputu */}
                        <Grid item xs={4}>
                            <TextField
                                label="Ara"
                                variant="outlined"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                fullWidth
                                sx={{
                                    borderRadius: "25px", // Yuvarlak köşeler
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "25px", // Input alanı için yuvarlak köşeler
                                        backgroundColor: "#f5f5f5", // Arka plan rengi
                                        "&:hover": {
                                            backgroundColor: "#e0e0e0", // Hover durumunda arka plan rengi
                                        },
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        padding: "12px 16px", // Input içi padding
                                    },
                                    "& .MuiInputLabel-outlined": {
                                        transform: "translate(14px, 14px) scale(1)", // Label pozisyonu
                                    },
                                    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                                        transform: "translate(14px, -6px) scale(0.75)", // Label küçülme animasyonu
                                    },
                                }}
                            />
                        </Grid>

                        {/* Sağ: Excel İndir ve Yükle Butonları */}
                        <Grid item xs={4.5} sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                            <Button startIcon={<DownloadIcon />} variant="outlined" color="primary" style={{ borderRadius: "20px" }}>
                                Excel İndir
                            </Button>
                            <Button startIcon={<UploadIcon />} variant="outlined" color="primary" component="label" style={{ borderRadius: "20px" }}>
                                Excel Yükle
                                <input
                                    type="file"
                                    hidden
                                    accept=".xlsx, .xls"
                                />
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: "20%", fontWeight: "bold", textAlign: "center" }}>Öğrenci Adı</TableCell>
                                <TableCell sx={{ width: "20%", fontWeight: "bold", textAlign: "center" }}>Okul Adı</TableCell>
                                <TableCell sx={{ width: "10%", fontWeight: "bold", textAlign: "center" }}>TC No</TableCell>
                                <TableCell sx={{ width: "10%", fontWeight: "bold", textAlign: "center" }}>Sınıf</TableCell>
                                <TableCell sx={{ width: "10%", fontWeight: "bold", textAlign: "center" }}>Son Giriş</TableCell>
                                <TableCell sx={{ width: "10%", fontWeight: "bold", textAlign: "center" }}>İşlemler</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredStudents.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell sx={{ textAlign: "center" }}>{student.studentName}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{student.schoolName}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{student.tcNo}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{student.branch}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{student.date}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <IconButton color="primary" onClick={() => handleEditStudent(student)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <AddStudentModal
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                handleInputChange={handleInputChange}
                newStudent={newStudent}
                handleAddStudent={handleAddStudent}
                isEditMode={isEditMode}
            />
        </>
    );
};

export default AddStudent;