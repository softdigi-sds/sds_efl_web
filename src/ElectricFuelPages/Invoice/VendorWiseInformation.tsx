import { useEffect, useState } from 'react';
import { SmartAlert, SmartLoaderInterface, SmartSoftButton, SmartTable, SmartTableNewInterface } from 'soft_digi';
import { ROLE_URLS } from '../../api/AdminUrls';
import { useSiteContext } from '../../contexts/SiteProvider';
import { showAlertAutoClose } from '../../services/notifyService';
import { get, post } from '../../services/smartApiService';
import VendorDetails from './VendorDetails';


const VendorWiseInformation = () => {
    const [data, setData] = useState([]);
  
    const { openModal, closeModal,setLoading } = useSiteContext();

  const loadTableData = () => {  
    let URL =ROLE_URLS.GET_ALL 
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
 ;

  const openForm =(data:any)=>{
    let options = {
      title: "Vendor Details",
      content:<VendorDetails data={data}/>,
      width:50,
      className:"sd-efl-modal",
      closeBody:false,
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
      classList: ["smart-efl-table-edit-icon","is-small button"],
      onClick: (data:any) => {
        openForm(data["ID"]);
      },
    },
   
  ];

  
  
  
  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno" ,width:"5"},
    {
      title: "Hub",
      index: "hub",
      width:"20"
    },
    {
        title: "Vendor",
        index: "vendor",
        width:"20"
      },
      {
        title: "Total Amount",
        index: "total_amount",
        width:"10"
      },
      {
        title: "Status",
        index: "status",
        width:"10"
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

  const Export=()=>{
    console.log("export")
  }
  const BillInformation =()=>{
    return(<>
  <div className='columns is-multiline'>
    <div className='column is-10'><p className='is-size-4'>Bill Information:</p></div>
    <div className='column is-2'>
        <div className='is-flex'>
            <SmartSoftButton label='Export'
            onClick={()=>Export()}
            classList={["button mx-1 is-primary",]}
            />
             <SmartSoftButton label='Import'
            onClick={()=>Export()}
            classList={["button mx-1 is-primary",]}
            />
        </div>
    </div>
    <div className='column is-4'><p>Start Date:</p></div>
    <div className='column is-4'><p>End Date:</p></div>
    <div className='column is-4'></div>
    <div className='column is-4'><p>Parking Amount (Rs):</p></div>
    <div className='column is-4'><p>Consumption Amount (Rs):</p></div>
    <div className='column is-4'><p>Others(Rs):</p></div>
    <div className='column is-4'><p>GST (Rs):</p></div>
    <div className='column is-4'><p>Total (Rs):</p></div>
    <div className='column is-4'></div>
  </div>
    </>
  )}

  return (
    <>
    {BillInformation()}
    <div className="smart-elf-table">
      <SmartTable
        columns={columns}
        data={data}
        tableTop={tableTop}
        tableProps={{
          className: " is-hoverable is-bordered is-striped smart-efl-table ",
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



export default VendorWiseInformation
