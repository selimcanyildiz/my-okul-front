import React, { useState, useEffect } from "react";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Grid } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import EditIcon from '@mui/icons-material/Edit';
import * as XLSX from "xlsx";
import AddSchoolModal from "./AddSchoolModal";

const AddSchool = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  
  const [schools, setSchools] = useState([]);
  const [excelSchools, setExcelSchools] = useState([]);
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
    tcNo: "",
    username: "",
    password: ""
  });

  const token = localStorage.getItem("token");

  // Backend'den okulları çek
  const fetchSchools = async () => {
    try {
      const res = await fetch(`${apiUrl}/schools`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      console.log(data)
      setSchools(data);
    } catch (err) {
      console.error("Okullar alınırken hata:", err.message);
    }
  };

  useEffect(() => { fetchSchools(); }, []);

  const handleOpenModal = () => { setOpenModal(true); setIsEditMode(false); };
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewSchool({ id: null, schoolName: "", address: "", city: "", district: "", responsibleName: "", responsibleSurname: "", tcNo: "", username: "", password: "" });
  };
  const handleInputChange = (e) => setNewSchool({ ...newSchool, [e.target.name]: e.target.value });

  const handleAddSchool = async () => {
    try {
      const url = isEditMode ? `${apiUrl}/schools/${newSchool.id}` : `${apiUrl}/schools/add`;
      const method = isEditMode ? "PUT" : "POST";

      const payload = {
        school_name: newSchool.schoolName,
        address: newSchool.address,
        city: newSchool.city,
        district: newSchool.district,
        admin_name: newSchool.responsibleName,
        admin_surname: newSchool.responsibleSurname,
        admin_tc: newSchool.tcNo,
        admin_phone: "" // istersen modal’dan ekleyebilirsin
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      if (isEditMode) {
        setSchools(schools.map(s => s.id === newSchool.id ? data : s));
      } else {
        setSchools([...schools, data]);
      }

      handleCloseModal();
    } catch (err) {
      console.error("Okul eklenirken/güncellenirken hata:", err.message);
      alert("Okul eklenirken hata oluştu!");
    }
  };

  // Excel yükleme
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      setExcelSchools(data);
    };
    reader.readAsBinaryString(file);
  };

  const handleExcelSubmit = async () => {
    try {
      for (let row of excelSchools) {
        const payload = {
          school_name: row.school_name,
          address: row.address,
          city: row.city,
          district: row.district,
          admin_name: row.responsibleName,
          admin_surname: row.responsibleSurname,
          admin_tc: row.tcNo,
          admin_phone: row.phone || ""
        };
        await fetch(`${apiUrl}/schools/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
      }
      alert("Excel okulları başarıyla yüklendi!");
      setExcelSchools([]);
      fetchSchools();
    } catch (err) {
      console.error("Excel yükleme hatası:", err);
      alert("Excel yüklenirken hata oluştu!");
    }
  };

  const filteredSchools = schools.filter(s =>
    s.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    s.address?.toLowerCase().includes(searchText.toLowerCase()) ||
    s.city?.toLowerCase().includes(searchText.toLowerCase()) ||
    s.district?.toLowerCase().includes(searchText.toLowerCase()) ||
    s.admin.full_name?.toLowerCase().includes(searchText.toLowerCase()) ||
    s.admin.tc?.toLowerCase().includes(searchText.toLowerCase()) ||
    s.admin.username?.toLowerCase().includes(searchText.toLowerCase()) ||
    s.admin.password?.toLowerCase().includes(searchText.toLowerCase())
  );

  const maskPassword = (password) => password ? '*'.repeat(password.length) : '';

  const handleEditSchool = (school) => { setNewSchool(school); setIsEditMode(true); setOpenModal(true); };

  return (
    <>
      <Box sx={{ marginTop: 1, padding: 2 }}>
        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
          <Grid item xs={2}>
            <Button variant="contained" color="primary" onClick={handleOpenModal} fullWidth>
              Kurum Ekle
            </Button>
          </Grid>
          <Grid item xs={1.5}></Grid>
          <Grid item xs={4}>
            <TextField label="Ara" variant="outlined" value={searchText} onChange={(e) => setSearchText(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={4.5} sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button startIcon={<DownloadIcon />} variant="outlined" color="primary" style={{ borderRadius: "20px" }}>
              Excel İndir
            </Button>
            <Button startIcon={<UploadIcon />} variant="outlined" color="primary" component="label" style={{ borderRadius: "20px" }}>
              Excel Yükle
              <input type="file" hidden accept=".xlsx, .xls" onChange={handleFileUpload} />
            </Button>
            {excelSchools.length > 0 && (
              <Button variant="contained" color="secondary" onClick={handleExcelSubmit}>
                Yüklemeyi Onayla ({excelSchools.length})
              </Button>
            )}
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Okul Adı</TableCell>
                <TableCell>Adres</TableCell>
                <TableCell>İl</TableCell>
                <TableCell>İlçe</TableCell>
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
                  <TableCell>{s.address}</TableCell>
                  <TableCell>{s.city}</TableCell>
                  <TableCell>{s.district}</TableCell>
                  <TableCell>{s.admin.full_name}</TableCell>
                  <TableCell>{s.admin.tc}</TableCell>
                  <TableCell>{s.admin.username}</TableCell>
                  {/* <TableCell>{maskPassword(s.admin.password)}</TableCell> */}
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
      </Box>

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
