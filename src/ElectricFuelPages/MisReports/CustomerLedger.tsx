import { useEffect, useState } from "react";
import {
  SmartTable,
  SmartTableNewInterface
} from "soft_digi";
import { PAYMENT_URLS } from "../../api/UserUrls";
import { sumOfArrayObjectsWithIndex } from "../../services/core/FilterService";
import { post } from "../../services/smartApiService";

interface props {
  sd_customer_id: any
}

const CustomerLedger:React.FC<props>  = ({sd_customer_id}) => {
  const [data, setData] = useState<any>({});
  const loadData = () => {
    let _data = {
      sd_customer_id: sd_customer_id,
    };
    let URL = PAYMENT_URLS.GET_CUSTOMER_LEDGER;
    const subscription = post(URL, _data).subscribe((response) => {
      setData(response.data);
     // setNumberArray(response.data.dates);

    });
    return () => {
      subscription.unsubscribe();
    };
  };

  useEffect(() => {
    loadData();
  }, [sd_customer_id]);



  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno", width: "5" },
    {
      title: "Date",
      index: "date",
      type:"date"
    },
    {
      title: "Invoice Number/Payment Mode",
      index: "ref_no",
    },    
    {
      title: "Invoice Amount",
      index: "invoice_amount",
      classBody:"has-text-success",
      valueFunction:(data)=>{
        return data["status"]==="1" ?  data["amount"] : "";
      }
    },
    {
      title: "Paid",
      index: "amount",
      classBody:"has-text-danger",
      valueFunction:(data)=>{
        return data["status"]==="2" ?  data["amount"] : "";
      }
    },
    // {
    //   title: "Pending",
    //   index: "rem",
    // },  
  ];
  const options = [
    { value: "1", label: "Test" },
    { value: "2", label: "Test" },
    { value: "3", label: "test" },
  ];


  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-6",
      custom: (
        <p className="is-size-4">
          {" "}
          <i className="fa fa-file-text is-link"></i>{" "}
          <span className="ml-3"> Customer Ledger</span>
        </p>
      ),
    },   
  ];

  const summaryReport=()=>{
    let invoice_amount = sumOfArrayObjectsWithIndex(data?.invoice_data,"amount");
    let paid_amount = sumOfArrayObjectsWithIndex(data?.payment_data,"amount");
    let rem_amount = invoice_amount - paid_amount;
    return (   
      <div>
        <p className="has-text-link"><b>Summary Report</b></p>
        <table className="table is-fullwidth  is-bordered">
          <tr>
            <td>Total Invoice Amount</td>
            <td>Paid Amount</td>
            <td>Pending Amount</td>
          </tr>
          <tr>
            <td className="has-text-primary">{invoice_amount}</td>
            <td className="has-text-success">{paid_amount}</td>
            <td className="has-text-danger">{rem_amount}</td>
          </tr>
        </table>
      </div>
    )
  }


  return (
    <>
      <div className="">
        {data && data.data && 
        <>
        {summaryReport()}
        <br/>
        <SmartTable
          columns={columns}
          data={data?.data}
          tableTop={tableTop}
        //  filterFields={filterFields}
          tableProps={{
            className: " is-hoverable is-bordered is-striped",
            isResponsive: true,
            searchPlaceHolder: "Search",
          }}
          paginationProps={{
            pageSize: 10,
          }}
        />
        </>
}
      </div>
    </>
  );
};

export default CustomerLedger;
