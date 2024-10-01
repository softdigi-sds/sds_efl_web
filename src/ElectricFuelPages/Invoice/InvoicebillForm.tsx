import React, { useState } from 'react'
import { SmartFormInterFace, SmartSoftForm } from 'soft_digi'
interface FormErrors {
    [key: string]: string | null;
  }
const InvoicebillForm = () => {
    const [formData, setFormData] = useState({});
    const [formSubmit, setFormSubmit] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [states, setStates] = useState([]);
  
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
  
    const filterFields:SmartFormInterFace.SmartFormElementProps[]=[
        {
          type: "DATE",
          width: "4",
          name: "invoice_date",
          element: {
            placeHolder: "Start Date",
            isRequired: true,
            // inputProps: { isFocussed: true },
          },
        },
        {
          type: "DATE",
          width: "4",
          name: "invoice_end",
          element: {
            placeHolder: "End Date",
            isRequired: true,
            // inputProps: { isFocussed: true },
          },
        },
        {
          type: "BUTTON",
          width: "2",
          name: "invoice_button",
          element: {
            label: "Create Bill",
            classList: ["smart-action-button mt-0 "
            ],
          },
        },
      ]
  return (
   <>
   <div className='sd-efl-input'>

  
     <div className="m-6 has-text-right">
     
           <SmartSoftForm
        formData={formData}
        setFormData={handleInputChange}
        elements={filterFields}
        formSubmit={formSubmit}
        handleErrorChange={handleErrorChange}
      />
      </div>
      <div className="m-6"></div>
      <div className="m-6"></div>
      </div>
  
   </>
  )
}

export default InvoicebillForm