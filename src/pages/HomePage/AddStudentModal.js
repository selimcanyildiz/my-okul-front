import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Modal, TextField, Typography, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddStudentModal = ({
  openModal,
  handleCloseModal,
  handleInputChange,
  newStudent,
  handleAddStudent,
  isEditMode,
}) => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState(null);
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserType(storedUserType);
    } else {
      navigate("/");
    }

    setSchools([
      { id: 1, name: "My Okul Ankara" },
      { id: 2, name: "Def Koleji" },
      { id: 3, name: "Ghı Koleji" },
      { id: 4, name: "My Kolej" },
    ]);

    if (storedUserType === "manager") {
      setSelectedSchool("My Kolej İzmir");
    }
  }, [navigate]);

  // Telefon girişini kontrol et
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // sadece rakam
    if (!value.startsWith("0")) {
      value = "0" + value; // başına 0 ekle
    }
    if (value.length > 11) {
      value = value.slice(0, 11); // max 11 hane
    }
    handleInputChange({ target: { name: "parent_phone", value } });
  };

  // TC girişini kontrol et
  const handleTcChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // sadece rakam
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    handleInputChange({ target: { name: "tc", value } });
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
          width: "600px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {isEditMode ? "Öğrenci Düzenle" : "Öğrenci Ekle"}
        </Typography>

        <Grid container spacing={2}>
          {userType === "admin" && (
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Okul Adı"
                name="okul_adi"
                value={newStudent.okul_adi}
                onChange={handleInputChange}
                SelectProps={{ native: true }}
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

          {userType === "manager" && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Okul Adı"
                name="okul_adi"
                value={selectedSchool}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          )}

          {/* TC */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="TC"
              name="tc"
              value={newStudent.tc}
              onChange={handleTcChange}
              inputProps={{ maxLength: 11 }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Öğrenci No" name="ogrenci_no" value={newStudent.ogrenci_no} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Ad" name="ad" value={newStudent.ad} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Soyad" name="soyad" value={newStudent.soyad} onChange={handleInputChange} />
          </Grid>

          {/* Cinsiyet */}
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Cinsiyet"
              name="cinsiyet"
              value={newStudent.cinsiyet}
              onChange={handleInputChange}
            >
              <MenuItem value="Erkek">Erkek</MenuItem>
              <MenuItem value="Kız">Kız</MenuItem>
            </TextField>
          </Grid>

          {/* Program Tipi */}
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Program Tipi"
              name="program_tipi"
              value={newStudent.program_tipi}
              onChange={handleInputChange}
            >
              {[1, 2, 3, 4].map((tip) => (
                <MenuItem key={tip} value={tip}>
                  {tip}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Sınıf" name="sube_sinif" value={newStudent.sube_sinif} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Şube" name="sube_seviye" value={newStudent.sube_seviye} onChange={handleInputChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="BG Kullanıcı" name="bgkull" value={newStudent.bgkull} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="BG Şifre" name="bgsif" value={newStudent.bgsif} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="KLB Kullanıcı" name="klbkull" value={newStudent.klbkull} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="KLB Şifre" name="klbsif" value={newStudent.klbsif} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Sınavza Kullanıcı" name="sinavzakull" value={newStudent.sinavzakull} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Sınavza Şifre" name="sinavzasif" value={newStudent.sinavzasif} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Morpa Kullanıcı" name="morpakull" value={newStudent.morpakull} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Morpa Şifre" name="morpasif" value={newStudent.morpasif} onChange={handleInputChange} />
          </Grid>
          {/* <Grid item xs={6}>
            <TextField fullWidth label="Cambridge Kullanıcı" name="cambridgekull" value={newStudent.cambridgekull} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Cambridge Şifre" name="cambridgesif" value={newStudent.cambridgesif} onChange={handleInputChange} />
          </Grid> */}

          {/* Telefon */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Veli Telefon"
              name="parent_phone"
              value={newStudent.parent_phone}
              onChange={handlePhoneChange}
              inputProps={{ maxLength: 11 }}
            />
          </Grid>

          {/* <Grid item xs={12}>
            <TextField
              fullWidth
              label="School ID"
              name="school_id"
              type="number"
              value={newStudent.school_id}
              onChange={handleInputChange}
            />
          </Grid> */}
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
