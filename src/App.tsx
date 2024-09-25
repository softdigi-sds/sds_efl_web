import "bulma/css/bulma.min.css"; // Import Bulma CSS
//import 'bulma-checkradio/dist/css/bulma-checkradio.min.css';
//import 'bulma-switch/dist/css/bulma-switch.min.css';
import "./App.css";

import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./contexts/ErrorBoundary";
import { SiteProvider } from "./contexts/SiteProvider";
import SiteRoute from "./routing/SiteRoute";
import EFSiteRoute from "./routing/ElectricFuelRouters/MainRoute";


function App() {
  useEffect(() => {
    // Set the loader type globally on the window object
    window.loaderType = 'STAR';  // This can be changed based on your app logic
}, []);

  return (
    // <ErrorBoundary>
    //   <SiteProvider>
    //     <div className="App">
    //       <SiteRoute />
    //     </div>
    //   </SiteProvider>
    // </ErrorBoundary>
    <>
      <div className="App">
          {/* <SiteRoute /> */}
          <EFSiteRoute />
        </div>
    </>
  );
}

export default App;
