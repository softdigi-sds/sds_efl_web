import React, { useEffect, useState } from "react";
import {
  SmartFormInterFace,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";
import { useSiteContext } from "../../contexts/SiteProvider";
import RecentPaymentForm from "./RecentPaymentForm";
import { PAYMENT_URLS } from "../../api/UserUrls";
import { get } from "../../services/smartApiService";

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
      title: " Mode Of payment",
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
    // {
    //   title: "Action",
    //   index: "action",
    //   type: "buttons",
    //   buttons: buttons,
    //   width: "10",
    // },
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
  const openbillForm = (data: any) => {
    let options = {
      title: "Payment",
      content: <RecentPaymentForm  loadTableData={loadTableData}  />,
      width: 60,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };
  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-10",
      custom: (
        <p className="is-size-4">
          {" "}
          <i className="fa fa-inr is-link"></i>{" "}
          <span className="ml-3">Recent Payment</span>
        </p>
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
