import React from "react";
import { SmartFormInterFace, SmartSoftForm } from "soft_digi";

interface FormErrors {
  [key: string]: string | null;
}

interface HeaderProps {
  setFormData: (index: any, value: any) => void;
  formData: any;
}

const VendorRatesSubForm: React.FC<HeaderProps> = ({
  formData,
  setFormData,
}) => {
  const options_select = [
    { value: "1", label: "Fixed" },
    { value: "2", label: "Minimum" },
    { value: "3", label: "Per Unit" },
  ];
  const options_hsn = [
    { value: "96485", label: "Electricity charge" },
    { value: "96325", label: "Parking Charges" },
  ];

  const formElements: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "SELECT_BOX",
      width: "2",
      name: "sd_hsn_id",
      element: {
        options: options_hsn,inputProps: {
          disabled: true,
        },
      },
    },
    {
      type: "SELECT_BOX",
      width: "2",
      name: "rate_type",
      element: {
        options: options_select,inputProps: {
          disabled: true,
        },
      },
    },
    {
      type: "TEXT_BOX",
      width: "2",
      name: "min_start",
      element: {
        inputProps: {
          disabled: true,
        },
      },
    },
    {
      type: "TEXT_BOX",
      width: "2",
      name: "min_end",
      element: {
        inputProps: {
          disabled: true,
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
      width: "2",
      name: "extra_price",
      element: {
        inputProps: {
          disabled: true,
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
