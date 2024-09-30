import { useEffect, useState } from "react";
import { get, post } from "../../services/smartApiService";
// import { SmartAlert, SmartLoaderInterface } from "../../core";
import {
  SmartAlert,
  SmartLoaderInterface,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";
import { OFFICE_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { showAlertAutoClose } from "../../services/notifyService";
import OfficesForm from "./OfficesForm";
import OfficeTableView from "./OfficeTableView";

const OfficesTable = () => {
  const [data, setData] = useState([]);
  const { openModal, closeModal, setLoading } = useSiteContext();

  const loadTableData = () => {
    let URL = OFFICE_URLS.GET_ALL;
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

  const openOfficesForm = (width: number) => {
    let options = {
      title: "Offices Addition Form",
      content: <OfficesForm loadTableData={loadTableData} dataIn={data} />,
      width: 60,
    };
    openModal(options);
  };
  const deleteData = (id: any) => {
    const subscription = post(
      OFFICE_URLS.DELETE,
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
          Note: Do you wish to delete this Office? This action cannot be reverted
        </p>
      ),
      className: "custom-alert",
    };

    SmartAlert.show(alertProps);
  };



  const viewEditForm = (id: any) => { 
    const subscription = post(
      OFFICE_URLS.GET_ONE,
      { id: id }
    ).subscribe((response: any) => {
      openOfficesForm(response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };
  const openViewdetails = (office: any) => {
    let options = {
      title: "Office Details",
      content: <OfficeTableView office={office} />,
      width: 60,
      className:"sd-efl-modal",
      closeBody:false,
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

  const statusTags = [
    { value: "SUBMITTED", Label: "SUBMITTED", class: "is-warning" },
    { value: "QUALIFIED", Label: "QUALIFIED", class: "is-info" },
    { value: "PAID", Label: "PAID", class: "is-success" },
    { value: "COMPLIMENTARY", Label: "COMPLIMENTARY", class: "has-text-info" },
    { value: "CANCELLED", Label: "CANCELLED", class: "is-danger" },
    { value: "PUBLISHED", Label: "PUBLISHED", class: "is-success" },
    { value: "ACTIVE", Label: "ACTIVE", class: "is-success" },
  ];

  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno",width:"5" },
    {
      title: "Office City",
      index: "office_city",
    },
    {
      title: "State",
      index: "state_name",
    },
    { title: "Pin Code", index: "pin_code" },
    {
      title: "Address",
      index: "address_one",
    },
    { title: "Status", index: "status"
      //  type: "tags", tags: statusTags
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
      custom: <p className="is-size-4">Offices & Location</p>,
    },
    {
      type: "BUTTONS",
      widthClass: "is-2",
      align: "RIGHT",
      buttons: [
        {
          label: "Add",
          icon: "fa-plus",
          type: "CUSTOM",
          // classList:"smart-efl-Primary-button",
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
          data={data}
          tableTop={tableTop}
          tableProps={{
            className: " is-hoverable is-bordered is-striped smart-efl-table",
            isResponsive: true,
          }}
          paginationProps={{
            pageSize: 5,
          }}
        />
      </div>
    </>
  );
};

export default OfficesTable;
