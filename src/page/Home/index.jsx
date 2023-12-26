import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CardPrice from "src/components/CardPrice/CardPrice";

function Home() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [dataList, setDataList] = useState([]);

 
const fetchData = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/prices/getAll`,
      {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      }
    );

    console.log("API Response:", response.data);

    setDataList(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

useEffect(() => {
  fetchData();
}, [userInfo]);

  const handleInputChange = (index, field, value) => {
    const newDataList = [...dataList];
    newDataList[index] = { ...newDataList[index], [field]: value };
    setDataList(newDataList);
  };

  const handleSubmit = async (index) => {
    try {
      console.log("Submitting data:", index, dataList[index]);
  
      const id = dataList[index]?.id;
      if (!id) {
        console.error("Invalid ID:", id);
        return;
      }
  
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/prices/editPrice/${id}`,
        dataList[index],
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      console.log("Data updated successfully", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      <div className="grid lg:grid-cols-4 lg:px-0 px-3 grid-cols-1 gap-4">
        {dataList.map((dataItem, index) => (
          <CardPrice
            key={index}
            dataItem={dataItem}
            index={index}
            onInputChange={(field, value) => handleInputChange(index, field, value)}
            onSubmit={handleSubmit}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
