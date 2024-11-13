import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import Layout from "@/components/Layout/Layout";

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
      <Layout>
        <Typography>welcome {showUserName}</Typography>
      </Layout>
    </>
  );
};

export default Index;
