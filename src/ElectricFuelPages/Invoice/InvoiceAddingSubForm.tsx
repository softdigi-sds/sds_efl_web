import React from "react";
import { SmartFormInterFace, SmartSoftForm } from "soft_digi";

interface FormErrors {
  [key: string]: string | null;
}

interface HeaderProps {
  setFormData: (index: any, value: any) => void;
  formData: any;
}

const InvoiceSubForm: React.FC<HeaderProps> = ({ formData, setFormData }) => {
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
  ];

  const options_vehicle = [
    { value: "1", label: "2WL" },
    { value: "2", label: "3 WL" },
    { value: "3", label: "4 WL" },
    { value: "4", label: "ZEN" },
    { value: "5", label: "TATA_ACE" },
  ];

  const totalPrice = () => {
    if (formData.tax_value) {
      let qty = formData.count ? parseFloat(formData.count) : 0;
      let taxAmount =
        parseFloat(formData.price) * (parseFloat(formData.tax_value) / 100); // Calculate tax amount
      let total_price = (parseFloat(formData.price) + taxAmount) * qty; // Add tax to the base price
      if (isNaN(total_price)) {
        total_price = 0; // Handle invalid or NaN values
      }
      return total_price;
    } else {
      return !isNaN(parseFloat(formData.price))
        ? parseFloat(formData.price)
        : 0;
    }
  };

  const formElements: SmartFormInterFace.SmartFormElementProps[] = [
    // {
    //   type: "SELECT_BOX",
    //   width: "2",
    //   name: "sd_hsn_id",
    //   element: {
    //     options: options_hsn,
    //   },
    // },
    // {
    //   type: "SELECT_BOX",
    //   width: "2",
    //   name: "sd_vehicle_types_id",
    //   element: {
    //     options: options_vehicle,
    //     inputProps: {
    //       disabled:
    //         formData.sd_hsn_id &&
    //         formData.sd_hsn_id.value &&(
    //         formData.sd_hsn_id.value == "1"||
    //          formData.sd_hsn_id.value == "2")
    //           ? false
    //           : true,
    //     },
    //   },
    // },
    // {
    //   type: "SELECT_BOX",
    //   width: "2",
    //   name: "rate_type",
    //   element: {
    //     options: options_select,
    //   },
    // },
    {
      type: "TEXT_BOX",
      width: "2",
      name: "type_hsn",
      element: {
        inputProps: {},
      },
    },
    {
      type: "TEXT_BOX",
      width: "4",
      name: "type_desc",
      element: {
        inputProps: {},
      },
    },
    {
      type: "TEXT_BOX",
      width: "1",
      name: "count",
    },

    {
      type: "TEXT_BOX",
      width: "2",
      name: "price",
    },
    {
      type: "TEXT_BOX",
      width: "1",
      name: "tax_value",
    },
    {
      type: "TEXT_BOX",
      width: "2",
      name: "total",
      element: {
        valueFunction: () => {
          return "" + totalPrice();
        },
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

export default InvoiceSubForm;
