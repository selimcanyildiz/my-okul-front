import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import StudentHomePage from "./StudentHomePage";
import AdminSuperAdminHomePage from "./AdminSuperAdminHomePage";

const HomePage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserType(storedUserType);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
     {userType === "student" ? <StudentHomePage /> : <AdminSuperAdminHomePage />}
     </>
  );
};

export default HomePage;
