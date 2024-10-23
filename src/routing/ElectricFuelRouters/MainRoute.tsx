import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import EFSubLayout from "../../EFSubLayout/EFSubLayout";
import {
  ConsumptionAdminReport,
  ConsumptionReportTable,
  Dashboard,
  HubsTables,
  InvoiceTable,
  MeterReading,
  MeterReadingReport,
  Msireports,
  OfficesTable,
  Profile,
  RoleTable,
  UsersTable,
  VehicleAdminReport,
  VehiclesReportTable,
  VendorRatesTable,
  VendorsTable,
  VendorWiseInformation
} from "../../ElectricFuelPages";
import Login from "../../ElectricFuelPages/LoginPages/Login";
import { useSiteContext } from "../../contexts/SiteProvider";
import SmartSoftModal from "../../core/loaders/SmartSoftModal";
const EFSiteRoute = () => {
  const { isModalOpen, modalOptions, closeModal } = useSiteContext();
  const protected_routes = () => {
    return (
      <>
      
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>

          <ToastContainer />
       
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
            <Route path="/meter-reading" element={<MeterReading />} />
            <Route path="/meter-reading-report" element={<MeterReadingReport />} />
            <Route path="/msi-reports" element={<Msireports />} />
            <Route
              path="/vehicles-report"
              element={<VehiclesReportTable />}
            />
              <Route
              path="/vehicles-admin-report"
              element={<VehicleAdminReport setStage={""} stage={""} />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/consumption-report"
              element={<ConsumptionReportTable/>}
            />
                <Route
              path="/consumption-admin-report"
              element={<ConsumptionAdminReport setStage={""} stage={""}/>}
            />
            <Route
              path="/vendor-wish/:id"
              element={<VendorWiseInformation />}
            />
            <Route path="/invoices" element={<InvoiceTable />} />
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
        {isModalOpen && (
          <SmartSoftModal
            active={isModalOpen}
            {...modalOptions}
            closeFunction={closeModal}
          />
        )}
      </Router>

      <ToastContainer />
    </>
  );
};

export default EFSiteRoute;
