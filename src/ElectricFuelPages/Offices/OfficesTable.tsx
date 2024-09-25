import React, { useEffect, useState } from 'react'
import { get } from '../../services/smartApiService';
import { SmartSoftTable, SmartTableNewInterface } from '../../core';

const OfficesTable = () => {
  const [data, setData] = useState([]);

  const loadTableData = () => {   
    const subscription = get("users").subscribe((response) => {
      setData(response.data.users);    
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  useEffect(() => {   
    loadTableData();
  }, []);

  const openOfficesForm = () => {
 
  }

  const handleDelete = (rowData: any) => {

    console.log('Delete action for row:', rowData);
  }

  const buttons = [
    {
      label: "",
      type: "icon",
      leftIcon: "fa fa-eye",
      classList: ["delete-color is-clickable is-size-5"],
      onClick: handleDelete
    },
    {
      label: "",
      type: "icon",
      leftIcon: " fa-pencil-square-o",
      classList: ["delete-color is-clickable is-size-5"],
      onClick: handleDelete
    },
    {
      label: "",
      type: "icon",
      leftIcon: "fa fa-times",
      classList: ["delete-color is-clickable is-size-5"],
      onClick: handleDelete
    },
  ];

  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno" },
    {
      title: "Office City",
      titleMobile: "Office City",
      index: "firstName",
    },
    {
      title: "State",
      titleMobile: "State",
      index: "lastName",
    },
    { title: "Pin Code", index: "age" },
    {
      title: "Address",
      index: "gender",
    },
    { title: "Status", index: "email" },
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
      custom: <p className="is-size-4">Offices & Location</p>,
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
      <SmartSoftTable
        columns={columns}
        data={data}
        tableTop={tableTop}
        tableProps={{
          className: "table is-hoverable is-bordered is-striped smart-basic-pdf-table",
          isResponsive: true,
        }}
        paginationProps={{
          pageSize: 5,
        }}
      />
    </>
  );
};

export default OfficesTable;
