import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SmartTable, SmartTableNewInterface } from "soft_digi";
import { INVOICE_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import SignPad from "../../core/general/SignPad";
import { get } from "../../services/smartApiService";
import ImportInvoice from "./ImportInvoice";
import InvoicebillForm from "./InvoicebillForm";
import InvoicebottomTable from "./InvoicebottomTable";

const InvoiceTable = () => {
  const [data, setData] = useState([]);
  const [showInvoiceBottom, setShowInvoiceBottom] = useState(false);
  const [showSignPad, setShowSignPad] = useState(false);
  const { openModal, closeModal } = useSiteContext();
  const navigate = useNavigate();
  const handleSaveSignature = (signature: string) => {
    //console.log("Saved signature:", signature);
    setShowSignPad(false);
  };
  // https://dummyjson.com/
  const LoadTableData = () => {
    const subscription = get(INVOICE_URLS.GET_ALL_BILLS).subscribe((response) => {
      setData(response.data);
      //console.log("data", response.data.users)
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  useEffect(() => {
    LoadTableData();
  }, []);



  const downloadInvoice = (data: any) => {
    console.log("Download Invoice:", data);
    // Logic to download invoice
    //...
  };
  const openImportForm = (data: any) => {
    let options = {
      title: "Bill Form",
      content: <ImportInvoice LoadTableData={LoadTableData} />,
      width: 60,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };

  const buttons = [
    {
      label: "Download",
      type: "button",
      // leftIcon: "fa fa-download",
      classList: ["button is-small is-info"],
      onClick: (data: any) => {
        downloadInvoice(data);
      },
    },
    
  ];
  const ImportButtons = [
   
    {
      label: "View",
      type: "button",
      // leftIcon: " fa fa-cloud-upload",
      classList: ["button is-small is-danger"],
      onClick: (data: any) => {
        navigate("/e-fuel/vendor-wish/" +data["ID"]);
      },
    },

  ];
  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno" },
    {
      title: "Start Date",
      index: "bill_start_date",
      type: "date",
      dateFormat: "DD-MM-YYYY",
    },
    {
      title: "End  Date",
      type: "date",
      // dateFormat: "DD-MM-YYYY",
      index: "bill_end_date",
    },
    { title: "Total Invoices", index: "total_invoices" },
    { title: "Parking Amount(Rs) ", index: "vehicle_amount" },
    {
      title: "Units Amount (Rs)",
      index: "unit_amount",
    },
    {
      title: "Others (Rs)",
      index: "others",
    },
    {
      title: "GST(Rs)",
      index: "gst_amount",
    },
    {
      title: "Total (Rs)",
      index: "total_amount",
    },
    {
      title: "",
      index: "action",
      type: "buttons",
      buttons: buttons,
      width: "10",
    },
    {
      title: "Import",
      index: "action",
      type: "buttons",
      buttons: ImportButtons,
      width: "10",
    },
  ];
  const openOfficesForm = (data: any) => {
    let options = {
      title: "Bill Form",
      content: <InvoicebillForm />,
      width: 60,
      className: "sd-efl-modal",
      closeBody: false,
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
      align: "RIGHT",
      buttons: [
        {
          label: "Create Bill",
          icon: "fa-plus",
          type: "CUSTOM",
          action: openOfficesForm
        },
        // {
        //   label: "Next",
        //   type: "CUSTOM",
        //   icon: "fa-plus",
        //   action: () => setShowInvoiceBottom(true),
        // },
        // {
        //   label: "Sign",
        //   type: "CUSTOM",
        //   icon: "fa-plus",
        //   action: () => setShowSignPad(true),
        // },
      ],
    },
  ];

  return (
    <>
      {!showInvoiceBottom && (
        <div className="smart-elf-table">


          <SmartTable
            columns={columns}
            data={data}
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
          <InvoicebottomTable setShowInvoiceBottom={setShowInvoiceBottom} />
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
