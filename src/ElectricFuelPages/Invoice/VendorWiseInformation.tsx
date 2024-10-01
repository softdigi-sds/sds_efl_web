import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SmartSoftButton, SmartTable, SmartTableNewInterface } from 'soft_digi';
import { INVOICE_URLS } from '../../api/UserUrls';
import { useSiteContext } from '../../contexts/SiteProvider';
import { post } from '../../services/smartApiService';
import VendorDetails from './VendorDetails';
import VendorDetailsImport from './VendorDetailsImport';


const VendorWiseInformation = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>({});
  const { openModal} = useSiteContext();
  const loadData = () => {
    let URL = INVOICE_URLS.GET_ONE_BILL
    const subscription = post(URL,{id:id}).subscribe((response) => {
      setData(response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  useEffect(() => {
    loadData();
  }, [IDBCursor]);
  ;

  const openForm = (data: any) => {
    let options = {
      title: "Vendor Details",
      content: <VendorDetails data={data} />,
      width: 50,
      className: "sd-efl-modal",
      closeBody: false,
    }
    openModal(options);
  }
  const handleDelete = (rowData: any) => {

    console.log('Delete action for row:', rowData);
  }






  const buttons = [

    {
      label: "View",
      type: "button",
      //   leftIcon: " ",
      classList: ["smart-efl-table-edit-icon", "is-small button"],
      onClick: (data: any) => {
        openForm(data["ID"]);
      },
    },

  ];




  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno", width: "5" },
    {
      title: "Hub",
      index: "hub_id",
      width: "20"
    },
    {
      title: "Vendor",
      index: "vendor_company",
      width: "20"
    },
    {
      title: "Total Amount",
      index: "total_amount",
      width: "10"
    },
    {
      title: "Status",
      index: "status",
      width: "10"
    },

    {
      title: "Details",
      index: "action",
      type: "buttons",
      buttons: buttons,
      width: "10",
    },
  ];
  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-8",
      custom: <p className="is-size-4">Vendor Wise Information</p>,
    },
    {
      type: "SEARCH",
      widthClass: "is-4",
      align: "JUSTIFY",
    },




  ]

  const Export = () => {
    console.log("export")
  }
  const openImportForm = () => {
    let options = {
      title: "Vendor Details",
      content: <VendorDetailsImport />,
      width: 50,
      className: "sd-efl-modal",
      closeBody: false,
    }
    openModal(options);
  }
  const BillInformation = () => {
    return (<>
      <div className='columns is-multiline'>
        <div className='column is-10'><p className='is-size-4'>Bill Details</p></div>
        <div className='column is-2'>
          <div className='is-flex'>
            <SmartSoftButton label='Export'
              onClick={() => Export()}
              classList={["button mx-1 is-primary",]}
            />
            <SmartSoftButton label='Import'
              onClick={() => openImportForm()}
              classList={["button mx-1 is-primary",]}
            />
          </div>
        </div>
        <div className='column is-4'><p>Start Date: <span>{data?.bill_start_date}</span></p></div>
        <div className='column is-4'><p>End Date:<span>{data?.bill_start_date}</span></p></div>
        <div className='column is-4'></div>
        <div className='column is-4'><p>Parking Amount (Rs):<span>{data?.bill_start_date}</span></p></div>
        <div className='column is-4'><p>Consumption Amount (Rs):<span>{data?.bill_start_date}</span></p></div>
        <div className='column is-4'><p>Others(Rs):<span>{data?.bill_start_date}</span></p></div>
        <div className='column is-4'><p>GST (Rs):<span>{data?.bill_start_date}</span></p></div>
        <div className='column is-4'><p>Total (Rs):<span>{data?.bill_start_date}</span></p></div>
        <div className='column is-4'></div>
      </div>
    </>
    )
  }

  return (
    <>
      {BillInformation()}
      <div className="smart-elf-table">
        <SmartTable
          columns={columns}
          data={data.invoice_data||[]}
          tableTop={tableTop}
          tableProps={{
            className: " is-hoverable is-bordered is-striped smart-efl-table ",
            isResponsive: true,
            searchPlaceHolder: "Search",
          }}
          paginationProps={{
            pageSize: 10
          }}
        />
      </div>
    </>
  )
}



export default VendorWiseInformation
