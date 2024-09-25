import React, { useState } from 'react';

import { Navigate, useNavigate } from 'react-router-dom';
import "./Login.css";

import { showAlertAutoClose } from '../../services/notifyService';
import { useSiteContext } from '../../contexts/SiteProvider';
import { post } from '../../services/smartApiService';
import { SmartSoftButton, SmartSoftForm } from '../../core';
import { SmartFormElementProps } from '../../core/forms/SmartFormInterface';




// Define the type for form data

interface FormErrors {
    [key: string]: string | null;
  }

const Login: React.FC = () => {
  const [formData, setFormData] = useState({});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const navigate = useNavigate();
//   const { setLoading } =useSiteContext();

  // Handle input change with proper typing
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

  const handleLogin = () => {}
  
//   const handleLogin = () => {
//     setFormSubmit(true);
//     if (!ValidateFormNew(formData, formElements)) {
//       return false;
//     }

//     const handleError = (errorMessage:any) => {
//       showAlertAutoClose(errorMessage, "error");
//       setLoading(false);
//       handleInputChange("epassword", "");
//     };
//     setLoading(true, "Logging in....Please Wait");
//     let url = LOGIN_URLS.LOGIN;
//     const subscription = post(url, formData, handleError, false).subscribe(
//       (response) => {
//         setFormSubmit(false);
      
//         showAlertAutoClose("Log In Successful", "success");
//         setLoading(false);
        
      
//         navigate("/dashboard");
//       }
//     );
//     return () => {
//       subscription.unsubscribe();
//     };
//     // console.log("errors ", formErrors);
//     /*
//     //setFormSubmit(true);
   
//     */
//   };

//   const loginFormValidations = {
   
//     email: [
//       SmartValid.required("Email ID is Required"),
//       SmartValid.email("Please Enter a Valid Email Address"),
      
//     ],
//     password: [SmartValid.required("Password is Required")],
    
//   };

  // Define form elements
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
    {
        type: 'PASSWORD',
        width: '12',
        name: 'epassword',
        element: {
        //  label: 'Password',
          isRequired: true,
          placeHolder: 'Password',
          inputType: "BORDER_LABEL",
          leftIcon: "fa fa-envelope-square",
         // validations: loginFormValidations.password,
        },
      },
  ];

//   const handleLogin=()=>{
//     navigate("/dashboard")
//   }
  return (
    <div className='smart-lnpr-login-container'>
        <div className='smart-lnpr-login-sub-container'>
       
          
          
                <div className='smart-lnpr-login-card'>
                    <p className='smart-lnpr-text'>Welcome</p>
                <SmartSoftForm
        formData={formData}
        setFormData={handleInputChange}
        elements={formElements}
        formSubmit={formSubmit}
        handleErrorChange={handleErrorChange}
      />
      <span className='has-text-right smart-forgot-text'>Forgot Password?</span>
      <div className='has-text-centered'>
      <SmartSoftButton
          label="Login"
          classList={["button smart-lnpr-login-button","mt-4"]}
          onClick={handleLogin}
        />
      </div>
     
                </div>
          
        
        </div>
    
    </div>
  );
};


export default Login


