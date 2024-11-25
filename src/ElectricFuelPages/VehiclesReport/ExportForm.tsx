import React, { useEffect, useState } from "react";
import {
  SmartFormInterFace,
  SmartSoftButton,
  SmartSoftForm,
  SmartValid,
} from "soft_digi";
import { ValidateFormNew } from "soft_digi/dist/services/smartValidationService";
import { VENDERS_URLS } from "../../api/UserUrls";
import { post } from "../../services/smartApiService";
import { showAlertAutoClose } from "../../services/notifyService";
import { useSiteContext } from "../../contexts/SiteProvider";
import {
  admin_states_select,
  hubs_get_all_select,
  vendors_get_all_select,
} from "../../services/site/SelectBoxServices";
import { ALLOW_ALPHABET_SPACE, ALLOW_NUMERIC } from "../../services/PatternSerivce";

interface FormErrors {
  [key: string]: string | null;
}
interface HeaderProps {
  loadTableData: () => void;
  
}
const ExportForm: React.FC<HeaderProps> = ({ loadTableData,  }) => {
  const [formData, setFormData] = useState( {});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [allHubs, setAllHubs] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const { closeModal } = useSiteContext();

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleErrorChange = (name: string | any, value: any) => {
    setFormErrors((prev) => {
      const updatedFormData = { ...prev };
      if (value === null || value === "") {
        delete updatedFormData[name];
      } else {
        updatedFormData[name] = value;
      }
      return updatedFormData;
    });
  };

  useEffect(() => {
    hubs_get_all_select((data: any) => setAllHubs(data));
    vendors_get_all_select((data: any) => setAllVendors(data));
  }, []);
  const handleSubmit = () => {
    setFormSubmit(true);
    if (!ValidateFormNew(formData, formElements)) {
      return false;
    }
    let url = VENDERS_URLS.INSERT;
  

    const subscription = post(url, formData).subscribe((response) => {
      //console.log("response form ", response.data);
      loadTableData();
      showAlertAutoClose("Data Saved Successfully", "success");
      closeModal();
    });
    return () => {
      subscription.unsubscribe();
    };
  };
  const options = [
    { value: "1", label: "Test" },
    { value: "2", label: "Test" },
    { value: "3", label: "test" },
  ];
  const vendorFormValidations = {
    hub_id: [SmartValid.required("Hub Id is Required")],
  
  };
  const formElements: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "SELECT_BOX",
      width: "6",
      name: "sd_hub_id",
      element: {
        label: "Hub ID",
        isRequired: true,
        validations: vendorFormValidations.hub_id,
        options: allHubs,
        inputType: "BORDER_LABEL",
        
      },
    },
  
   
  
  

    
    {
      type: "SELECT_BOX",
      width: "6",
      name: "company_name",
      element: {
        label: "Company",
        options: allVendors,
        inputType: "BORDER_LABEL",
      },
    },
   
  
    
  ];
  return (
    <>
      <div className="sd-efl-input">
        <SmartSoftForm
          formData={formData}
          setFormData={handleInputChange}
          elements={formElements}
          formSubmit={formSubmit}
          handleErrorChange={handleErrorChange}
        />
        <div className="has-text-right mt-6">
          <SmartSoftButton
            label="Cancel"
            classList={["button", "smart-third-button", "mt-4 mr-4"]}
            onClick={closeModal}
          />
          <SmartSoftButton
           label={"Submit"}
            rightIcon="fa fa-arrow-right"
            classList={["button ", "mt-4", "smart-action-button"]}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};




export default ExportForm
