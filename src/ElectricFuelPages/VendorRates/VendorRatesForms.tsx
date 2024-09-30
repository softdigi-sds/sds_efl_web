import React, { useEffect, useState } from "react";
import {
  SmartFormInterFace,
  SmartSoftButton,
  SmartSoftForm,
  SmartValid,
} from "soft_digi";
import { ValidateFormNew } from "soft_digi/dist/services/smartValidationService";
import { VENDER_RATE_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { changeDateTimeZoneFormat } from "../../services/core/CommonService";
import { showAlertAutoClose } from "../../services/notifyService";
import {
  company_get_all_select,
  hubs_get_all_select,
} from "../../services/site/SelectBoxServices";
import { post } from "../../services/smartApiService";
import VendorRatesSubForm from "./VendorRatesSubForm";

interface FormErrors {
  [key: string]: string | null;
}

interface HeaderProps {
  loadTableData: () => void;
  dataIn: any;
}

const VendorRatesForms: React.FC<HeaderProps> = ({ loadTableData, dataIn }) => {
  const [formData, setFormData] = useState<any>({});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [allHubs, setAllHubs] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const { closeModal } = useSiteContext();

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const updateItemProperty = (
    index: number,
    dynamicKey: string,
    newValue: any
  ) => {
    const _data = { ...formData };
    // Create a copy of the items array
    const updatedItems = _data?.rate_data ? [..._data?.rate_data] : [];
    // Create a copy of the object at the specific index
    const updatedItem = { ...updatedItems[index] };
    // Update the dynamic property
    updatedItem[dynamicKey] = newValue;
    // Replace the object in the array with the updated object
    updatedItems[index] = updatedItem;
    //
    _data.rate_data = updatedItems;
    // Update the state with the new array
    setFormData(_data);
  };

  const subFormDataObj = {
    sd_hsn_id: "",
    rate_type: "",
    min_start: "",
    min_end: "",
    price: "",
    extra_price: "",
  };

  const addItem = () => {
    const _data = { ...formData };
    const updatedItems = _data?.rate_data
      ? [..._data?.rate_data, subFormDataObj]
      : [subFormDataObj];
    _data.rate_data = updatedItems;
    // console.log("data added " , _data);
    setFormData(_data);
  };

  const removeItemAndLast = () => {
    const _data = { ...formData };
    const updatedItems = _data?.rate_data ? [..._data?.rate_data] : [];
    const finalItems =
      updatedItems.length > 0
        ? updatedItems.slice(0, updatedItems.length - 1)
        : [];
    _data.rate_data = finalItems;
    setFormData(_data);
  };

  useEffect(() => {
    hubs_get_all_select((data: any) => setAllHubs(data));
  }, []);

  useEffect(() => {
    let hub_data = formData?.sd_hubs_id?.value;
    company_get_all_select(hub_data, (data: any) => setAllVendors(data));
    //hubs_get_all_select((data: any) => setAllHubs(data));
  }, [formData?.sd_hubs_id]);

  // useEffect(() => {
  //   let hub_data =formData?.sd_hubs_id?.value
  //   console.log("Hub data",hub_data)
  //    company_get_all_select(hub_data,(data:any,) => setAllVendors(data));
  // }, [formData]);
  const options = [
    { value: "Minimum", label: "Minimum" },
    { value: "Per Unit", label: "Per Unit" },
  ];
  const options_parking = [
    { value: "Minimum", label: "Minimum" },
    { value: "Per Unit", label: "Per Unit" },
  ];

  const options_select = [
    { value: "1", label: "Fixed" },
    { value: "2", label: "Minimum" },
    { value: "3", label: "Per Unit" },
  ];

  const subFormDisplay = () => {
    const sub_data = formData.rate_data ? [...formData.rate_data] : [];
    return (
      <>
        <div className="columns">
          <div className="column is-2">HSN CODE</div>
          <div className="column is-2">Rate Type</div>
          <div className="column is-2">Range Start</div>
          <div className="column is-2">Range End</div>
          <div className="column is-2">Price(Rs)</div>
          <div className="column is-2">Extra Price(Rs)</div>
        </div>
        {sub_data.map((item, index) => {
          return (
            <VendorRatesSubForm
              key={`subform${index}`}
              formData={item}
              setFormData={(name, value) =>
                updateItemProperty(index, name, value)
              }
            />
          );
        })}
      </>
    );
  };

  const Interrogation = () => {
    return (
      <>
        <div className="">
          <u>Consumption Rates :</u>
        </div>
      </>
    );
  };

  const Interrogation_two = () => {
    return (
      <>
        <div className="">
          <u>Parking Rates :</u>
        </div>
      </>
    );
  };
  const handleSubmit = () => {
    setFormSubmit(true);
    if (!ValidateFormNew(formData, formElements)) {
      return false;
    }
    let url = VENDER_RATE_URLS.INSERT;
    if (formData.ID !== undefined) {
      formData["id"] = formData.ID;
      url = VENDER_RATE_URLS.UPDATE;
    }
    let data_in = { ...formData };
    // data_in["unit_rate_type"] = data_in["unit_rate_type"].value;
    //data_in["parking_rate_type"] = data_in["parking_rate_type"].value;

    data_in["effective_date"] = changeDateTimeZoneFormat(
      data_in.effective_date,
      "YYYY-MM-DD"
    );
    const subscription = post(url, data_in).subscribe((response) => {
      //console.log("response form ", response.data);
      loadTableData();
      showAlertAutoClose("Data Saved Successfully", "success");
      closeModal();
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const vendorFormValidations = {
    hub_id: [SmartValid.required("Hub Id is Required")],
    company: [SmartValid.required("Company is Required")],
    comunication: [SmartValid.required("Type is Required")],
    min_units: [SmartValid.required("Minumum Unit is Required")],
    rate_unit: [SmartValid.required("Rate Per Unit is Required")],
    extra_unit: [SmartValid.required("Rate Per Extra Unit is Required")],
    pin_code: [SmartValid.required("Pin Code is Required")],
    dates: [SmartValid.required("Date is Required")],
  };
  const formElements: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "SELECT_BOX",
      width: "6",
      name: "sd_hubs_id",
      element: {
        label: "Hub ID",
        isRequired: true,
        options: allHubs,
        validations: vendorFormValidations.hub_id,
      },
    },
    {
      type: "SELECT_BOX",
      width: "6",
      name: "sd_vendors_id",
      element: {
        label: "Company",
        isRequired: true,
        validations: vendorFormValidations.company,
        options: allVendors,
        //options: options,
      },
    },
    /*
    {
      type: "LABEL",
      width: "12",
      name: "label_one",
      labelFunction: Interrogation,
    },
    {
      type: "SELECT_BOX",
      width: "6",
      name: "unit_rate_type",
      element: {
        label: "Select Consumption Type",
        validations: vendorFormValidations.comunication,
        isRequired: true,
        options: options,
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "min_units",
      element: {
        label: "Minimum Units",
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: vendorFormValidations.min_units,
      },
      hideFunction: () => {
        return formData?.unit_rate_type?.value === "Minimum" ? false : true;
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "unit_rate",
      element: {
        label: "Rate Per Unit",
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: vendorFormValidations.rate_unit,
      },
      hideFunction: () => {
        return formData?.unit_rate_type?.value === "Minimum" ? true : false;
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "extra_unit_rate",
      element: {
        label: "Rate Per Extra Unit",
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: vendorFormValidations.extra_unit,
      },
      hideFunction: () => {
        return formData?.unit_rate_type?.value === "Minimum" ? false : true;
      },
    },
    {
      type: "LABEL",
      width: "12",
      name: "label_two",
      labelFunction: Interrogation_two,
    },
    {
      type: "SELECT_BOX",
      width: "6",
      name: "parking_rate_type",
      element: {
        label: "Select Parking Type",
        isRequired: true,
        validations: vendorFormValidations.comunication,
        options: options_parking,
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "parking_min_count",
      element: {
        label: "Minimum Number",
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: vendorFormValidations.min_units,
      },
      hideFunction: () => {
        return formData?.parking_rate_type?.value === "Minimum" ? false : true;
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "parking_rate_vehicle",
      element: {
        label: "Rate Per Unit",
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: vendorFormValidations.rate_unit,
      },
      hideFunction: () => {
        return formData?.parking_rate_type?.value === "Minimum" ? true : false;
      },
    },
    {
      type: "TEXT_BOX",
      width: "6",
      name: "parking_extra_rate_vehicle",
      element: {
        label: "Rate Per Extra Unit",
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: vendorFormValidations.extra_unit,
      },
      hideFunction: () => {
        return formData?.parking_rate_type?.value === "Minimum" ? false : true;
      },
    },
    {
      type: "DATE",
      width: "6",
      name: "effective_date",
      element: {
        label: "Select Effective Date",
        placeHolder: "DD-MM-YYYY",
        isRequired: true,
        inputProps: { isFocussed: true },
        validations: vendorFormValidations.dates,
      },
    },*/
  ];

  return (
    <>
      <div className="">
        {/* <SmartHeader title={"Vendor Rates Form"} /> */}
      </div>
      <SmartSoftForm
        formData={formData}
        setFormData={handleInputChange}
        elements={formElements}
        formSubmit={formSubmit}
      />
      <div className="columns">
        <div className="column is-6">
          <span>Rates:</span>
        </div>
        <div className="column is-6 has-text-right">
          <SmartSoftButton
            label="Add"
            classList={["button", "mr-1", "is-small is-success"]}
            onClick={addItem}
          />

          <SmartSoftButton
            label="Remove"
            classList={["button", "mr-1", "is-small is-danger"]}
            onClick={removeItemAndLast}
          />
        </div>
      </div>
      {subFormDisplay()}
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

export default VendorRatesForms;
