import React, { useEffect, useState } from 'react';
import { SmartFormInterFace, SmartSoftButton, SmartSoftForm, SmartValid } from "soft_digi";
import { USER_URLS } from '../../api/AdminUrls';
import { useSiteContext } from '../../contexts/SiteProvider';

import { showAlertAutoClose } from '../../services/notifyService';
import { ALLOW_NUMERIC } from '../../services/PatternSerivce';
import { role_get_select } from '../../services/site/SelectBoxServices';
import { post } from '../../services/smartApiService';
import { ValidateFormNew } from 'soft_digi/dist/services/smartValidationService';

interface FormErrors {
  [key: string]: string | null;
}
interface HeaderProps {

  dataIn:any
  
}
const PasswordChangeForm:React.FC<HeaderProps> = ({  dataIn }) => {
  const [formData, setFormData] = useState(dataIn ? dataIn : {});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const {setLoading,closeModal } = useSiteContext();


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

 
  const handleSubmit = () => {
    setFormSubmit(true);
    if (!ValidateFormNew(formData,formElements)) {
      return false;
    }
    let url = USER_URLS.INSERT;
   

    const subscription = post(url, formData).subscribe(
      (response) => {
        //console.log("response form ", response.data);
     
        showAlertAutoClose("Password Change Successfully", "success");
        closeModal();      
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };


  const loginFormValidations = {
 
    password: [SmartValid.required("Password is Required")],
  
    
    
  };

  const options = [
    { value: "1", label: "Test" },
    { value: "2", label: "Test" },
    { value: "3", label: "test" },
  ];
  const formElements:SmartFormInterFace.SmartFormElementProps[] = [
 
    {
      type: 'PASSWORD',
      width: '4',
      name: 'epassword',
      element: {
       label: 'New Password',
        isRequired: true,
        placeHolder: 'New Password',
        inputType: "BORDER_LABEL",
        // inputType: "BORDER_LABEL",
        // leftIcon: "fa fa-envelope-square",
        validations: loginFormValidations.password,
        
      },
    },
    {
      type: 'PASSWORD',
      width: '4',
      name: 'epassword',
      element: {
       label: 'Confirm Password',
        isRequired: true,
        placeHolder: 'Confirm Password',
        inputType: "BORDER_LABEL",
        // inputType: "BORDER_LABEL",
        // leftIcon: "fa fa-envelope-square",
        validations: loginFormValidations.password,
        
      },
    },
    
   
  
   
  ];
  return (
    <><div className="sd-efl-input">
      {/* <SmartHeader title={"Add User Form"} /> */}
    
       <SmartSoftForm
        formData={formData}
        setFormData={handleInputChange}
        elements={formElements}
        formSubmit={formSubmit}
        handleErrorChange={handleErrorChange}
      />
        {/* <SmartImageDisplay
            srcType="DATA"
            data={formData?.return_image || []}
            isMulti={true}
            imageClass="is-6"
            updateImages={(images) => handleInputChange("return_image", images)}
          /> */}
      <div className="has-text-right">
      <SmartSoftButton
          label="Cancel"
          classList={["button","mt-4 mr-4", "smart-third-button"]}
          onClick={closeModal}
        />
      <SmartSoftButton
          label="Submit"
           rightIcon='fa fa-arrow-right'
          classList={["button ","mt-4", "smart-action-button"]}
          onClick={handleSubmit}
        />
      </div>
      </div>
    </>
    )
}



export default PasswordChangeForm

