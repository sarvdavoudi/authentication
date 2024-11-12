import Layout from "@/components/Layout/Layout";
import Login from "@/components/Login/Login";
import { Box, Paper, useTheme } from "@mui/material";
import Head from "next/head";
import { RiLoginBoxLine } from "react-icons/ri";
export default function Home() {
  const theme = useTheme();
  return (
    <>
      <Head>authentication</Head>
      <Layout>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            className="card-container"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              borderRadius: { xs: "0 0 20px 60px ", md: "0 20px 20px 0 " },
            }}
          >
            <Box sx={{ p: 5 }}>
              <Login />
            </Box>

            <Box
              sx={{
                p: 8,
                backgroundColor: theme.palette.primary.main,
                borderRadius: "0 20px 20px 60px",
                textAlign: "center",
              }}
            >
              <RiLoginBoxLine
                size={230}
                // style={{ color: theme.palette.primary.main }}
              />
            </Box>
          </Paper>
        </Box>
      </Layout>
    </>
  );
}
