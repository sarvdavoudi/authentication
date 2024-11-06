"use client";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
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
  const onsubmit = (data) => {
    console.log(data);
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
          onSubmit={handleSubmit(onsubmit)}
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
