
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

  const openOfficesForm =()=>{

  }
  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno", width: "5" },
    {
      title: <span className="has-text-danger">firstName</span>,
      titleMobile: "firstName",
      index: "firstName",
      width: "81",
    },
    {
      title: <span className="has-text-danger">lastName</span>,
      titleMobile: "lastName",
      index: "lastName",
      width: "81",
    },
    { title: "age", index: "age" },
    {
      title: "gender",
      index: "gender",
    },
    { title: "email", index: "email" },
    { title: "ID", index: "id" },
  ];
  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-10",
      custom: <p className="has-text-link is-size-4">Offices & Location</p>,
    },
    {
      type: "BUTTONS",
      widthClass: "is-2",
      align: "RIGHT",
      buttons: [
        
        {
          label:"Add",
          icon:"fa-plus",
          type:"CUSTOM",
          action: openOfficesForm,
        },
      ],
      
    },
   
   
    
  ]

  return (
    <>
      <p className="has-text-link is-size-4">Basic Responsive Table</p>
      <SmartSoftTable
        columns={columns}
        data={data}
        tableTop={tableTop}
        tableProps={{
          className: "table is-hoverable is-bordered is-striped smart-basic-pdf-table",
          isResponsive: true,
        }}
        paginationProps={{
          pageSize:5
        }}
      />
   


    
      
    
    </>
  );
};

export default OfficesTable
