import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const UserProtected = ({ children }) => {
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // The backend route is mounted at /token, not /api/token
        await axios.get(
          "https://grocery-app-b-jwcs.onrender.com/token/userVerify",
          { withCredentials: true }
        );
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
