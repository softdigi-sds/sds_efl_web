import React, { useState } from "react";
import { SmartTable, SmartTableNewInterface } from "soft_digi";
const DashBoardTable = () => {
    const [data, setData] = useState([]);
    const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
      { title: "S.NO", index: "s_no", type: "sno" },
      {
        title: "Hub ID",
        index: "office_city",
      },
      {
        title: "Vendors Company",
        index: "state_name",
      },
      { title: "Parking Amount ", index: "pin_code" },
      {
        title: "Units Amount",
        index: "address_one",
      },
      { title: "Invoice pdf", index: "status" },
    ];
  //   const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
  //     {
  //       type: "CUSTOM",
  //       widthClass: "is-10",
  //       custom: <p className="is-size-4">Invocie</p>,
  //     },
  //     {
  //       type: "BUTTONS",
  //       widthClass: "is-2",
  //       align: "RIGHT",
  //       buttons: [
  //         {
  //           label: "Add",
  //           icon: "fa-plus",
  //           type: "CUSTOM",
  //         },
  //       ],
  //     },
  //   ];
    return (
      <>
        <div className="smart-elf-table">
          <SmartTable
            columns={columns}
            data={data}
          //   tableTop={tableTop}
            tableProps={{
              className: " is-hoverable  is-striped ",
              isResponsive: true,
            }}
            paginationProps={{
              pageSize: 10,
            }}
          />
        </div>
      </>
    );
  };

export default DashBoardTable