import React, { useEffect, useState } from "react";
import {
  SmartFormInterFace,
  SmartSoftButton,
  SmartSoftForm,
  SmartValid,
} from "soft_digi";
import { ValidateFormNew } from "soft_digi/dist/services/smartValidationService";
import { VENDERS_URLS } from "../../api/UserUrls";
import { post } from "../../services/smartApiService";
import { showAlertAutoClose } from "../../services/notifyService";
import { useSiteContext } from "../../contexts/SiteProvider";
import {
  admin_states_select,
  hubs_get_all_select,
} from "../../services/site/SelectBoxServices";
import { ALLOW_ALPHABET_SPACE, ALLOW_NUMERIC } from "../../services/PatternSerivce";

interface FormErrors {
  [key: string]: string | null;
}
interface HeaderProps {
  loadTableData: () => void;
  dataIn: any;
}
const VendorsForm: React.FC<HeaderProps> = ({ loadTableData, dataIn }) => {
  const [formData, setFormData] = useState(dataIn ? dataIn : {});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [allHubs, setAllHubs] = useState([]);
  const [allStats, setAllStats] = useState([]);
  const { closeModal } = useSiteContext();

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };
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

  useEffect(() => {
    hubs_get_all_select((data: any) => setAllHubs(data));
    admin_states_select((data: any) => setAllStats(data));
  }, []);
  const handleSubmit = () => {
    setFormSubmit(true);
    if (!ValidateFormNew(formData, formElements)) {
      return false;
    }
    let url = VENDERS_URLS.INSERT;
    if (formData.ID !== undefined) {
      formData["id"] = formData.ID;
      url = VENDERS_URLS.UPDATE;
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
  const vendorFormValidations = {
    hub_id: [SmartValid.required("Hub Id is Required")],
    company: [SmartValid.required("Company is Required")],
    name: [SmartValid.required("Name is Required")],
    address: [SmartValid.required("Address is Required")],
    gst_no: [SmartValid.required("GST No is Required")],
    pan_no: [SmartValid.required("Pan No is Required")],
    pin_code: [SmartValid.required("Pin Code is Required")],
    code: [SmartValid.required("Code is Required")],
    statee: [SmartValid.required("State is Required")],
  };
  const formElements: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "SELECT_BOX",
      width: "4",
      name: "sd_hub_id",
      element: {
        label: "Hub ID",
        isRequired: true,
        validations: vendorFormValidations.hub_id,
        options: allHubs,
        inputType: "BORDER_LABEL",
        inputProps: { disabled: formData.ID && formData.ID ? true : false },
      },
    },
    {
      type: "TEXT_BOX",
      width: "4",
      name: "vendor_code",
      element: {
        label: "Code",
        isRequired: true,
        // inputProps: { isFocussed: true },
        validations: vendorFormValidations.code,
        inputType: "BORDER_LABEL",
        inputProps: { disabled: formData.ID && formData.ID ? true : false },
      },
    },
    {
      type: "TEXT_BOX",
      width: "4",
      name: "vendor_company",
      element: {
        label: "Company",
        isRequired: true,
        // inputProps: { isFocussed: true },
        validations: vendorFormValidations.company,
        inputType: "BORDER_LABEL",
        // inputProps: {disabled:formData.ID && formData.ID ? true:false}
      },
    },
    {
      type: "TEXT_BOX",
      width: "4",
      name: "vendor_name",
      element: {
        label: "Name",
        validations: vendorFormValidations.name,
        isRequired: true,
        // inputProps: { isFocussed: true },
        inputType: "BORDER_LABEL",
        allowPattern: ALLOW_ALPHABET_SPACE,
      },
    },
    {
      type: "TEXT_BOX",
      width: "4",
      name: "gst_no",
      element: {
        label: "GST No.",
        isRequired: true,
        // inputProps: { isFocussed: true },
        validations: vendorFormValidations.gst_no,
        inputType: "BORDER_LABEL",
        max: 15,
      },
    },
    {
      type: "TEXT_BOX",
      width: "4",
      name: "pan_no",
      element: {
        label: "PAN No.",
        isRequired: true,
        // inputProps: { isFocussed: true },
        validations: vendorFormValidations.pan_no,
        inputType: "BORDER_LABEL",
        max: 10,
      },
    },
    {
      type: "TEXT_BOX",
      width: "4",
      name: "billing_to",
      element: {
        label: "Billing To",
        isRequired: true,
        // inputProps: { isFocussed: true },
        validations: vendorFormValidations.pan_no,
        inputType: "BORDER_LABEL",
      },
    },
    {
      type: "SELECT_BOX",
      width: "4",
      name: "state_name",
      element: {
        label: "State",
        isRequired: true,
        validations: vendorFormValidations.statee,
        options: allStats,
        inputType: "BORDER_LABEL",
      },
    },
    {
      type: "TEXT_BOX",
      width: "4",
      name: "pin_code",
      element: {
        label: "Pin Code",
        // placeHolder: "City",
        isRequired: true,
        // inputProps: { isFocussed: true },
        validations: vendorFormValidations.pin_code,
        inputType: "BORDER_LABEL",  pattern:  ALLOW_NUMERIC , max: "6",
      },
    },
    {
      type: "TEXTAREA",
      width: "6",
      name: "address_one",
      element: {
        label: "Address-1",
        isRequired: true,
        max: "255",
        validations: vendorFormValidations.address,
        inputType: "BORDER_LABEL",
      },
    },
    {
      type: "TEXTAREA",
      width: "6",
      name: "address_two",
      element: {
        label: "Address-2",
        // isRequired: true,
        max: "255",
        // validations: vendorFormValidations.address,
        inputType: "BORDER_LABEL",
      },
    },
  ];
  return (
    <>
      <div className="sd-efl-input">
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
            classList={["button", "smart-third-button", "mt-4 mr-4"]}
            onClick={closeModal}
          />
          <SmartSoftButton
           label={formData.ID ? "Update":"Submit"}
            rightIcon="fa fa-arrow-right"
            classList={["button ", "mt-4", "smart-action-button"]}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default VendorsForm;
