import "bulma/css/bulma.min.css"; // Import Bulma CSS
import "bulma-checkradio/dist/css/bulma-checkradio.min.css";
import "bulma-switch/dist/css/bulma-switch.min.css";
import "./App.scss";

import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import { SiteProvider } from "./contexts/SiteProvider";
import EFSiteRoute from "./routing/ElectricFuelRouters/MainRoute";

function App() {
  useEffect(() => {
    window.loaderType = "STAR";
  }, []);

  return (
    <SiteProvider>
      <div className="App">
        <EFSiteRoute />
      </div>
    </SiteProvider>
  );
}

export default App;
