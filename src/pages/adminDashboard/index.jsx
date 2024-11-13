import WithAuth from "@/components/Hoc/WithAuth";
import Layout from "@/components/Layout/Layout";
import { Typography } from "@mui/material";
import React from "react";

const index = () => {
  return (
    <>
      <Layout>
        <Typography variant="h4">Admin Dashboard</Typography>
      </Layout>
    </>
  );
};

export default WithAuth(index, "admin");
