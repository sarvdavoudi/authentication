import Login from "@/components/Login/Login";
import { Box, Paper, useTheme } from "@mui/material";
import Head from "next/head";
import { RiLoginBoxLine } from "react-icons/ri";

const LoginPage = () => {
    const theme = useTheme();

    return (
      <>
        <Head>authentication</Head>
  
        <Box
          sx={{
            // border: "1px solid red",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            className="card-container"
            sx={{
              // border: "1px solid blue",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              borderRadius: { xs: "0 0 20px 60px", md: "0 20px 20px 0" },
            }}
          >
            <Box sx={{ p: { xs: 3, sm: 5 } }}>
              <Login />
            </Box>
  
            <Box
              sx={{
                p: { xs: 4, sm: 6, md: 8 },
                backgroundColor: theme.palette.primary.main,
                borderRadius: "0 20px 20px 60px",
                textAlign: "center",
              }}
            >
              <RiLoginBoxLine size={230} />
            </Box>
          </Paper>
        </Box>
      </>
    );
}

export default LoginPage