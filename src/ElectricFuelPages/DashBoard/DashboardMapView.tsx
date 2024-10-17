import React, { useEffect, useState } from 'react'
import { HUBS_URLS } from '../../api/UserUrls';
import { get } from '../../services/smartApiService';
import ReactMapView from '../../components/site/ReactMapView';

const DashboardMapView = () => {
    const [data, setData] = useState([]);
    const loadTableData = () => {
        let URL = HUBS_URLS.GET_ALL;
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
  return (
    <div>
        <ReactMapView locations={data} />
    </div>
  )
}

export default DashboardMapView
