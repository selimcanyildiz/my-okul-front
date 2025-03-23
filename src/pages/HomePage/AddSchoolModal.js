import React from "react";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";

const AddSchoolModal = ({openModal, handleCloseModal, handleInputChange, newSchool, handleAddSchool}) => {
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
                        Okul Ekle
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
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Adres"
                                variant="outlined"
                                name="address"
                                value={newSchool.address}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="İl"
                                variant="outlined"
                                name="city"
                                value={newSchool.city}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="İlçe"
                                variant="outlined"
                                name="district"
                                value={newSchool.district}
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
                                label="Yetkili TC No"
                                variant="outlined"
                                name="tcNo"
                                value={newSchool.tcNo}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}>
                        <Button onClick={handleCloseModal} sx={{ marginRight: 1 }}>
                            İptal
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleAddSchool}>
                            Ekle
                        </Button>
                    </Box>
                </Box>
            </Modal>
    );
};

export default AddSchoolModal;
