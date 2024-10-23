import { useEffect, useState } from "react";
import {
  SmartAlert,
  SmartFormInterFace,
  SmartLoaderInterface,
  SmartSoftButton,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";
import { CUSTOMER_URLS} from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import {
  showAlertAutoClose,
  showYesOrNoAlert,
} from "../../services/notifyService";
import { post } from "../../services/smartApiService";
import CustomersForm from "./CustomersForm";
import ViewDetails from "./ViewDetails";
import AddressTable from "./AddressTable";
interface headerProps {
  hubId?: string;
}

const CustomersTables: React.FC<headerProps> = ({ hubId }) => {


  const [data, setData] = useState([]);
  const { openModal, closeModal } = useSiteContext();

  const loadTableData = () => {
    let URL = CUSTOMER_URLS.GET_ALL;
    // let hub_id= hubId?hubId:"";
    const subscription = post(URL, { hub_id: hubId }).subscribe((response) => {
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
      title: <>{data.ID ? "Customer Update Form" : "Customer Addition Form"}</>,
      content: <CustomersForm loadTableData={loadTableData} dataIn={data} />,
      width: 60,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };
  const viewEditForm = (id: any) => {
    const subscription = post(CUSTOMER_URLS.GET_ONE, { id: id }).subscribe(
      (response: any) => {
        openOfficesForm(response.data);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };

  const deleteData = (id: any) => {
    const subscription = post(CUSTOMER_URLS.DELETE, { id: id }).subscribe(
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
          Note: Do you wish to delete this customer? This action cannot be
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
  const openViewdetails = (data: any) => {
    let options = {
      title: "Customer Details",
      content: <ViewDetails  />,
      width: 60,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };
  const openDetailsTable = (data: any) => {
    let options = {
      title: "Customer Details",
      content: <AddressTable dataIn={data.ID}/>,
      width: 80,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };
  const  openDetailsList=(data:any)=>{
    return(
        <div className="has-text-centered">
        <SmartSoftButton
          label="Add"
          onClick={() => openDetailsTable(data)}
          classList={["button is-small is-primary is-light"]}
        />
      </div>
    )
  }


  const StatusUpdate = (id: number, status: any) => {
    const subscription = post(CUSTOMER_URLS.STATUS_UPDATE, {
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
        ? "Do you wish to mark customer is active?"
        : "Do you wish to mark customer is inactive?";
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
  ];
  const statusTags = [
    { value: 5, label: "Active", class: "is-primary" },
    { value: 0, label: "Inactive", class: "is-danger" },
  ];
  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno" },

    { title: "Company", index: "vendor_company" },
    {
      title: "Name",
      index: "vendor_name",
    },
 
    { title: "Pan No.", index: "pan_no" },
    {
        title: "Details",
        index: "status",
        // type: "tags", tags: statusTags
        valueFunction: openDetailsList,
      },
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
      custom: <p className="is-size-4">Customer</p>,
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
          tableTop={hubId ? emptyArray : tableTop}
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




export default CustomersTables
