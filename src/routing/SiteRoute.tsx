import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignPad from "../core/general/SignPad";
import SmartLoader from "../core/general/SmartLoader";
import Tracker from "../core/general/Tracker";
import VerticalOrderTracker from "../core/general/VerticalOrderTracker";
import WebCam from "../core/general/WebCam";
import NestedTable from "../core/tables/NestedTable";
import Layout from "../LayoutTheam/Layout";
import '../LayoutTheam/Sidebar.css';
import Buttons from "../pages/Buttons/Buttons";
import Charts from "../pages/Charts/Charts";
import FileUpload from "../pages/Forms/FileUpload";
import Forms from "../pages/Forms/Forms";
import FormValidation from "../pages/Forms/FormValidation";
import Radio from "../pages/Forms/Radio";
import SelectBox from "../pages/Forms/SelectBox";
import TextArea from "../pages/Forms/TextArea";
import HomeLanding from "../pages/Home/HomeLanding";
import ImageSliderExample from "../pages/Silders/ImageSilderExample";
import TabsExample from "../pages/SmartTabDisplay";
import StarRatingDisplay from "../pages/StarRatingDisplay";
import StepForms from "../pages/StepFrom/StepForms";
import TableIndex from "../pages/Tables/";



const SiteRoute = () => {
  const [currentStep, setCurrentStep] = useState<number>(3);
  return (
    <>
      <Layout>
        <Router>
          <Routes>
            <Route path="/table/:type" element={<TableIndex />} />
            <Route path="/tabs/:type" element={<TabsExample />} />
            <Route path="/lnpr" element={<HomeLanding />} />
            <Route path="/button" element={<Buttons />} />
            <Route path="/slider" element={<ImageSliderExample />} />
            <Route path="/tracker" element={<VerticalOrderTracker />} />
            <Route path="/trackers" element={<Tracker currentStep={currentStep}/>} />
            <Route path="/loader" element={<SmartLoader />} />
            <Route path="/sign" element={<SignPad />} />
            <Route path="/webcam" element={<WebCam />} />
            <Route path="/Charts" element={<Charts />} />
            <Route path="/forms" element={<StepForms />} />
            <Route path="/forms-text-box" element={<Forms />} />
          
            <Route path="/stars" element={<StarRatingDisplay/>} />
            <Route path="/nestedtable" element={<NestedTable/>} />
            <Route path="/forms-text-area" element={<TextArea/>} />
            <Route path="/forms-select-box" element={<SelectBox/>} />
            <Route path="/forms-radio" element={<Radio/>} />
            <Route path="/forms-files-upload" element={<FileUpload/>} />
            <Route path="/forms-files-validation" element={<FormValidation/>} />
          </Routes>
        </Router>
        <ToastContainer />
      </Layout>
    </>
  );
};

export default SiteRoute;
