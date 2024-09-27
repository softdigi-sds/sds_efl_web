import React, { useEffect, useState } from 'react';
import { SmartFormInterFace, SmartSoftButton, SmartSoftForm, SmartValid } from "soft_digi";
import { OFFICE_URLS } from '../../api/UserUrls';
import { useSiteContext } from '../../contexts/SiteProvider';
import { ValidateFormNew } from '../../core/services/smartValidationService';
import { showAlertAutoClose } from '../../services/notifyService';
import { admin_states_select } from '../../services/site/SelectBoxServices';
import { post } from '../../services/smartApiService';
import { max } from 'date-fns';
import { ALLOW_NUMERIC } from '../../services/PatternSerivce';


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
    pan_no: [SmartValid.required("Pan No is Required")],
    cin_no: [SmartValid.required("CIN No is Required")],
    pin_code: [SmartValid.required("Pin Code is Required")],
  };

  const options = [
    { value: "1", label: "Test" },
    { value: "2", label: "Test" },
    { value: "3", label: "test" },
  ];
  const formElements:SmartFormInterFace.SmartFormElementProps[]= [
    {
      type: "SELECT_BOX",
      width: "6",
      name: "state",
      element: {
        label: "State",
        isRequired:true,
        options: states,
        validations: loginFormValidations.state,
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "office_city",
      element: {
        label: "City",
        // placeHolder: "City",
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: loginFormValidations.city,
        max:25,
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
        validations: loginFormValidations.address,
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "gst_no",
      element: {
        label: "GST No.",
        // placeHolder: "City",
        isRequired: true,
        inputProps: { isFocussed: true },
          // pattern:  ALLOW_ALPHABET_SPACE ,
        validations: loginFormValidations.gst_no,
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
        validations: loginFormValidations.pan_no,
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "cin_no",
      element: {
        label: "CIN No",
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: loginFormValidations.cin_no,
        pattern:  ALLOW_NUMERIC ,
        max:15,
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
        validations: loginFormValidations.pin_code,
          pattern:  ALLOW_NUMERIC ,
        max:8,
      },
    },
  ];
  return (
    <>
   <div className="">
    {/* <SmartHeader title={"Office & Locations Form"} /> */}
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

export default OfficesForm