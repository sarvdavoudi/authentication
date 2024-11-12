import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main-wrapper">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
