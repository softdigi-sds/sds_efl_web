import React, { useEffect, useState } from 'react'
import { SmartSoftTable, SmartTableNewInterface } from '../../core';
import { get, post } from '../../services/smartApiService';
import HubsForms from './HubsForms';
import { useSiteContext } from '../../contexts/SiteProvider';
import { HUBS_URLS } from '../../api/UserUrls';
import { showAlertAutoClose } from '../../services/notifyService';
import { SmartAlert, SmartLoaderInterface } from 'soft_digi';

const HubsTables = () => {
  const [data, setData] = useState([]);
  const { openModal, closeModal } = useSiteContext();

  const loadTableData = () => {  
    let URL = HUBS_URLS.GET_ALL; 
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

  const openOfficesForm = (data:any) => {
    let options = {
      title: "Hubs Addition Form",
      content: <HubsForms loadTableData={loadTableData} dataIn={data}/>,
      width: 60,
    };
    openModal(options);
  };
  const handleDelete = (rowData: any) => {

    console.log('Delete action for row:', rowData);
  }
  
  const viewEditForm = (id: any) => { 
    const subscription = post(
      HUBS_URLS.GET_ONE,
      { id: id }
    ).subscribe((response: any) => {
      openOfficesForm(response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const deleteData = (id: any) => {
    const subscription = post(
      HUBS_URLS.DELETE,
      { id: id }
    ).subscribe((response) => {
      showAlertAutoClose("Deleted Successfully...", "success");
      closeModal();
      loadTableData();
      // setLoading(false);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const openDeleteModal = (id: any) => {
    let alertProps: SmartLoaderInterface.SmartAlertInterface = {
      title: (
        <span className="has-text-danger">
          <i className="fa fa-check"></i> Hub Deletion!
        </span>
      ),
      alertFunction: (option) => {
        if (option == "yes") {
          deleteData(id);
          SmartAlert.hide();
        }
      },
      content: (
        <p>
          Note: Do you wish to delete this Hub? This action cannot be reverted
        </p>
      ),
      className: "custom-alert",
    };

    SmartAlert.show(alertProps);
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
      onClick: (data: any) => {
        viewEditForm(data["ID"]);
      },
    },
    {
      label: "",
      type: "icon",
      leftIcon: "fa fa-times",
      classList: ["delete-color is-clickable is-size-5"],
      onClick: (data: any) => {
        openDeleteModal(data["ID"]);
      },
    },
  ];
  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno" },
    {
      title: "Hub Id",
      index: "hub_id",
    },
    {
      title: "City",
      index: "office_city",
    },
    { title: "Location", index: "hub_location" },
    {
      title: "Access Group",
      index: "sd_efl_office_id",
    },
    { title: "State", index: "email" },
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
      custom: <p className="is-size-4">Hubs</p>,
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

export default HubsTables
