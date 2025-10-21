import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const AdminProtected = ({ children }) => {
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        await axiosInstance.get("http://localhost:5100/token/adminVerify", { withCredentials: true });
        setVerified(true);
      } catch {    
        setVerified(false);
      }
    };
    verifyAdmin();
  }, []);

  if (verified === null) return <div>Loading...</div>;
  if (!verified) return <Navigate to="/alogin" replace />;

  return <>{children}</>;
};

export default AdminProtected;
