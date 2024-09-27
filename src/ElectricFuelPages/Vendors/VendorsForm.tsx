import React, { useEffect, useState } from 'react'
import { SmartFormInterFace, SmartSoftButton, SmartSoftForm } from "soft_digi";
import { ValidateFormNew } from 'soft_digi/dist/services/smartValidationService';
import { VENDERS_URLS } from '../../api/UserUrls';
import { post } from '../../services/smartApiService';
import { showAlertAutoClose } from '../../services/notifyService';
import { useSiteContext } from '../../contexts/SiteProvider';
import { admin_states_select, hubs_get_all_select } from '../../services/site/SelectBoxServices';


interface FormErrors {
  [key: string]: string | null;
}
interface HeaderProps {
  loadTableData: () => void;  
  dataIn:any
  
}
const VendorsForm:React.FC<HeaderProps > = ({loadTableData,dataIn}) => {
  const [formData, setFormData] = useState(dataIn ? dataIn : {});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [allHubs, setAllHubs] = useState([]);
  const [allStats, setAllStats] = useState([]);
  const {  closeModal } = useSiteContext();

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev:any) => ({ ...prev, [name]: value }));
    
  };
  const handleErrorChange = (name:string|any, value: any) => {
    setFormErrors((prev) => {
      const updatedFormData = { ...prev };
      if (value === null || value === '') {
        delete updatedFormData[name];
      } else {
        updatedFormData[name] = value;
      }
      return updatedFormData;
    });
  };
  
  useEffect(() => {   
    hubs_get_all_select((data:any) => setAllHubs(data));
    admin_states_select((data:any) => setAllStats(data));
  }, []);
  const handleSubmit = () => {
    setFormSubmit(true);
    if (!ValidateFormNew(formData,formElements)) {
      return false;
    }
    let url = VENDERS_URLS.INSERT;
    if (formData.ID !== undefined) {
      formData["id"] = formData.ID;
      url = VENDERS_URLS.UPDATE;
    }

    const subscription = post(url, formData).subscribe(
      (response) => {
        //console.log("response form ", response.data);
        loadTableData();
        showAlertAutoClose("Data Saved Successfully", "success");
        closeModal();       
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };
  const options = [
    { value: "1", label: "Test" },
    { value: "2", label: "Test" },
    { value: "3", label: "test" },
  ];
  const formElements:SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "SELECT_BOX",
      width: "6",
      name: "sd_hub_id",
      element: {
        label: "Hub ID",
        isRequired:true,
        options: allHubs,
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "vendor_code",
      element: {
        label: "Code",
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "vendor_company",
      element: {
        label: "Company",
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "vendor_name",
      element: {
        label: "Name",
     
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "gst_no",
      element: {
        label: "GST No.",
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "pan_no",
      element: {
        label: "PAN No.",
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
    {
      type: "TEXTAREA",
      width: "12",
      name: "address_one",
      element: {
        label: "Address-1",
        isRequired:true,
        max:"255",
      },
    },
    {
      type: "TEXTAREA",
      width: "12",
      name: "address_two",
      element: {
        label: "Address-2",
        isRequired:true,
        max:"255",
      },
    },
    {
      type: "SELECT_BOX",
      width: "6",
      name: "state_name",
      element: {
        label: "State",
        isRequired:true,
        options: allStats,
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "pin_code",
      element: {
        label: "Pin Code",
        // placeHolder: "City",
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
  ];
  return (
    <><div className="">
      {/* <SmartHeader title={"Vendors Form"} /> */}
      </div>
       <SmartSoftForm
        formData={formData}
        setFormData={handleInputChange}
        elements={formElements}
        formSubmit={formSubmit}
        handleErrorChange={handleErrorChange}
      />
      <div className="has-text-right">
      <SmartSoftButton
          label="Cancel"
          classList={["button","mt-4 mr-4"]}
          onClick={closeModal}
        />
      <SmartSoftButton
          label="Submit"
          classList={["button ","mt-4"]}
          onClick={handleSubmit}
        />
      </div>
    </>
  )
}

export default VendorsForm
