import React, { useState } from "react";
import { Box, Button, Grid, Modal, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const AddSchoolModal = ({ openModal, handleCloseModal, handleInputChange, newSchool, handleAddSchool, isEditMode }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

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
                    {isEditMode ? "Okul Düzenle" : "Okul Ekle"}
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Okul Adı"
                            variant="outlined"
                            name="schoolName"
                            value={newSchool.schoolName}
                            onChange={handleInputChange}
                        />
                    </Grid>



                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Yetkili Adı"
                            variant="outlined"
                            name="responsibleName"
                            value={newSchool.responsibleName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Yetkili Soyadı"
                            variant="outlined"
                            name="responsibleSurname"
                            value={newSchool.responsibleSurname}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Telefon No"
                            variant="outlined"
                            name="phone"
                            value={newSchool?.phone}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ''); // sadece rakam
                                if (value.length <= 11) {
                                    handleInputChange({ target: { name: "phone", value } });
                                }
                            }}
                            inputProps={{ maxLength: 11 }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="TC No"
                            variant="outlined"
                            name="tcNo"
                            value={newSchool.tcNo}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ''); // sadece rakam
                                if (value.length <= 11) {
                                    handleInputChange({ target: { name: "tcNo", value } });
                                }
                            }}
                            inputProps={{ maxLength: 11 }}
                        />
                    </Grid>

                    {/* 🌐 Yeni URL Alanları */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Anaokulu URL"
                        variant="outlined"
                        name="url_anaokul"
                        value={newSchool.url_anaokul || ""}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="İlkokul URL"
                        variant="outlined"
                        name="url_ilkokul"
                        value={newSchool.url_ilkokul || ""}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Ortaokul URL"
                        variant="outlined"
                        name="url_ortaokul"
                        value={newSchool.url_ortaokul || ""}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Lise URL"
                        variant="outlined"
                        name="url_lise"
                        value={newSchool.url_lise || ""}
                        onChange={handleInputChange}
                    />
                </Grid>


                    {/* Username ve şifre artık backend tarafından oluşturulacak */}
                    {newSchool.username && newSchool.password && (
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Kullanıcı Adı"
                                    variant="outlined"
                                    value={newSchool.username}
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Şifre"
                                    variant="outlined"
                                    type={showPassword ? "text" : "password"}
                                    value={newSchool.password}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword} edge="end">
                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                        </>
                    )}
                </Grid>

                

                <Box sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={handleCloseModal} sx={{ marginRight: 1 }}>
                        İptal
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleAddSchool}>
                        {isEditMode ? "Güncelle" : "Ekle"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddSchoolModal;
