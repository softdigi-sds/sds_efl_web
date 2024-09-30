import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { LOGIN_URLS } from '../../api/LoginUrls';
import { useSiteContext } from '../../contexts/SiteProvider';
import { SmartSoftButton, SmartSoftForm } from '../../core';
import { SmartFormElementProps } from '../../core/forms/SmartFormInterface';
import { SmartValid, ValidateFormNew } from '../../core/services/smartValidationService';
import { showAlertAutoClose } from '../../services/notifyService';
import { post } from '../../services/smartApiService';
import ForgotPassword from './ForgotPassword';
import { OUR_SERVICE_CARD_FOUR } from '../../services/ImageService';

// Define the type for form data
interface FormErrors {
  [key: string]: string | null;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState({});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCardFlip = () => {
    setIsOpen(!isOpen); // Toggle the state
  };

  const { setLoading, setUser } = useSiteContext();

  // Handle input change with proper typing
  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle error changes with proper typing
  const handleErrorChange = (name: string | any, value: any) => {
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

  const handleLogin = () => {
    setFormSubmit(true);
    if (!ValidateFormNew(formData, formElements)) {
      return false;
    }

    const handleError = (errorMessage: any) => {
      showAlertAutoClose(errorMessage, "error");
      handleInputChange("epassword", "");
    };
    
    let url = LOGIN_URLS.LOGIN;
    const subscription = post(url, formData, { requiresAuthorization: false, handleError: handleError }).subscribe(
      (response) => {
        setFormSubmit(false);
        setUser(response.data);
        showAlertAutoClose("Log In Successful", "success");
        navigate("/e-fuel/dashboard");
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  };

  const loginFormValidations = {
    email: [
      SmartValid.required("Email ID is Required"),
      SmartValid.email("Please Enter a Valid Email Address"),
    ],
    password: [SmartValid.required("Password is Required")],
  };

  // Define form elements
  const formElements: SmartFormElementProps[] = [
    {
      type: 'TEXT_BOX',
      width: '12',
      name: 'emailid',
      element: {
        isRequired: true,
        placeHolder: 'Email ',
        max: 255,
        inputType: "BORDER_LABEL",
        leftIcon: "fa fa-envelope-square",
        validations: loginFormValidations.email,
      },
    },
    {
      type: 'PASSWORD',
      width: '12',
      name: 'epassword',
      element: {
        isRequired: true,
        placeHolder: 'Password',
        inputType: "BORDER_LABEL",
        leftIcon: "fa fa-envelope-square",
        validations: loginFormValidations.password,
      },
    },
  ];

  return (
    <div className='smart-lnpr-login-container'>
    <div className='smart-lnpr-login-sub-container columns is-vcentered is-centered'>
    <div className="smart-lnpr-image-content-mobile">
        <div className="column is-6 has-text-centered smart-lnpr-login-card is-vcentered is-centered">
        
            <img src={OUR_SERVICE_CARD_FOUR} alt="Login" /></div>
        </div>
        <div className='smart-lnpr-login-card column is-6'>
            <div className={isOpen ? "smart-lnpr-login-card-inner-active" : 'smart-lnpr-login-card-inner'}>
                <div className="flip-card-front">
                    <p className='smart-lnpr-text'>Welcome</p>
                    <SmartSoftForm
                        formData={formData}
                        setFormData={handleInputChange}
                        elements={formElements}
                        formSubmit={formSubmit}
                        handleErrorChange={handleErrorChange}
                    />
                    <span className='smart-forgot-text' onClick={toggleCardFlip}>Forgot Password?</span>
                    <div className='has-text-centered'>
                        <SmartSoftButton
                            label="Login"
                            classList={["smart-lnpr-login-button"]}
                            onClick={handleLogin}
                        />
                    </div>
                </div>
                <div className="flip-card-back">
                    <ForgotPassword toggleSidebar={toggleCardFlip} />
                </div>
            </div>
        </div>
    </div>
</div>

  );
};

export default Login;
