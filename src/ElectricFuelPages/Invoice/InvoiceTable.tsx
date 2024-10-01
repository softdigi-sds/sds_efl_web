import React, { useEffect, useState } from "react";
import { SmartFormInterFace, SmartSoftForm, SmartTable, SmartTableNewInterface } from "soft_digi";
import InvoicebottomTable from "./InvoicebottomTable";
import SignPad from "../../core/general/SignPad";
import { SmartFormElementProps } from '../../core/forms/SmartFormInterface';
import InvoicebillForm from "./InvoicebillForm";
import { useSiteContext } from "../../contexts/SiteProvider";
import { get } from "../../services/smartApiService";
import ImportInvoice from "./ImportInvoice";

const InvoiceTable = () => {
  const [data, setData] = useState([]);
  const [showInvoiceBottom, setShowInvoiceBottom] = useState(false);
  const [showSignPad, setShowSignPad] = useState(false);
  const { openModal, closeModal } = useSiteContext();
  const handleSaveSignature = (signature: string) => {
    console.log("Saved signature:", signature);
    setShowSignPad(false);
  };
  // https://dummyjson.com/
  const LoadTableData = () => {   
    const subscription = get("https://dummyjson.com/users").subscribe((response) => {
      setData(response.data.users);    
      console.log("data",response.data.users)
    });
    useEffect(() => {   
      LoadTableData();
    }, []); 
    return () => {
      subscription.unsubscribe();
    };
  };
  const DummyData = [
    {
      start_date: "2024-01-01",
      end_date: "2024-01-10",
      amount: 500,
      parking_amount: 50,
      units_amount: 5,
    },
    {
      start_date: "2024-01-11",
      end_date: "2024-01-20",
      amount: 650,
      parking_amount: 60,
      units_amount: 7,
    },
    {
      start_date: "2024-01-21",
      end_date: "2024-01-30",
      amount: 700,
      parking_amount: 40,
      units_amount: 8,
    },
    {
      start_date: "2024-02-01",
      end_date: "2024-02-10",
      amount: 800,
      parking_amount: 80,
      units_amount: 10,
    },
    {
      start_date: "2024-02-11",
      end_date: "2024-02-20",
      amount: 550,
      parking_amount: 30,
      units_amount: 6,
    },
    {
      start_date: "2024-02-21",
      end_date: "2024-02-28",
      amount: 750,
      parking_amount: 70,
      units_amount: 9,
    },
    {
      start_date: "2024-03-01",
      end_date: "2024-03-10",
      amount: 600,
      parking_amount: 40,
      units_amount: 6,
    },
    {
      start_date: "2024-03-11",
      end_date: "2024-03-20",
      amount: 900,
      parking_amount: 90,
      units_amount: 11,
    },
    {
      start_date: "2024-03-21",
      end_date: "2024-03-30",
      amount: 850,
      parking_amount: 80,
      units_amount: 10,
    },
    {
      start_date: "2024-04-01",
      end_date: "2024-04-10",
      amount: 950,
      parking_amount: 100,
      units_amount: 12,
    }
  ];
  const downloadInvoice = (data: any) => {
    console.log("Download Invoice:", data);
    // Logic to download invoice
    //...
  };
  const openImportForm = (data:any) => {
    let options = {
      title: "Bill Form",
      content: <ImportInvoice LoadTableData={LoadTableData} />,
      width: 60,
      className:"sd-efl-modal",
      closeBody:false,
    };
    openModal(options);
  };
  
  const buttons = [
    {
      label: "Download",
      type: "icon",
      leftIcon: "fa fa-download",
      classList: ["smart-efl-table-view-icon is-small"],
      onClick: (data: any) => {
        downloadInvoice(data);
      },
    },
    {
      label: "",
      type: "icon",
      leftIcon: " fa fa-cloud-upload",
      classList: ["smart-efl-table-edit-icon"],
      onClick: (data: any) => {
        openImportForm(data["ID"]);
      },
    },
  
  ];
  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno" },
    {
      title: "Start Date",
      index: "start_date",
      type: "date",
       dateFormat: "DD-MM-YYYY",
    },
    {
      title: "End  Date",
      type: "date",
      // dateFormat: "DD-MM-YYYY",
      index: "end_date",
    },
    { title: "Parking Amount ", index: "parking_amount" },
    {
      title: "Units Amount",
      index: "units_amount",
    },
 
    {
      title: "Invoices",
      index: "action",
      type: "buttons",
      buttons: buttons,
      width: "10",
    },
  ];
  const openOfficesForm = (data:any) => {
    let options = {
      title: "Bill Form",
      content: <InvoicebillForm />,
      width: 60,
      className:"sd-efl-modal",
      closeBody:false,
    };
    openModal(options);
  };
  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-4",
      custom: <p className="is-size-4">Invoice</p>,
    },
    {
      type: "SEARCH",
      widthClass: "is-4",
      align: "JUSTIFY",
    },
   
    {
      type: "BUTTONS",
      widthClass: "is-4",
      align: "CENTER",
      buttons: [
        {
          label: "Create Bill",
          icon: "fa-plus",
          type: "CUSTOM",
          action: openOfficesForm
        },
        {
          label: "Next",
          type: "CUSTOM",
          icon: "fa-plus",
          action: () => setShowInvoiceBottom(true), 
        },
        {
          label: "Sign",
          type: "CUSTOM",
          icon: "fa-plus",
          action: () => setShowSignPad(true),
        },
      ],
    },
  ];

  return (
    <>
      {!showInvoiceBottom && (
        <div className="smart-elf-table">
        
      
          <SmartTable
            columns={columns}
            data={DummyData}
            tableTop={tableTop}
            tableProps={{
              className: "is-hoverable is-bordered is-striped smart-efl-table",
              isResponsive: true,
              searchPlaceHolder: "Search",
            }}
            paginationProps={{
              pageSize: 10,
            }}
           
          />
        </div>
      )}

      {showInvoiceBottom && ( 
        <div>
          <InvoicebottomTable />
        </div>
      )}

      {showSignPad && (
        <div>
          <SignPad onSave={handleSaveSignature} />
        </div>
      )}
    </>
  );
};

export default InvoiceTable;
