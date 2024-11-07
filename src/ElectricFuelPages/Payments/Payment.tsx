import React, { useState } from "react";
import PaymentsCount from "./PaymentsCount";
import PaymentInvoice from "./PaymentInvoice";
import RecentPayment from "./RecentPayment";
import { SmartFormInterFace, SmartSoftButton, SmartSoftForm } from "soft_digi";
import { useSiteContext } from "../../contexts/SiteProvider";
interface FormErrors {
    [key: string]: string | null;
  }
const Payment = () => {
    const [formData, setFormData] = useState({});
    const [formSubmit, setFormSubmit] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const {setLoading,closeModal } = useSiteContext();

    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleFilterClick = () => {
      setIsFormVisible((prev) => !prev); 
    };
    const handleInputChange = (name: string, value: any) => {
  
        setFormData((prev:any) => ({ ...prev, [name]: value }));
        
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
    const options = [
        { value: "1", label: "Test" },
        { value: "2", label: "Test" },
        { value: "3", label: "test" },
      ];
  const formElements:SmartFormInterFace.SmartFormElementProps[]= [
    {
      type: "SELECT_BOX",
      width: "3",
      name: "customer",
      element: {
        label: "Bill",
        isRequired:true,
        options: options,
        inputProps: { isFocussed: true },
        inputType: "BORDER_LABEL",
      },
    },
    {
        type: "SELECT_BOX",
        width: "3",
        name: "invoice",
        element: {
          label: "Customer",
          isRequired:true,
          options: options,
          inputProps: { isFocussed: true },
          inputType: "BORDER_LABEL",
        },
      },
      {
        type: "SELECT_BOX",
        width: "3",
        name: "invoice",
        element: {
          label: "Hub",
          isRequired:true,
          options: options,
          inputProps: { isFocussed: true },
          inputType: "BORDER_LABEL",
        },
      },
      {
        type: "BUTTON",
        width: "3",
        name: "",
        // class_name: "has-text-right",
        element: {
          classList: ["smart-action-button"],
          label: "Apply Filter",
          onClick:() => console.log("data", formData),
        },
      },]
  return (
    <>
    <div className="is-size-3 has-text-font-bold ">
    
      <div className=" is-flex is-justify-content-space-between mb-2">
      <span className="is-size-4 has-text-weight-bold mb-1 has-text-white">Payment</span> 

      <div className="has-text-right ">
        <SmartSoftButton
          label="Filter"
          leftIcon={isFormVisible ? "fa fa-times" : "fa fa-filter"}
          classList={["button", "mt-1", ]}
          onClick={handleFilterClick}
        /></div>
      </div>   </div>
      {isFormVisible && ( 
        <div className="sd-efl-input mt-4">
          <SmartSoftForm
            formData={formData}
            setFormData={handleInputChange}
            elements={formElements}
            formSubmit={formSubmit}
            handleErrorChange={handleErrorChange}
          />
        </div>
      )}
  
      <div className="has-text-white">

        <div className="">
       
          <PaymentsCount />
        </div>
        <div className="m-4 mt-6">
          <PaymentInvoice />
        </div>
        <div className="m-4 mt-6">
          <RecentPayment />
        </div>
      </div>
    </>
  );
};

export default Payment;
