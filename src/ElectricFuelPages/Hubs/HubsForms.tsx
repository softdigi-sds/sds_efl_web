import { useEffect, useState } from "react";
import {
  SmartFormInterFace,
  SmartSoftButton,
  SmartSoftForm,
  SmartValid,
} from "soft_digi";
import { ValidateFormNew } from "soft_digi/dist/services/smartValidationService";
import { HUBS_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { showAlertAutoClose } from "../../services/notifyService";
import {
  office_get_all_select,
  role_get_select,
} from "../../services/site/SelectBoxServices";
import { post } from "../../services/smartApiService";

interface FormErrors {
  [key: string]: string | null;
}
interface HeaderProps {
  loadTableData: () => void;
  dataIn: any;
}
const HubsForms: React.FC<HeaderProps> = ({ loadTableData, dataIn }) => {
  const [formData, setFormData] = useState(dataIn ? dataIn : {});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [allRole, setAllRole] = useState([]);
  const [allOffice, setAllOffice] = useState([]);
  const { closeModal } = useSiteContext();

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    role_get_select((data: any) => setAllRole(data));
    office_get_all_select((data: any) => setAllOffice(data));
  }, []);
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
    console.log("data");
  };
  const handleSubmit = () => {
    setFormSubmit(true);
    if (!ValidateFormNew(formData, formElements)) {
      return false;
    }
    let url = HUBS_URLS.INSERT;
    if (formData.ID !== undefined) {
      formData["id"] = formData.ID;
      url = HUBS_URLS.UPDATE;
    }

    const subscription = post(url, formData).subscribe((response) => {
      //console.log("response form ", response.data);
      loadTableData();
      showAlertAutoClose("Data Saved Successfully", "success");
      closeModal();
    });
    return () => {
      subscription.unsubscribe();
    };
  };
  const options = [
    { value: "1", label: "Test" },
    { value: "2", label: "Test" },
    { value: "3", label: "test" },
  ];
  const hubFormValidations = {
    city: [SmartValid.required("City is Required")],
    hub_id: [SmartValid.required("Hub Id is Required")],
    role: [SmartValid.required("Role is Required")],
    hub_name: [SmartValid.required("Hub Name is Required")],
    locations: [SmartValid.required("Location is Required")],
    pin_code: [SmartValid.required("Pin Code is Required")],
  };
  const formElements: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "SELECT_BOX",
      width: "6",
      name: "sd_efl_office_id",
      element: {
        label: "Office City",
        isRequired: true,
        options: allOffice,
        validations: hubFormValidations.city,
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "hub_id",
      element: {
        label: "Hub ID",
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: hubFormValidations.hub_id,
      },
    },

    {
      type: "SELECT_BOX",
      width: "6",
      name: "role",
      element: {
        label: "Access Role",
        isRequired: true,
        options: allRole,
        isMulti: true,
        validations: hubFormValidations.role,
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "hub_name",
      element: {
        label: "Hub Name",
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: hubFormValidations.hub_name,
      },
    },
    {
      type: "TEXTAREA",
      width: "12",
      name: "hub_location",
      element: {
        label: "Location",
        isRequired: true,
        max: "255",
        validations: hubFormValidations.locations,
      },
    },
  ];
  return (
    <>
      <div className="">{/* <SmartHeader title={"Add Hubs Form"} /> */}</div>
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
          classList={["button", "mt-4 mr-4", "smart-third-button"]}
          onClick={closeModal}
        />
        <SmartSoftButton
          label="Submit"
          classList={["button ", "mt-4", "smart-action-button"]}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default HubsForms;
