import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SmartAlert,
  SmartLoaderInterface,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";
import { INVOICE_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import SignPad from "../../core/general/SignPad";
import { formatCurrency } from "../../services/core/CommonService";
import { showAlertAutoClose, showYesOrNoAlert } from "../../services/notifyService";
import { get, post } from "../../services/smartApiService";
import ImportInvoice from "./ImportInvoice";
import InvoicebillForm from "./InvoicebillForm";
import InvoicebottomTable from "./InvoicebottomTable";

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
    const subscription = get(INVOICE_URLS.GET_ALL_BILLS).subscribe(
      (response) => {
        setTabData(response.data);
        //console.log("data", response.data.users)
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };

  useEffect(() => {
    LoadTableData();
  }, []);

  const deleteData = (id: any) => {
    const subscription = post(INVOICE_URLS.DELETE, { id: id }).subscribe(
      (response) => {
        showAlertAutoClose("Removed Successfully", "success");
        closeModal();
        LoadTableData();
        // setLoading(false);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };

  const openDeleteModal = (id: any) => {
    let alertProps: SmartLoaderInterface.SmartAlertInterface = {
      title: (
        <span className="has-text-danger">
          <i className="fa fa-check"></i> Invoice Remove!
        </span>
      ),
      alertFunction: (option) => {
        if (option == "yes") {
          deleteData(id);
          SmartAlert.hide();
        }
      },
      content: (
        <p>
          Note: Do you wish to remove this invoice? This action cannot be
          reverted
        </p>
      ),
      className: "custom-alert",
    };

    SmartAlert.show(alertProps);
  };

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
        navigate("/e-fuel/vendor-wish/" + data["ID"]);
      },
    },
    {
      label: "",
      type: "icon",
      leftIcon: " fa-pencil-square-o",
      classList: ["smart-efl-table-edit-icon"],
      onClick: (data: any) => {
        viewEditForm(data["ID"]);
      },
      hideFunction:(data:any)=>{
        return data && data.status==5 ? true : false;
      }
    },
    // {
    //   label: "Download",
    //   type: "icon",
    //   leftIcon: "fa fa-trash",
    //   classList: ["smart-efl-table-delete-icon"],
    //   onClick: (data: any) => {
    //     openDeleteModal(data["ID"]);
    //   },
    // },
  ];
  const amountDisplay = (row: any) => {
    return (
      <>
        <div>{formatCurrency(row?.total_amount)}</div>
      </>
    );
  };
  const GstDisplay = (row: any) => {
    return (
      <>
        <div>{formatCurrency(row?.gst_amount)}</div>
      </>
    );
  };
  const StatusUpdate = (id: number, status: any) => {
    const subscription = post(INVOICE_URLS.STATUS_UPDATE, {
      id: id,
      status: status,
    }).subscribe((response) => {
      LoadTableData();
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const updateStatus = (itemIn: any) => {
    let new_status: number = itemIn.status === 5 ? 10 : 5;
    let msg: string =
      new_status === 0
        ? "Do you wish to mark invoice is open?"
        : "Do you wish to mark invoice is close?";
    //console.log("check in value ", check_value);

    // Trigger alert for confirmation
    showYesOrNoAlert(
      msg,
      (selection: Selection) =>
        updateStatusFinal(selection, itemIn, new_status),
      "info"
    );
  };

  const updateStatusFinal = (
    selection: any,
    itemIn: any,
    new_status: number
  ) => {
    if (selection === "yes") {
      // Post data to the backend
      StatusUpdate(itemIn.ID, new_status);
    }
  };


  const SwitchForm = (item: any) => {
    return (
      item.ID && (
        <>
          <div className="field">
            <input
              id={`switchExample_${item.ID}`}
              type="checkbox"
              name={`switchExample_${item.ID}`}
              className="switch is-small"
              checked={item.status == 5 ? true : false}
              onChange={() => updateStatus(item)}
            />
            <label htmlFor={`switchExample_${item.ID}`}></label>
          </div>
        </>
      )
    );
  };
  const viewEditForm = (id: any) => {
    const subscription = post(INVOICE_URLS.GET_ONE_BILL, { id: id }).subscribe(
      (response: any) => {
        openOfficesForm(response.data);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };
  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno", width: "5" },
    {
      title: "Start Date",
      index: "bill_start_date",
      type: "date",
      dateFormat: "DD-MM-YYYY",
      width: "10",
    },
    {
      title: "End  Date",
      type: "date",
      dateFormat: "DD-MM-YYYY",
      index: "bill_end_date",
      width: "10",
    },
    { title: "Total Invoices", index: "total_invoices", width: "15" },
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
      width: "5",
      valueFunction: GstDisplay,
    },
    {
      title: "Total (Rs)",
      index: "total_amount",
      width: "10",
      valueFunction: amountDisplay,
    },
    { title: "Status", index: "status", valueFunction: SwitchForm,    width: "10", },
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
      title: <>{data.ID ? "Bill Update Form" : "Bill Addition Form"}</>,
      content: <InvoicebillForm dataIn={data} loadTableData= {LoadTableData}/>,
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
      widthClass: "is-3",
      align: "JUSTIFY",
    },

    {
      type: "BUTTONS",
      widthClass: "is-3",
      align: "CENTER",
      buttons: [
        {
          type: "REFRESH",
          action: LoadTableData,
        },
        {
          label: "Create Bill",
          icon: "fa-plus",
          type: "CUSTOM",
          className: "smart-third-button",
          action: openOfficesForm,
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
