import React, { useState } from 'react'
import { SmartSoftButton, SmartSoftForm } from '../../core';
import { SmartFormElementProps } from '../../core/forms/SmartFormInterface';

interface FormErrors {
  [key: string]: string | null;
}
const UsersForm = () => {
  const [formData, setFormData] = useState({});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
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
    const handleLogin=()=>{
    console.log("data")
  }
  const options = [
    { value: "1", label: "Test" },
    { value: "2", label: "Test" },
    { value: "3", label: "test" },
  ];
  const formElements:SmartFormElementProps[] = [
    {
      type: "TEXT_BOX",
      width: "6",
      name: "id",
      element: {
        label: "No",
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
    {
      type: "MOBILE",
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
      name: "name_id",
      element: {
        label: "Name.",
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "email",
      element: {
        label: "Email",
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
    {
      type: "SELECT_BOX",
      width: "6",
      name: "status",
      element: {
        label: "State",
        isRequired:true,
        options: options,
      },
    },
    {
      type: "FILE",
      width: "12",
      name: "return_image",
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
          onClick={handleLogin}
        />
      <SmartSoftButton
          label="Submit"
          classList={["button ","mt-4"]}
          onClick={handleLogin}
        />
      </div>
    </>
    )
}

export default UsersForm