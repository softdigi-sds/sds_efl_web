import React, { useEffect, useState } from 'react';
import { SmartFormInterFace, SmartSoftButton, SmartSoftForm, SmartValid } from "soft_digi";
import { OFFICE_URLS } from '../../api/UserUrls';
import { useSiteContext } from '../../contexts/SiteProvider';

import { showAlertAutoClose } from '../../services/notifyService';
import { admin_states_select } from '../../services/site/SelectBoxServices';
import { post } from '../../services/smartApiService';
import { max } from 'date-fns';
import { ALLOW_NUMERIC, ALPHA_NUMERIC_CAPITAL, GST } from '../../services/PatternSerivce';
import { ValidateFormNew } from 'soft_digi/dist/services/smartValidationService';


interface FormErrors {
  [key: string]: string | null;
}
interface HeaderProps {
  loadTableData: () => void;  
  dataIn:any
  
}
const OfficesForm:React.FC<HeaderProps> = ({ loadTableData, dataIn }) => {
  const [formData, setFormData] = useState(dataIn ? dataIn : {});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const {setLoading,closeModal } = useSiteContext();
  const [states, setStates] = useState([]);

  const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
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
    admin_states_select((data:any) => setStates(data));
    //  loadData();
  }, []);
  const handleSubmit = () => {
    setFormSubmit(true);
    if (!ValidateFormNew(formData,formElements)) {
      return false;
    }
    let url = OFFICE_URLS.INSERT;
    if (formData.ID !== undefined) {
      formData["id"] = formData.ID;
      url = OFFICE_URLS.UPDATE;
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
  const loginFormValidations = {
    state: [SmartValid.required("State is Required")],
    city: [SmartValid.required("City is Required")],
    address: [SmartValid.required("Address is Required")],
    gst_no: [SmartValid.required("GST No is Required")],
    cgst_no: [SmartValid.required("CGST No is Required")],
    sgst_no: [SmartValid.required("SGST No is Required")],
    igst_no: [SmartValid.required("IGST No is Required")],
    pan_no: [SmartValid.required("Pan No is Required")],
    cin_no: [SmartValid.required("CIN No is Required")],
    pin_code: [SmartValid.required("Pin Code is Required")],
  };


  const formElements:SmartFormInterFace.SmartFormElementProps[]= [
    {
      type: "SELECT_BOX",
      width: "4",
      name: "state",
      element: {
        label: "State",
        isRequired:true,
        options: states,
        validations: loginFormValidations.state,
        inputProps: { isFocussed: true },
        inputType: "BORDER_LABEL",
      },
    },
    {
      type: "TEXT_BOX",
      width: "4",
      name: "office_city",
      element: {
        label: "City",
        // placeHolder: "City",
        isRequired: true,
      
        validations: loginFormValidations.city,
        max:25,
        // inputProps: { isFocussed: true },
        inputType: "BORDER_LABEL",
      },
    },
    {
      type: "TEXT_BOX",
      width: "4",
      name: "pin_code",
      element: {
        label: "Pin Code",
        // placeHolder: "City",
        isRequired: true,
        // inputProps: { isFocussed: true },
        validations: loginFormValidations.pin_code,
          pattern:  ALLOW_NUMERIC ,
        max:6,
        inputType: "BORDER_LABEL",
      },
    },
  
    {
      type: "TEXT_BOX",
      width: "4",
      name: "gst_no",
      element: {
        label: "GST No.",
        // placeHolder: "City",
        isRequired: true,
        // inputProps: { isFocussed: true },
        inputType: "BORDER_LABEL",
          
        validations: loginFormValidations.gst_no,
        //  pattern: GST ,
        
        max:15,
      },
    },
    {
      type: "TEXT_BOX",
      width: "4",
      name: "pan_no",
      element: {
        label: "PAN No.",
        isRequired: true,
        // inputProps: { isFocussed: true },
        validations: loginFormValidations.pan_no,
        inputType: "BORDER_LABEL",
        // pattern: "[A-Z]{5}[0-9]{4}[A-Z]{1}",
         max:15,
      },
    },
    {
      type: "TEXT_BOX",
      width: "4",
      name: "cin_no",
      element: {
        label: "CRN No",
        isRequired: true,
        // inputProps: { isFocussed: true },
        validations: loginFormValidations.cin_no,
        pattern:  ALLOW_NUMERIC ,
        max:15,
        inputType: "BORDER_LABEL",
      },
    },
   

    {
      type: "TEXT_BOX",
      width: "4",
      name: "sgst",
      element: {
        label: "SGST (%)",
        // placeHolder: "City",
        isRequired: true,
        // inputProps: { isFocussed: true },
          // pattern:  ALLOW_ALPHABET_SPACE ,
        validations: loginFormValidations.sgst_no,
        pattern:  ALLOW_NUMERIC ,
        max:3,
        inputType: "BORDER_LABEL",
      },
    },
    {
      type: "TEXT_BOX",
      width: "4",
      name: "cgst",
      element: {
        label: "CGST (%)",
        // placeHolder: "City",
        isRequired: true,
        // inputProps: { isFocussed: true },
        inputType: "BORDER_LABEL",
          // pattern:  ALLOW_ALPHABET_SPACE ,
        validations: loginFormValidations.cgst_no,
        pattern:  ALLOW_NUMERIC ,
        max:3,
      },
    },
    {
      type: "TEXT_BOX",
      width: "4",
      name: "igst",
      element: {
        label: "IGST (%)",
        // placeHolder: "City",
        isRequired: true,
        // inputProps: { isFocussed: true },
          // pattern:  ALLOW_ALPHABET_SPACE ,
        validations: loginFormValidations.igst_no,
        inputType: "BORDER_LABEL",    max:3,
      },
    },
  
   
   
    {
      type: "TEXTAREA",
      width: "12",
      name: "address_one",
      element: {
        label: "Address",
        isRequired:true,
        max: 255,
        rows: 2,
        validations: loginFormValidations.address,
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
      <div className="has-text-right">
      <SmartSoftButton 
          label="Cancel"
          classList={["button","smart-third-button", "mt-4 mr-4" ]}
          onClick={closeModal}
        />
      <SmartSoftButton
          label={formData.ID ? "Update":"Submit"}
          rightIcon='fa fa-arrow-right'
          classList={["button ","mt-4", "smart-action-button"]}
          onClick={handleSubmit}
        />
      </div>
      </div>
    </>
  )
}

export default OfficesForm
