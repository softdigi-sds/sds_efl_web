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
  loadTableData: () => void;  
  dataIn:any
  
}
const UsersForm:React.FC<HeaderProps> = ({ loadTableData, dataIn }) => {
  const [formData, setFormData] = useState(dataIn ? dataIn : {});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const {setLoading,closeModal } = useSiteContext();
  const [allRole, setAllRole] = useState([]);

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
   
    role_get_select((data:any) => setAllRole(data));
  }, []);
 
  const handleSubmit = () => {
    setFormSubmit(true);
    if (!ValidateFormNew(formData,formElements)) {
      return false;
    }
    let url = USER_URLS.INSERT;
    if (formData.ID !== undefined) {
      formData["id"] = formData.ID;
      url = USER_URLS.UPDATE;
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
    ename: [SmartValid.required("User Name is Required")],
    userId: [SmartValid.required("User ID is Required")],
    MobileNumber: [SmartValid.required("Mobile Number is Required")],
    email: [
      SmartValid.required("Email ID is Required"),
      SmartValid.email("Please Enter a Valid Email Address"),
      
    ],
    password: [SmartValid.required("Password is Required")],
    role: [SmartValid.required("Role is Required")],
    
    
  };

  const options = [
    { value: "1", label: "Test" },
    { value: "2", label: "Test" },
    { value: "3", label: "test" },
  ];
  const formElements:SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "TEXT_BOX",
      width: "4",
      name: "emailid",
      element: {
        label: "Email ID",
        isRequired: true,
        // inputProps: { isFocussed: true },
        inputType: "BORDER_LABEL",
        validations: loginFormValidations.email,
      },
    },
    {
      type: "TEXT_BOX",
      width: "4",
      name: "mobile_no",
      element: {
        label: "Mobile No.",
        isRequired: true,
        inputType: "BORDER_LABEL",
        // inputProps: { isFocussed: true },
        validations: loginFormValidations.MobileNumber,
        // allowPattern:ALLOW_NUMERIC,
        pattern:"[0-9]+",
        max:10,
       
      },
    },
    {
      type: "TEXT_BOX",
      width: "4",
      name: "ename",
      element: {
        label: "Name",
        inputType: "BORDER_LABEL",
        isRequired: true,
        // inputProps: { isFocussed: true },
        validations: loginFormValidations.ename,
      },
    },
    {
      type: 'PASSWORD',
      width: '4',
      name: 'epassword',
      element: {
       label: 'Password',
        isRequired: true,
        placeHolder: 'Password',
        inputType: "BORDER_LABEL",
        // inputType: "BORDER_LABEL",
        // leftIcon: "fa fa-envelope-square",
        validations: loginFormValidations.password,
        inputProps: {disabled:formData.ID&&formData.ID ? true:false}
      },
    },
    
   
  
    {
      type: "SELECT_BOX",
      width: "4",
      name: "role",
      element: {
        label: "Role",
        inputType: "BORDER_LABEL",
        options: allRole,
        isMulti: true,
        validations: loginFormValidations.role,
       
      },
    },
    // {
    //   type: "FILE",
    //   width: "12",
    //   name: "profile_img",
    //   element: {
    //     placeHolder: 
    //     (
    //       <p>
    //        Upload Image <span className="smart-error">*</span>
    //       </p>
    //     ),
    //     fileNameEnable: false,
    //     leftIcon: "fa fa-cloud-upload",
    //     isMulti: true,
    //     isRequired: true,
    //     filePreview: true,
    //   },
    // },
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

export default UsersForm