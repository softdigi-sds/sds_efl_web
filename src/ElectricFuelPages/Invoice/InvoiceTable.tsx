import React, { useState } from "react";
import { SmartTable, SmartTableNewInterface } from "soft_digi";
import InvoicebottomTable from "./InvoicebottomTable";
import SignPad from "../../core/general/SignPad";

const InvoiceTable = () => {
  const [data, setData] = useState([]);
  const [showInvoiceBottom, setShowInvoiceBottom] = useState(false);
  const [showSignPad, setShowSignPad] = useState(false);


  const handleSaveSignature = (signature: string) => {
    console.log("Saved signature:", signature);
    setShowSignPad(false);
  };

  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno" },
    {
      title: "Start Date",
      index: "office_city",
      type: "date",
      dateFormat: "DD-MM-YYYY",
    },
    {
      title: "End  Date",
      type: "date",
      dateFormat: "DD-MM-YYYY",
      index: "state_name",
    },
    { title: "Parking Amount ", index: "pin_code" },
    {
      title: "Units Amount",
      index: "address_one",
    },
    { title: "Invoices", index: "status" },
  ];

  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-10",
      custom: <p className="is-size-4">Invoice</p>,
    },
    {
      type: "BUTTONS",
      widthClass: "is-2",
      align: "RIGHT",
      buttons: [
        {
          label: "Next",
          type: "CUSTOM",
          action: () => setShowInvoiceBottom(true), 
        },
        {
          label: "Sign",
          type: "CUSTOM",
          action: () => setShowSignPad(true),
        },
      ],
    },
  ];

  return (
    <>
      {!showInvoiceBottom && (
        <div className="smart-elf-table">
          <SmartTable
            columns={columns}
            data={data}
            tableTop={tableTop}
            tableProps={{
              className: "is-hoverable is-bordered is-striped smart-efl-table",
              isResponsive: true,
            }}
            paginationProps={{
              pageSize: 5,
            }}
          />
        </div>
      )}

      {showInvoiceBottom && ( 
        <div>
          <InvoicebottomTable />
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
