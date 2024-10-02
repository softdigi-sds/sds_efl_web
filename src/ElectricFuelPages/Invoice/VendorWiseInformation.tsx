import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SmartSoftButton, SmartTable, SmartTableNewInterface } from "soft_digi";
import { INVOICE_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { post } from "../../services/smartApiService";
import VendorDetails from "./VendorDetails";
import VendorDetailsImport from "./VendorDetailsImport";
import { downloadFile } from "../../services/core/FileService";
import { changeDateTimeZoneFormat } from "../../services/core/CommonService";

const VendorWiseInformation = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>({});
  const { openModal } = useSiteContext();

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

  useEffect(() => {
    loadData();
  }, [id]);

  const openForm = (data: any) => {
    let options = {
      title: "Vendor Details",
      content: <VendorDetails data={data} />,
      width: 50,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };
  const handleDelete = (rowData: any) => {
    console.log("Delete action for row:", rowData);
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
  ];

  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno", width: "5" },
    {
      title: "Hub",
      index: "hub_id",
      width: "20",
    },
    {
      title: "Invoice Number",
      index: "invoice_number",
      width: "15",
    },
    {
      title: "Vendor",
      index: "vendor_company",
      width: "20",
    },
    {
      title: "Total Amount",
      index: "total_amount",
      width: "10",
    },
    {
      title: "ACK No",
      index: "ack_no",
      width: "10",
    },
    {
      title: "Status",
      index: "status",
      width: "10",
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
      widthClass: "is-8",
      custom: <p className="is-size-4">Vendor Wise Information</p>,
    },
    {
      type: "SEARCH",
      widthClass: "is-4",
      align: "JUSTIFY",
    },
  ];

  const openImportForm = () => {
    let options = {
      title: "Vendor Details",
      content: <VendorDetailsImport loadData={loadData} id={id} />,
      width: 50,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };
  const BillInformation = () => {
    return (
      <>
        <div className="columns is-multiline">
          <div className="column is-8">
            <p className="is-size-4">Bill Details</p>
          </div>
          <div className="column is-4">
            <div className="is-flex is-justify-content-flex-end">
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
                  <tr>
                    <th>Parking Amount (Rs):</th>
                    <td>{data?.unit_amount}</td>
                    <th>Consumption Amount (Rs):</th>
                    <td>{data?.vehicle_amount}</td>
                    <th>Others(Rs):</th>
                    <td>{data?.others}</td>
                  </tr>
                  <tr>
                    <th>GST (Rs):</th>
                    <td>{data?.gst_amount}</td>
                    <th>Total (Rs):</th>
                    <td>{data?.total_amount}</td>
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
      <div>
        <SmartTable
          columns={columns}
          data={data.invoice_data || []}
          tableTop={tableTop}
          tableProps={{
            className: " is-hoverable is-bordered is-striped smart-efl-table ",
            isResponsive: true,
            searchPlaceHolder: "Search",
          }}
          paginationProps={{
            pageSize: 10,
          }}
        />
      </div>
    </>
  );
};

export default VendorWiseInformation;
