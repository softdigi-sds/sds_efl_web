import { useEffect, useState } from 'react';
import { SmartAlert, SmartFormInterFace, SmartLoaderInterface, SmartTable, SmartTableNewInterface } from 'soft_digi';
import { HUBS_URLS } from '../../api/UserUrls';
import { useSiteContext } from '../../contexts/SiteProvider';
import { showAlertAutoClose, showYesOrNoAlert } from '../../services/notifyService';
import { office_get_all_select } from '../../services/site/SelectBoxServices';
import { get, post } from '../../services/smartApiService';
import HubsForms from './HubsForms';
import HubsView from './HubsView';
import HubsMapView from './HubsMapView';

const HubsTables = () => {
  const [data, setData] = useState([]);
  const { openModal, closeModal } = useSiteContext();
  const [allOffice, setAllOffice] = useState([]);

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
  useEffect(() => {

    office_get_all_select((data: any) => setAllOffice(data));
  }, []);

  const openOfficesForm = (data: any) => {
    let options = {
      title: <>{data.ID?"Hubs Update Form":"Hubs Addition Form"}</>,
      content: <HubsForms loadTableData={loadTableData} dataIn={data} />,
      width: 60,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };

  const viewEditForm = (id: any) => {
    const subscription = post(HUBS_URLS.GET_ONE, { id: id }).subscribe(
      (response: any) => {
        openOfficesForm(response.data);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };

  const deleteData = (id: any) => {
    const subscription = post(HUBS_URLS.DELETE, { id: id }).subscribe(
      (response) => {
        showAlertAutoClose("Deleted Successfully...", "success");
        closeModal();
        loadTableData();
        // setLoading(false);
      }
    );
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
  const openViewdetails = (hubsdetail: any) => {
    let options = {
      title: "Hub Details",
      content: <HubsView hubData={hubsdetail} />,
      width: 60,
    };
    openModal(options);
  };
  const openMapView = (hubsdetail: any) => {
    let options = {
      title: "Hub Location",
      content: <HubsMapView  />,
      width: 80,
    };
    openModal(options);
  };

  const buttons = [
    {
      label: "",
      type: "icon",
      leftIcon: "fa fa-eye",
      classList: ["smart-efl-table-view-icon"],
      onClick: (data: any) => {
        openViewdetails(data);
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
    {
      label: "",
      type: "icon",
      leftIcon: "fa fa-map-o",
      classList: ["has-text-warning-dark"],
      onClick: (data: any) => {
        openMapView(data["ID"]);
      },
    },
  ];
  const GroupDisplay = (data: any) => {
    return (
      <>
        <div className="tags">
          {data?.role.map((item: any) => (
            <>
              <p className="tag">{item.label}</p>
            </>
          ))}
        </div>
      </>
    );
  };
  const LocationDisplay = (data: any) => {
    return (
      <>
        <div className="tags">{data?.city?.label}</div>
      </>
    );
  };
  const StatusUpdate = (id:number, status:any) => {
 
    const subscription = post(
      HUBS_URLS.DELETE,
      { id: id, status: status },
     
    ).subscribe((response) => {
     
      setData((prevItems:any) =>
        prevItems.map((item:any) =>
          item.ID === id
            ? { ...item, offer_status: status } 
            : item
        )
      );
      if(status == 0)
        showAlertAutoClose("Hubs Reopen", "success");
      else
      showAlertAutoClose("Hubs Shutdown", "success");
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  
  const updateStatus = (itemIn:any, check_value: boolean) => {
 
  
   
    let new_status: number = itemIn.status === 5 ? 1 : 0;
    let msg: string =
      new_status === 0
        ? "Do you wish to mark office is reopen?"
        : "Do you wish to mark office is shutdown?";
  
    // Trigger alert for confirmation
    showYesOrNoAlert(
      msg,
      (selection: Selection) => updateStatusFinal(selection, itemIn, new_status),
      "info"
    );
  };
  
  const updateStatusFinal = (selection:any, itemIn:any, new_status: number) => {
    if (selection === "yes") {
      // Post data to the backend
      StatusUpdate(itemIn.ID, new_status);
    }
  };

 
  

  
  const SwitchForm = ( item:any ) => {
    return (
      item.ID && (
        <>
          <div className="sds-elf-switch switch">
            <input
              id={"switchRoundedDefault_" + item.ID}
              type="checkbox"
               className="switch is-rounded is-small"
              checked={item.status === 5}
              onChange={(event:any) => updateStatus(item, event)}
            />
              <span className="slider round"></span>
            {/* <label htmlFor={"switchRoundedDefault_" + item.ID}></label> */}
          </div>
        </>
      )
    );
  };
  
  const statusTags = [
    { value: 5, Label: "Active", class: "is-primary" },
    { value: 10, Label: "Inactive", class: "is-danger" },
  ];
  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno", width: "5" },
    {
      title: "Hub Id",
      index: "hub_id",
      width: "15",
    },
    {
      title: "City",
      index: "office_city",
      width: "10",
    },
    {
      title: "Location",
      index: "hub_location",
      valueFunction: LocationDisplay,
    },

    {
      title: "Access Group",
      index: "role",
      valueFunction: GroupDisplay,
    },
    { title: "Status", index: "status", valueFunction:SwitchForm },
    {
      title: "Action",
      index: "action",
      type: "buttons",
      buttons: buttons,
      width: "15",
    },
  ];
  const filterFields:SmartFormInterFace.SmartFormElementProps[] = [
 
    {
      type: "TEXT_BOX",
      width: "12",
      name: "office_city",
      element: {
        label: "Office City", 
        options: allOffice,
      },
    },

     
    
  ]
  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-6",
      custom: <p className="is-size-4">Hubs</p>,
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
        {
          type: "FILTER",
        },
        {
          label: "Add",
          icon: "fa-plus",
          type: "CUSTOM",className: "smart-third-button",
          action: () => openOfficesForm({}),
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
        filterFields={filterFields}
        tableTop={tableTop}
        tableProps={{
          className: " is-hoverable is-bordered is-striped smart-efl-table",
          isResponsive: true,
          searchPlaceHolder: "Search",
        }}
        paginationProps={{
          pageSize:10
        }}
      />
      </div>
    </>
  );
};

export default HubsTables;
