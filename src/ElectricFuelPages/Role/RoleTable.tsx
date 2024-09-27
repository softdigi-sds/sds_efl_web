import React, { useEffect, useState } from 'react'
import { get, post } from '../../services/smartApiService';
import { ROLE_URLS } from '../../api/AdminUrls';
import RoleForm from './RoleForm';
import { useSiteContext } from '../../contexts/SiteProvider';
import { showAlertAutoClose } from '../../services/notifyService';
import { user_get_select } from '../../services/site/SelectBoxServices';
import { SmartAlert, SmartLoaderInterface, SmartTable, SmartTableNewInterface } from 'soft_digi';

const RoleTable = () => {
    const [data, setData] = useState([]);
  
    const { openModal, closeModal,setLoading } = useSiteContext();

  const loadTableData = () => {  
    let URL =ROLE_URLS.GET_ALL 
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
 ;

  const openForm =(data:any)=>{
    let options = {
      content: <RoleForm loadTableData={loadTableData} dataIn={data}/>,
      width:40
  }
  openModal(options);
  }
  const handleDelete = (rowData: any) => {

    console.log('Delete action for row:', rowData);
  }

  const viewEditForm = (id:any) => {
    setLoading(true, "Please Wait....");
    const handleError = (errorMessage:any) => {
      showAlertAutoClose(errorMessage,"error", );
      setLoading(false);
    };
    const subscription = post(
      ROLE_URLS.GET_ONE,
      { id: id },
      handleError
    ).subscribe((response:any) => {
      // console.log("response ", response);
      openForm(response.data);
      setLoading(false);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const deleteData = (id:any) => {
    setLoading(true, "Please Wait....");
    const handleError = (errorMessage:any) => {
      showAlertAutoClose(errorMessage,"error" );
      setLoading(false);
    };
    const subscription = post(
      ROLE_URLS.DELETE,
      { id: id },
      handleError
    ).subscribe((response) => {
      showAlertAutoClose("Deleted Successfully...","success");
      closeModal();
      loadTableData();
      // setLoading(false);
    });
    return () => {
      subscription.unsubscribe();
    };
  };


  const openDeleteModal = (id:any) => {
    let alertProps: SmartLoaderInterface.SmartAlertInterface = {
        title: <span className="has-text-danger"><i className="fa fa-check"></i> Role Deletion!</span>,
        alertFunction: (option) => {
            if (option == "yes") {
              deleteData(id);
                SmartAlert.hide()
            }
        },
         content:<p>Note: Do you wish to delete this Role? This action cannot be reverted</p>,
          className:"custom-alert"
    };
    
    SmartAlert.show(alertProps)
}


  const buttons = [
    
    {
      label: "",
      type: "icon",
      leftIcon: " fa-pencil-square-o",
      classList: ["delete-color is-clickable is-size-5"],
      onClick: (data:any) => {
        viewEditForm(data["ID"]);
      },
    },
    {
      label: "",
      type: "icon",
      leftIcon: "fa fa-times",
      classList: ["delete-color is-clickable is-size-5"],
      onClick: (data:any) => {
        openDeleteModal(data["ID"]);
        
      },
    },
  ];

  const employe_data = () =>{
    return(
        <>
        {/* {.lastName} */}
        </>
    )
  }

  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno" ,width:"5"},
    {
      title: "Role Name",
      index: "role_name",
      width:"20"
    },
    {
      title: "Users",
      index: "users",
      valueFunction:employe_data,
      width: "20",
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
      custom: <p className="is-size-4">Role</p>,
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
          action: openForm,
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
          className: " is-hoverable is-bordered is-striped smart-efl-table ",
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

export default RoleTable