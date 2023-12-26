import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CardPrice = ({ dataItem, index, onInputChange, onSubmit }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleAmountChange = (event) => {
    const rawValue = event.target.value;
    const numericValue = rawValue.replace(/\D/g, "");
    onInputChange("price", numericValue);
  };

  return (
    <>
      <div className="flex flex-col">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "0.5rem",
            padding: "1rem 1.5rem",
            border: "1.5px solid #228B22",
            bgcolor: "#228B2214",
          }}
        >
          <TextField
            value={dataItem.title}
            onChange={(e) => onInputChange("title", e.target.value)}
            id={`outlined-basic-${index}`}
            label="اسم طرح"
            variant="outlined"
            sx={{ width: "100%", bgcolor: "#fff" }}
          />
          <form action="" className="flex items-center">
            <label htmlFor={`color${index}`}>رنگ طرح:</label>
            <input
              value={dataItem.color}
              onChange={(e) => onInputChange("color", e.target.value)}
              type="color"
              id={`color${index}`}
              className="color1 mr-2 cursor-pointer"
            />
          </form>
          <TextField
            value={dataItem.description}
            onChange={(e) => onInputChange("description", e.target.value)}
            id={`outlined-multiline-static-${index}`}
            label=" توضیحات طرح"
            multiline
            rows={4}
            sx={{ bgcolor: "#fff" }}
          />
          <FormControl sx={{ width: "100%", bgcolor: "#fff" }}>
            <InputLabel htmlFor={`outlined-adornment-amount-${index}`}>
              قیمت طرح
            </InputLabel>
            <OutlinedInput
              sx={{
                width: "100%",
                "& .muirtl-dp5fpk-MuiTypography-root": {
                  position: "absolute",
                  right: 10,
                },
              }}
              id={`outlined-adornment-amount-${index}`}
              startAdornment={
                <InputAdornment position="end">تومان</InputAdornment>
              }
              label="Amount"
              value={
                isNaN(Number(dataItem.price))
                  ? dataItem.price
                  : Number(dataItem.price).toLocaleString("en") || ""
              }
              onChange={handleAmountChange}
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            my: 3,
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            sx={{
              marginX: { md: "0.75rem", xs: "0.75rem", sm: "0.75rem", lg: 0 },
              "&:hover": { backgroundColor: "#228B22" },
            }}
            onClick={() => onSubmit(index)}
          >
            ثبت اطلاعات
          </Button>
        </Box>
      </div>
    </>
  );
};

export default CardPrice;
