import { useState } from "react";
import { useSiteContext } from "../../contexts/SiteProvider";
import {
  SmartFormInterFace,
  SmartSofFile,
  SmartSoftButton,
  SmartSoftForm,
  SmartValid,
} from "soft_digi";
import { ALLOW_NUMERIC } from "../../services/PatternSerivce";
import { getImageContent } from "../../services/core/FileService";

interface FormData {
  ename?: string;
  age?: string;
  gender?: string;
  profile_image?: any;
}

interface FormErrors {
  [key: string]: string | null;
}

const Profile = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { closeModal } = useSiteContext();

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "profile_image" && value) {

    }
  };

  const handleErrorChange = (name: string | any, value: any) => {
    setFormErrors((prev: any) => {
      const updatedFormData = { ...prev };
      if (value === null || value === "") {
        delete updatedFormData[name];
      } else {
        updatedFormData[name] = value;
      }
      return updatedFormData;
    });
  };

  const loginFormValidations = {
    ename: [SmartValid.required("User Name is Required")],
    age: [SmartValid.required("Age is Required")],
    email: [
      SmartValid.required("Email ID is Required"),
      SmartValid.email("Please Enter a Valid Email Address"),
    ],
    password: [SmartValid.required("Password is Required")],
  };

  const formElements: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "PASSWORD", 
      width: "12",
      name: "ename",
      element: {
        label: "New Password",
        inputType: "BORDER_LABEL",
        isRequired: true,
        validations: loginFormValidations.password,
      },
    },
    {
      type: "PASSWORD", 
      width: "12",
      name: "age",
      element: {
        label: "Confirm Password",
        inputType: "BORDER_LABEL",
        isRequired: true,
        validations: loginFormValidations.password,
        allowPattern: ALLOW_NUMERIC,
      },
    },
  ];

  const handleSubmit = () => {
    setFormSubmit(true);
    if (Object.keys(formErrors).length === 0) {
      // Submit the form data if no errors
      console.log("Form submitted", formData);
    } else {
      console.log("Form contains errors", formErrors);
    }
  };

  return (
    <>
    <div className="is-size-4 has-text-wight-bold">Profile</div>
    <div className="sd-efl-input mt-6 p-3">
      
      <div className="columns is-multiline">
        {/* Profile Image Column */}
        <div className="column is-4 is-flex is-justify-content-center is-align-items-center">
          <div className="profile-header">
            <div className=" is-flex is-justify-content-center is-align-items-center">
              <img
                src={getImageContent(formData?.profile_image)}
                alt="Profile"
                className="image is-128x128"
              />
            </div>
            <div className="mt-4">
            <SmartSofFile
              placeHolder="Upload Profile Image"
              value={formData?.profile_image}
              onChange={(value) => handleInputChange("profile_image", value)}
              errorEnable={formSubmit}
              fileNameEnable={false}
              isMulti={false} 
              isRequired={true}
            />
            </div>
          </div>
        </div>

        <div className="column is-4 pl-0 is-justify-content-center is-align-items-center">
          
        <div className="">Name :{" "} ADMIN</div>
        <div className="">Email : {" " } Admin@gmail.com</div>
        </div>

     
        <div className="column is-4">
          <SmartSoftForm
            formData={formData}
            setFormData={handleInputChange}
            elements={formElements}
            formSubmit={formSubmit}
            handleErrorChange={handleErrorChange}
          />
          <div className="mt-4 has-text-right">
            <SmartSoftButton
              label="Change Password"
              rightIcon="fa fa-arrow-right"
              classList={["button", "smart-action-button"]}
              onClick={handleSubmit} 
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
