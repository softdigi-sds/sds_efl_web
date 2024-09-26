import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ElectricFuelMainLayout from "../../ElectricFuelLayout/ElectricFuelMainLayout";
import { Dashboard, HomePage, HubsTables, OfficesTable, VendorRatesTable, VendorsTable } from "../../ElectricFuelPages";
import Login from "../../ElectricFuelPages/LoginPages/Login";
import ForgotPassword from "../../ElectricFuelPages/LoginPages/ForgotPassword";
import EFSubLayout from "../../EFSubLayout/EFSubLayout";
import { useSiteContext } from "../../contexts/SiteProvider";
import SmartSoftModal from "../../core/loaders/SmartSoftModal";
import RoleTable from "../../ElectricFuelPages/Role/RoleTable";
import UsersTable from "../../ElectricFuelPages/Users/UsersTable";

const EFSiteRoute = () => {
  const { isModalOpen, modalOptions,closeModal } = useSiteContext();
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
            <Route path="/hubs-list" element={<HubsTables />} />
            <Route path="/vendors-list" element={<VendorsTable />} />
            <Route path="/vendors-rates-list" element={<VendorRatesTable />} />
            <Route path="/roles-list" element={<RoleTable />} />
            <Route path="/users" element={<UsersTable />} />
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
        {isModalOpen && <SmartSoftModal active={isModalOpen} {...modalOptions} closeFunction={closeModal} />}
      </Router>

      <ToastContainer />
    </>
  );
};

export default EFSiteRoute;
