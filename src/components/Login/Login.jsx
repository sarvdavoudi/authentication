"use client";
import { customizedAxios } from "@/services/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const theme = useTheme();
  const router = useRouter();
  // reactHookForm properties
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      const response = await customizedAxios.post("/auth", data);
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        // Decode the JWT token to give role
        const decodedToken = jwtDecode(response.data.accessToken);
        if (decodedToken.role === "admin") {
          router.push("/adminDashboard");
        } else {
          router.push("/userDashboard");
        }
      }
    } catch (error) {
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "400px" },
        padding: "20px",
      }}
    >
      <Typography
        sx={{
          fontWeight: 900,
        }}
      >
        Login
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          {...register("email")}
          helperText={errors.email?.message}
          sx={{
            "& .MuiFormHelperText-root": {
              color: errors.email ? theme.palette.primary.main : "inherit",
            },
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          {...register("password")}
          helperText={errors.password?.message}
          sx={{
            "& .MuiFormHelperText-root": {
              color: errors.password ? theme.palette.primary.main : "inherit",
            },
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link href="/register">sign up</Link>
          <Link href="#">forget password</Link>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
