"use client";
import { customizedAxios } from "@/services/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import Link from "next/link";
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
  // reactHookForm properties
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      const response = await customizedAxios.post("/auth", data);
      console.log(response.data);
      if (response.data.accessToken) {
        //store token in localStorage
        localStorage.setItem("accessToken", response.data.accessToken);
      } else {
        console.error("Login failed");
        alert("Login failed, please check your credentials");
      }
    } catch (error) {
      console.error("Login error", error);
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
          // error={!!errors.email}
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
