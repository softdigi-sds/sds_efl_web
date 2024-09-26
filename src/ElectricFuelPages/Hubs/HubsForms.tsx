import React, { useState } from 'react'
import { SmartSoftButton, SmartSoftForm } from '../../core';
import { SmartFormElementProps } from '../../core/forms/SmartFormInterface';

interface FormErrors {
  [key: string]: string | null;
}
const HubsForms = () => {
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
      type: "SELECT_BOX",
      width: "6",
      name: "office",
      element: {
        label: "Office City",
        isRequired:true,
        options: options,
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "hub_id",
      element: {
        label: "Hub ID",
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
    {
      type: "TEXTAREA",
      width: "12",
      name: "location",
      element: {
        label: "Location",
        isRequired:true,
        max:"255",
      },
    },
    {
      type: "SELECT_BOX",
      width: "6",
      name: "access_role",
      element: {
        label: "Access Role",
        isRequired:true,
        options: options,
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

export default HubsForms
