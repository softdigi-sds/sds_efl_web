import React, { useState } from 'react';
import { SmartFormInterface, SmartSoftButton, SmartSoftForm } from '../../core';

interface FormErrors {
  [key: string]: string | null;
}
interface FormData {
  type_select?: {
    value: string;
  };
  [key: string]: any;
}

const VendorRatesForms = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

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

  const handleLogin = () => {
    console.log('data', formData);
  };

  const options = [
    { value: '1', label: 'Minimum' },
    { value: '2', label: 'Per Unit' },
  ];
  const options_parking = [
    { value: '3', label: 'Minimum' },
    { value: '4', label: 'Per Unit' },
  ];
  const Interrogation = () => {
    return (
      <>
        <div className="">
          <u>Consumption Rates :</u>
        </div>
      </>
    );
  };

  const Interrogation_two = () => {
    return (
      <>
        <div className="">
          <u>Parking Rates :</u>
        </div>
      </>
    );
  };

  const formElements: SmartFormInterface.SmartFormElementProps[] = [
    {
      type: 'SELECT_BOX',
      width: '6',
      name: 'office',
      element: {
        label: 'Select Hub ID',
        isRequired: true,
        options: options,
      },
    },
    {
      type: 'SELECT_BOX',
      width: '6',
      name: 'office_company',
      element: {
        label: 'Select Company',
        isRequired: true,
        options: options,
      },
    },
    {
      type: 'LABEL',
      width: '12',
      name: 'label_one',
      labelFunction: Interrogation,
    },
    {
      type: 'SELECT_BOX',
      width: '6',
      name: 'type_select',
      element: {
        label: 'Select Consumption Type',
        isRequired: true,
        options: options,
      },
      // hideFunction: (data: FormData) => {
      //   return data.type_select?.value === '1'; 
      // },
    },
    {
      type: 'TEXT_BOX',
      width: '6',
      name: 'min_unit',
      element: {
        label: 'Minimum Units',
        isRequired: true,
        inputProps: { isFocussed: true },
      },
      // hideFunction: (data: FormData) => {
      //   return data.type_select?.value === '1' ? false : true; 
      // },
    },
    {
      type: 'TEXT_BOX',
      width: '6',
      name: 'rate_unit',
      element: {
        label: 'Rate Per Unit',
        isRequired: true,
        inputProps: { isFocussed: true },
      },
      // hideFunction: (data: FormData) => {
      //   return data.type_select?.value === '1' ? false : true; 
      // },
    },
    {
      type: 'TEXT_BOX',
      width: '6',
      name: 'extra_unit',
      element: {
        label: 'Rate Per Extra Unit',
        isRequired: true,
        inputProps: { isFocussed: true },
      },
      // hideFunction: (data: FormData) => {
      //   return data.type_select?.value === '2' ? false : true; 
      // },
    },
    {
      type: 'LABEL',
      width: '12',
      name: 'label_two',
      labelFunction: Interrogation_two,
    },
    {
      type: 'SELECT_BOX',
      width: '6',
      name: 'type_select_two',
      element: {
        label: 'Select Parking Type',
        isRequired: true,
        options: options_parking,
      },
    },
    {
      type: 'TEXT_BOX',
      width: '6',
      name: 'min_unit_two',
      element: {
        label: 'Minimum Number',
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
    {
      type: 'TEXT_BOX',
      width: '6',
      name: 'rate_unit_two',
      element: {
        label: 'Rate Per Unit',
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
    {
      type: 'TEXT_BOX',
      width: '6',
      name: 'extra_unit_two',
      element: {
        label: 'Rate Per Extra Unit',
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
    {
      type: 'DATE',
      width: '6',
      name: 'select_date',
      element: {
        label: 'Select Effective Date',
        placeHolder: 'DD-MM-YYYY',
        isRequired: true,
        inputProps: { isFocussed: true },
      },
    },
  ];

  return (
    <>
      <div className="">
        {/* <SmartHeader title={"Vendor Rates Form"} /> */}
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
          classList={['button', 'mt-4 mr-4']}
          onClick={handleLogin}
        />
        <SmartSoftButton
          label="Submit"
          classList={['button ', 'mt-4']}
          onClick={handleLogin}
        />
      </div>
    </>
  );
};

export default VendorRatesForms;
