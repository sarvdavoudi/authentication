import WithAuth from "@/components/Hoc/WithAuth";
import { Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const UserDashboard = () => {
  const [showUserName, setShowUserName] = useState("");

  const setUserNameFunc = () => {
    const token = localStorage.getItem("accessToken");
    const decodedToken = jwtDecode(token);
    setShowUserName(decodedToken.username);
  };
  useEffect(() => {
    setUserNameFunc();
  }, []);
  return (
    <>
      <Typography>welcome {showUserName}</Typography>
    </>
  );
};
// use high order component for authorization
export default WithAuth(UserDashboard, "base-role");
