import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const registerSchema = yup.object({
  username: yup.string().required("user name is required"),
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
  birthdate: yup.date(),
  gender: yup.string(),
  country: yup.string(),
});
const index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });
  const onSubmit = (data) => {
    console.log(data);
  };

  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkExtraInfo, setCheckExtraInfo] = useState(null);
  return (
    <>
      <Box
        sx={{
          width: "400px",
          m: "auto",
          mt: 20,
          backgroundColor: theme.palette.secondary.main,
          p: 3,
        }}
      >
        <Typography>Register</Typography>
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
          />
          <TextField
            label="email"
            variant="outlined"
            {...register("email")}
            helperText={errors.email?.message}
          />
          <TextField
            label="password"
            variant="outlined"
            {...register("password")}
            helperText={errors.password?.message}
          />
          <TextField
            label="confirmPassword"
            variant="outlined"
            {...register("confirmPassword")}
            helperText={errors.confirmPassword?.message}
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
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup row>
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
      </Box>
    </>
  );
};

export default index;
