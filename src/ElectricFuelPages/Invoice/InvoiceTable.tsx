import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SmartAlert, SmartLoaderInterface, SmartTable, SmartTableNewInterface } from "soft_digi";
import { INVOICE_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import SignPad from "../../core/general/SignPad";
import { get, post } from "../../services/smartApiService";
import ImportInvoice from "./ImportInvoice";
import InvoicebillForm from "./InvoicebillForm";
import InvoicebottomTable from "./InvoicebottomTable";
import { showAlertAutoClose } from "../../services/notifyService";
import { formatCurrency } from "../../services/core/CommonService";

const InvoiceTable = () => {
  const [tabData, setTabData] = useState([]);
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
      setTabData(response.data);
      //console.log("data", response.data.users)
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  useEffect(() => {
    LoadTableData();
  }, []);

  const deleteData = (id:any) => {    
    const subscription = post(
      INVOICE_URLS.DELETE,
      { id: id }
    ).subscribe((response) => {
      showAlertAutoClose("Removed Successfully","success");
      closeModal();
      LoadTableData();
      // setLoading(false);
    });
    return () => {
      subscription.unsubscribe();
    };
  };


  const openDeleteModal = (id:any) => {
    let alertProps: SmartLoaderInterface.SmartAlertInterface = {
        title: <span className="has-text-danger"><i className="fa fa-check"></i> Invoice Remove!</span>,
        alertFunction: (option) => {
            if (option == "yes") {
              deleteData(id);
                SmartAlert.hide()
            }
        },
         content:<p>Note: Do you wish to remove this invoice? This action cannot be reverted</p>,
          className:"custom-alert"
    };
    
    SmartAlert.show(alertProps)
}



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
      type: "icon",
      leftIcon: " fa fa-eye",
      classList: ["smart-efl-table-view-icon"],
      onClick: (data: any) => {
        navigate("/e-fuel/vendor-wish/" +data["ID"]);
      },
    },
     {
      label: "Download",
      type: "icon",
       leftIcon: "fa fa-trash",
      classList: ["smart-efl-table-delete-icon"],
      onClick: (data:any) => {
        openDeleteModal(data["ID"]);
        
      },
    },

  ];
  const amountDisplay =(row:any)=>{
    return(
      <>
      <div>
        {formatCurrency(row?.total_amount)}
      </div>
      </>
    )
  }
  const GstDisplay =(row:any)=>{
    return(
      <>
      <div>
        {formatCurrency(row?.gst_amount)}
      </div>
      </>
    )
  }
  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno",width:"5" },
    {
      title: "Start Date",
      index: "bill_start_date",
      type: "date",
      dateFormat: "DD-MM-YYYY",
      width:"10"
    },
    {
      title: "End  Date",
      type: "date",
       dateFormat: "DD-MM-YYYY",
      index: "bill_end_date",
        width:"10"
    },
    { title: "Total Invoices", index: "total_invoices"  , width:"15"},
    // { title: "Parking Amount(Rs) ", index: "vehicle_amount" ,  width:"15"},
    // {
    //   title: "Units Amount (Rs)",
    //   index: "unit_amount",
    //     width:"10"
    // },
    // {
    //   title: "Others (Rs)",
    //   index: "others",
    //     width:"10"
    // },
    {
      title: "GST(Rs)",
      index: "gst_amount",
        width:"5",
        valueFunction:GstDisplay
    },
    {
      title: "Total (Rs)",
      index: "total_amount",
        width:"10",
        valueFunction:amountDisplay
    },
    // {
    //   title: "",
    //   index: "action",
    //   type: "buttons",
    //   buttons: buttons,
    //   width: "10",
    // },
    {
      title: "View",
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
      widthClass: "is-6",
      custom: <p className="is-size-4">Invoice</p>,
    },
    {
      type: "SEARCH",
      widthClass: "is-4",
      align: "JUSTIFY",
    },

    {
      type: "BUTTONS",
      widthClass: "is-2",
      align: "RIGHT",
      buttons: [
        {
          label: "Create Bill",
          icon: "fa-plus",
          type: "CUSTOM",
          className:"smart-third-button",
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
            data={tabData}
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
