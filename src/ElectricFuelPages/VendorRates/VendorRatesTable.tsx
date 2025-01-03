import { useEffect, useState } from "react";
import {
  SmartAlert,
  SmartFormInterFace,
  SmartLoaderInterface,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";
import { VENDER_RATE_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { downloadFile } from "../../services/core/FileService";
import { showAlertAutoClose } from "../../services/notifyService";
import { post } from "../../services/smartApiService";
import VendorRatesForms from "./VendorRatesForms";
import VendorRatesSubFormTwo from "./VendorRatesSubFormTwo";
interface headerProps {
  hubId?: string;
}
const VendorRatesTable: React.FC<headerProps> = ({ hubId }) => {
  const [tabData, setTabData] = useState([]);
  const { openModal, closeModal } = useSiteContext();

  const loadTableData = () => {
    let URL = VENDER_RATE_URLS.GET_ALL;
    const subscription = post(URL, { hub_id: hubId }).subscribe((response) => {
      setTabData(response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  useEffect(() => {
    loadTableData();
  }, []);

  const exportExcel = () => {
    let URL = VENDER_RATE_URLS.EXPORT_EXCEL;
    const subscription = post(URL, {}).subscribe((response) => {
      if (response.data && response.data.content) {
        downloadFile(response.data.content, "rates.xlsx");
      }
      //console.log(response);
      //setData(response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const openOfficesForm = (data: any) => {
    //console.log("data ", data);
    const _id = data && data != null ? data.ID : 0;
    let options = {
      title: (
        <>
          {_id
            ? "Hub (vs) Customers Rates Update Form"
            : "Hub (vs) Customers Rates Addition Form"}
        </>
      ),
      content: <VendorRatesForms loadTableData={loadTableData} dataIn={_id ? data : {}} />,
      width: 90,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };
  const openVendersViewForm = (officeData: any) => {
    let options = {
      title: "Customer Rates View",
      content: <VendorRatesSubFormTwo office={officeData} />,
      width: 60,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };

  const viewEditForm = (id: any) => {
    const subscription = post(VENDER_RATE_URLS.GET_ONE, { id: id }).subscribe(
      (response: any) => {
        let data_out = { ...response.data };
        openOfficesForm(data_out);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };
  const viewForm = (id: any) => {
    const subscription = post(VENDER_RATE_URLS.GET_ONE, { id: id }).subscribe(
      (response: any) => {
        let data_out = { ...response.data };
        openVendersViewForm(data_out);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };

  const deleteData = (id: any) => {
    const subscription = post(VENDER_RATE_URLS.DELETE, { id: id }).subscribe(
      (response) => {
        showAlertAutoClose("Deleted Successfully...", "success");
        closeModal();
        loadTableData();
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
          <i className="fa fa-check"></i> Vendor Rate Deletion!
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
          Note: Do you wish to delete this Vendor Rate? This action cannot be
          reverted
        </p>
      ),
      className: "custom-alert",
    };

    SmartAlert.show(alertProps);
  };

  const buttons = [
    {
      label: "",
      type: "icon",
      leftIcon: "fa fa-eye",
      classList: ["smart-efl-table-view-icon"],
      onClick: (data: any) => {
        viewForm(data["ID"]);
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
    },
    {
      label: "",
      type: "icon",
      leftIcon: "fa fa-trash",
      classList: ["smart-efl-table-delete-icon"],
      onClick: (data: any) => {
        openDeleteModal(data["ID"]);
      },
    },
  ];

  const tableHeader = () => {
    return (
      <div>
        <p className="has-text-centered">Rates</p>
        <table className="table is-fullwidth">
          <tr>
            <td className="smart-table-column-width-20">Type</td>
            <td className="smart-table-column-width-20">VH Type</td>
            <td className="smart-table-column-width-10">Rate Type</td>
            <td className="smart-table-column-width-10">Start</td>
            <td className="smart-table-column-width-10">End</td>
            <td className="smart-table-column-width-10">Price</td>
            <td className="smart-table-column-width-10">Extra Price</td>
            <td className="smart-table-column-width-10">Min Count</td>
          </tr>
        </table>
      </div>
    );
  };

  const RatesDisplay = (items: any) => {
    return (
      <>
        <table className="table is-bordered is-fullwidth">
          {/* <tr>
            <td>Type</td>
            <td>Rate Type</td>
            <td>Start</td>
            <td>End</td>
            <td>Price</td>
            <td>Extra Price</td>
            <td>Min Count</td>
          </tr> */}
          {items?.rates?.map((item: any) => (
            <>
              <tr>
                <td className="smart-table-column-width-20">
                  {item?.sd_hsn_id?.label}
                </td>
                <td className="smart-table-column-width-20">
                  {item?.vehicle_type}
                </td>
                <td className="smart-table-column-width-10">
                  {item?.rate_type?.label}
                </td>
                <td className="smart-table-column-width-10">
                  {item?.min_start}
                </td>
                <td className="smart-table-column-width-10">{item?.min_end}</td>
                <td className="smart-table-column-width-10">{item?.price}</td>
                <td className="smart-table-column-width-10">
                  {item?.extra_price}
                </td>
                <td className="smart-table-column-width-10">
                  {item?.min_units_vehicle}
                </td>
              </tr>
            </>
          ))}
        </table>
      </>
    );
  };
  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno" },
    {
      title: "Hub Id",
      index: "hub_id",
    },
    {
      title: "Company",
      index: "vendor_company",
    },

    {
      title: tableHeader(),
      index: "unit_rate",
      valueFunction: RatesDisplay,
    },
    {
      title: "Effective Date",
      index: "effective_date",
      type: "date",
      dateFormat: "DD-MM-YYYY",
    },
    {
      title: "Action",
      index: "action",
      type: "buttons",
      buttons: buttons,
      width: "10",
    },
  ];
  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-4",
      custom: <p className="is-size-4"> Hub (vs) Customers Rates</p>,
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
      buttons: [{
        type: "REFRESH",
        action: loadTableData,
      },
      { type: "FILTER" },
      {
        label: "Add",
        icon: "fa-plus",
        type: "CUSTOM",
        className: "smart-third-button",
        action: () => openOfficesForm(null),
      },
      {
        label: "Export",
        icon: "fa-arrow-up",
        type: "CUSTOM",
        className: "smart-third-button",
        action: () => exportExcel(),
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
        label: "Hub Id",
      },
    },
  ];
  return (
    <>
      <div className="smart-elf-table">
        <SmartTable
          columns={columns}
          data={tabData}
          tableTop={tableTop}
          filterFields={filterFields}
          tableProps={{
            className: " is-hoverable is-bordered is-striped smart-efl-table",
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

export default VendorRatesTable;
