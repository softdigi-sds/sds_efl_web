import { useState } from "react";

import ConsumptionAdminReport from "./ConsumptionAdminReport";
import ConsumptionHubReport from "./ConsumptionHubReport.";

const ConsumptionReportTable = () => {
  const [stage, setStage] = useState<String>("ADMIN");
  
  return (
    <>
       {stage==="HUB" && <ConsumptionHubReport stage={stage} setStage={setStage}/>}
       {stage==="ADMIN" && <ConsumptionAdminReport stage={stage} setStage={setStage} />}
    </>
  );
};




export default ConsumptionReportTable
