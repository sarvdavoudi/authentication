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
    .email("invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "pass must be at least 6 charachter")
    .required("password is requierd"),
});
const index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const onSubmit = async (data) => {
    try {
      // Check if the user exists by email
      const response = await customizedAxios.get(`/users?email=${data.email}`);
  
      // If no user is found, show an error message
      if (response.data.length === 0) {
        console.error("User not found");
        alert("User not found"); // Show error message to the user
        return;
      }
  
      // Get the user from the response
      const user = response.data[0];
  
      // Check if the password matches
      if (user.password === data.password) {
        console.log('Login successful!');
        // Here, handle successful login
        // E.g., Store JWT token in localStorage or redirect to dashboard
      } else {
        console.error("Incorrect password");
        alert("Incorrect password"); // Show error message to the user
      }
    } catch (error) {
      console.error('Login error', error);
      alert("An error occurred during login. Please try again."); // Show generic error message to user
    }
  };
  
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          width: "400px",
          m: "auto",
          mt: 20,
          backgroundColor: theme.palette.secondary.main,
          padding: "20px",
        }}
      >
        <Typography>login</Typography>
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
            label="password"
            variant="outlined"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </Box>
    </>
  );
};

export default index;
