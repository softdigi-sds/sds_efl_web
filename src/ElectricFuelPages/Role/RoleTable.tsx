import { useEffect, useState } from 'react';
import { SmartAlert, SmartLoaderInterface, SmartTable, SmartTableNewInterface } from 'soft_digi';
import { ROLE_URLS } from '../../api/AdminUrls';
import { useSiteContext } from '../../contexts/SiteProvider';
import { showAlertAutoClose } from '../../services/notifyService';
import { get, post } from '../../services/smartApiService';
import RoleForm from './RoleForm';

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
      title: <>{data.ID?"Role Update Form":"Role Addition Form"}</>,
      content: <RoleForm loadTableData={loadTableData} dataIn={data}/>,
      width:40,
      className:"sd-efl-modal",
      closeBody:false,
  }
  openModal(options);
  }
  const handleDelete = (rowData: any) => {

    console.log('Delete action for row:', rowData);
  }

  const viewEditForm = (id:any) => {
      const subscription = post(
      ROLE_URLS.GET_ONE,
      { id: id }
    ).subscribe((response:any) => {     
      openForm(response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const deleteData = (id:any) => {
    const subscription = post(
      ROLE_URLS.DELETE,
      { id: id }
    ).subscribe((response) => {
      showAlertAutoClose("Deleted Successfully...","success");
      closeModal();
      loadTableData();     
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
      classList: ["smart-efl-table-edit-icon"],
      onClick: (data:any) => {
        viewEditForm(data["ID"]);
      },
    },
    {
      label: "",
      type: "icon",
      leftIcon: "fa fa-trash",
      classList: ["smart-efl-table-delete-icon"],
      onClick: (data:any) => {
        openDeleteModal(data["ID"]);
        
      },
    },
  ];

  const employe_data = (data:any) =>{
    return(
        <>
        <div className="">
          {data.label}
        </div>
        </>
    )
  }

  
  
  const UserList = (data:any) => {
    return (
      <div className='tags '>
        {data.users.map((user:any) => (
          <div key={user.value} className='tag is-success mx-1'>
            {user.label}
          </div>
        ))}
      </div>
    );
  };
  
  
  
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
      valueFunction:UserList,
      // width: "20",
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
      widthClass: "is-6",
      custom: <p className="is-size-4 has-text-weight-bold">Role</p>,
    },
    {
      type: "SEARCH",
      widthClass: "is-4",
      align: "JUSTIFY",
    },
    {
      type: "BUTTONS",
      widthClass: "is-2",
      align: "RIGHT",
      buttons: [
        
        {
          label:"Add",
          icon:"fa-plus",
          type:"CUSTOM",className: "smart-third-button",
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
          searchPlaceHolder: "Search",
        }}
        paginationProps={{
          pageSize:10
        }}
      />
      </div>
      </>
  )
}

export default RoleTable