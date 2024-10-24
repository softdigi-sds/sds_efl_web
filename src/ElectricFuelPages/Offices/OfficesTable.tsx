import { useEffect, useState } from "react";
import { get, post } from "../../services/smartApiService";
// import { SmartAlert, SmartLoaderInterface } from "../../core";
import {
  SmartAlert,
  SmartFormInterFace,
  SmartLoaderInterface,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";
import { OFFICE_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import {
  showAlertAutoClose,
  showYesOrNoAlert,
} from "../../services/notifyService";
import { admin_states_select } from "../../services/site/SelectBoxServices";
import OfficesForm from "./OfficesForm";
import OfficeTableView from "./OfficeTableView";

const OfficesTable = () => {
  const [tabData, setTabData] = useState([]);
  const { openModal, closeModal, setLoading } = useSiteContext();
  const [states, setStates] = useState([]);
  const loadTableData = () => {
    let URL = OFFICE_URLS.GET_ALL;
    const subscription = get(URL).subscribe((response) => {
      setTabData(response.data);
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
      title: <>{data.ID ? "Offices Update Form" : "Offices Addition Form"}</>,
      content: <OfficesForm loadTableData={loadTableData} dataIn={data} />,
      width: 60,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };
  const deleteData = (id: any) => {
    const subscription = post(OFFICE_URLS.DELETE, { id: id }).subscribe(
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
          <i className="fa fa-check"></i> Office Deletion!
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
          Note: Do you wish to delete this Office? This action cannot be
          reverted
        </p>
      ),
      className: "custom-alert",
    };

    SmartAlert.show(alertProps);
  };

  const viewEditForm = (id: any) => {
    const subscription = post(OFFICE_URLS.GET_ONE, { id: id }).subscribe(
      (response: any) => {
        openOfficesForm(response.data);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };
  const openViewdetails = (office: any) => {
    let options = {
      title: "Office Details",
      content: <OfficeTableView office={office} />,
      width: 60,
      className: "sd-efl-modal",
      closeBody: false,
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
  ];

  const StatusUpdate = (id: number, status: any) => {
    const subscription = post(OFFICE_URLS.DELETE, {
      id: id,
      status: status,
    }).subscribe((response) => {
      setLoading(false);
      setTabData((prevItems: any) =>
        prevItems.map((item: any) =>
          item.ID === id ? { ...item, offer_status: status } : item
        )
      );
      if (status == 0) showAlertAutoClose("office Reopen", "success");
      else showAlertAutoClose("office Shutdown", "success");
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const updateStatus = (itemIn: any, check_value: boolean) => {
    let new_status: number = itemIn.status === 5 ? 1 : 0;
    let msg: string =
      new_status === 0
        ? "Do you wish to mark office is reopen?"
        : "Do you wish to mark office is shutdown?";

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

  const SwitchForm = (item: any) => {
    return (
      item.ID && (
        <>
          <div className="sds-elf-switch switch">
            <input
              id={"switchRoundedDefault_" + item.ID}
              type="checkbox"
              className="switch is-rounded is-small"
              checked={item.status === 5}
              onChange={(event: any) => updateStatus(item, event)}
            />
            <span className="slider round"></span>
            {/* <label htmlFor={"switchRoundedDefault_" + item.ID}></label> */}
          </div>
        </>
      )
    );
  };

  const statusTags = [
    { value: 5, label: "Active", class: "has-text-link" },
    { value: 10, label: "Inactive", class: "has-text-danger" },
  ];
  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno", width: "5" },
    {
      title: "Office City",
      index: "office_city",
    },
    {
      title: "State",
      index: "state_name",
    },
    { title: "Pin Code", index: "pin_code", width: "10" },
    {
      title: "Address",
      index: "address_one",
    },
    // {
    //   title: "Status",
    //   index: "status",
    //   valueFunction:SwitchForm
    // },
    // { title: "Status", index: "status", type: "tags", tags: statusTags },
    {
      title: "Action",
      index: "action",
      type: "buttons",
      buttons: buttons,
      width: "10",
    },
  ];
  useEffect(() => {
    admin_states_select((data: any) => setStates(data));
    //  loadData();
  }, []);
  const filterFields: SmartFormInterFace.SmartFormElementProps[] = [
    // {
    //   type: "SELECT_BOX",
    //   width: "12",
    //   name: "office_city",
    //   element: {
    //     label: "Office City",
    //   },
    // },
    {
      type: "SELECT_BOX",
      width: "12",
      name: "state_name",
      element: {
        label: "State",
        options: states,
      },
    },
  ];

  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-6 ",
      custom: <p className="is-size-4">Offices & Location</p>,
    },
    {
      type: "SEARCH",
      widthClass: "is-3",
      align: "JUSTIFY",
    },
    {
      type: "BUTTONS",
      widthClass: "is-3",
      align: "CENTER",
      buttons: [
        {
          type: "REFRESH",
          action: loadTableData,
        },
        {
          type: "FILTER",
        },
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

  return (
    <>
      <div className="smart-elf-table">
        <SmartTable
          columns={columns}
          data={tabData}
          tableTop={tableTop}
          filterFields={filterFields}
          tableProps={{
            className: " is-hoverable is-bordered is-striped smart-efl-table",
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

export default OfficesTable;
