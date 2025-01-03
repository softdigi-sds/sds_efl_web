import React, { useEffect, useState } from "react";
import { SmartFormInterFace, SmartSoftButton, SmartSoftForm } from "soft_digi";
import { useSiteContext } from "../../contexts/SiteProvider";

import { SmartValid, ValidateFormNew } from "soft_digi/dist/services/smartValidationService";
import { PAYMENT_URLS } from "../../api/UserUrls";
import { showAlertAutoClose } from "../../services/notifyService";
import { ALLOW_NUMERIC } from "../../services/PatternSerivce";
import { costomer_invoice_all_select, vendors_get_all_select } from "../../services/site/SelectBoxServices";
import { post } from "../../services/smartApiService";


interface FormErrors {
  [key: string]: string | null;
}
interface HeaderProps {
  loadTableData: () => void;
  dataIn?:any

}
const RecentPaymentForm: React.FC<HeaderProps> = ({ loadTableData,dataIn}) => {
  const [formData, setFormData] = useState<any>({});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { setLoading, closeModal } = useSiteContext();
  const [allRole, setAllRole] = useState([]);
  const [invoice, setInvoice] = useState([]);
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
        loadTableData();
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };
  useEffect(() => {    
    vendors_get_all_select((data: any) => setAllRole(data)); 
    if(dataIn){
      setFormData(dataIn)
    } 
  }, []);
  
  useEffect(() => {
    let customer_id = formData?.sd_customer_id?.value;
    //  console.log("data", customer_id)
    if (customer_id && customer_id > 0){
      costomer_invoice_all_select(customer_id, (data: any) =>
        setInvoice(data)
      );
    }
  }, [formData?.sd_customer_id]);

  const payFormValidations = {
    cus: [SmartValid.required("Select Customer is Required")],
    invoi: [SmartValid.required("Select Invoice is Required")],
    amoun: [SmartValid.required("Amount is Required")],
    methods: [SmartValid.required("Payment Method is Required")],

  };

  const PaymentMode=[
    { value: "Payment", label: "Payment" },
    { value: "TDS", label: "TDS" },
  ]
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
        validations: payFormValidations.cus,
      },
    },
    {
      type: "SELECT_BOX",
      width: "6",
      name: "sd_invoice_id",
      element: {
        label: "Select Invoice",
        isRequired: true,
        options: invoice,
        inputProps: { isFocussed: true },
        inputType: "BORDER_LABEL",
        validations: payFormValidations.invoi,
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
      name: "payment_amount",
      element: {
        label: "Enter Amount",
        isRequired: true,
        inputType: "BORDER_LABEL",
        max: 15,
        pattern:  ALLOW_NUMERIC ,
        validations: payFormValidations.amoun,
      },
    },
    {
      type: "DATE",
      width: "6",
      name: "payment_date",
      element: {
        label: "Select Date",
        placeHolder: "DD-MM-YYYY",
        isRequired: true,
        inputType: "BORDER_LABEL",
      },
    },
    {
      type: "SELECT_BOX",
      width: "6",
      name: "payment_mode",
      element: {
        label: "Payment Mode",
        isRequired: true,
        options: PaymentMode,
        inputProps: { isFocussed: true },
        inputType: "BORDER_LABEL",
        // validations: payFormValidations.invoi,
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "payment_method",
      element: {
        label: "Payment Method Details",
        isRequired: true,
        inputType: "BORDER_LABEL",
        max: 25,
     
        validations: payFormValidations.methods,
      },
      hideFunction: (data) => {
        // console.log("formdata " , formData)
        return formData.payment_mode &&
          formData.payment_mode.value &&
          formData.payment_mode.value === "Payment"
          ? false
          : true;
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
