import React, { useState } from "react";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Grid } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import EditIcon from '@mui/icons-material/Edit';
import AddSchoolModal from "./AddSchoolModal";

const AddSchool = () => {
    const [schools, setSchools] = useState([
        {
            id: 1,
            schoolName: "Özel ABC Okulu",
            address: "Merkez Mah. No:12",
            city: "İstanbul",
            district: "Kadıköy",
            responsibleName: "Ahmet Yılmaz",
            responsibleSurname: "Yılmaz",
            tcNo: "12345678901"
        },
        {
            id: 2,
            schoolName: "XYZ Koleji",
            address: "Çiftlik Mah. No:4",
            city: "Ankara",
            district: "Çankaya",
            responsibleName: "Mehmet Demir",
            responsibleSurname: "Demir",
            tcNo: "98765432109"
        },
        {
            id: 3,
            schoolName: "DEF Okulu",
            address: "Yenişehir Mah. No:34",
            city: "İzmir",
            district: "Konak",
            responsibleName: "Ayşe Kara",
            responsibleSurname: "Kara",
            tcNo: "45678901234"
        },
        {
            id: 4,
            schoolName: "GHI Okulu",
            address: "Köy Mah. No:6",
            city: "Bursa",
            district: "Osmangazi",
            responsibleName: "Ali Can",
            responsibleSurname: "Can",
            tcNo: "11223344556"
        }
    ]);

    const [openModal, setOpenModal] = useState(false);
    const [newSchool, setNewSchool] = useState({
        id: null,
        schoolName: "",
        address: "",
        city: "",
        district: "",
        responsibleName: "",
        responsibleSurname: "",
        tcNo: ""
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchText, setSearchText] = useState(""); // Arama metni state'i

    const handleOpenModal = () => {
        setOpenModal(true); // Modal'ı açma
        setIsEditMode(false); // Yeni ekleme modu
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Modal'ı kapama
        setNewSchool({
            id: null,
            schoolName: "",
            address: "",
            city: "",
            district: "",
            responsibleName: "",
            responsibleSurname: "",
            tcNo: ""
        });
    };

    const handleInputChange = (e) => {
        setNewSchool({
            ...newSchool,
            [e.target.name]: e.target.value
        });
    };

    const handleAddSchool = () => {
        if (isEditMode) {
            // Okul güncelleme işlemi
            const updatedSchools = schools.map(school =>
                school.id === newSchool.id ? newSchool : school
            );
            setSchools(updatedSchools);
        } else {
            // Yeni okul ekleme işlemi
            const newSchoolData = { ...newSchool, id: schools.length + 1 };
            setSchools([...schools, newSchoolData]);
        }
        handleCloseModal();
    };

    const handleEditSchool = (school) => {
        setNewSchool(school); // Düzenlenecek okulun verilerini state'e aktar
        setIsEditMode(true); // Düzenleme modunu aktif et
        setOpenModal(true); // Modal'ı aç
    };

    // Arama metnine göre okulları filtrele
    const filteredSchools = schools.filter((school) =>
        school.schoolName.toLowerCase().includes(searchText.toLowerCase()) ||
        school.address.toLowerCase().includes(searchText.toLowerCase()) ||
        school.city.toLowerCase().includes(searchText.toLowerCase()) ||
        school.district.toLowerCase().includes(searchText.toLowerCase()) ||
        school.responsibleName.toLowerCase().includes(searchText.toLowerCase()) ||
        school.responsibleSurname.toLowerCase().includes(searchText.toLowerCase()) ||
        school.tcNo.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <>
            <Box sx={{ marginTop: 1, padding: 2 }}>
                <Box sx={{ marginBottom: 2 }}>
                    <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
                        {/* Sol: Kurum Ekle Butonu */}
                        <Grid item xs={2}>
                            <Button variant="contained" color="primary" onClick={handleOpenModal} fullWidth>
                                Kurum Ekle
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


                {/* Tablo */}
                <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: "20%", fontWeight: "bold", textAlign: "center" }}>Okul Adı</TableCell>
                                <TableCell sx={{ width: "20%", fontWeight: "bold", textAlign: "center" }}>Adres</TableCell>
                                <TableCell sx={{ width: "10%", fontWeight: "bold", textAlign: "center" }}>İl</TableCell>
                                <TableCell sx={{ width: "10%", fontWeight: "bold", textAlign: "center" }}>İlçe</TableCell>
                                <TableCell sx={{ width: "15%", fontWeight: "bold", textAlign: "center" }}>Yetkili Adı</TableCell>
                                <TableCell sx={{ width: "15%", fontWeight: "bold", textAlign: "center" }}>Yetkili Soyadı</TableCell>
                                <TableCell sx={{ width: "10%", fontWeight: "bold", textAlign: "center" }}>TC No</TableCell>
                                <TableCell sx={{ width: "10%", fontWeight: "bold", textAlign: "center" }}>İşlemler</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredSchools.map((school) => (
                                <TableRow key={school.id}>
                                    <TableCell sx={{ textAlign: "center" }}>{school.schoolName}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{school.address}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{school.city}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{school.district}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{school.responsibleName}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{school.responsibleSurname}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{school.tcNo}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <IconButton color="primary" onClick={() => handleEditSchool(school)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Kurum Ekle/Düzenle Modalı */}
            <AddSchoolModal
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                handleInputChange={handleInputChange}
                newSchool={newSchool}
                handleAddSchool={handleAddSchool}
                isEditMode={isEditMode}
            />
        </>
    );
};

export default AddSchool;