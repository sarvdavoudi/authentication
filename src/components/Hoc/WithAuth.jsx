import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (Component, allowedRole = null) => {
  const AuthHOC = (props) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(null);

    const checkAuthorization = () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        // No token, redirect to login
        router.push("/");
        return;
      }
      try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        if (allowedRole && userRole !== allowedRole) {
          router.push("/accessDenied");
        } else {
          setIsAuthorized(true); // User is authorized, allow rendering the component
        }
      } catch (error) {
        router.push("/"); // Redirect to login if the token is invalid
      }
    };
    useEffect(() => {
      checkAuthorization();
    }, [router, allowedRole]);

    // If user is authorized, render the component, otherwise do nothing
    return isAuthorized ? <Component {...props} /> : null;
  };
  return AuthHOC;
};

export default withAuth;
