import React, { useEffect, useState } from 'react'
import { get } from '../../services/smartApiService';
import { SmartSoftTable, SmartTableNewInterface } from '../../core';
import UsersForm from './UsersForm';
import { useSiteContext } from '../../contexts/SiteProvider';
import { USER_URLS } from '../../api/AdminUrls';

const UsersTable = () => {
    const [data, setData] = useState([]);
    const { openModal, closeModal } = useSiteContext();

    const loadTableData = () => {  
      let URL =USER_URLS.GET_ALL 
      const subscription = get(URL).subscribe((response) => {
        setData(response.data);    
      });
      return () => {
        subscription.unsubscribe();
      };
    };
  
    useEffect(() => {   
      loadTableData();
    }, []);
  
    const openOfficesForm =()=>{
      let options = {
        content: <UsersForm />
    }
    openModal(options);
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
        title: "Name",
        index: "firstName",
      },
      {
        title: "Email",
        index: "lastName",
      },
      {
        title: "Designation",
        index: "firstName",
      },
      {
        title: "	Status",
        index: "firstName",
      },
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
        custom: <p className="is-size-4">Users</p>,
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
        <SmartSoftTable
          columns={columns}
          data={data}
          tableTop={tableTop}
          tableProps={{
            className: "smart-efl-table is-hoverable is-bordered is-striped ",
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

export default UsersTable