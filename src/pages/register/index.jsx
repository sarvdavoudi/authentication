import { customizedAxios } from "@/services/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
//define yup schema
const registerSchema = yup.object({
  username: yup.string().required("userName is required"),
  email: yup
    .string()
    .email("invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "password must be at leat 6 charachters")
    .required("pasword is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password must match")
    .required("confirm password is required"),
  birthdate: yup.date().nullable(),
  gender: yup.string().nullable(),
});
const Register = () => {
  const theme = useTheme();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkExtraInfo, setCheckExtraInfo] = useState(null);
  // react hook form properties
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data) => {
    try {
      data.birthdate = selectedDate ? selectedDate.format("YYYY-MM-DD") : null;
      const postResponse = await customizedAxios.post("/register", data);
      console.log(postResponse.data);
      router.push("/successRegister");
    } catch (error) {
      console.error("Submit error ", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            width: "400px",
            p: 3,
          }}
        >
          <Typography
            sx={{
              fontWeight: 900,
            }}
          >
            Register Form
          </Typography>
          {/* handleSubmit is a buit-in func in react-hook-form and if validations of fields was successfull then
        send data to 'onSubmit' func. we can just write our custom code in 'onSubmit' function*/}
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
              helperText={errors.username?.message}
              sx={{
                "& .MuiFormHelperText-root": {
                  color: errors.username
                    ? theme.palette.primary.main
                    : "inherit",
                },
              }}
            />
            <TextField
              label="email"
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
              label="password"
              variant="outlined"
              {...register("password")}
              helperText={errors.password?.message}
              sx={{
                "& .MuiFormHelperText-root": {
                  color: errors.password
                    ? theme.palette.primary.main
                    : "inherit",
                },
              }}
            />
            <TextField
              label="confirmPassword"
              variant="outlined"
              {...register("confirmPassword")}
              helperText={errors.confirmPassword?.message}
              sx={{
                "& .MuiFormHelperText-root": {
                  color: errors.confirmPassword
                    ? theme.palette.primary.main
                    : "inherit",
                },
              }}
            />
            {/* show more info */}
            <FormControlLabel
              label="extra info"
              control={<Switch />}
              onChange={() => setCheckExtraInfo(!checkExtraInfo)}
            />
            {checkExtraInfo && (
              <>
                {/* gender */}
                <FormControl error={!!errors.gender}>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup row {...register("gender")}>
                    <FormControlLabel
                      value="female"
                      label="Female"
                      control={<Radio />}
                    />
                    <FormControlLabel
                      value="male"
                      label="Male"
                      control={<Radio />}
                    />
                  </RadioGroup>
                </FormControl>
                {/* data picker */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="select date"
                    value={selectedDate}
                    onChange={(newDate) => setSelectedDate(newDate)}
                  />
                </LocalizationProvider>
              </>
            )}
            {/* checkbox */}
            <FormControlLabel label="Remember me" control={<Checkbox />} />
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Register;
