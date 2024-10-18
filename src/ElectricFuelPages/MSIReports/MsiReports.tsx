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
          <div className="is-size-4 site-title has-text-weight-bold column is-3">
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
            {/* <div className="column is-4 mr-3">
              <SmartSoftButton
                label="Generate"
                classList={["button", " mr-5 py-0 is-link is-normal"]}
                onClick={() => console.log("Import Button Clicked")}

                // leftIcon="fa fa-file-excel-o"
              />
            </div> */}
          </div>
        </div>
      </div>
    );
  };
  let data = [
    {
      s_no: 1,
      vendor_name: "City1",
      hub_id: "HUB001",
      vendor_code: "V001",
      vendor_company: "",
    },
    {
      s_no: 2,
      vendor_name: "City2",
      hub_id: "HUB002",
      vendor_code: "V002",
      vendor_company: "",
    },
    {
      s_no: 3,
      vendor_name: "City3",
      hub_id: "HUB003",
      vendor_code: "V003",
      vendor_company: "",
    },
    {
      s_no: 4,
      vendor_name: "City4",
      hub_id: "HUB004",
      vendor_code: "V004",
      vendor_company: "",
    },
    {
      s_no: 5,
      vendor_name: "City5",
      hub_id: "HUB005",
      vendor_code: "V005",
      vendor_company: "",
    },
  ];

  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno" },
    {
      title: "city",
      index: "vendor_name",
    },
    {
      title: "Hun Id",
      index: "hub_id",
    },
    {
      title: "Vendor",
      index: "vendor_code",
    },
    { title: "Count", index: "vendor_company" },
  ];
  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-9",
      custom: <p className="is-size-4">{titleDisp()}</p>,
    },
    {
      type: "BUTTONS",
      widthClass: "is-3",
      align: "CENTER",
      buttons: [
        {
          type: "FILTER",
          className: "",
        },
        {
          label: "Generate",
          icon: "fa-plus",
          type: "CUSTOM",
          className: "smart-third-button",
        },
      ],
    },
  ];

  const filterFields: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "TEXT_BOX",
      width: "12",
      name: "hub_id",
      element: {
        label: "Hub",
      },
    },
    {
      type: "TEXT_BOX",
      width: "12",
      name: "vendor_company",
      element: {
        label: "City",
      },
    },
    {
      type: "TEXT_BOX",
      width: "12",
      name: "vendor_company",
      element: {
        label: "Vendor",
      },
    },
  ];
  return (
    <div>
      <SmartTable
        columns={columns}
        data={data}
        tableTop={tableTop}
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
    </div>
  );
};

export default Msireports;
