import React, { useEffect, useState } from 'react'
import { get, post } from '../../services/smartApiService';
import { useSiteContext } from '../../contexts/SiteProvider';
import VendorsForm from './VendorsForm';
import { SmartAlert, SmartFormInterFace, SmartLoaderInterface, SmartTable, SmartTableNewInterface } from 'soft_digi';
import { VENDERS_URLS } from '../../api/UserUrls';
import { showAlertAutoClose } from '../../services/notifyService';

const VendorsTable = () => {
  const [data, setData] = useState([]);
  const { openModal, closeModal } = useSiteContext();


  const loadTableData = () => {   
    let URL = VENDERS_URLS.GET_ALL; 
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
      title: "Vendors Addition Form",
      content: <VendorsForm loadTableData={loadTableData} dataIn={data}/>,
      width: 60,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };
  const viewEditForm = (id: any) => { 
    const subscription = post(
      VENDERS_URLS.GET_ONE,
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
      VENDERS_URLS.DELETE,
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
          <i className="fa fa-check"></i> Vendors Deletion!
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
          Note: Do you wish to delete this Vendors? This action cannot be reverted
        </p>
      ),
      className: "custom-alert",
    };

    SmartAlert.show(alertProps);
  };
  // const openViewdetails = (hubsdetail: any) => {
  //   let options = {
  //     title: "Hub Details",
  //     content: <HubsView hubData={hubsdetail} />,
  //     width: 60,
  //   };
  //   openModal(options);
  // };

  const buttons = [
    {
      label: "",
      type: "icon",
      leftIcon: "fa fa-eye",
      classList: ["smart-efl-table-view-icon"],
      onClick: (data: any) => {
        viewEditForm(data["ID"]);
      },
    },
    {
      label: "",
      type: "icon",
      leftIcon: " fa-pencil-square-o",
      classList: ["smart-efl-table-edit-icon"],
      onClick: (data: any) => {
        viewEditForm(data["ID"]);
      },
    },
    {
      label: "",
      type: "icon",
      leftIcon: "fa fa-trash",
      classList: ["smart-efl-table-delete-icon"],
      onClick: (data: any) => {
        openDeleteModal(data["ID"]);
      },
    },
  ];
  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno" },
    {
      title: "Hun Id",
      index: "hub_id",
    },
    {
      title: "Code",
      index: "vendor_code", 


    },
    { title: "Company", index: "vendor_company" },
    {
      title: "Name",
      index: "vendor_name",
    },
    { title: "GST No", index: "gst_no" },
    { title: "Status", index: "status" },
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
      custom: <p className="is-size-4">Vendors</p>,
    },
    {
      type: "SEARCH",
      widthClass: "is-4",
      align: "JUSTIFY",
    },
    {
      type: "BUTTONS",
      widthClass: "is-2",
      align: "CENTER",
      buttons: [
        {type:"FILTER"},
        
        {
          label:"Add",
          icon:"fa-plus",
          type:"CUSTOM",
          action: openOfficesForm,
        },
      ],
      
    },
   
   
    
  ]
  const filterFields:SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "TEXT_BOX",
      width: "12",
      name: "hub_id",
      element: {
        label: "Hub Id",
      },
    },
    {
      type: "TEXT_BOX",
      width: "12",
      name: "vendor_company",
      element: {
        label: "Company",
      },
    },

     
    
  ]


  return (
    <>
    <div className="smart-elf-table">
      <SmartTable
        columns={columns}
        data={data}
        tableTop={tableTop}
        filterFields={filterFields}
        tableProps={{
          className: "is-hoverable is-bordered smart-efl-table",
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

export default VendorsTable
