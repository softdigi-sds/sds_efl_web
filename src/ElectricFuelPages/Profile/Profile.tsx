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
import { ADMIN_USER_LOGO } from "../../services/ImageService";
import { ValidateFormNew } from "soft_digi/dist/services/smartValidationService";
import { showAlertAutoClose } from "../../services/notifyService";
import { post } from "../../services/smartApiService";
import { PASS_URL } from "../../api/AdminUrls";

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
    password: [SmartValid.required("Password is Required")],
  };
  const handleFormSubmit = () => {
    setFormSubmit(true);
    if (!ValidateFormNew(formData,formElements)) {
      return false;
    }
    let url = PASS_URL.CHANGE_PASSWORD;
    const subscription = post(url, formData,).subscribe(
      (response) => {
        setFormSubmit(false);
         showAlertAutoClose("Password Changed Successfully","success" );
         setTimeout(() => {
          window.scrollTo(0, 0);
        }, 2500);
        setFormData({});
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };
  const formElements: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "PASSWORD", 
      width: "12",
      name: "currentPassword",
      element: {
        label: "Current Password",
        inputType: "BORDER_LABEL",
        isRequired: true,
        validations: loginFormValidations.password,
      },
    },
    {
      type: "PASSWORD", 
      width: "12",
      name: "newPassword",
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
      name: "confirmPassword",
      element: {
        label: "Confirm Password",
        inputType: "BORDER_LABEL",
        isRequired: true,
        validations: loginFormValidations.password,
        allowPattern: ALLOW_NUMERIC,
      },
    },
  ];

  

  return (
    <>
    <div className="is-size-4 smart-efl-table_main_container"> <p>Profile</p></div>
    <div className="sd-efl-input mt-6 p-3">
      
      <div className="columns is-multiline">
        {/* Profile Image Column */}
        <div className="column is-4 is-flex is-justify-content-center is-align-items-center">
          <div className="profile-header">
            <div className=" is-flex is-justify-content-center is-align-items-center">
            <img
    src={formData?.profile_image ? getImageContent(formData?.profile_image) : ADMIN_USER_LOGO}
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

        <div className="user-info column is-4 ">
        <table  className="table ">

    <tr>
      <td>Name:</td>
      <td>ADMIN</td>
    </tr>
    <tr>
      <td>Email:</td>
      <td>Admin@gmail.com</td>
    </tr>
  </table>
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
              onClick={handleFormSubmit} 
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
