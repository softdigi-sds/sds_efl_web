import React from "react";
import {
  SmartFormInterFace,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";
import { useSiteContext } from "../../contexts/SiteProvider";
import RecentPaymentForm from "./RecentPaymentForm";

const RecentPayment = () => {

    const { openModal, closeModal, setLoading } = useSiteContext();
  const tableData = [
    {
      s_no: 1,
      invoice: "INV-00123",
      customer_name: "John Doe",
      hub_id: "Hub A",
      amount: "$500",
      paid_amount: "$300",
      pending_amount: "$200",
    },
    {
      s_no: 2,
      invoice: "INV-00124",
      customer_name: "Jane Smith",
      hub_id: "Hub B",
      amount: "$750",
      paid_amount: "$500",
      pending_amount: "$250",
    },
    {
      s_no: 3,
      invoice: "INV-00125",
      customer_name: "Michael Brown",
      hub_id: "Hub C",
      amount: "$1,000",
      paid_amount: "$600",
      pending_amount: "$400",
    },
    {
      s_no: 4,
      invoice: "INV-00126",
      customer_name: "Emily Davis",
      hub_id: "Hub D",
      amount: "$450",
      paid_amount: "$450",
      pending_amount: "$0",
    },
    {
      s_no: 5,
      invoice: "INV-00127",
      customer_name: "Chris Johnson",
      hub_id: "Hub E",
      amount: "$850",
      paid_amount: "$500",
      pending_amount: "$350",
    },
  ];

  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno", width: "5" },
    {
      title: "Invoice Number",
      index: "invoice",
    },
    {
      title: "Customer",
      index: "customer_name",
    },
    { title: "Date", index: "hub_id" },
    {
      title: " Mode Of payment",
      index: "amount",
    },
    {
      title: "Payment (Rs.)",
      index: "paid_amount",
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
      content: <RecentPaymentForm  />,
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
          data={tableData}
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
