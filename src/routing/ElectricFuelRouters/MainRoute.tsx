import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ElectricFuelMainLayout from "../../ElectricFuelLayout/ElectricFuelMainLayout";
import HomePage from "../../ElectricFuelPages/Home/HomePage";




const EFSiteRoute = () => {

  return (
    <>
    < ElectricFuelMainLayout>
   
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
        
          </Routes>
        </Router>
       
        <ToastContainer />
        </ElectricFuelMainLayout>
        
     
    </>
  );
};

export default EFSiteRoute;
