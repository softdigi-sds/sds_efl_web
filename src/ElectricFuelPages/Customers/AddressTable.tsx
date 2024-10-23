import { useEffect, useState } from "react";
import {
  SmartAlert,
  SmartFormInterFace,
  SmartLoaderInterface,
  SmartSoftButton,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";
import { CUSTOMER_URLS, VENDERS_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import {
  showAlertAutoClose,
  showYesOrNoAlert,
} from "../../services/notifyService";
import { post } from "../../services/smartApiService";
import AddressForm from "./AddressForm";

interface headerProps {
  dataIn?: string;
}

const AddressTable: React.FC<headerProps> = ({ dataIn }) => {


  const [data, setData] = useState([]);
  const { openModal, closeModal } = useSiteContext();

  const loadTableData = () => {
    let URL = CUSTOMER_URLS.GET_ALL_ADDRESS;
    // let hub_id= hubId?hubId:"";
    const subscription = post(URL, { hub_id: dataIn }).subscribe((response) => {
      setData(response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  useEffect(() => {
    loadTableData();
  }, []);

  const openOfficesForm = (data: any) => {
    let options = {
      title: <>{data.ID ? "Customer Details Update Form" : "Customer Details Addition Form"}</>,
      content: <AddressForm loadTableData={loadTableData} dataIn={data} />,
      width: 60,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };
  const viewEditForm = (id: any) => {
    const subscription = post(CUSTOMER_URLS.GET_ONE_ADDRESS, { id: id }).subscribe(
      (response: any) => {
        openOfficesForm(response.data);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };

  const deleteData = (id: any) => {
    const subscription = post(CUSTOMER_URLS.DELETE_ADDRESS, { id: id }).subscribe(
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
          <i className="fa fa-check"></i> Customer Details Deletion!
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
          Note: Do you wish to delete this Customer Details? This action cannot be
          reverted
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
//   const openViewdetails = (data: any) => {
//     let options = {
//       title: "Customer Details",
//       content: <VendorsView office={data} />,
//       width: 60,
//       className: "sd-efl-modal",
//       closeBody: false,
//     };
//     openModal(options);
//   };

  const StatusUpdate = (id: number, status: any) => {
    const subscription = post(CUSTOMER_URLS.STATUS_UPDATE_ADDRESS, {
      id: id,
      status: status,
    }).subscribe((response) => {
      loadTableData();
      // setData((prevItems: any) =>
      //   prevItems.map((item: any) =>
      //     item.ID === id ? { ...item, offer_status: status } : item
      //   )
      // );
      // if (status == 5) showAlertAutoClose("Vendor active", "success");
      // else showAlertAutoClose("Vendor inactive", "success");
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const updateStatus = (itemIn: any) => {
    let new_status: number = itemIn.status === 5 ? 10 : 5;
    let msg: string =
      new_status === 0
        ? "Do you wish to mark vendor is active?"
        : "Do you wish to mark office is inactive?";
    //console.log("check in value ", check_value);

    // Trigger alert for confirmation
    showYesOrNoAlert(
      msg,
      (selection: Selection) =>
        updateStatusFinal(selection, itemIn, new_status),
      "info"
    );
  };

  const updateStatusFinal = (
    selection: any,
    itemIn: any,
    new_status: number
  ) => {
    if (selection === "yes") {
      // Post data to the backend
      StatusUpdate(itemIn.ID, new_status);
    }
  };

  const handleInputChange = (event: any, item: any) => {
    let in_value = event.target.checked ? event.target.value : "";
    // console.log("in value " , in_value)
  };

  const SwitchForm = (item: any) => {
    return (
      item.ID && (
        <>
          <div className="field">
            <input
              id={`switchExample_${item.ID}`}
              type="checkbox"
              name={`switchExample_${item.ID}`}
              className="switch is-small"
              checked={item.status == 5 ? true : false}
              onChange={() => updateStatus(item)}
            />
            <label htmlFor={`switchExample_${item.ID}`}></label>
          </div>
        </>
      )
    );
  };

  const buttons = [
    {
      label: "",
      type: "icon",
      leftIcon: "fa fa-eye",
      classList: ["smart-efl-table-view-icon"],
      onClick: (data: any) => {
        // openViewdetails(data);
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
  const statusTags = [
    { value: 5, label: "Active", class: "is-primary" },
    { value: 0, label: "Inactive", class: "is-danger" },
  ];
  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno" },
 
    {
      title: "Code",
      index: "vendor_code",
    },
 

    { title: "GST No.", index: "gst_no" },
    { title: "Address", index: "address" },
  
    {
      title: "Status",
      index: "status",
      // type: "tags", tags: statusTags
      valueFunction: SwitchForm,
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
      custom: <p className="is-size-4">Customer Details</p>,
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
        { type: "FILTER" },

        {
          label: "Add",
          icon: "fa-plus",
          type: "CUSTOM",
          className: "smart-third-button",
          action: openOfficesForm,
        },
      ],
    },
  ];
  const filterFields: SmartFormInterFace.SmartFormElementProps[] = [

    {
      type: "TEXT_BOX",
      width: "12",
      name: "vendor_company",
      element: {
        label: "Company",
      },
    },
    {
      type: "SELECT_BOX",
      width: "12",
      name: "status",
      element: {
        label: "Status",
        options: [
          { value: "5", label: "Active" },
          { value: "10", label: "Inactive" },
        ],
      },
    },
  ];
  const emptyArray: any[] = [];

  return (
    <>
      <div>
        <SmartTable
          columns={columns}
          data={data}
          tableTop={ tableTop}
          filterFields={filterFields}
          tableProps={{
            className: "is-hoverable is-bordered smart-efl-table",
            isResponsive: true,
            searchPlaceHolder: "Search",
          }}
          paginationProps={{
            pageSize: 10,
          }}
        />
      </div>
    </>
  );
};



export default AddressTable
