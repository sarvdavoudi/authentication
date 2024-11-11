"use client";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { customizedAxios } from "@/services/axios";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"), // Added required email validation
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      // Send login data (email & password) to the backend for verification
      const response = await customizedAxios.post('/auth', data);

      // If login is successful, the backend will send an access token
      if (response.data.accessToken) {
        console.log(response.data.accessToken);
        console.log('Login successful!');

        // Store the access token in localStorage (optional based on your needs)
        localStorage.setItem('accessToken', response.data.accessToken);

        // Optionally, if your backend uses httpOnly cookies for refresh tokens, you don’t need to manually store them
        const refreshToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('jwt='))
          ?.split('=')[1];

        if (refreshToken) {
          // If using cookies to store refresh token, this is optional
          console.log('Stored refresh token');
        }

      } else {
        console.error('Login failed');
        alert('Login failed, please check your credentials');
      }
    } catch (error) {
      console.error('Login error', error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "400px",
        m: "auto",
        mt: 20,
        backgroundColor: theme.palette.secondary.main,
        padding: "20px",
      }}
    >
      <Typography>Login</Typography>
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
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default index;
