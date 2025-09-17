import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import AddStudentModal from "./AddStudentModal";
import * as XLSX from "xlsx";

const AddStudent = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [students, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newStudent, setNewStudent] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [userSchoolId, setUserSchoolId] = useState();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);


  // Backend'den öğrencileri çek
  const fetchStudents = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      let schoolId = null;

      if (user.role === "yetkili") {
        // Yetkilinin okulunu al
        const schoolRes = await fetch(`${apiUrl}/schools/by_admin/${user.id}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!schoolRes.ok) throw new Error(`HTTP ${schoolRes.status}: ${await schoolRes.text()}`);

        const schoolData = await schoolRes.json();
        schoolId = schoolData.school?.id;
        setUserSchoolId(schoolData.school?.id)
      }

      // Öğrencileri çek (sysadmin ise tüm öğrenciler, yetkili ise kendi okulu)
      const res = await fetch(
        (user.role === "sysadmin" || user.role === "admin")
          ? `${apiUrl}/students/all`
          : `${apiUrl}/students/by_school/${schoolId}`,
        {
          headers: { "Authorization": `Bearer ${token}` }
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);

      const data = await res.json();

      const formattedData = (user.role === "yetkili" ? data : data.students).map((s) => ({
        id: s.id,
        studentName: `${s.ad} ${s.soyad}`,
        schoolName: s.school?.name || "",
        tcNo: s.tc,
        password: s.password,
        class: s.branch?.split("/")[0].trim() || "",
        branch: s.branch?.split("/")[1]?.trim() || "",
        last_login: s.last_login || "",
        parentPhone: s.parent_phone || "",
      }));


      setStudents(formattedData);

      if (formattedData.length > 0) {
        setSelectedClass(formattedData[0].class);
        setSelectedBranch(formattedData[0].branch);
      }

    } catch (err) {
      console.error("Öğrenciler alınırken hata:", err.message);
    }
  };


  useEffect(() => { fetchStudents(); }, []);

  const handleOpenModal = () => { setOpenModal(true); setIsEditMode(false); };
  const handleCloseModal = () => { setOpenModal(false); setNewStudent({}); };

  const handleInputChange = (e) => { setNewStudent({ ...newStudent, [e.target.name]: e.target.value }); };

  const handleAddStudent = () => {
    if (isEditMode) {
      setStudents(students.map(s => s.id === newStudent.id ? newStudent : s));
    } else {
      const newStudentData = { ...newStudent, id: students.length + 1 };
      setStudents([...students, newStudentData]);
    }
    handleCloseModal();
  };

  const handleEditStudent = (student) => { setNewStudent(student); setIsEditMode(true); setOpenModal(true); };

  // Excel yükleme
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws);

      const formatted = data.map((row) => ({
        tc: row.tc?.toString(),
        ogrenci_no: row.ogrenci_no?.toString(),
        ad: row.ad,
        soyad: row.soyad,
        cinsiyet: row.cinsiyet === "Erkek" ? "1" : "0",
        program_tipi: getProgramTipi(row.sube_seviye),
        sube_seviye: row.ŞUBE?.toString(),
        sube_sinif: row.SINIF?.toString(),
        okul_adi: row.okul_adi?.toString(),
        bgkull: row.bgkull || "",
        bgsif: row.bgsif || "",
        klbkull: row.klbkull || "",
        klbsif: row.klbsif || "",
        sınavzakull: row.sınavzakull || "",
        sınavzasif: row.sınavzasif || "",
        morpakull: row.morpakull || "",
        morpasif: row.morpasif || "",
        parent_phone: row.irtibat_tel.toString(),
        school_id: userSchoolId
      }));

      setStudents(formatted);

      if (formatted.length > 0) {
        setSelectedClass(formatted[0].sube_seviye);
        setSelectedBranch(formatted[0].sube_sinif);
      }
    };
    reader.readAsBinaryString(file);
  };

  const getProgramTipi = (sinif) => {
    if (!sinif) return "4";
    if (sinif.toString() === "0") return "1";
    if (["1", "2", "3", "4"].includes(sinif.toString())) return "2";
    if (["5", "6", "7", "8"].includes(sinif.toString())) return "3";
    return "4";
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${apiUrl}/students/add_bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(students),
      });
      if (!res.ok) throw new Error("Sunucu hatası: " + res.status);
      const data = await res.json();
      console.log("Eklenen öğrenciler:", data);
      fetchStudents();
      alert("Öğrenciler başarıyla yüklendi!");
    } catch (err) {
      console.error(err);
      alert("Öğrenciler yüklenirken hata oluştu!");
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      const response = await fetch(`${apiUrl}/students/delete/${studentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Silme başarısız");
      }

      const data = await response.json();
      fetchStudents();
      console.log("Silme başarılı:", data);
      return data;
    } catch (error) {
      console.error("Hata:", error.message);
      throw error;
    }
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.studentName?.toLowerCase().includes(searchText.toLowerCase()) &&
      student.class === selectedClass &&
      student.branch === selectedBranch
    );
  });

  const classOptions = [...new Set(students.map(s => s.class))];
  const branchOptions = [...new Set(students.filter(s => s.class === selectedClass).map(s => s.branch))];

  return (
    <>
      <Box sx={{ marginTop: 1, padding: 2 }}>

        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
          <Grid item xs={8}>
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
          <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button startIcon={<DownloadIcon style={{ color: "#28245C" }} />} variant="outlined" color="primary" style={{ borderRadius: "20px", border: "1px solid #E9E9E9" }}>Excel İndir</Button>
            <Button startIcon={<UploadIcon style={{ color: "#28245C" }} />} variant="outlined" color="primary" component="label" style={{ borderRadius: "20px", border: "1px solid #E9E9E9" }}>
              Excel Yükle
              <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} hidden />
            </Button>
            <Button style={{color:"white"}} sx={{bgcolor:"green", borderRadius:"20px"}} startIcon={<CheckIcon style={{color:"white"}} />} onClick={handleSubmit} disabled={students.length === 0}>Onayla</Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
          <Grid item xs={2}>
            <Button startIcon={<AddIcon />} sx={{ borderRadius: "20px", bgcolor: "#28245C", color: "white" }} variant="contained" color="primary" onClick={handleOpenModal} fullWidth>Öğrenci Ekle</Button>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel>Sınıf</InputLabel>
              <Select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)} label="Şube">
                {branchOptions.map(br => <MenuItem key={br} value={br}>{br}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel>Şube</InputLabel>
              <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} label="Sınıf">
                {classOptions.map(cls => <MenuItem key={cls} value={cls}>{cls}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Öğrenci Adı</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Okul Adı</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>TC No</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Şifre</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Sınıf</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Şube</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Son Giriş</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Durum</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student, index) => (
                <TableRow
                  key={student.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "white" : "#f5f5f5" // çift satırlar beyaz, tek satırlar açık gri
                  }}
                >
                  <TableCell sx={{ textAlign: "center" }}>{student.studentName}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{student.schoolName}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{student.tcNo}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{student.password}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{student.branch}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{student.class}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{student.last_login}</TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      color: student.last_login ? "green" : "red",
                      fontWeight: "bold"
                    }}
                  >
                    {student.last_login ? "Aktif" : "Pasif"}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton color="primary" onClick={() => handleEditStudent(student)}>
                      <MoreVertIcon style={{ color: "#28245C" }} />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setStudentToDelete(student);
                        setOpenConfirm(true);
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

        <AddStudentModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          handleInputChange={handleInputChange}
          newStudent={newStudent}
          handleAddStudent={handleAddStudent}
          isEditMode={isEditMode}
        />
      </Box>

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Silme Onayı</DialogTitle>
        <DialogContent>
          {studentToDelete && (
            <p>
              <b>{studentToDelete.studentName}</b> adlı öğrenciyi silmek istediğinize
              emin misiniz?
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="primary">
            Vazgeç
          </Button>
          <Button
            onClick={() => {
              if (studentToDelete) {
                deleteStudent(studentToDelete.id);
              }
              setOpenConfirm(false);
              setStudentToDelete(null);
            }}
            color="error"
            variant="contained"
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddStudent;
