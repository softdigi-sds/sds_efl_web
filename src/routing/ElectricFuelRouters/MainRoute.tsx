import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ElectricFuelMainLayout from "../../ElectricFuelLayout/ElectricFuelMainLayout";
import { HomePage } from "../../ElectricFuelPages";
import Login from "../../ElectricFuelPages/LoginPages/Login";
import ForgotPassword from "../../ElectricFuelPages/LoginPages/ForgotPassword";

const EFSiteRoute = () => {
  const protected_routes = () => {
    return (
      <>
        <ElectricFuelMainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>

          <ToastContainer />
        </ElectricFuelMainLayout>
      </>
    );
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={protected_routes()} />
          <Route path="/login" element={<Login />} />
      
          
        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
};

export default EFSiteRoute;
