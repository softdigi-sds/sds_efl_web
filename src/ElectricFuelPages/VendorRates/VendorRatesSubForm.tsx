import React from "react";
import { SmartFormInterFace, SmartSoftForm } from "soft_digi";

interface FormErrors {
  [key: string]: string | null;
}

interface HeaderProps {
  setFormData: (index: any, value: any) => void;
  formData: any;
  hsnData:any[]
}

const VendorRatesSubForm: React.FC<HeaderProps> = ({
  formData,
  setFormData,
  hsnData
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
      width: "2",
      name: "sd_hsn_id",
      element: {
        options: hsnData,
      },
    },
    {
      type: "SELECT_BOX",
      width: "2",
      name: "sd_vehicle_types_id",
      element: {
        options: options_vehicle,
        inputProps: {
          disabled:
            formData.sd_hsn_id &&
            formData.sd_hsn_id.value &&(
            formData.sd_hsn_id.value == "1"|| 
             formData.sd_hsn_id.value == "2")
              ? false
              : true,
        },
      },
    },
    {
      type: "SELECT_BOX",
      width: "2",
      name: "rate_type",
      element: {
        options: options_select,
      },
    },
    {
      type: "TEXT_BOX",
      width: "1",
      name: "min_start",
      element: {
        inputProps: {
          disabled:
            formData.rate_type &&
            formData.rate_type.value &&
            formData.rate_type.value == "2"
              ? false
              : true,
        },
      },
    },
    {
      type: "TEXT_BOX",
      width: "1",
      name: "min_end",
      element: {
        inputProps: {
          disabled:
            formData.rate_type &&
            formData.rate_type.value &&
            formData.rate_type.value == "2"
              ? false
              : true,
        },
      },
    },
    {
      type: "TEXT_BOX",
      width: "2",
      name: "price",
    },
    {
      type: "TEXT_BOX",
      width: "1",
      name: "extra_price",
      element: {
        inputProps: {
          disabled:
            formData.rate_type &&
            formData.rate_type.value &&
            formData.rate_type.value == "2"
              ? false
              : true,
        },
      },
    },
    {
      type: "TEXT_BOX",
      width: "1",
      name: "min_units_vehicle",
      element: {
        inputProps: {
          disabled:
            formData.rate_type &&
            formData.rate_type.value &&
            formData.rate_type.value == "2"
              ? false
              : true,
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

export default VendorRatesSubForm;
