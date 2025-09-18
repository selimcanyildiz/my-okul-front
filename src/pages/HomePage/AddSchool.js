import React, { useState, useEffect } from "react";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Grid, InputAdornment } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
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
      const res = await fetch(`${apiUrl}/schools/`, {
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

  const handleDeleteSchool = async (schoolId) => {
    if (!window.confirm("Bu okul ve tüm öğrencileri silinecek! Devam edilsin mi?")) return;

    try {
      const res = await fetch(`${apiUrl}/schools/delete/${schoolId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      alert(data.message);

      // Tablodan sil
      setSchools(schools.filter(s => s.id !== schoolId));
    } catch (err) {
      console.error("Okul silinirken hata:", err.message);
      alert("Okul silinirken hata oluştu!");
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
          <Button startIcon={<AddIcon />} sx={{ borderRadius: "20px", bgcolor: "#28245C", color: "white" }} variant="contained" color="primary" onClick={handleOpenModal} fullWidth>
            Kurum Ekle
          </Button>
        </Grid>
        <Grid item xs={4}>
          {/* <TextField label="Ara" variant="outlined" value={searchText} onChange={(e) => setSearchText(e.target.value)} fullWidth /> */}
          <TextField placeholder="Ara" InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "#1C1C1C" }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: "12px", // Yuvarlak köşeler
            },
          }} variant="outlined" value={searchText} onChange={(e) => setSearchText(e.target.value)} fullWidth />
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
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleDeleteSchool(s.id);
                      // setOpenConfirm(true);
                    }}
                  >
                    <DeleteIcon style={{ color: "#28245C" }} />
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
