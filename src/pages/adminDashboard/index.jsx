import WithAuth from "@/components/Hoc/WithAuth";
import { Typography } from "@mui/material";

const AdminDashboard = () => {
  return (
    <>
      <Typography variant="h4">Admin Dashboard</Typography>
    </>
  );
};
// use high order component for authorization
export default WithAuth(AdminDashboard, "admin");
