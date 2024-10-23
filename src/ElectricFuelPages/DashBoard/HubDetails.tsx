import { useEffect, useState } from "react";
import { HUBS_URLS } from "../../api/UserUrls";
import {  post } from "../../services/smartApiService";

interface  headerProps{
    startDate:any
}
const HubDetails:React.FC<headerProps> = ({startDate}) => {
  const [data, setData] = useState([]);

  const loadTableData = () => {
    let URL = HUBS_URLS.GET_ALL_DATE;
    let start_date = startDate
    const subscription = post(URL, { start_date }).subscribe((response) => {
      setData(response.data);
      console.log("hub data", response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  useEffect(() => {
    loadTableData();
  }, []);

  return <> 
  <div className="table is-bordered is-fullwidth">
<tr><th>Hub Name:</th></tr>
{data &&  data.map((data:any,index:number)=>{
    return (
    <tr >
    <td>{index+1}.{data.hub_id}</td>
    </tr>
    )
})}
  </div>
  </>;
};

export default HubDetails;
