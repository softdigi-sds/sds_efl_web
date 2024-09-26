import React, { useState } from 'react'
import { SmartSoftButton, SmartSoftForm } from '../../core';
import { SmartFormElementProps } from '../../core/forms/SmartFormInterface';
import { SmartValid, ValidateFormNew } from '../../core/services/smartValidationService';
import { useSiteContext } from '../../contexts/SiteProvider';
import { USER_URLS } from '../../api/AdminUrls';
import { showAlertAutoClose } from '../../services/notifyService';
import { post } from '../../services/smartApiService';

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
    const handleError = (errorMessage:any) => {
      showAlertAutoClose(errorMessage,"error" );
      setLoading(false);
    };
    setLoading(true, "Details Submitting....Please Wait");
    let url = USER_URLS.INSERT;
    if (formData.ID !== undefined) {
      formData["id"] = formData.ID;
      url = USER_URLS.UPDATE;
    }

    const subscription = post(url, formData, handleError).subscribe(
      (response) => {
        //console.log("response form ", response.data);
        loadTableData();
        showAlertAutoClose("Data Saved Successfully", "success");
        closeModal();
        // setUser(response.data);
        setLoading(false);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };


  const loginFormValidations = {
    ename: [SmartValid.required("Password is Required")],
    email: [
      SmartValid.required("Email ID is Required"),
      SmartValid.email("Please Enter a Valid Email Address"),
      
    ],
    password: [SmartValid.required("Password is Required")],
    
  };

  const options = [
    { value: "1", label: "Test" },
    { value: "2", label: "Test" },
    { value: "3", label: "test" },
  ];
  const formElements:SmartFormElementProps[] = [
    {
      type: "TEXT_BOX",
      width: "6",
      name: "ename",
      element: {
        label: "User Name",
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "euserid",
      element: {
        label: "User ID",
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "mobile_no",
      element: {
        label: "Mobile No.",
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "emailid",
      element: {
        label: "Email ID",
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
  
    {
      type: "SELECT_BOX",
      width: "6",
      name: "role",
      element: {
        label: "Role",
        isRequired:true,
        options: options,
      },
    },
    {
      type: "FILE",
      width: "12",
      name: "profile_img",
      element: {
        placeHolder: 
        (
          <p>
           Upload Image <span className="smart-error">*</span>
          </p>
        ),
        fileNameEnable: false,
        leftIcon: "fa fa-cloud-upload",
        isMulti: true,
        isRequired: true,
        filePreview: true,
      },
    },
  ];
  return (
    <>
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

export default UsersForm