import React, { useEffect, useState } from 'react'
import { get } from '../../services/smartApiService';
import { useSiteContext } from '../../contexts/SiteProvider';
import VendorRatesForms from './VendorRatesForms';
import { SmartTable, SmartTableNewInterface } from 'soft_digi';

const VendorRatesTable = () => {
  const [data, setData] = useState([]);
  const { openModal, closeModal } = useSiteContext();

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

  const openOfficesForm = (width: number) => {
    let options = {
      title: "Vendor Rates Addition Form",
      content: <VendorRatesForms />,
      width: 60,
    };
    openModal(options);
  };
  const handleDelete = (rowData: any) => {

    console.log('Delete action for row:', rowData);
  }

  const buttons = [
    {
      label: "",
      type: "icon",
      leftIcon: "fa fa-eye",
      classList: ["smart-efl-table-view-icon"],
      onClick: handleDelete
    },
    {
      label: "",
      type: "icon",
      leftIcon: " fa-pencil-square-o",
      classList: ["smart-efl-table-edit-icon"],
      onClick: handleDelete
    },
    {
      label: "",
      type: "icon",
      leftIcon: "fa fa-times",
      classList: ["smart-efl-table-delete-icon"],
      onClick: handleDelete
    },
  ];
  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno" },
    {
      title: "Hun Id",
      index: "firstName",
    },
    {
      title: "Company",
      index: "lastName",
    },
    { title: "Consumption Type", index: "age" },
    { title: "Parking Type", index: "age" },
    {
      title: "Unit Rate/ Extra Rate",
      index: "gender",
    },
    { title: "Effective Date", index: "email" },
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
          pageSize:5
        }}
      />
      </div>
      </>
  )
}

export default VendorRatesTable

