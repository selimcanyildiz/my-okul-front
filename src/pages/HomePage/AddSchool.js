import React, { useState, useEffect } from "react";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Grid } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddSchoolModal from "./AddSchoolModal";

const AddSchool = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  
  const [schools, setSchools] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchText, setSearchText] = useState("");
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

  const token = localStorage.getItem("token");

  const fetchSchools = async () => {
    try {
      const res = await fetch(`${apiUrl}/schools`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setSchools(data);
    } catch (err) {
      console.error("Okullar alınırken hata:", err.message);
    }
  };

  useEffect(() => { fetchSchools(); }, []);

  const handleOpenModal = () => { setOpenModal(true); setIsEditMode(false); };
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewSchool({ id: null, schoolName: "", address: "", city: "", district: "", responsibleName: "", responsibleSurname: "", tcNo: "" });
  };
  const handleInputChange = (e) => setNewSchool({ ...newSchool, [e.target.name]: e.target.value });

  const handleAddSchool = async () => {
    try {
      const res = await fetch(`${apiUrl}/schools/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          school_name: newSchool.schoolName,
          admin_phone: newSchool.phone,
          admin_name: newSchool.responsibleName,
          admin_surname: newSchool.responsibleSurname,
          admin_tc: newSchool.tcNo,
        })
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      // Okul ve yetkili kullanıcı bilgilerini frontend’de göster
      setSchools([...schools, { id: data.school.id, name: data.school.name, admin: data.admin_user }]);
      alert(`Okul eklendi! Yetkili şifre: ${data.admin_user.password}`);

      handleCloseModal();
    } catch (err) {
      console.error("Okul eklenirken hata:", err.message);
      alert("Okul eklenirken hata oluştu!");
    }
  };

  const filteredSchools = schools.filter(s =>
    s.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    s.admin.full_name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEditSchool = (school) => { setNewSchool({ ...school, schoolName: school.name, responsibleName: school.admin.full_name.split(" ")[0], responsibleSurname: school.admin.full_name.split(" ")[1], tcNo: school.admin.tc }); setIsEditMode(true); setOpenModal(true); };

  return (
    <Box sx={{ marginTop: 1, padding: 2 }}>
      <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" onClick={handleOpenModal} fullWidth>
            Kurum Ekle
          </Button>
        </Grid>
        <Grid item xs={4}>
          <TextField label="Ara" variant="outlined" value={searchText} onChange={(e) => setSearchText(e.target.value)} fullWidth />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Okul Adı</TableCell>
              <TableCell>Yetkili Adı</TableCell>
              <TableCell>TC No</TableCell>
              <TableCell>Kullanıcı Adı</TableCell>
              <TableCell>Şifre</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSchools.map(s => (
              <TableRow key={s.id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.admin.full_name}</TableCell>
                <TableCell>{s.admin.tc}</TableCell>
                <TableCell>{s.admin.username}</TableCell>
                <TableCell>{s.admin.password}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditSchool(s)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddSchoolModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleInputChange={handleInputChange}
        newSchool={newSchool}
        handleAddSchool={handleAddSchool}
        isEditMode={isEditMode}
      />
    </Box>
  );
};

export default AddSchool;
