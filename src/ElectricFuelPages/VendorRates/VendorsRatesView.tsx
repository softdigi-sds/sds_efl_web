import React, { useEffect, useState } from "react";
import {
  SmartFormInterFace,
  SmartSoftButton,
  SmartSoftForm,
  SmartValid,
} from "soft_digi";
import { ValidateFormNew } from "soft_digi/dist/services/smartValidationService";
import { VENDER_RATE_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { changeDateTimeZoneFormat } from "../../services/core/CommonService";
import { showAlertAutoClose } from "../../services/notifyService";
import {
  company_get_all_select,
  hubs_get_all_select,
} from "../../services/site/SelectBoxServices";
import { post } from "../../services/smartApiService";
import VendorRatesSubForm from "./VendorRatesSubForm";
import VendorRatesSubFormTwo from "./VendorRatesSubFormTwo";

interface FormErrors {
  [key: string]: string | null;
}

interface HeaderProps {

  dataIn: any|any[];
}

const VendorsRatesView: React.FC<HeaderProps> = ({  dataIn }) => {

    console.log("data in",dataIn)
return(
    <>
     <div className="container">
      <table className="table is-bordered is-fullwidth">
        <tbody>
          {/* <tr>
            <th>S.NO</th>
            <td>{office.s_no}</td>
          </tr> */}
      <tr>
            <th>Office City</th>
            <td>{dataIn.office_city}</td>
          </tr>
              <tr>
            <th>CGST(%)</th>
            <td>{dataIn.cgst}</td>
          </tr> 
        
        </tbody>
      </table>
    </div>
    </>
)
 
}

export default VendorsRatesView
