import Layout from "@/components/Layout/Layout";
import { Box, Button, Typography } from "@mui/material";
import { FcOk } from "react-icons/fc";
import React from "react";

const SuccessRegister = () => {
  return (
    <Layout>
      <Box
        sx={{
          // border: "4px solid green",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <FcOk size={200} />
        <Typography variant="h4">Thanks for your Registration!</Typography>
        <Typography variant="body1">
          your authentication was successful{" "}
        </Typography>
        <Button variant="contained" color="primary">
          go to login page
        </Button>
      </Box>
    </Layout>
  );
};

export default SuccessRegister;