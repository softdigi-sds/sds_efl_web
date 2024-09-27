import { useEffect, useState } from 'react';
import { SmartAlert, SmartLoaderInterface, SmartTable, SmartTableNewInterface } from 'soft_digi';
import { USER_URLS } from '../../api/AdminUrls';
import { useSiteContext } from '../../contexts/SiteProvider';
import { showAlertAutoClose } from '../../services/notifyService';
import { get, post } from '../../services/smartApiService';
import UsersForm from './UsersForm';

const UsersTable = () => {
    const [data, setData] = useState([]);
    const { openModal, closeModal,setLoading } = useSiteContext();

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
  
    const openOfficesForm =(data:any)=>{
      let options = {
        title: "User Addition Form",
        content: <UsersForm loadTableData={loadTableData} dataIn={data}/>
    }
    openModal(options);
    }
    const handleDelete = (rowData: any) => {
  
      console.log('Delete action for row:', rowData);
    }

    const deleteData = (id:any) => {    
      const subscription = post(
        USER_URLS.DELETE,
        { id: id }
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
          title: <span className="has-text-danger"><i className="fa fa-check"></i> User Deletion!</span>,
          alertFunction: (option) => {
              if (option == "yes") {
                deleteData(id);
                  SmartAlert.hide()
              }
          },
           content:<p>Note: Do you wish to delete this User? This action cannot be reverted</p>,
            className:"custom-alert"
      };
      
      SmartAlert.show(alertProps)
  }


   
    const viewEditForm = (id:any) => {
      const subscription = post(
        USER_URLS.GET_ONE,
        { id: id }
      ).subscribe((response:any) => {
        openOfficesForm(response.data);
      
      });
      return () => {
        subscription.unsubscribe();
      };
    };
  
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
  
  
    const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
      { title: "S.NO", index: "s_no", type: "sno" ,width:"5"},
      {
        title: "User ID",
        index: "euserid",
        width:"10"
      },
      {
        title: "Name",
        index: "ename",
         width:"15"
      },
      {
        title: "Email",
        index: "emailid",
         width:"15"
      },
      {
        title: "Mobile Number",
        index: "mobile_no",
         width:"15"
      },
      
      {
        title: "	Status",
        index: "active_status",
         width:"10"
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
        <SmartTable
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