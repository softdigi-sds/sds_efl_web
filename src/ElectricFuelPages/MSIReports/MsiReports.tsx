import React, { useState } from "react";
import {
  SmartFormInterFace,
  SmartSoftButton,
  SmartSoftForm,
  SmartSoftSelect,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";
interface FormErrors {
  [key: string]: string | null;
}
const Msireports = () => {
  const [category, setCategory] = useState<any>(1);
  const [formData, setFormData] = useState({});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [minEndDate, setMinEndDate] = useState<Date | null>(null);
  const categoryOptions = [
    { label: "Vendors Report", value: "1" },
    { label: "Vehichle", value: "2" },
  ];
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
  const titleDisp = () => {
    const filterFields: SmartFormInterFace.SmartFormElementProps[] = [
      {
        type: "DATE",
        width: "6",
        name: "bill_start_date",
        element: {
          placeHolder: "Start Date",
          isRequired: true,
          // inputProps: { isFocussed: true },
        },
      },
      {
        type: "DATE",
        width: "6",
        name: "bill_end_date",
        element: {
          placeHolder: "End Date",
          isRequired: true,
          minDate: minEndDate,
          //  inputProps: { disabled: true},
        },
      },
    ];
    return (
      <div className="columns">
       
          <div className="is-flex is-justify-content-space-between	is-align-items-center">
            <div className="is-size-4 site-title has-text-weight-bold column is-4">
              {" "}
              MSI Report
            </div>
            <div className="is-flex  column is-8">
              <div className="mt-0 ml-2 column is-4">
                <SmartSoftSelect
                  // width =""
                  options={categoryOptions}
                  // placeHolder="Select hub"
                  value={category}
                  onChange={(value) => setCategory(value)}
                />
              </div>
              <div className="column is-8">
              
                <SmartSoftForm
                  formData={formData}
                  setFormData={handleInputChange}
                  elements={filterFields}
                  formSubmit={formSubmit}
                  handleErrorChange={handleErrorChange}
                />
              </div>
<div className="column is-4">
              <SmartSoftButton
                label="Generate"
                classList={["button", " mr-2 py-0 is-link is-normal"]}
                onClick={() => console.log("Import Button Clicked")}

                // leftIcon="fa fa-file-excel-o"
              /></div>
            </div>
       
        </div>
      </div>
    );
  };

  return <div>{titleDisp()}</div>;
};

export default Msireports;
