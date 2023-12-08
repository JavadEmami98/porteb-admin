import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { handleLogin } from "../redux/action"

function Index() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const dispatch = useDispatch();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleLogins = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/login`, {
        phoneNumber: phoneNumber,
        password: Password,
      })
      .then((response) => {
        dispatch(handleLogin(response.data));
      })
      .catch((error) => {
        toast.error("اطلاعات وارد شده اشتباه میباشد");
      });
  };

  return (
    <div>
      <Box
        sx={{
          backgroundImage: "url('image/background.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh",
          mt: "0",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component={"div"}
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            display: "flex",
            alignItems: { lg: "center", md: "center" },
            padding: "0.5rem",
            backgroundImage: "url('image/doctor.jpg')",
            backgroundRepeat: "no-repeat",
            /*             backgroundPosition: "center", */
            backgroundSize: "cover",
            minHeight: "570px",
            mt: "0",
            width: "100%",
            maxWidth: "800px",
            margin: "0.5rem",
          }}
        >
          <Box sx={{ padding: "0.5rem", paddingLeft: { lg: "1.5rem" } }}>
            <TextField
              label="شماره تلفن"
              variant="outlined"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              id="phonenumber"
              type="tel"
              sx={{
                width: "100%",
                "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:focus":
                  { color: "#673ab7 !important" },
                maxWidth: { lg: "350px", md: "350px" },
                bgcolor: "#fff",
              }}
            />
            <FormControl
              sx={{
                width: "100%",
                "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:focus":
                  { color: "#673ab7 !important" },
                mt: "0.5rem",
                maxWidth: { lg: "350px", md: "350px" },
                bgcolor: "#fff",
              }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                رمز عبور
              </InputLabel>
              <OutlinedInput
                onChange={(e) => setPassword(e.target.value)}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              onClick={handleLogins}
              variant="contained"
              sx={{
                marginTop: "15px",
                width: "100%",
                maxWidth: { lg: "350px", md: "350px" },
              }}
            >
              ثبت
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Index;
