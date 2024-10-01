import React, { useEffect, useState } from "react";
import { get, post } from "../../services/smartApiService";
import { useSiteContext } from "../../contexts/SiteProvider";
import VendorRatesForms from "./VendorRatesForms";
import {
  SmartAlert,
  SmartLoaderInterface,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";
import { VENDER_RATE_URLS, VENDERS_URLS } from "../../api/UserUrls";
import { showAlertAutoClose } from "../../services/notifyService";

const VendorRatesTable = () => {
  const [data, setData] = useState([]);
  const { openModal, closeModal } = useSiteContext();

  const loadTableData = () => {
    let URL = VENDER_RATE_URLS.GET_ALL;
    const subscription = get(URL).subscribe((response) => {
      setData(response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  useEffect(() => {
    loadTableData();
  }, []);

  const openOfficesForm = (data: any) => {
    //console.log("data ", data);
    let options = {
      title: <>{data.ID?"Vendor Rates Update Form":"Vendor Rates Addition Form"}</>,
      content: <VendorRatesForms loadTableData={loadTableData} dataIn={data} />,
      width: 60,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };
  const handleDelete = (rowData: any) => {
    console.log("Delete action for row:", rowData);
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
      onClick: handleDelete,
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
    { title: "Consumption Type", index: "unit_rate_type" },
    { title: "Parking Type", index: "parking_rate_type" },
    {
      title: "Unit Rate/ Extra Rate",
      index: "unit_rate",
    },
    { title: "Effective Date", index: "effective_date" },
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
      widthClass: "is-10",
      custom: <p className="is-size-4">Vendor Rates</p>,
    },
    {
      type: "BUTTONS",
      widthClass: "is-2",
      align: "RIGHT",
      buttons: [
        {
          label: "Add",
          icon: "fa-plus",
          type: "CUSTOM",
          action: openOfficesForm,
        },
      ],
    },
  ];

  return (
    <>
      <div className="smart-elf-table">
        <SmartTable
          columns={columns}
          data={data}
          tableTop={tableTop}
          tableProps={{
            className: " is-hoverable is-bordered is-striped smart-efl-table",
            isResponsive: true,
          }}
          paginationProps={{
            pageSize: 5,
          }}
        />
      </div>
    </>
  );
};

export default VendorRatesTable;
