import {
  SmartFormInterFace,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";

interface props {
  data: any
}

const PaymentInvoice:React.FC<props>  = ({data}) => {

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
      index: "invoice_number",
    },
    {
      title: "Customer",
      index: "vendor_company",
    },
    { title: "Hub", index: "hub_id" },
    {
      title: "Amount",
      index: "total_amount",
    },
    {
      title: "Paid",
      index: "paid",
    },
    {
      title: "Pending",
      index: "rem",
    },
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

  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-6",
      custom: (
        <p className="is-size-4">
          {" "}
          <i className="fa fa-file-text is-link"></i>{" "}
          <span className="ml-3"> Invoice / Payment</span>
        </p>
      ),
    },
    {
      type: "SEARCH",
      widthClass: "is-6",
      align: "JUSTIFY",
    },
    // {
    //     type: "CUSTOM",
    //     widthClass: "is-2 ",
    //     custom: <p className="is-size-7">Offices & Location</p>,
    //   },
  ];
  return (
    <>
      <div className="smart-elf-table">
        <SmartTable
          columns={columns}
          data={data}
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

export default PaymentInvoice;
