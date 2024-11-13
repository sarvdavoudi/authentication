import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const Index = () => {
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

export default Index;
