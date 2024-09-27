import React, { useEffect, useState } from 'react';
import { SmartFormInterFace, SmartSoftButton, SmartSoftForm, SmartValid } from "soft_digi";
import { USER_URLS } from '../../api/AdminUrls';
import { useSiteContext } from '../../contexts/SiteProvider';
import { ValidateFormNew } from '../../core/services/smartValidationService';
import { showAlertAutoClose } from '../../services/notifyService';
import { ALLOW_NUMERIC } from '../../services/PatternSerivce';
import { role_get_select } from '../../services/site/SelectBoxServices';
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
    
  };

  const options = [
    { value: "1", label: "Test" },
    { value: "2", label: "Test" },
    { value: "3", label: "test" },
  ];
  const formElements:SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "TEXT_BOX",
      width: "6",
      name: "ename",
      element: {
        label: "Name",
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: loginFormValidations.ename,
      },
    },
    {
      type: 'PASSWORD',
      width: '6',
      name: 'epassword',
      element: {
       label: 'Password',
        isRequired: true,
        placeHolder: 'Password',
        // inputType: "BORDER_LABEL",
        // leftIcon: "fa fa-envelope-square",
        validations: loginFormValidations.password,
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
        validations: loginFormValidations.MobileNumber,
        allowPattern:ALLOW_NUMERIC
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
        validations: loginFormValidations.email,
      },
    },
  
    {
      type: "SELECT_BOX",
      width: "6",
      name: "role",
      element: {
        label: "Role",
      
        options: allRole,
       
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
    <><div className="">
      {/* <SmartHeader title={"Add User Form"} /> */}
      </div>
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