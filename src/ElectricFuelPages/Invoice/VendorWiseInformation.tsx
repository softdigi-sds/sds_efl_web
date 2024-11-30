import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  SmartAlert,
  SmartLoaderInterface,
  SmartSoftButton,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";
import { INVOICE_URLS } from "../../api/UserUrls";
import config from "../../config/config";
import { useSiteContext } from "../../contexts/SiteProvider";
import {
  changeDateTimeZoneFormat,
  formatCurrency,
} from "../../services/core/CommonService";
import { downloadFile } from "../../services/core/FileService";
import { openExternalWindow } from "../../services/core/WindowService";
import { showAlertAutoClose } from "../../services/notifyService";
import { post } from "../../services/smartApiService";
import InvoiceAddingForm from "./InvoiceAddingForm";
import InvoiceRemarks from "./InvoiceRemarks";
import InvoiceVendorDetailsTable from "./InvoiceVendorDetailsTable";
import VendorDetailsImport from "./VendorDetailsImport";
// import InvoiceForm from "./InvoiceAddingForm";

const VendorWiseInformation = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const invoice_ret_id = searchParams.get("invoice_id");
  const [data, setData] = useState<any>({});
  const { openModal, isDark } = useSiteContext();
  const navigate = useNavigate();
  const loadData = () => {
    let URL = INVOICE_URLS.GET_ONE_BILL;
    const subscription = post(URL, { id: id }).subscribe((response) => {
      setData(response.data);
      //console.log("response data", response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const deleteData = (invoice_id: any) => {
    const subscription = post(INVOICE_URLS.INVOICE_DELETE, {
      id: invoice_id,
    }).subscribe((response) => {
      showAlertAutoClose("Deleted Successfully...", "success");
      loadData();
      // setLoading(false);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const openDeleteModal = (invoice_id: any) => {
    let alertProps: SmartLoaderInterface.SmartAlertInterface = {
      title: "Invoice Deletion?",
      alertFunction: (option) => {
        if (option == "yes") {
          deleteData(invoice_id);
          SmartAlert.hide();
        }
      },
      content: <p>Note: Do you wish to delete this Invoice</p>,
      className: "custom-alert",
    };

    SmartAlert.show(alertProps);
  };

  const refresh = () => {
    let URL = INVOICE_URLS.REFRESH;
    const subscription = post(URL, { id: id }).subscribe((response) => {
      //setData(response.data);
      loadData();
      //console.log("response data", response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const exportExcel = () => {
    let URL = INVOICE_URLS.EXPORT_EXCEL;
    const subscription = post(URL, { id: id }).subscribe((response) => {
      if (response.data && response.data.content) {
        downloadFile(response.data.content, "bill.xlsx");
      }
      //console.log(response);
      //setData(response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const downloadInvoice = (invoice_id: number) => {
    let URL = INVOICE_URLS.DOWNLOAD_INVOICE;
    const subscription = post(URL, { id: invoice_id }).subscribe((response) => {
      if (response.data && response.data.content) {
        let file_name = response.data.file_name
          ? response.data.file_name
          : "invoice.pdf";
        downloadFile(response.data.content, file_name);
      }
      //console.log(response);
      //setData(response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const downloadZip = () => {
    let URL = INVOICE_URLS.EXPORT_ZIP;
    const subscription = post(URL, { id: id }).subscribe((response) => {
      if (response.data && response.data.content) {
        downloadFile(response.data.content, "invoices.zip");
      }
      return;
      //console.log(response);
      //setData(response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const signStatus = (
    status: string,
    invoide_id: number,
    token_str: string
  ) => {
    if (status == "COMPLETED") {
      verifyDigitalSign(invoide_id, token_str);
      // console.log("sign Completed")
    } else {
      console.log("sign aborted");
    }
  };

  const startDigitalSign = (invoice_id: number) => {
    let URL = INVOICE_URLS.SIGN_START;
    const subscription = post(URL, { id: invoice_id }).subscribe((response) => {
      let url =
        config.DIGI_SERVER_URL +
        "open/digital-sign?token=" +
        response.data.data;
      // window.location.href = url;
      openExternalWindow(url, (status) =>
        signStatus(status, invoice_id, response.data.data)
      );
      // openNewWindow(url);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const verifyDigitalSign = (id: any, token: string) => {
    let URL = INVOICE_URLS.SIGN_VERIFY;
    const subscription = post(URL, { id: id, token: token }).subscribe(
      (response) => {
        loadData();
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };

  useEffect(() => {
    if (token) {
      verifyDigitalSign(invoice_ret_id, token);
    } else {
      loadData();
    }
  }, [id]);

  const openForm = (data: any) => {
    let URL = INVOICE_URLS.GET_ONE_DETAILS;
    const subscription = post(URL, { id: data["ID"] }).subscribe((response) => {
      let options = {
        title: ` ${data.hub_id} - ${data.invoice_number}  `,
        content: <InvoiceVendorDetailsTable dataIn={response.data} />,
        width: 60,
        className: "sd-efl-modal",
        closeBody: false,
      };
      openModal(options);
    });
    return () => subscription.unsubscribe();
  };
  const handleDelete = (rowData: any) => {
    //console.log("Delete action for row:", rowData);
  };

  const openInvoiceRemarksForm = (_id: number, remarks: string) => {
    let options = {
      title: "Invoice Remarks",
      content: (
        <InvoiceRemarks loadTableData={loadData} id={_id} remarks={remarks} />
      ),
      width: 50,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };

  const buttons = [
    {
      label: "View",
      type: "icon",
      leftIcon: "fa fa-eye",
      classList: ["smart-efl-table-view-icon", ""],
      onClick: (data: any) => {
        openForm(data);
      },
    },
    {
      label: "View",
      type: "icon",
      leftIcon: "fa fa-close",
      classList: ["smart-efl-table-view-icon", ""],
      onClick: (data: any) => {
        openDeleteModal(data["ID"]);
      },
      hideFunction: (data: any) => {
        return data["status"] >= 5 ? true : false;
      },
    },
    {
      label: "View",
      type: "icon",
      leftIcon: "fa-file-pdf-o",
      classList: ["smart-efl-table-view-icon has-text-danger", ""],
      onClick: (data: any) => {
        downloadInvoice(data["ID"]);
      },
    },

    {
      label: "Sign",
      type: "icon",
      leftIcon: "fa fa-pencil",
      classList: ["smart-efl-table-view-icon", ""],
      onClick: (data: any) => {
        startDigitalSign(data["ID"]);
      },
      hideFunction: (data: any) => {
        return data["status"] >= 5 ? false : true;
      },
    },
    {
      label: "View",
      type: "icon",
      leftIcon: "fa-file",
      classList: ["smart-efl-table-view-icon has-text-link", ""],
      onClick: (data: any) => {
        openInvoiceRemarksForm(data["ID"], data["remarks"]);
      },
    },
  ];

  const statusTags = [
    { value: 0, label: "Generated", class: "has-text-link" },
    { value: 5, label: "E-INVOICE", class: "has-text-primary" },
    { value: 10, label: "DIGITALLY SIGNED", class: "has-text-success" },
  ];

  const amountDisplay = (row: any) => {
    return (
      <>
        <div>{formatCurrency(row?.total_amount)}</div>
      </>
    );
  };

  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno", width: "3" },
    {
      title: "City",
      index: "office_city",
      width: "8",
    },
    {
      title: "Hub",
      index: "hub_id",
      width: "10",
    },

    {
      title: "Invoice Number",
      index: "invoice_number",
      width: "10",
    },
    {
      title: "Customer",
      index: "vendor_company",
      width: "10",
      // valueFunction:(data)=>{
      //   return <span>{data["vendor_company"]}<br/><span className="is-size-7">({data["billing_to"]})</span></span>
      // }
    },
    {
      title: "Total Amount",
      index: "total_amount",
      width: "10",
      valueFunction: amountDisplay,
    },
    {
      title: "ACK No",
      index: "ack_no",
      width: "10",
      valueFunction: (data) => {
        return data["status"] >= 5 ? (
          <span
            className="has-text-link sd-cursor"
            onClick={() => {
              downloadInvoice(data["ID"]);
            }}
          >
            {data["ack_no"]}
          </span>
        ) : null;
      },
    },
    {
      title: "Status",
      index: "status",
      width: "10",
      type: "tags",
      tags: statusTags,
    },
    {
      title: "Details",
      index: "action",
      type: "buttons",
      buttons: buttons,
      width: "10",
    },
  ];
  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-6",
      custom: (
        <div className="is-flex is-justify-content-space-between">
          <p className="is-size-4 is-italic has-text-link is-underlined">
            Invoices
          </p>
          {/* <div
            className="has-text-link mr-2 mt-2 is-clickable smart-third-button-add-button"
            onClick={() => openInvoiceForm()}
          >
            {" "}
            <i className="fa fa-plus-square-o is-size-4 has-text-white " aria-hidden="true"></i>
          </div> */}
        </div>
      ),
    },
    {
      type: "BUTTONS",
      widthClass: "is-2 mr-4",
      align: "RIGHT",
      buttons: [
        {
          label: "",
          icon: "fa-plus mr-5",
          type: "CUSTOM",
          action: () => openInvoiceForm(),
        },
        {
          label: "",
          icon: "fa-download ml-4 has-text-danger",
          type: "CUSTOM",
          action: () => downloadZip(),
        },
      ],
    },
    {
      type: "SEARCH",
      widthClass: "is-4",
      align: "JUSTIFY",
    },
  ];
  const openInvoiceForm = () => {
    let options = {
      title: "New Invoice Form",
      content: <InvoiceAddingForm loadTableData={loadData} id={id} />,
      width: 90,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };

  const openImportForm = () => {
    let options = {
      title: "Invoice IRN/ACK import",
      content: <VendorDetailsImport loadData={loadData} id={id} />,
      width: 50,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };
  const navigateBack = () => {
    navigate(-1);
  };
  const BillInformation = () => {
    return (
      <>
        <div className="columns is-multiline">
          <div className="column is-8 is-flex">
            {" "}
            <div
              className=" mt-1 has-text-link is-clickable is-size-5 "
              onClick={navigateBack}
            >
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </div>
            <p className="is-size-4 is-italic has-text-link ml-4">
              Bill Details
            </p>
          </div>

          <div className="column is-4">
            <div className="is-flex is-justify-content-flex-end">
              <SmartSoftButton
                label="Refresh"
                onClick={() => refresh()}
                leftIcon="fa fa-cloud-upload"
                classList={["smart-third-button mr-2"]}
              />
              <SmartSoftButton
                label="Export"
                onClick={() => exportExcel()}
                leftIcon="fa fa-cloud-upload"
                classList={["smart-third-button mr-2"]}
              />
              <SmartSoftButton
                label="Import"
                onClick={() => openImportForm()}
                leftIcon="fa fa-cloud-download"
                classList={["smart-third-button"]}
              />
            </div>
          </div>
          <div className="column is-12">
            <div className="container">
              <table className="table  is-fullwidth">
                <tbody className="tbody">
                  <tr>
                    <th>Start Date:</th>
                    <td>
                      {changeDateTimeZoneFormat(
                        data?.bill_start_date,
                        "DD-MM-YYYY"
                      )}
                    </td>
                    <th>End Date:</th>
                    <td>
                      {changeDateTimeZoneFormat(
                        data?.bill_end_date,
                        "DD-MM-YYYY"
                      )}
                    </td>
                    <th></th>
                    <td></td>
                  </tr>
                  {/* <tr>
                    <th>Parking Amount (Rs):</th>
                    <td>{data?.vehicle_amount}</td>
                    <th>Consumption Amount (Rs):</th>
                    <td>{data?.unit_amount}</td>
                    <th>Others(Rs):</th>
                    <td>{data?.others}</td>
                  </tr> */}
                  <tr>
                    <th>GST (Rs):</th>
                    <td>{formatCurrency(data?.gst_amount)}</td>
                    <th>Total (Rs):</th>
                    <td>{formatCurrency(data?.total_amount)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {BillInformation()}
      <div className="is-size-7">
        <SmartTable
          columns={columns}
          data={data.invoice_data || []}
          tableTop={tableTop}
          tableProps={{
            className: ` is-hoverable  is-striped is-narrow smart-small-table ${
              !isDark ? "smart-efl-table" : ""
            }`,
            isResponsive: true,
            searchPlaceHolder: "Search",
          }}
          paginationProps={{
            pageSize: 1,
          }}
        />
      </div>
    </>
  );
};

export default VendorWiseInformation;
