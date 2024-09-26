import React, { useState } from 'react'
import { SmartSoftButton, SmartSoftForm } from '../../core';
import { SmartFormElementProps } from '../../core/forms/SmartFormInterface';

interface FormErrors {
  [key: string]: string | null;
}
const OfficesForm = () => {
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
      name: "status",
      element: {
        label: "State",
        isRequired:true,
        options: options,
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "city_number",
      element: {
        label: "City",
        placeHolder: "City",
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
    {
      type: "TEXTAREA",
      width: "12",
      name: "address",
      element: {
        label: "Address",
        isRequired:true,
        max:"255",
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
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "pan_number",
      element: {
        label: "PAN No.",
        // placeHolder: "City",
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "cin_number",
      element: {
        label: "CIN No",
        // placeHolder: "City",
        isRequired: true,
        inputProps: { isFocussed: true },
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

export default OfficesForm
