import React, { useEffect, useState } from 'react'
import { CUSTOMER_URLS } from '../../api/UserUrls';
import { get } from '../../services/smartApiService';

const CustomerInvoices = () => {
    const [tabData, setTabData] = useState([]);
    const loadTableData = () => {
        let URL = CUSTOMER_URLS.GET_ALL_INVOICE;
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
  return (
    <div>CustomerInvoices</div>
  )
}

export default CustomerInvoices