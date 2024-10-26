import React, { useEffect, useState } from "react";
import { useSiteContext } from "../../contexts/SiteProvider";
import {
  SmartFormInterFace,
  SmartSoftButton,
  SmartSoftForm,
  SmartValid,
} from "soft_digi";
import { hubs_get_all_select } from "../../services/site/SelectBoxServices";
import { ValidateFormNew } from "soft_digi/dist/services/smartValidationService";
import { METER_READINGS_URLS } from "../../api/UserUrls";
import { post } from "../../services/smartApiService";
import { showAlertAutoClose } from "../../services/notifyService";
import {
  ALLOW_ALPHABET_SPACE,
  ALLOW_FLOAT,
  ALLOW_FLOAT_DYNAMIC,
  ALLOW_NUMERIC,
} from "../../services/PatternSerivce";
import { changeDateTimeZoneFormat } from "../../services/core/CommonService";

interface FormErrors {
  [key: string]: string | null;
}

interface HeaderProps {
  loadTableData: () => void;
  dataIn: any;
  currentDate: any;
}
const MeterReadingForm: React.FC<HeaderProps> = ({
  dataIn,
  loadTableData,
  currentDate,
}) => {
  const [formData, setFormData] = useState(dataIn ? dataIn : {});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { closeModal } = useSiteContext();
  const [allHubs, setAllHubs] = useState([]);

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setFormData({
      meter_year: `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`,

      sd_hub_id: dataIn?.sd_hub_id || "",
    });
  }, [dataIn]);

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
  const handleSubmit = () => {
    setFormSubmit(true);
    if (!ValidateFormNew(formData, formElements)) {
      return false;
    }

    let url = METER_READINGS_URLS.INSERT;
    let _data = { ...formData };
    _data["meter_start_date"] = changeDateTimeZoneFormat(
      formData.meter_start_date,
      "YYYY-MM-DD"
    );
    _data["meter_end_date"] = changeDateTimeZoneFormat(
      formData.meter_start_date,
      "YYYY-MM-DD"
    );
    const subscription = post(url, _data).subscribe((response) => {
      //console.log("response form ", response.data);
      loadTableData();
      showAlertAutoClose("Data Saved Successfully", "success");
      closeModal();
    });
    return () => {
      subscription.unsubscribe();
    };
  };
  useEffect(() => {
    hubs_get_all_select((data: any) => setAllHubs(data));
  }, []);
  const hubFormValidations = {
    hub_id: [SmartValid.required("Hub Name is Required")],
    start: [SmartValid.required("Meter Start Reading is Required")],
    end: [SmartValid.required("Meter End Reading is Required")],
  };

  const totalPrice = () => {
    if (formData.meter_end) {
      let meterEnd = formData.meter_end;
      let meterStart = formData.meter_start;
      let diffInDays = meterEnd - meterStart;

      return !isNaN(diffInDays) ? diffInDays : 0;
    } else {
      return 0;
    }
  };
  const formElements: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "SELECT_BOX",
      width: "12",
      name: "sd_hub_id",
      element: {
        label: "Hub Name",
        isRequired: true,
        options: allHubs,
        // isHorizontal: true,
        // inputProps: { disabled: true },
        inputType: "BORDER_LABEL",
        validations: hubFormValidations.hub_id,
      },
    },
    {
      type: "DATE",
      width: "12",
      name: "meter_start_date",
      element: {
        label: " Start Date",
        isRequired: true,
        // isHorizontal: true,
        inputType: "BORDER_LABEL",
        validations: hubFormValidations.hub_id,
      },
    },
    {
      type: "DATE",
      width: "12",
      name: "meter_end_date",
      element: {
        label: "End Date",
        isRequired: true,
        inputType: "BORDER_LABEL",
        validations: hubFormValidations.hub_id,
      },
    },

    {
      type: "TEXT_BOX",
      width: "12",
      name: "meter_start",
      element: {
        label: "Meter Start Reading",
        isRequired: true,
        validations: hubFormValidations.start,
        // isHorizontal: true,
        inputType: "BORDER_LABEL",
        pattern: ALLOW_NUMERIC,
      },
    },
    {
      type: "TEXT_BOX",
      width: "12",
      name: "meter_end",
      element: {
        label: "Meter End Reading",
        isRequired: true,
        // inputProps: { isFocussed: true },
        // isHorizontal: true,
        inputType: "BORDER_LABEL",
        validations: hubFormValidations.end,
        pattern: ALLOW_NUMERIC,
      },
    },
    {
      type: "TEXT_BOX",
      width: "12",
      name: "numberof_unit",
      element: {
        label: "Number of Units",
        // isRequired: true,
        // inputProps: { isFocussed: true },
        //   isHorizontal: true,
        inputType: "BORDER_LABEL",
        valueFunction: () => {
          return "" + totalPrice();
        },
        // validations: hubFormValidations.hub_name,
        inputProps: { disabled: true },
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
            classList={["button", "mt-4 mr-4", "smart-third-button"]}
            onClick={closeModal}
          />
          <SmartSoftButton
            label={formData.ID ? "Update" : "Submit"}
            rightIcon="fa fa-arrow-right"
            classList={["button ", "mt-4", "smart-action-button"]}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default MeterReadingForm;
