import React from "react";
import { SmartFormInterFace, SmartSoftForm } from "soft_digi";

interface FormErrors {
  [key: string]: string | null;
}

interface HeaderProps {
  setFormData: (index: any, value: any) => void;
  formData: any;
}

const CustomerSubForm: React.FC<HeaderProps> = ({
  formData,
  setFormData,
}) => {


  const options_select = [
    { value: "1", label: "Fixed" },
    { value: "2", label: "Minimum" },
    { value: "3", label: "Per Unit" },
  ];
  const options_hsn = [
    { value: "1", label: "Parking & Charging" },
    { value: "2", label: "Parking" },
    { value: "3", label: "Charging (AC)" },
    { value: "5", label: "Charging (DC)" },
    { value: "4", label: "Rent" },
    { value: "6", label: "Infra Sharing" },
    { value: "7", label: "Charging(Office)" },
    { value: "8", label: "Support Services" },

  ];

  const options_vehicle = [
    { value: "1", label: "2WL" },
    { value: "2", label: "3 WL" },
    { value: "3", label: "4 WL" },
    { value: "4", label: "ZEN" },
    { value: "5", label: "TATA_ACE" },
  ];

  const formElements: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "SELECT_BOX",
      width: "3",
      name: "sd_efl_hsns_id",
      element: {
       // label: "Select Bill Item",
        options: options_hsn,
      },
    },


    {
      type: "TEXT_BOX",
      width: "3",
      name: "hsn",
      element: {
       // label: "Bill HSN",
        inputProps: {

        },
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "title",
      element: {
       // label: "Bill Description",
        inputProps: {

        },
      },
    },


  ];

  return (
    <>
      <SmartSoftForm
        formData={formData}
        setFormData={setFormData}
        elements={formElements}
      />
    </>
  );
};



export default CustomerSubForm
