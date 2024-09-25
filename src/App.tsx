import "bulma/css/bulma.min.css"; // Import Bulma CSS
//import 'bulma-checkradio/dist/css/bulma-checkradio.min.css';
//import 'bulma-switch/dist/css/bulma-switch.min.css';
import "./App.css";

import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import EFSiteRoute from "./routing/ElectricFuelRouters/MainRoute";


function App() {
  useEffect(() => {
    window.loaderType = 'STAR'; 
}, []);

  return (

    <>
      <div className="App">
          <EFSiteRoute />
        </div>
    </>
  );
}

export default App;
