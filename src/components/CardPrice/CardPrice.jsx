import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CardPrice = ({
  nameValue,
  descriptionValue,
  colorValue,
  onInputChange,
  priceValue,
}) => {
  const [amount, setAmount] = useState("");

  const handleAmountChange = (event) => {
    const rawValue = event.target.value;
    const numericValue = rawValue.replace(/\D/g, "");
    setAmount(formatNumberWithCommas(numericValue));
  };

  return (
    <>
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
          value={nameValue}
          onChange={(e) => onInputChange("name", e.target.value)}
          id="outlined-basic"
          label="اسم  طرح"
          variant="outlined"
          sx={{ width: "100%", bgcolor: "#fff" }}
        />
        <form action="" className="flex items-center">
          <label for="favcolor">رنگ طرح:</label>
          <input
            value={colorValue}
            onChange={(e) => onInputChange("color", e.target.value)}
            type="color"
            id="color1"
            className="mr-2 cursor-pointer"
          />
        </form>
        <TextField
          value={descriptionValue}
          onChange={(e) => onInputChange("description", e.target.value)}
          id="outlined-multiline-static"
          label=" توضیحات طرح"
          multiline
          rows={4}
          sx={{ bgcolor: "#fff" }}
        />
        <FormControl sx={{ width: "100%", bgcolor: "#fff" }}>
          <InputLabel htmlFor="outlined-adornment-amount">قیمت طرح</InputLabel>
          <OutlinedInput
            sx={{
              width: "100%",
              "& .muirtl-dp5fpk-MuiTypography-root": {
                position: "absolute",
                right: 10,
              },
            }}
            id="outlined-adornment-amount"
            startAdornment={
              <InputAdornment position="end">تومان</InputAdornment>
            }
            label="Amount"
            value={
              isNaN(Number(priceValue)) ? priceValue : Number(priceValue).toLocaleString('en') || ""
            }
            onChange={(e) => onInputChange("price", e.target.value)}
          />
        </FormControl>
      </Box>
    </>
  );
};

export default CardPrice;
