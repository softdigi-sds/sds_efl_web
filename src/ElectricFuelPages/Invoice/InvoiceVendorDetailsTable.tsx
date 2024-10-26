import React, { useEffect, useState } from "react";
import { SmartTable, SmartTableNewInterface } from "soft_digi";
import { formatCurrency } from "../../services/core/CommonService";

interface InputProps {
    dataIn: any;
}

const InvoiceVendorDetailsTable: React.FC<InputProps> = ({ dataIn }) => {
  // const [dataArray, setDataArray] = useState<any[]>([dataIn]);


  //console.log("Data list",dataArray)




 const typeDisplay =(row:any)=>{

  return(
   <>
   {row.sub_data && row.sub_data.map((subDetails:any)=>{
    return(
     <div key={subDetails.id}>{subDetails.type_desc}</div>
    )
   })}
   </>
  )
 }
 const priceDisplay =(row:any)=>{

    return(
     <>
     {row.sub_data && row.sub_data.map((subDetails:any)=>{
      return(
       <div key={subDetails.id}>{subDetails.total}</div>
      )
     })}
     </>
    )
   }
   const countDisplay =(row:any)=>{

    return(
     <>
     {row.sub_data && row.sub_data.map((subDetails:any)=>{
      return(
       <div key={subDetails.id}>{subDetails.count}</div>
      )
     })}
     </>
    )
   }
   const minDisplay =(row:any)=>{

    return(
     <>
     {row.sub_data && row.sub_data.map((subDetails:any)=>{
      return(
       <div key={subDetails.id}>{subDetails.min_units}</div>
      )
     })}
     </>
    )
   }
   const priceDataDisplay =(row:any)=>{

    return(
     <>
     {row.sub_data && row.sub_data.map((subDetails:any)=>{
      return(
       <div key={subDetails.id}>{subDetails.price}</div>
      )
     })}
     </>
    )
   }
   const monthDisplay =(row:any)=>{

    return(
     <>
     {row.sub_data && row.sub_data.map((subDetails:any)=>{
      return(
       <div key={subDetails.id}>{subDetails.price}</div>
      )
     })}
     </>
    )
   }
  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno", width: "5" },
    // { title: "Invoice Number", index: "invoice_number" },
    // { title: "ACK No.", index: "ack_no", width: "20" },
    { title: "Type", index: "type", },
    { title: "Month Avrage", index: "month_avg",  },
    { title: "Count", index: "count",  }, 
    { title: "Min Units", index: "min_units",  }, 
    { title: "Price", index: "price",  },
  
    { title: "Total", index: "total",  },
 
  ];

  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-8",
      custom: <p className="is-size-4 is-italic has-text-link"></p>,
    },
  ];

  
 
  return (
    <>
      <div className="columns">
        <div className="column is-2">GST Amount:</div>
        <div className="column is-2"> { formatCurrency(dataIn?.gst_amount)}</div>
        <div className="column is-2">Total Tax:</div>
        <div className="column is-2">{ formatCurrency(dataIn?.total_taxable)}</div>
        <div className="column is-2">Total Amount:</div>
        <div className="column is-2">{ formatCurrency(dataIn?.total_amount)}</div>
      </div>

      <div className="smart-elf-table">
        <SmartTable
          columns={columns}
          data={dataIn?.sub_data ||[]}
          tableTop={tableTop}
          tableProps={{
            className: "is-hoverable is-striped is-fullwidth",
            isResponsive: true,
            searchPlaceHolder: "Search",
          }}
          paginationProps={{
            pageSize: 1,
          }}
        />
      </div>
    </>
  );
};

export default InvoiceVendorDetailsTable;
