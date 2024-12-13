import { useEffect, useState } from "react";
import {
  SmartAlert,
  SmartFormInterFace,
  SmartLoaderInterface,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";
import { PAYMENT_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { showAlertAutoClose } from "../../services/notifyService";
import { get, post } from "../../services/smartApiService";
import ImportTable from "./ImportTable";
import RecentPaymentForm from "./RecentPaymentForm";

const RecentPayment = () => {
  const { openModal, closeModal, setLoading } = useSiteContext();
  const [tabData, setTabData] = useState([]);
  const loadTableData = () => {
    let URL = PAYMENT_URLS.GET_ALL;
    const subscription = get(URL).subscribe((response) => {
      setTabData(response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  useEffect(() => {
    loadTableData();
  }, []);

  const openbillForm = (_data: any) => {
    let options = {
      title: "Payment",
      content: (
        <RecentPaymentForm loadTableData={loadTableData} dataIn={_data} />
      ),
      width: 60,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };

  const openImportForm = (date: any) => {
    let options = {
      title: "Importing Form",
      content: <ImportTable loadTableData={loadTableData} />,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };

  const deleteData = (id: any) => {
    const subscription = post(PAYMENT_URLS.DELETE, { id: id }).subscribe(
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
          <i className="fa fa-check"></i> Payment Deletion!
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
          Note: Do you wish to delete this Payment Transaction? This action
          cannot be reverted
        </p>
      ),
      className: "custom-alert",
    };

    SmartAlert.show(alertProps);
  };

  const buttons = [
    // {
    //   label: "",
    //   type: "icon",
    //   leftIcon: " fa-pencil-square-o",
    //   classList: ["smart-efl-table-edit-icon"],
    //   onClick: (data: any) => {
    //     openbillForm(data);
    //   },
    // },
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
    { title: "S.NO", index: "s_no", type: "sno", width: "5" },
    {
      title: "Invoice Number",
      index: "invoice_number",
    },
    {
      title: "Customer",
      index: "vendor_company",
    },
    {
      title: "Date",
      index: "payment_date",
      type: "date",
      dateFormat: "DD-MM-YYYY",
    },
    {
      title: " Mode of Payment",
      index: "payment_mode",
    },
    {
      title: "Payment (Rs.)",
      index: "payment_amount",
    },
    //  {
    //     title: "Pending",
    //     index: "pending_amount",

    //   },
    // { title: "Status", index: "status", type: "tags", tags: statusTags },
    {
      title: "Action",
      index: "action",
      type: "buttons",
      buttons: buttons,
      width: "10",
    },
  ];
  const options = [
    { value: "1", label: "Test" },
    { value: "2", label: "Test" },
    { value: "3", label: "test" },
  ];
  const filterFields: SmartFormInterFace.SmartFormElementProps[] = [
    // {
    //   type: "SELECT_BOX",
    //   width: "12",
    //   name: "office_city",
    //   element: {
    //     label: "Office City",
    //   },
    // },
    {
      type: "SELECT_BOX",
      width: "12",
      name: "state_name",
      element: {
        label: "State",
        options: options,
      },
    },
  ];

  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-10",
      custom: (
        <div className="is-flex is-justify-content-space-between">
          <p className="is-size-4">
            {" "}
            <i className="fa fa-inr is-link"></i>{" "}
            <span className="ml-3">Recent Payment</span>
          </p>
          <p
            className="has-text-link mr-2 mt-2 is-clickable"
            onClick={() => openImportForm("")}
          >
            {" "}
            <i className="fa fa-download is-size-4 ml-4" aria-hidden="true"></i>
          </p>
        </div>
      ),
    },
    {
      type: "BUTTONS",
      widthClass: "is-2",
      align: "CENTER",
      buttons: [
        {
          label: "Add Payment",
          icon: "fa-plus",
          type: "CUSTOM",
          className: "smart-third-button",
          action: openbillForm,
        },
      ],
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

export default RecentPayment;
