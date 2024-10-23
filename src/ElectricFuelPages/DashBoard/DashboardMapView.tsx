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
             <p className="is-size-4 has-text-weight-bold mt-4">Hubs Locations</p>
             <div className='mt-4 card p-1'>
             <ReactMapView locations={data} zoom={4} height={430}/>
             </div>
     
    </div>
  )
}

export default DashboardMapView
