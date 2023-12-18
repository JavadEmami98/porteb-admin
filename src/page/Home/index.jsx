import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import CardPrice from "src/components/CardPrice/CardPrice";

function Home() {
  const [plan1, setPlan1] = useState({
    name: "",
    description: "",
    price: "",
    color: "",
  });
  const [plan2, setPlan2] = useState({
    name: "",
    description: "",
    price: "",
    color: "",
  });
  const [plan3, setPlan3] = useState({
    name: "",
    description: "",
    price: "",
    color: "",
  });
  const [plan4, setPlan4] = useState({
    name: "",
    description: "",
    price: "",
    color: "",
  });

  const handleInputChange = (inputName, value) => {
    setPlan1((prevValues) => ({
      ...prevValues,
      [inputName]: value,
    }));
    console.log(plan1);
  };

  const handleInputChange2 = (inputName, value) => {
    setPlan2((prevValues) => ({
      ...prevValues,
      [inputName]: value,
    }));
    console.log(plan2);
  };

  const handleInputChange3 = (inputName, value) => {
    setPlan3((prevValues) => ({
      ...prevValues,
      [inputName]: value,
    }));
    console.log(plan3);
  };

  const handleInputChange4 = (inputName, value) => {
    setPlan4((prevValues) => ({
      ...prevValues,
      [inputName]: value,
    }));
    console.log(plan4);
  };

  return (
    <>
      <div className="grid lg:grid-cols-4 lg:px-0 px-3 grid-cols-1 gap-4">
        <CardPrice
          nameValue={plan1.name}
          colorValue={plan1.color}
          descriptionValue={plan1.description}
          priceValue={plan1.price}
          onInputChange={handleInputChange}
        />
        <CardPrice
          nameValue={plan2.name}
          colorValue={plan2.color}
          descriptionValue={plan2.description}
          priceValue={plan2.price}
          onInputChange={handleInputChange2}
        />
        <CardPrice
          nameValue={plan3.name}
          colorValue={plan3.color}
          descriptionValue={plan3.description}
          priceValue={plan3.price}
          onInputChange={handleInputChange3}
        />
        <CardPrice
          nameValue={plan4.name}
          colorValue={plan4.color}
          descriptionValue={plan4.description}
          priceValue={plan4.price}
          onInputChange={handleInputChange4}
        />
      </div>
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
        >
          ثبت اصلاعات
        </Button>
      </Box>
    </>
  );
}

export default Home;
