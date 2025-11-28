import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminProtected = ({ children }) => {
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        // The backend route is mounted at /token, not /api/token
        await axios.get(
          "https://grocery-app-b-jwcs.onrender.com/token/adminVerify",
          { withCredentials: true }
        );
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
