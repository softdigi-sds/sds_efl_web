import React, { useEffect, useState } from 'react';
import { SmartFormInterFace, SmartSoftButton, SmartSoftForm } from "soft_digi";
import { ROLE_URLS } from '../../api/AdminUrls';
import { useSiteContext } from '../../contexts/SiteProvider';
import { showAlertAutoClose } from '../../services/notifyService';
import { user_get_select } from '../../services/site/SelectBoxServices';
import { post } from '../../services/smartApiService';
import { SmartValid, ValidateFormNew } from 'soft_digi/dist/services/smartValidationService';

interface FormErrors {
  [key: string]: string | null;
}
interface HeaderProps {
  loadTableData: () => void;  
  dataIn:any
  
}
const RoleForm:React.FC<HeaderProps> = ({ loadTableData, dataIn }) => {
  const [formData, setFormData] = useState(dataIn ? dataIn : {});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const {setLoading,closeModal } = useSiteContext();
  const [allUsers, setAllUsers] = useState([]);

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
   
    user_get_select((data:any) => setAllUsers(data));
  }, []);
 
  const handleSubmit = () => {
    setFormSubmit(true);
    if (!ValidateFormNew(formData,formElements)) {
      return false;
    }
  
    let url = ROLE_URLS.INSERT;
    if (formData.ID !== undefined) {
      formData["id"] = formData.ID;
      url =ROLE_URLS.UPDATE;
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
    RoleName: [SmartValid.required("Role Name is Required")],
    user: [SmartValid.required("Users is Required")],
   
    
  };

  const options = [
    { value: "1", label: "Test" },
    { value: "2", label: "Test" },
    { value: "3", label: "test" },
  ];
  const formElements:SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "TEXT_BOX",
      width: "12",
      name: "role_name",
      element: {
        label: "Role Name",
        isRequired: true,
        // inputProps: { isFocussed: true },
        inputType: "BORDER_LABEL",
        validations: loginFormValidations.RoleName,
      },
    },
    
    
    
    {
      type: "SELECT_BOX",
      width: "12",
      name: "users",
      element: {
        label: "Users",
        isMulti: true,
        inputType: "BORDER_LABEL",
        options: allUsers,
        validations: loginFormValidations.user,
       
      },
    },
  
  ];
  return (
    <><div className="sd-efl-input">
      {/* <SmartHeader title={"Role Form"} /> */}
    
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
           label={formData.ID ? "Update":"Submit"}
           rightIcon='fa fa-arrow-right'
          classList={["button ","mt-4", " smart-action-button"]}
          onClick={handleSubmit}
        />
      </div>
      </div>
    </>
    )
}


export default RoleForm