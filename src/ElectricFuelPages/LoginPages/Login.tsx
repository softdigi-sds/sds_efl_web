import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { LOGIN_URLS } from "../../api/LoginUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { SmartSoftButton, SmartSoftForm } from "../../core";
import { SmartFormElementProps } from "../../core/forms/SmartFormInterface";

import { showAlertAutoClose } from "../../services/notifyService";
import { post } from "../../services/smartApiService";
import ForgotPassword from "./ForgotPassword";
import {
  LOGIN_PAGE_LOGO,
  LOGO,
  OUR_SERVICE_CARD_FOUR,
} from "../../services/ImageService";
import { SmartSoftCheckRadioSwitch } from "soft_digi";
import {
  SmartValid,
  ValidateFormNew,
} from "soft_digi/dist/services/smartValidationService";
import { checkInterSection } from "../../services/core/FilterService";
import { getRemeberMe, removeRemeberMe, setRemeberMe } from "../../services/sessionService";

// Define the type for form data
interface FormErrors {
  [key: string]: string | null;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ checkbox_remember_me: false });
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
    // if (name === "checkbox_remember_me") {
    //   value = value ? "true" : "false";
    // }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle error changes with proper typing
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

  const handleRemeberMe = () => {
    let checkbox_remember_me =
      formData.checkbox_remember_me !== undefined
        ? formData.checkbox_remember_me
        : "0";
    // console.log("check box rmeber me " , checkbox_remember_me, formData);
    if (checkbox_remember_me === "1") {
      setRemeberMe(formData);
    } else {
      removeRemeberMe();
    }
  };

  const handleRemeberMeLoad = () => {
    // let remember_data = getRemeberMe();
    let remember_data_original = getRemeberMe();
    const remember_data = { ...remember_data_original };
    delete remember_data.epassword;
    if (remember_data) {
      let checkbox_remember_me =
        remember_data.checkbox_remember_me !== undefined
          ? remember_data.checkbox_remember_me
          : "0";
      if (checkbox_remember_me === "1") {
        setFormData(remember_data);
      }
    }
  };
  useEffect(() => {
    handleRemeberMeLoad();
  }, []);

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
    const subscription = post(url, formData, {
      requiresAuthorization: false,
      handleError: handleError,
    }).subscribe((response) => {
      setFormSubmit(false);
      setUser(response.data);
      handleRemeberMe();
      //showAlertAutoClose("Logged In Successfully", "success");
      console.log("response.data ", response.data.roles);
      if (checkInterSection(response.data.roles || [], ["ADMIN"])) {
        navigate("/e-fuel/dashboard");
      } else if (checkInterSection(response.data.roles || [], ["ACCOUNTS"])) {
        navigate("/e-fuel/invoices");
      } else {
        navigate("/e-fuel/vehicles-report");
      }
    });

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
  const options_remember_me = [{ value: "1", label: "Remember Me" }];
  const passWordPin = () => {
    return (
      <div className="is-flex is-justify-content-space-between mb-4 has-text-weight-medium">
        <span className="">
          <SmartSoftCheckRadioSwitch
          options={options_remember_me}
          name="checkbox_remember_me"

          value={formData?.checkbox_remember_me === true ? "1" : "0"}
          onChange={(value) => handleInputChange("checkbox_remember_me", value)}
          isRight={false}
        />
        </span>
      </div>
    );
  };

  const formElements: SmartFormElementProps[] = [
    {
      type: "TEXT_BOX",
      width: "12",
      name: "emailid",
      element: {
        label: "Email",
        isRequired: true,
        // placeHolder: "Email ",
        max: 255,
        inputType: "BORDER_LABEL_FOCUS",
        leftIcon: "fa fa-envelope-square",
        validations: loginFormValidations.email,
      },
    },
    {
      type: "PASSWORD",
      width: "12",
      name: "epassword",
      element: {
        label: "Password",
        isRequired: true,
        // placeHolder: "Password",
        inputType: "BORDER_LABEL_FOCUS",
        leftIcon: "fa fa-lock",
        validations: loginFormValidations.password,
      },
    },
    {
      type: "LABEL",
      name: "remember_me",
      width: "12",
      labelFunction: passWordPin,
    },
  ];

  return (
    <div className="smart-lnpr-login-container">
     
      
        <div className="smart-lnpr-login-card   ">
           <div className="">
          <div
            className={
              isOpen
                ? "smart-lnpr-login-card-inner-active"
                : "smart-lnpr-login-card-inner"
            }
          >
            <div className="mb-3 m-3  has-text-centered "> <div className="smart-elf-login-image">
              <img src={LOGO} alt="" /> </div>
            </div>
            <div className="flip-card-front">
              <p className="smart-lnpr-text ">Welcome</p>
               <div className="smart-elf-login-input mt-3">
              <SmartSoftForm
                formData={formData}
                setFormData={handleInputChange}
                elements={formElements}
                formSubmit={formSubmit}
                handleErrorChange={handleErrorChange}
              />
</div>
              <div className="has-text-centered">
                <SmartSoftButton
                  label="Login"
                  classList={["smart-lnpr-login-button"]}
                  onClick={handleLogin}
                />
              </div>
              {/* <span className="smart-forgot-text" onClick={toggleCardFlip}>
                Forgot Password?
              </span> */}
            </div>
            {/* <div className="flip-card-back">
              <ForgotPassword toggleSidebar={toggleCardFlip} />
            </div> */} <div className="mt-6"></div>
            <span className="top"></span>
  <span className="right"></span>
  <span className="bottom"></span>
  <span className="left"></span>
          </div> </div>
        </div>
      
    
    </div>
  );
};

export default Login;
