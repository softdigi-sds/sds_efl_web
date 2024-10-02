import React, { useState } from 'react';
import { SmartFormInterFace, SmartSofFile, SmartSoftButton, SmartSoftForm, SmartValid } from "soft_digi";
import { useSiteContext } from '../../contexts/SiteProvider';
import { getImageContent } from '../../services/core/FileService';
import { ALLOW_NUMERIC } from '../../services/PatternSerivce';

// Define the FileObject type (adjust according to your actual structure)
interface FileObject {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  // Include any other necessary properties
}

interface FormErrors {
  [key: string]: string | null;
}

// Define an interface for form data
interface FormData {
  profile_image?: FileObject; // No need for null since it can be undefined
  ename?: string;
  age?: string;
  gender?: string;
}

const Profile = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { closeModal } = useSiteContext();

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleErrorChange = (name: string | any, value: any) => {
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

  const loginFormValidations = {
    ename: [SmartValid.required("User Name is Required")],
    age: [SmartValid.required("Age is Required")],
    email: [SmartValid.required("Email ID is Required"), SmartValid.email("Please Enter a Valid Email Address")],
    password: [SmartValid.required("Password is Required")],
  };

  const formElements: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "TEXT_BOX",
      width: "4",
      name: "ename",
      element: {
        label: "Name",
        inputType: "BORDER_LABEL",
        isRequired: true,
        validations: loginFormValidations.ename,
      },
    },
    {
      type: "TEXT_BOX",
      width: "4",
      name: "age",
      element: {
        label: "Age",
        inputType: "BORDER_LABEL",
        isRequired: true,
        validations: loginFormValidations.age,
        allowPattern: ALLOW_NUMERIC,
      },
    },
    {
      type: "SELECT_BOX",
      width: "4",
      name: "gender",
      element: {
        label: "Gender",
        inputType: "BORDER_LABEL",
        options: [
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
          { value: "Other", label: "Other" },
        ],
        isRequired: true,
      },
    },
  ];

  return (
    <div className="sd-efl-input">
      <div className="profile-header has-text-centered">
        <div className="profile-avatar">
          {/* <img
            className="is-rounded"
            src={formData.profile_image ? getImageContent(formData.profile_image) : ''} 
            alt="Profile"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          /> */}
        </div>
      </div>
      {/* <SmartSofFile
        placeHolder="Upload Image"
        value={formData.profile_image ? formData.profile_image.name : ''} // Use name or empty string
        onChange={(value) => handleInputChange("profile_image", value as FileObject)} // Ensure the value is cast to FileObject
        errorEnable={formSubmit}
        fileNameEnable={false}
        errorUpdate={(value) => handleErrorChange("profile_image", value)}
      /> */}
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
          classList={["button", "mt-4 mr-4", "smart-third-button"]}
          onClick={closeModal}
        />
        <SmartSoftButton
          label="Submit"
          rightIcon="fa fa-arrow-right"
          classList={["button", "mt-4", "smart-action-button"]}
          onClick={closeModal}
        />
      </div>
    </div>
  );
};

export default Profile;
