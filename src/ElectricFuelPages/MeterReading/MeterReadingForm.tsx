import React, { useEffect, useState } from 'react'
import { useSiteContext } from '../../contexts/SiteProvider';
import { SmartFormInterFace, SmartSoftButton, SmartSoftForm, SmartValid } from 'soft_digi';
import { hubs_get_all_select } from '../../services/site/SelectBoxServices';


interface FormErrors {
    [key: string]: string | null;
  }
const MeterReadingForm = () => {
    const [formData, setFormData] = useState( {});
    const [formSubmit, setFormSubmit] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const { closeModal } = useSiteContext();
    const [allHubs, setAllHubs] = useState([]);
  
    const handleInputChange = (name: string, value: any) => {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    };
  
  
    const handleErrorChange = (name: string | any, value: any) => {
      setFormErrors((prev : any) => {
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
    useEffect(() => {
        hubs_get_all_select((data: any) => setAllHubs(data));
      }, []);
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
          width: "12",
          name: "sd_efl_hub_id",
          element: {
            label: "Hub Name",
            isRequired: true,
            options: allHubs,
            // isHorizontal: true,
            inputType: "BORDER_LABEL",
            validations: hubFormValidations.city,
          },
        },
        {
          type: "DATE",
          width: "12",
          name: "hub_id",
          element: {
            label: "Select Year / Month",
            isRequired: true,
            // inputProps: { isFocussed: true },
            // isHorizontal: true,
            inputType: "BORDER_LABEL",
            validations: hubFormValidations.hub_id,
          },
        },
    
        {
          type: "TEXT_BOX",
          width: "12",
          name: "role",
          element: {
            label: "Meter Start Reading",
            isRequired: true,
            validations: hubFormValidations.role,
            // isHorizontal: true,
            inputType: "BORDER_LABEL",
          },
        },
        {
          type: "TEXT_BOX",
          width: "12",
          name: "hub_name",
          element: {
            label: "Meter End Reading",
            isRequired: true,
            // inputProps: { isFocussed: true },
            // isHorizontal: true,
            inputType: "BORDER_LABEL",
            validations: hubFormValidations.hub_name,
          },
        },
        {
            type: "TEXT_BOX",
            width: "12",
            name: "numberof_unit",
            element: {
              label: "Number of Units",
              isRequired: true,
              // inputProps: { isFocussed: true },
            //   isHorizontal: true,
              inputType: "BORDER_LABEL",
              validations: hubFormValidations.hub_name,
              inputProps: {disabled: true}
            },
          },
    ]
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
          classList={["button", "mt-4 mr-4", "smart-third-button"]}
          onClick={closeModal}
        />
        <SmartSoftButton
          label="Submit"
           rightIcon='fa fa-arrow-right'
          classList={["button ", "mt-4", "smart-action-button"]}
          onClick={handleLogin}
        />
      </div>
      </div>
    </>
  )
}

export default MeterReadingForm