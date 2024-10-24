import { useEffect, useState } from "react";
import {
  SmartAlert,
  SmartLoaderInterface,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";
import { USER_URLS } from "../../api/AdminUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { showAlertAutoClose } from "../../services/notifyService";
import { get, post } from "../../services/smartApiService";
import UsersForm from "./UsersForm";
import UsersTableView from "./UsersTableView";
import PasswordChangeForm from "./PasswordChangeForm";

const UsersTable = () => {
  const [tabData, setTabData] = useState([]);
  const { openModal, closeModal, setLoading } = useSiteContext();

  const loadTableData = () => {
    let URL = USER_URLS.GET_ALL;
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
      title: <>{data.ID ? "User Update Form" : "User Addition Form"}</>,
      content: <UsersForm loadTableData={loadTableData} dataIn={data} />,
      className: "sd-efl-modal",
      closeBody: false,
      width: 60,
    };
    openModal(options);
  };
  const openPasswordChangeForm = (id: any) => {
    let options = {
      title: "Password Change Form",
      content: <PasswordChangeForm id={id} />,
      className: "sd-efl-modal",
      closeBody: false,
      width: 60,
    };
    openModal(options);
  };
  const handleDelete = (rowData: any) => {
    console.log("Delete action for row:", rowData);
  };

  const deleteData = (id: any) => {
    const subscription = post(USER_URLS.DELETE, { id: id }).subscribe(
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
          <i className="fa fa-check"></i> User Deletion!
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
          Note: Do you wish to delete this User? This action cannot be reverted
        </p>
      ),
      className: "custom-alert",
    };

    SmartAlert.show(alertProps);
  };

  const viewEditForm = (id: any) => {
    const subscription = post(USER_URLS.GET_ONE, { id: id }).subscribe(
      (response: any) => {
        openOfficesForm(response.data);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };

  const openViewDetails = (userData: any) => {
    let options = {
      title: "User Details",
      content: <UsersTableView userData={userData} />,
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
        openViewDetails(data);
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
      leftIcon: "fa fa-lock",
      classList: ["is-info"],
      onClick: (data: any) => {
        openPasswordChangeForm(data["ID"]);
      },
    },
  ];
  const statusTags = [
    { value: 5, label: "Active", class: "is-primary" },
    { value: 10, label: "Inactive", class: "is-danger" },
  ];
  const RolesList = (data: any) => {
    return (
      <div className="tags ">
        {data?.roles?.map((user: any) => (
          <div key={user.value} className="tag is-success mx-1">
            {user.label}
          </div>
        ))}
      </div>
    );
  };

  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno", width: "5" },
    // {
    //   title: "User ID",
    //   index: "euserid",
    //   width: "10",
    // },
    {
      title: "Name",
      index: "ename",
      width: "10",
    },
    {
      title: "Email",
      index: "emailid",
      width: "15",
    },
    {
      title: "Mobile Number",
      index: "mobile_no",
      width: "10",
    },
    {
      title: "Role",
      index: "roles",
      width: "20",
      valueFunction: RolesList,
    },

    // {
    //   title: "	Status",
    //   index: "active_status",
    //   width: "10",
    //   type: "tags",
    //   tags: statusTags,
    // },
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
      custom: <p className="is-size-4 has-text-weight-bold">Users</p>,
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
          type: "REFRESH",
          action: loadTableData,
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
      <div className="sd-efl-input">
        <SmartTable
          columns={columns}
          data={tabData}
          tableTop={tableTop}
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

export default UsersTable;
