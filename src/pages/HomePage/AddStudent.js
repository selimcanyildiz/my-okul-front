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
  InputLabel
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import EditIcon from '@mui/icons-material/Edit';
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
        parent_phone: row.irtibat_tel,
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
      alert("Öğrenciler başarıyla yüklendi!");
    } catch (err) {
      console.error(err);
      alert("Öğrenciler yüklenirken hata oluştu!");
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
    <Box sx={{ marginTop: 1, padding: 2 }}>
      <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" onClick={handleOpenModal} fullWidth>Öğrenci Ekle</Button>
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
        <Grid item xs={2}>
          <TextField label="Ara" variant="outlined" value={searchText} onChange={(e) => setSearchText(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button startIcon={<DownloadIcon />} variant="outlined" color="primary" style={{ borderRadius: "20px" }}>Excel İndir</Button>
          <Button startIcon={<UploadIcon />} variant="outlined" color="primary" component="label" style={{ borderRadius: "20px" }}>
            Excel Yükle
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} hidden />
          </Button>
          <Button onClick={handleSubmit} disabled={students.length === 0}>Yükle</Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Öğrenci Adı</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Okul Adı</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>TC No</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Sınıf</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Şube</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Son Giriş</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map(student => (
              <TableRow key={student.id}>
                <TableCell sx={{ textAlign: "center" }}>{student.studentName}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{student.schoolName}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{student.tcNo}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{student.class}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{student.branch}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{student.last_login}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <IconButton color="primary" onClick={() => handleEditStudent(student)}><EditIcon /></IconButton>
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
  );
};

export default AddStudent;
