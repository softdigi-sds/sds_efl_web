import React, { useEffect, useState } from "react";
import {
  SmartFormInterFace,
  SmartSoftButton,
  SmartSoftForm,
  SmartValid,
} from "soft_digi";
import { ValidateFormNew } from "soft_digi/dist/services/smartValidationService";
import { INVOICE_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { changeDateTimeZoneFormat } from "../../services/core/CommonService";
import { sumOfMultiArrayObjectsWithIndex } from "../../services/core/FilterService";
import { showAlertAutoClose } from "../../services/notifyService";
import {
  company_address_all_select,
  hubs_get_all_select,
  vendors_get_all_select,
} from "../../services/site/SelectBoxServices";
import { post } from "../../services/smartApiService";
import InvoiceSubForm from "./InvoiceAddingSubForm";

interface FormErrors {
  [key: string]: string | null;
}

interface HeaderProps {
  loadTableData: () => void;
  id: any;
  dataIn?: any;
}

const InvoiceAddingForm: React.FC<HeaderProps> = ({
  loadTableData,
  id,
  dataIn,
}) => {
  const [formData, setFormData] = useState<any>(dataIn ? dataIn : {});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [allHubs, setAllHubs] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const [custAddress, setCustAddress] = useState([]);
  const { closeModal } = useSiteContext();
  const [types, setTypes] = useState<any[]>([]);

  //console.log("Formdata", id);

  const handleInputChange = (name: string, value: any) => {
    console.log("Name", name, "Value", value);
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    //  console.log("formData updated", value);
  };

  const updateItemProperty = (
    index: number,
    dynamicKey: string,
    newValue: any
  ) => {
    const _data = { ...formData };
    // Create a copy of the items array
    const updatedItems = _data?.sub_data ? [..._data?.sub_data] : [];
    // Create a copy of the object at the specific index
    const updatedItem = { ...updatedItems[index] };
    // Update the dynamic property
    updatedItem[dynamicKey] = newValue;
    // Replace the object in the array with the updated object
    updatedItems[index] = updatedItem;
    //
    _data.sub_data = updatedItems;
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
    tax: "",
  };

  const addItem = () => {
    const _data = { ...formData };
    const updatedItems = _data?.sub_data
      ? [..._data?.sub_data, subFormDataObj]
      : [subFormDataObj];
    _data.sub_data = updatedItems;
    // console.log("data added " , _data);
    setFormData(_data);
  };

  const removeItemAndLast = () => {
    const _data = { ...formData };
    const updatedItems = _data?.sub_data ? [..._data?.sub_data] : [];
    const finalItems =
      updatedItems.length > 0
        ? updatedItems.slice(0, updatedItems.length - 1)
        : [];
    _data.sub_data = finalItems;
    setFormData(_data);
  };

  useEffect(() => {
    hubs_get_all_select((data: any) => setAllHubs(data));
    vendors_get_all_select((data: any) => setAllVendors(data));
  }, []);

  useEffect(() => {
    let customer_id = formData?.sd_customer_id?.value;
    if (customer_id && customer_id > 0) {
      company_address_all_select(customer_id, (data: any) =>
        setCustAddress(data)
      );
    }
  }, [formData?.sd_customer_id]);

  const subFormDisplay = () => {
    const sub_data = formData.sub_data ? [...formData.sub_data] : [];
    return (
      <>
        <div className="columns">
          <div className="column is-2">HSN</div>
          <div className="column is-4">Description</div>
          <div className="column is-1">Quantity</div>
          <div className="column is-2">Price</div>
          <div className="column is-1">Tax (%)</div>
          <div className="column is-2">Total</div>
        </div>
        {sub_data.map((item, index) => {
          return (
            <InvoiceSubForm
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

  const handleSubmit = () => {
    setFormSubmit(true);
    if (!ValidateFormNew(formData, formElements)) {
      return false;
    }
    let url = INVOICE_URLS.INSERT_MANUAL;
    let data_in = { ...formData };
    data_in["bill_id"] = id;
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
        inputType: "BORDER_LABEL",
        validations: vendorFormValidations.hub_id,
        inputProps: { disabled: formData.ID && formData.ID ? true : false },
      },
    },
    {
      type: "SELECT_BOX",
      width: "6",
      name: "sd_customer_id",
      element: {
        label: "Customer Name",
        isRequired: true,
        validations: vendorFormValidations.company,
        options: allVendors,
        inputType: "BORDER_LABEL",
        inputProps: { disabled: formData.ID && formData.ID ? true : false },
        //options: options,
      },
    },
    {
      type: "SELECT_BOX",
      width: "6",
      name: "sd_customer_address_id",
      element: {
        label: "Billing Address",
        isRequired: true,
        validations: vendorFormValidations.company,
        options: custAddress,
        inputType: "BORDER_LABEL",
        inputProps: { disabled: formData.ID && formData.ID ? true : false },
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
    },
    */
  ];

  const footerCount = () => {
    return (
      <table className="smart-table-column-width-100">
        <tbody>
          <tr>
            {types.map((obj: any, key: number) => {
              let _total_count = sumOfMultiArrayObjectsWithIndex(
                formData,
                "sub_data",
                "ID",
                obj.ID
              );
              return (
                <td
                  key={`foot_count_${key}`}
                  className="smart-table-column-width-20 has-text-centered"
                >
                  {_total_count}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    );
  };

  const footerComponent = (sortdata: any[]) => {
    return (
      <tfoot>
        <tr>
          <td colSpan={2} className="has-text-right">
            Total Count
          </td>
          <td>{footerCount()}</td>
        </tr>
      </tfoot>
    );
  };

  return (
    <>
      <div className="sd-efl-input">
        {/* <SmartHeader title={"Vendor Rates Form"} /> */}

        <SmartSoftForm
          formData={formData}
          setFormData={handleInputChange}
          elements={formElements}
          formSubmit={formSubmit}
        />
        <div className="columns">
          <div className="column is-6">
            <span className="is-size-5 has-text-weight-bold">Rates:</span>
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
        {footerComponent(formData)}

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

export default InvoiceAddingForm;
