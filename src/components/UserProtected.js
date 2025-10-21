import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const UserProtected = ({ children }) => {
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await axiosInstance.get("http://localhost:5100/token/userVerify", { withCredentials: true });
        setVerified(true);
      } catch {
        setVerified(false);
      }
    };
    verifyUser();
  }, []);

  if (verified === null) return <div>Loading...</div>;
  if (!verified) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default UserProtected;
