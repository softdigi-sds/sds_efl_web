import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SmartFormElementProps } from '../../core/forms/SmartFormInterface';
// import { SmartSoftButton, SmartSoftForm } from '../../core';
import "./Login.css";
import { SmartSoftButton, SmartSoftForm } from '../../core';
interface FormErrors {
    [key: string]: string | null;
  }
  interface LoginProp {
    toggleSidebar: () => void|null; 
  }
const ForgotPassword:React.FC<LoginProp> = ({toggleSidebar}) => {
    const [formData, setFormData] = useState({});
    const [formSubmit, setFormSubmit] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const navigate = useNavigate();

    const handleInputChange = (name: string, value: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        
      };
    
      // Handle error changes with proper typing
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
    
      const handleForgotPassword =()=>{

      }

    const formElements:SmartFormElementProps[] = [
        {
          type: 'TEXT_BOX',
          width: '12',
          name: 'euserid',
          element: {
            // label: 'Email ID',
            isRequired: true,
            placeHolder: 'Email ',
            max: 255,
            inputType: "BORDER_LABEL",
            leftIcon: "fa fa-envelope-square",
           // validations: loginFormValidations.email,
          },
        },
       
      ];


    
  return (
    <div>
    <div >
                <div >
                <div className="">
                    <p className='smart-lnpr-text'>Forgot Password</p>
                <SmartSoftForm
        formData={formData}
        setFormData={handleInputChange}
        elements={formElements}
        formSubmit={formSubmit}
        handleErrorChange={handleErrorChange}
      />
     
      <div className='has-text-centered'>
      <SmartSoftButton
          label="Submit"
          classList={["button smart-lnpr-login-button","mt-4"]}
           onClick={handleForgotPassword}
        />
      </div>
      <p onClick={()=>toggleSidebar()}>Back to Login</p>
      </div>
      
      </div>
                </div>
    </div>
  )
}

export default ForgotPassword
