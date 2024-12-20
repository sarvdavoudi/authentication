import { Box, Button, Typography } from "@mui/material";
import { FcOk } from "react-icons/fc";

const SuccessfulRegisterPage = () => {
  return (
    <Box
      sx={{
        height: "100%",
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
        your authentication was successful
      </Typography>
      <Button variant="contained" color="primary" href="/login">
        go to login page
      </Button>
    </Box>
  );
};

export default SuccessfulRegisterPage;
