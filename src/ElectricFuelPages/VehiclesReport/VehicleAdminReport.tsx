import React, { useEffect, useState } from 'react'
import { SmartSoftButton } from 'soft_digi'

const VehicleAdminReport = () => {
  const [numberArray, setNumberArray] = useState<number[]>([]);

  useEffect(() => {

    const tempArray: number[] = [];
    for (let i = 1; i <= 30; i++) {
      tempArray.push(i);
    }
 
    setNumberArray(tempArray);
  }, []);
  const hubs = [
    { hubs_data: [1, 0, 3, 0, 5, 6, 7, 0, 9, 10, 0, 12, 13, 0, 15, 16, 0, 18, 19, 0, 21, 0, 23, 24, 0, 26, 27, 0, 29, 30], hub_name: "Chennai" },
    { hubs_data: [0, 2, 0, 4, 5, 6, 0, 8, 9, 10, 0, 12, 13, 0, 15, 16, 17, 0, 19, 0, 21, 22, 0, 24, 25, 0, 27, 28, 29, 0], hub_name: "Mumbai" },
    { hubs_data: [1, 0, 3, 4, 0, 6, 7, 8, 0, 10, 11, 0, 13, 14, 0, 16, 0, 18, 19, 0, 21, 22, 0, 24, 25, 26, 0, 28, 0, 30], hub_name: "Bengaluru" },
    { hubs_data: [1, 2, 3, 0, 5, 6, 0, 8, 9, 0, 11, 12, 0, 14, 15, 0, 17, 18, 19, 0, 21, 0, 23, 24, 25, 0, 27, 28, 0, 30], hub_name: "Delhi" },
    { hubs_data: [1, 0, 3, 4, 0, 6, 7, 8, 9, 0, 11, 12, 13, 0, 15, 16, 17, 0, 19, 20, 0, 22, 23, 0, 25, 26, 0, 28, 29, 0], hub_name: "Kolkata" },
    { hubs_data: [0, 2, 3, 4, 5, 0, 7, 8, 0, 10, 11, 0, 13, 14, 0, 16, 17, 18, 0, 20, 0, 22, 23, 24, 0, 26, 27, 28, 0, 30], hub_name: "Hyderabad" },
    { hubs_data: [1, 0, 3, 4, 0, 6, 7, 8, 0, 10, 11, 0, 13, 14, 15, 0, 17, 18, 0, 20, 0, 22, 23, 0, 25, 26, 0, 28, 29, 30], hub_name: "Ahmedabad" },
    { hubs_data: [0, 2, 3, 0, 5, 6, 7, 8, 0, 10, 11, 0, 13, 14, 15, 16, 0, 18, 19, 0, 21, 22, 0, 24, 25, 26, 0, 28, 29, 0], hub_name: "Pune" },
    { hubs_data: [1, 0, 3, 4, 0, 6, 7, 0, 9, 10, 0, 12, 13, 0, 15, 16, 0, 18, 19, 0, 21, 0, 23, 24, 25, 0, 27, 28, 0, 30], hub_name: "Jaipur" },
    { hubs_data: [0, 2, 3, 0, 5, 6, 7, 8, 0, 10, 11, 0, 13, 14, 0, 16, 17, 0, 19, 20, 0, 22, 23, 24, 0, 26, 27, 28, 0, 30], hub_name: "Lucknow" }
  ];
  
  return (
    <div>
      <div className='columns is-multiline'>
        <div className='column is-6'>
          <h2 className=' mt-1 is-size-4 site-title has-text-weight-bold '>Vehicle Report</h2>
        
  </div>
  <div className='column is-4'>
       <div className='search-box sd-efl-input'>
        <input className='input' type='text'  placeholder='Search'/>
       </div>
        
  </div>
  <div className='column is-2'>
     {/* <div className='is-flex mt-2'></div>
     <i className="fa fa-arrow-left" aria-hidden="true"></i>
     <span className='mx-2'>OCT-2024</span>
     <i className="fa fa-arrow-right" aria-hidden="true"></i> */}
  </div>
  <div className='column is-12'>
    <div className='scrollable-table'>
    <table className='table is-bordered is-fullwidth smart-report-table'>
      <thead>
        <tr>
          <th>Hub Name</th>
     {numberArray.map((item:any)=>(
      <>
      <th>{item}</th>
      </>
     ))}
          
        </tr>
      </thead>
      <tbody>
       {hubs&&hubs.map((hub)=>(

       <tr>
          <td >{hub.hub_name}</td>
         {hub&&hub?.hubs_data?.map((data:any)=>(
          <td >{data!==0 &&(<span className='is-size-7'>{data}</span>)} {data===0 &&(<span className='has-text-danger'>+</span>)}</td>
         ))}
        </tr>
         ))}
      
       </tbody>
    </table>
    </div>
  </div>
      </div>
    </div>
  )
}




export default VehicleAdminReport
