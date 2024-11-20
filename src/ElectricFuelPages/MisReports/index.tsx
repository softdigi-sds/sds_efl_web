import { useEffect, useState } from "react";
import {
  SmartFormInterFace,
  SmartSoftForm
} from "soft_digi";
import { vendors_get_all_select } from "../../services/site/SelectBoxServices";
import CustomerLedger from "./CustomerLedger";
import HubCapacity from "./HubCapacity";

interface FormErrors {
  [key: string]: string | null;
}

const Index = () => {
  const [formData, setFormData] = useState<any>({});
  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [minEndDate, setMinEndDate] = useState<Date | null>(null);
  const [type, setType] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [customers, setCustomers] = useState([]);

  const categoryOptions = [
    { label: "Hub Capacity", value: "1" },
    { label: "Customer Ledger", value: "2" },
  ];
  const yearOptions = [
    {value:"2025",label:"2025"},
    {value:"2024",label:"2024"},
  ]

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    vendors_get_all_select((data: any) => setCustomers(data));
  }, []);

  const handleSubmit = () => {
    setFormSubmit(true);
    let stage = formData.stage && formData.stage.value ? formData.stage.value : "";
    setType(stage);
    if(stage==="1"){
      setYear(formData.year && formData.year.value ? formData.year.value : "" );
    }
    if(stage==="2"){
      setYear(formData.sd_customer_id && formData.sd_customer_id.value ? formData.sd_customer_id.value : "" );
    }
    //setShowTable(true); // Ensure this is called
   // console.log("Form submitted, table visibility set to true."); // Debugging log
  };

  const reportForm = () => {
    const filterFieldsOne: SmartFormInterFace.SmartFormElementProps[] = [
      {
        type: "SELECT_BOX",
        width: "3",
        name: "stage",
        element: {
          label: "Select",
          options: categoryOptions,
          inputProps: { isFocussed: true },
          inputType: "BORDER_LABEL",
        },
      },
      {
        type: "SELECT_BOX",
        width: "3",
        name: "year",
        element: {
          label: "Select Year",
          options: yearOptions,
          inputProps: { isFocussed: true },
          inputType: "BORDER_LABEL",
        },
        hideFunction:(value)=>{
          let stage = formData.stage && formData.stage.value ? formData.stage.value : "";
          console.log("stage value selected " , stage, formData.stage);
          if(stage==="1"){
            return false;
          }
          return true;
        }
      },
      {
        type: "SELECT_BOX",
        width: "3",
        name: "sd_customer_id",
        element: {
          label: "Customer",
          isRequired: true,
          options: customers,
          inputProps: { isFocussed: true },
          inputType: "BORDER_LABEL",
        },
        hideFunction:(value)=>{
          let stage = formData.stage && formData.stage.value ? formData.stage.value : "";        
          if(stage==="2"){
            return false;
          }
          return true;
        }
      },
      {
        type: "DATE",
        width: "3",
        name: "bill_start_date_one",
        element: {
          label: "Start Date",
          placeHolder: "DD-MM-YYYY",
          inputType: "BORDER_LABEL",
        },
        hideFunction:(value)=>{
          let stage = formData.stage && formData.stage.value ? formData.stage.value : "";
          if(stage=="3"){
            return false;
          }
          return true;
        }
      },
      {
        type: "DATE",
        width: "3",
        name: "bill_end_date_one",
        element: {
          label: "End Date",
          placeHolder: "DD-MM-YYYY",
          minDate: minEndDate,
          inputType: "BORDER_LABEL",
        },
        hideFunction:(value)=>{
          let stage = formData.stage && formData.stage.value ? formData.stage.value : "";
          if(stage=="3"){
            return false;
          }
          return true;
        }
      },
      {
        type: "BUTTON",
        width: "3",
        name: "Generate",
        element: {
          label: "Generate Report",
          classList: ["has-text-right  mr-2", "smart-action-button"],
          onClick: handleSubmit,
        },
      },
    ];

    return (
      <>
        <div className="columns is-multiline">
          <div className="column is-12 smart-efl-table_main_container is-size-4">
            <p className="has-text-white"> MIS Report</p>
          </div>
          <div className="column is-12">
            <div className="mt-1">
              <SmartSoftForm
                formData={formData}
                setFormData={handleInputChange}
                elements={filterFieldsOne}
                formSubmit={formSubmit}
                //handleErrorChange={handleErrorChange}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  

  return (
    <div>
      {reportForm()}
      {type==="1" && <HubCapacity year={year} />}
      {type==="2" && <CustomerLedger sd_customer_id={year} />}   
    </div>
  );
};

export default Index;
