import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardPrice from "src/components/CardPrice/CardPrice";

function Home() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
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

        setDataList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userInfo]);

  const handleInputChange = async (index, field, value) => {
    try {
      const newDataList = [...dataList];
      newDataList[index] = { ...newDataList[index], [field]: value };
      setDataList(newDataList);

      await axios.put(
        `${process.env.REACT_APP_API_URL}/prices/editPrice/${newDataList[index].id}`,
        newDataList[index],
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      console.log("Data updated successfully");
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
            onInputChange={(field, value) =>
              handleInputChange(index, field, value)
            }
          />
        ))}
      </div>
    </>
  );
}

export default Home;
