import React, { useState } from "react";
import { SmartFormInterFace, SmartSoftButton, SmartSoftForm } from "soft_digi";
import { useSiteContext } from "../../contexts/SiteProvider";
interface FormErrors {
  [key: string]: string | null;
}
const RecentPaymentForm = () => {
  const [formData, setFormData] = useState({});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { setLoading, closeModal } = useSiteContext();
  const handleInputChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleErrorChange = (name: string | any, value: any) => {
    setFormErrors((prev) => {
      const updatedFormData = { ...prev };
      if (value === null || value === "") {
        delete updatedFormData[name];
      } else {
        updatedFormData[name] = value;
      }
      return updatedFormData;
    });
  };
  const options = [
    { value: "1", label: "Test" },
    { value: "2", label: "Test" },
    { value: "3", label: "test" },
  ];
  const formElements: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "SELECT_BOX",
      width: "6",
      name: "customer",
      element: {
        label: "Select Customer",
        isRequired: true,
        options: options,
        inputProps: { isFocussed: true },
        inputType: "BORDER_LABEL",
      },
    },
    {
      type: "SELECT_BOX",
      width: "6",
      name: "invoice",
      element: {
        label: "Select Invoice",
        isRequired: true,
        options: options,
        inputProps: { isFocussed: true },
        inputType: "BORDER_LABEL",
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "amount_in",
      element: {
        label: "Invoice Amount",
        isRequired: true,
        inputType: "BORDER_LABEL",
        max: 15,
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "amount_paid",
      element: {
        label: "Paid Amount",
        isRequired: true,

        inputType: "BORDER_LABEL",

        max: 15,
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "amount_rem",
      element: {
        label: "Remaining Amount",
        isRequired: true,

        inputType: "BORDER_LABEL",

        max: 15,
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "amount_ent",
      element: {
        label: "Enter Amount",
        isRequired: true,

        inputType: "BORDER_LABEL",

        max: 15,
      },
    },
    {
      type: "SELECT_BOX",
      width: "12",
      name: "payment",
      element: {
        label: "Payment Method Details",
        isRequired: true,
        options: options,
        inputProps: { isFocussed: true },
        inputType: "BORDER_LABEL",
      },
    },
  ];
  return (
    <div>
      <div className="sd-efl-input">
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
            classList={["button", "smart-third-button", "mt-4 mr-4"]}
            onClick={closeModal}
          />
          <SmartSoftButton
            label="Submit"
            rightIcon="fa fa-arrow-right"
            classList={["button ", "mt-4", "smart-action-button"]}
            onClick={() => console.log("data", formData)}
          />
        </div>
      </div>
    </div>
  );
};

export default RecentPaymentForm;
