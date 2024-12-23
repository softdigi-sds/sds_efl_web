import React, { useEffect, useState } from "react";
import {
  SmartFormInterFace,
  SmartSoftButton,
  SmartSoftForm,
  SmartValid,
} from "soft_digi";
import { ValidateFormNew } from "soft_digi/dist/services/smartValidationService";
import { CUSTOMER_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { showAlertAutoClose } from "../../services/notifyService";
import { ALLOW_ALPHABET_SPACE } from "../../services/PatternSerivce";
import {
  admin_states_select,
  hubs_get_all_select,
} from "../../services/site/SelectBoxServices";
import { post } from "../../services/smartApiService";
import CustomerSubForm from "./CustomerSubForm";

interface FormErrors {
  [key: string]: string | null;
}
interface HeaderProps {
  loadTableData: () => void;
  dataIn: any;
}
const CustomersForm: React.FC<HeaderProps> = ({ loadTableData, dataIn }) => {
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
    let url = CUSTOMER_URLS.INSERT;
    if (formData.ID !== undefined) {
      formData["id"] = formData.ID;
      url = CUSTOMER_URLS.UPDATE;
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
    { value: "2", label: "Yes" },
    { value: "1", label: "No" },

  ];

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
    sd_efl_hsns_id : "",
    hsn: "",
    title: "",

  };

  
  const subFormDisplay = () => {
    const sub_data = formData.sub_data ? [...formData.sub_data] : [];
    return (
      <>
         <div className="columns is-multiline">
          <div className="column is-3">Select Bill Item</div>
          <div className="column is-3">HSN</div>
          <div className="column is-6">Description</div>
      
        </div> 
        {sub_data.map((item, index) => {
          return (
            <CustomerSubForm
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

  const SubForms =()=>{
    return(
      <>
       <div className="columns">
          <div className="column is-6">
            <span className="is-size-5 has-text-weight-bold">Types:</span>
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
      </>
    )
  }
  const formElements: SmartFormInterFace.SmartFormElementProps[] = [

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
      type: "SELECT_BOX",
      width: "12",
      name: "single_bill",
      element: {
        label: "Is Single Item Billing",
        isRequired: true,
        validations: vendorFormValidations.statee,
        options: options,
        inputType: "BORDER_LABEL",
      },
    },

     
    {
      type: "TEXT_BOX",
      width: "4",
      name: "single_bill_hsn",
      element: {
        label: "Enter Bill HSN(Single Item)",
        isRequired: true,
        // inputProps: { isFocussed: true },
        // validations: vendorFormValidations.pan_no,
        inputType: "BORDER_LABEL",
        //max: 10,
      },
      hideFunction: () => {
        return formData?.single_bill?.value === "2" ? false : true;
      },
    },
     
    {
      type: "TEXT_BOX",
      width: "8",
      name: "single_bill_title",
      element: {
        label: "Enter Bill Description(Single Item)",
        isRequired: true,
        // inputProps: { isFocussed: true },
        // validations: vendorFormValidations.pan_no,
        inputType: "BORDER_LABEL",
      //  max: 10,
      },
      hideFunction: () => {
        return formData?.single_bill?.value === "2" ? false : true;
      },
    },
    {
      type: "LABEL",
      width: "12",
      name: "test",
      labelFunction:SubForms,
  
      hideFunction: () => {
        return formData?.single_bill?.value === "1" ? false : true;
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






export default CustomersForm
