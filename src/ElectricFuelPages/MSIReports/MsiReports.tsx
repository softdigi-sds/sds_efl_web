import React, { useState } from "react";
import {
  SmartFormInterFace,
  SmartSoftButton,
  SmartSoftForm,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";

interface FormErrors {
  [key: string]: string | null;
}

const Msireports = () => {
  const [formData, setFormData] = useState({});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [minEndDate, setMinEndDate] = useState<Date | null>(null);
  const [showTable, setShowTable] = useState<boolean>(false); 

  const categoryOptions = [
    { label: "vendor (vs) vehicles", value: "1" },
    { label: "vendor (vs) CMS", value: "2" },
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

  const handleSubmit = () => {
    setFormSubmit(true);
    setShowTable(true); // Ensure this is called
    console.log("Form submitted, table visibility set to true."); // Debugging log
  };

  const titleDisTwo = () => {
    const filterFieldsOne: SmartFormInterFace.SmartFormElementProps[] = [
      {
        type: "SELECT_BOX",
        width: "3",
        name: "state_data",
        element: {
          label: "Select",
          options: categoryOptions,
          inputProps: { isFocussed: true },
          inputType: "BORDER_LABEL",
        },
      },
      {
        type: "DATE",
        width: "3",
        name: "bill_start_date_one",
        element: {
          label: "Start Date",
          inputType: "BORDER_LABEL",
        },
      },
      {
        type: "DATE",
        width: "3",
        name: "bill_end_date_one",
        element: {
          label: "End Date",
          minDate: minEndDate,
          inputType: "BORDER_LABEL",
        },
      },
      {
        type: "BUTTON",
        width: "3",
        name: "Generate",
        element: {
          label: "Submit",classList:["has-text-right  mr-2", "smart-third-button"],
            onClick: handleSubmit, 
         
        },
      },
    ];

    return (
      <>
        <div className="columns">
          <div className="column is-4 smart-efl-table_main_container is-size-4">
            <p>MSI Report</p>
          </div>
          <div className="column is-8">
            <div className="is-flex is-justify-content-flex-end is-align-content-flex-end">
              <SmartSoftForm
                formData={formData}
                setFormData={handleInputChange}
                elements={filterFieldsOne}
                formSubmit={formSubmit}
                handleErrorChange={handleErrorChange}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  let data = [
    { s_no: 1, vendor_name: "City1", hub_id: "HUB001", vendor_code: "V001", vendor_company: "" },
    { s_no: 2, vendor_name: "City2", hub_id: "HUB002", vendor_code: "V002", vendor_company: "" },
    { s_no: 3, vendor_name: "City3", hub_id: "HUB003", vendor_code: "V003", vendor_company: "" },
    { s_no: 4, vendor_name: "City4", hub_id: "HUB004", vendor_code: "V004", vendor_company: "" },
    { s_no: 5, vendor_name: "City5", hub_id: "HUB005", vendor_code: "V005", vendor_company: "" },
  ];

  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno" },
    { title: "City", index: "vendor_name" },
    { title: "Hub Id", index: "hub_id" },
    { title: "Vendor", index: "vendor_code" },
    { title: "Units", index: "vendor_company" },
  ];

  const filterFields: SmartFormInterFace.SmartFormElementProps[] = [
    { type: "TEXT_BOX", width: "12", name: "hub_id", element: { label: "Hub" } },
    { type: "TEXT_BOX", width: "12", name: "vendor_company", element: { label: "City" } },
    { type: "TEXT_BOX", width: "12", name: "vendor_company", element: { label: "Vendor" } },
  ];

  return (
    <div>
      {titleDisTwo()}
      {showTable && ( 
        <>
          <SmartTable
            columns={columns}
            data={data}
            filterFields={filterFields}
            tableProps={{
              className: "is-hoverable is-bordered smart-efl-table",
              isResponsive: true,
              searchPlaceHolder: "Search",
            }}
            paginationProps={{
              pageSize: 10,
            }}
          />
        </>
      )}
    </div>
  );
};

export default Msireports;
