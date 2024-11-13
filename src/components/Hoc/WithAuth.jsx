import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (Component, allowedRole = null) => {
  return (props) => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        // If the role is not authorized, show an alert
        if (allowedRole && userRole !== allowedRole) {
          setErrorMessage("You do not have access to this page.");
          setIsAuthorized(false); // Deny access
        } else {
          setIsAuthorized(true); // User is authorized
        }
      } else {
        alert("You need to log in first.");
        router.push("/login"); // Redirect to login if no token
      }
    }, [router, allowedRole]);

    // If user is not authorized, show error message
    if (!isAuthorized && errorMessage) {
      return (
        <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
          {errorMessage}
        </div>
      );
    }

    // Render the component only if authorized
    return isAuthorized ? <Component {...props} /> : null;
  };
};

export default withAuth;
