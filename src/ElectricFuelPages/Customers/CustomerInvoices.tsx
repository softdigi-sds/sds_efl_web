import React, { useEffect, useState } from 'react'
import { CUSTOMER_URLS } from '../../api/UserUrls';
import { get, post } from '../../services/smartApiService';


interface IDProps {
  rowId: any;
}
const CustomerInvoices:React.FC<IDProps> = ({rowId}) => {
    const [tabData, setTabData] = useState([]);
    const loadTableData = () => {
      // let sd_customer_id = { value: rowId };
      let  sd_customer_id =rowId
     
        let URL = CUSTOMER_URLS.GET_ALL_INVOICE;
        const subscription = post(URL,{sd_customer_id}).subscribe((response) => {
          setTabData(response.data);
        });
        return () => {
          subscription.unsubscribe();
        };
      };
    
      useEffect(() => {
        loadTableData();
      }, []);
  return (
    <div>CustomerInvoices</div>
  )
}

export default CustomerInvoices