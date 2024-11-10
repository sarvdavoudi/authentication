"use client";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { customizedAxios } from "@/services/axios";
const loginSchema = yup.object().shape({
  username: yup.string().required("user name is required"),
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
      // Send login data (username & password) to the backend for verification
      const response = await customizedAxios.post('/auth', {
        user: data.username,  // Pass 'username' as 'user'
        pwd: data.password,   // Pass 'password' as 'pwd'
      });
  
      // // If login is successful, the backend will send an access token
      if (response.data.accessToken) {
        console.log(response.data.accessToken);
        console.log('Login successful!');
  
        // Store the access token in localStorage
        localStorage.setItem('accessToken', response.data.accessToken);
  
        // Optionally, store the refresh token from cookies (for token refreshing)
        const refreshToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('jwt='))
          ?.split('=')[1];
  
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
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
            label="username"
            variant="outlined"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
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
