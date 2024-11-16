import React from "react";
import { Typography, Container } from "@mui/material";

const AccessDenied = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" color="error">
        Access Denied
      </Typography>
      <Typography variant="body1" color="textSecondary">
        You do not have access to this page.
      </Typography>
    </Container>
  );
};

export default AccessDenied;
