import { useEffect, useState } from "react";
import {
  SmartAlert,
  SmartFormInterFace,
  SmartLoaderInterface,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";
import { VENDER_RATE_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { showAlertAutoClose } from "../../services/notifyService";
import { get, post } from "../../services/smartApiService";
import VendorRatesForms from "./VendorRatesForms";
import VendorsRatesView from "./VendorsRatesView";
import VendorRatesSubFormTwo from "./VendorRatesSubFormTwo";

const VendorRatesTable = () => {
  const [data, setData] = useState([]);
  const { openModal, closeModal } = useSiteContext();

  const loadTableData = () => {
    let URL = VENDER_RATE_URLS.GET_ALL;
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

  const openOfficesForm = (data: any) => {
    //console.log("data ", data);
    let options = {
      title: <>{data.ID?"Vendor Rates Update Form":"Vendor Rates Addition Form"}</>,
      content: <VendorRatesForms loadTableData={loadTableData} dataIn={data} />,
      width: 60,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };
  const openVendersViewForm = (officeData: any) => {
    let options = {
      title: "Vendor Rates View",
      content: <VendorRatesSubFormTwo office={officeData} />,
      width: 60,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };


  const viewEditForm = (id: any) => {
    const subscription = post(VENDER_RATE_URLS.GET_ONE, { id: id }).subscribe(
      (response: any) => {
        let data_out = { ...response.data };
        openOfficesForm(data_out);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };
  const viewForm = (id: any) => {
    const subscription = post(VENDER_RATE_URLS.GET_ONE, { id: id }).subscribe(
      (response: any) => {
        let data_out = { ...response.data };
        openVendersViewForm (data_out);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };

  const deleteData = (id: any) => {
    const subscription = post(VENDER_RATE_URLS.DELETE, { id: id }).subscribe(
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
          <i className="fa fa-check"></i> Vendor Rate Deletion!
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
          Note: Do you wish to delete this Vendor Rate? This action cannot be
          reverted
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
      classList: ["smart-efl-table-view-icon"],
      onClick: (data: any) => {
        viewForm(data["ID"]);
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


    const RatesDisplay=(items:any)=>{
return(
  <>
  <table className="table is-bordered is-fullwidth">
   
   {items?.rates?.map((item:any)=>(
    <>
       <tr>
      <td>Type</td>
      <td>Rate Type</td>
      <td>Start</td>
      <td>End</td>
      <td>Price</td>
      <td>Extra Price</td>
      <td>Min Count</td>
    </tr>
    <tr>
      <td>{item?.sd_hsn_id?.label}</td>
      <td>{item?.rate_type?.label}</td>
      <td>{item?.min_start }</td>
      <td>{item?.min_end}</td>
      <td>{item?.price}</td>
      <td>{item?.extra_price}</td>
      <td>{item?.min_units_vehicle}</td>
    </tr>
    </>
   ))} 

  </table>
  </>
)
    }
  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno" },
    {
      title: "Hub Id",
      index: "hub_id",
    },
    {
      title: "Company",
      index: "vendor_company",
    },

    {
      title: "Rates",
      index: "unit_rate",
      valueFunction:RatesDisplay
    },
    { title: "Effective Date", index: "effective_date", type:"date",
      dateFormat:"DD-MM-YYYY",
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
      custom: <p className="is-size-4">Vendor Rates</p>,
    },{
      type: "SEARCH",
      widthClass: "is-3",
      align: "JUSTIFY",
    },
    {
      type: "BUTTONS",
      widthClass: "is-3",
      align: "CENTER",
      buttons: [ { type: "FILTER" },
        { 
          label: "Add",
          icon: "fa-plus",
          type: "CUSTOM",className: "smart-third-button",
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
  ];
  return (
    <>
      <div className="smart-elf-table">
        <SmartTable
          columns={columns}
          data={data}
          tableTop={tableTop} filterFields={filterFields}
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

export default VendorRatesTable;
