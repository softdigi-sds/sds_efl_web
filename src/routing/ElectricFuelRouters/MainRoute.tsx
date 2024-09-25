import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ElectricFuelMainLayout from "../../ElectricFuelLayout/ElectricFuelMainLayout";
import { Dashboard, HomePage, OfficesTable } from "../../ElectricFuelPages";
import Login from "../../ElectricFuelPages/LoginPages/Login";
import ForgotPassword from "../../ElectricFuelPages/LoginPages/ForgotPassword";
import EFSubLayout from "../../EFSubLayout/EFSubLayout";

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
  const site_routes = () => {
    return (
      <>
        <EFSubLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/offices-list" element={<OfficesTable />} />
          </Routes>

          <ToastContainer />
        </EFSubLayout>
      </>
    );
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={protected_routes()} />
          <Route path="/login" element={<Login />} />
          <Route path="/e-fuel/*" element={site_routes()} />
      
          
        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
};

export default EFSiteRoute;
