import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./page";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Home from "./page/Home";
import ThemeProvider from "./theme";
import DashboardLayout from "./layouts/dashboard";
import User from "./page/user";
import Transactions from "./page/Transactions/Transactions";
import { useEffect } from "react";
import { fetchUserDataSuccess } from "./redux/action";
import axios from "axios";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userInfo?.token) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/users/info`,
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );

          const { data: userData } = response;

          dispatch(fetchUserDataSuccess(userData));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [dispatch, userInfo]);

  return (
    <>
      <BrowserRouter>
        {userInfo?.token ? (
          <ThemeProvider>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<User />} />
                <Route path="/transactions" element={<Transactions />} />
              </Routes>
            </DashboardLayout>
          </ThemeProvider>
        ) : (
          <Index />
        )}
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
      />
    </>
  );
}

export default App;
