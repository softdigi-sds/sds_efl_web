import React from "react";
import { SmartTable, SmartTableNewInterface } from "soft_digi";
import { formatCurrency } from "../../services/core/CommonService";

interface InputProps {
    dataIn: any;
}

const InvoiceVendorDetailsTable: React.FC<InputProps> = ({ dataIn }) => {
  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno", width: "5" },
    { title: "Invoice Number", index: "invoice_number", width: "15" },
    { title: "Hub", index: "hub_id", width: "20" },
  ];

  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-8",
      custom: <p className="is-size-4 is-italic has-text-link"></p>,
    },
  ];

  return (
    <>
      <div className="columns">
        <div className="column is-2">GST Amount:</div>
        <div className="column is-2"> { formatCurrency(dataIn?.gst_amount)}</div>
        <div className="column is-2">Total Tax:</div>
        <div className="column is-2">{ formatCurrency(dataIn?.total_taxable)}</div>
        <div className="column is-2">Total Amount:</div>
        <div className="column is-2">{ formatCurrency(dataIn?.total_amount)}</div>
      </div>

      <div className="smart-elf-table">
        <SmartTable
          columns={columns}
          data={dataIn}
          tableTop={tableTop}
          tableProps={{
            className: "is-hoverable is-bordered is-striped",
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

export default InvoiceVendorDetailsTable;
