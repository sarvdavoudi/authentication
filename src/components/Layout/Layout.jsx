import { Container } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Container
      sx={{
        minHeight: "100vh",
      }}
    >
      <Header />
      <main className="main-wrapper">{children}</main>
      <Footer />
    </Container>
  );
};

export default Layout;
