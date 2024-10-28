import { useState } from "react";
import VehicleAdminReport from "./VehicleAdminReport";
import VehicleReportHub from "./VehicleReportHub";
const VehiclesReportTable = () => {
  const [stage, setStage] = useState<String>("ADMIN");
  return (
    <>
      {stage === "HUB" && (
        <VehicleReportHub stage={stage} setStage={setStage} />
      )}
      {stage === "ADMIN" && (
        <VehicleAdminReport stage={stage} setStage={setStage} />
      )}
    </>
  );
};

export default VehiclesReportTable;
