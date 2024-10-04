import React, { useState } from "react";
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
    if (name === "checkbox_remember_me") {
      value = value ? "true" : "false";
    }
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
      //showAlertAutoClose("Logged In Successfully", "success");
      if (checkInterSection(response.data.roles || [], ["ADMIN"])) {
        navigate("/e-fuel/dashboard");
      }
      if (checkInterSection(response.data.roles || [], ["ACCOUNTS"])) {
        navigate("/e-fuel/invoices");
      } else {
        navigate("e-fuel/vehicles-report");
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
          {/* <SmartSoftCheckRadioSwitch
          options={options_remember_me}
          name="checkbox_remember_me"

          value={formData?.checkbox_remember_me === "true" ? "1" : "0"}
          onChange={(value) => handleInputChange("checkbox_remember_me", value)}
          isRight={false}
        /> */}
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
        placeHolder: "Email ",
        max: 255,
        // inputType: "BORDER_LABEL",
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
        placeHolder: "Password",
        // inputType: "BORDER_LABEL",
        leftIcon: "fa fa-envelope-square",
        validations: loginFormValidations.password,
      },
    },
    // {
    //   type: "LABEL",
    //   name: "remember_me",
    //   width: "12",
    //   labelFunction: passWordPin,
    // },
  ];

  return (
    <div className="smart-lnpr-login-container">
      <div className="smart-lnpr-login-sub-container columns is-vcentered is-centered">
        <div className="column is-6 has-text-centered smart-lnpr-login-card is-vcentered is-centered p-0 m-0">
          <div className="smart-lnpr-image-content-mobile">
            <img src={LOGIN_PAGE_LOGO} alt="Login" />
          </div>
        </div>
        <div className="smart-lnpr-login-card column is-6">
          <div
            className={
              isOpen
                ? "smart-lnpr-login-card-inner-active"
                : "smart-lnpr-login-card-inner"
            }
          >
            <div className="mb-6">
              <img src={LOGO} alt="" />
            </div>
            <div className="flip-card-front">
              <p className="smart-lnpr-text mb-3">Welcome</p>
              <SmartSoftForm
                formData={formData}
                setFormData={handleInputChange}
                elements={formElements}
                formSubmit={formSubmit}
                handleErrorChange={handleErrorChange}
              />

              <div className="has-text-centered">
                <SmartSoftButton
                  label="Login"
                  classList={["smart-lnpr-login-button"]}
                  onClick={handleLogin}
                />
              </div>
              <span className="smart-forgot-text" onClick={toggleCardFlip}>
                Forgot Password?
              </span>
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
