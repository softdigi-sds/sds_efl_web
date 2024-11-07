import React, { useEffect, useState } from "react";
import { SmartFormInterFace, SmartSoftButton, SmartSoftForm } from "soft_digi";
import { useSiteContext } from "../../contexts/SiteProvider";
import { costomer_invoice_all_select } from "../../services/site/SelectBoxServices";
import { ValidateFormNew } from "soft_digi/dist/services/smartValidationService";
import { post } from "../../services/smartApiService";
import { showAlertAutoClose } from "../../services/notifyService";
import { PAYMENT_URLS } from "../../api/UserUrls";

interface FormErrors {
  [key: string]: string | null;
}

const RecentPaymentForm = () => {
  const [formData, setFormData] = useState<any>({});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { setLoading, closeModal } = useSiteContext();
  const [allRole, setAllRole] = useState([]);
  
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

  useEffect(() => {
    const cus_data = formData?.sd_customer_id?.value;
      costomer_invoice_all_select(cus_data, (data: any) => setAllRole(data));
  }, [formData?.sd_customer_id]);

  const handleSubmit = () => {
    setFormSubmit(true);
    if (!ValidateFormNew(formData, formElements)) {
      return false;
    }
    let url = PAYMENT_URLS.INSERT;

    const subscription = post(url, formData).subscribe(
      (response) => {
        showAlertAutoClose("Data Saved Successfully", "success");
        closeModal();
      }
    );
    return () => {
      subscription.unsubscribe();
    };
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
      name: "sd_customer_id",
      element: {
        label: "Select Customer",
        isRequired: true,
        options: allRole,
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
        inputProps: { disabled: true },
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "amount_paid",
      element: {
        label: "Paid Amount",
        isRequired: true,
        inputProps: { disabled: true },
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
        inputProps: { disabled: true },
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
      type: "TEXT_BOX",
      width: "12",
      name: "payment_method_details",
      element: {
        label: "Payment Method Details",
        isRequired: true,
        inputType: "BORDER_LABEL",
        max: 15,
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
            label="Save"
            rightIcon="fa fa-arrow-right"
            classList={["button", "mt-4", "smart-action-button"]}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default RecentPaymentForm;
