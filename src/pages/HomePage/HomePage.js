import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentHomePage from "./StudentHomePage";
import AdminSuperAdminHomePage from "./AdminSuperAdminHomePage";

const HomePage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);

  useEffect(() => {
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
