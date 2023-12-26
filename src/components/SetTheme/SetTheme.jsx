import { Box, Button, Card, Slider, Typography } from "@mui/material";
import { IoMoonOutline } from "react-icons/io5";
import Brightness3Icon from '@mui/icons-material/Brightness3';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SetTheme = () => {
    const [value, setValue] = useState(13);
    const [pageType, setpageType] = useState(2);
    const dispatch = useDispatch();
    const handleChange = (event, newValue) => {
      localStorage.setItem("fontSize", newValue);
      document.documentElement.style.fontSize = `${Number(newValue)}px`;
      setValue(newValue);
    };
    useLayoutEffect(() => {
      if (localStorage.getItem("fontSize")) {
        setValue(Number(localStorage.getItem("fontSize")));
      }
      if (localStorage.getItem("pageType")) {
        setpageType(Number(localStorage.getItem("pageType")));
      }
    }, []);
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          paddingX: "1.5rem",
          marginX: "0.25rem !important",
          paddingTop: "0px !important",
        }}
      >
        <Typography variant="h4"> تنظیمات </Typography>
        <Card sx={{ padding: "1.5rem 1rem", marginTop: "2.5rem",width:"100%" }}>
        <div className="flex gap-6 items-center flex-wrap">
              <span className="text-sm">سایز فونت : </span>
              <div className="w-full md:w-[400px]">
                <Slider
                  sx={{
                    mt: 2,
                    ".MuiSlider-thumb": {
                      background: "#fff !important",
                      border: "4px solid currentColor !important",
                      width: "25px  !important",
                      height: "25px  !important",
                      transform: "translate(0%, -50%) !important",
                    },
                  }}
                  aria-label="Temperature"
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  step={1}
                  min={10}
                  max={20}
                />
              </div>
            </div>
          <Box sx={{display:"flex",alignItems:"center",gap:2,mt:"1.5rem", width:"100%"}}>
          <Typography>حالت روشنایی  :</Typography>
        
          <Button variant="contained" sx={{bgcolor:"#fff",color:"#000",width:"40px !important",fontSize:"1rem","&:hover":{bgcolor:"#fff"}}}>روز 
          <WbSunnyIcon sx={{ml:"0.5rem",width:"1rem",height:"1rem"}}/>
          </Button>
          <Button  onClick={() => {
                    dispatch(handleThemeToggle("dark"));
                  }} variant="contained" sx={{bgcolor:"#000",color:"#fff",width:"60px !important",fontSize:"1rem","&:hover":{bgcolor:"#000"}}}>شب 
        <Brightness3Icon sx={{ml:"0.5rem",width:"1rem",height:"1rem"}}/>
          </Button>
         
          </Box>
        </Card>
      </Box>
    </div>
  );
};

export default SetTheme;
