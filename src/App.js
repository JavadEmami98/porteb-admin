import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./page";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Home from "./page/Home";
import ThemeProvider from "./theme";
import DashboardLayout from './layouts/dashboard';
import User from "./page/user";


function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <BrowserRouter>
        {userInfo?.token ? (
          <ThemeProvider>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<User />} />
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
