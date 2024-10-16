import { useEffect, useState } from 'react';
import { VEHICLES_URL } from '../../api/UserUrls';
import { post } from '../../services/smartApiService';

const VehicleAdminReport = () => {
  const [numberArray, setNumberArray] = useState<number[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState([]);
  useEffect(() => {
    const tempArray: number[] = [];
    for (let i = 1; i <= 30; i++) {
      tempArray.push(i);
    }
    setNumberArray(tempArray);
  }, []);

  const loadData = () => {
    //console.log("year", currentMonth?.month());
    let _data = {
      year: currentDate?.getFullYear(),
      month: currentDate?.getMonth() + 1,
    };
    let URL = VEHICLES_URL.GET_ALL_CALENDER;
    const subscription = post(URL, _data).subscribe((response) => {
      setData(response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };


  useEffect(() => {
    loadData();
  }, [currentDate]);


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

  const changeMonth = (months: number) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + months));
    setCurrentDate(new Date(newDate));
    console.log("New date: ", newDate)
  };


  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const monthYear = () => {
    return <div className="date-navigation">
      <span onClick={() => changeMonth(-1)} className="icon is-clickable">
        <i className="fa fa-arrow-left"></i>
      </span>
      <span className="mx-2">
        {formatDate(currentDate)} <i className="fa fa-calendar"></i>
      </span>
      <span onClick={() => changeMonth(1)} className="icon is-clickable">
        <i className="fa fa-arrow-right"></i>
      </span>
    </div>
  }

  return (
    <div>
      <div className='columns is-multiline'>
        <div className='column is-6'>
          <h2 className=' mt-1 is-size-4 site-title has-text-weight-bold '>Vehicle Report</h2>

        </div>
        <div className='column is-4'>
          <div className='search-box sd-efl-input'>
            <input className='input' type='text' placeholder='Search' />
          </div>

        </div>
        <div className='column is-2'>
          {monthYear()}
        </div>
        <div className='column is-12'>
          <div className='scrollable-table'>
            <table className='table is-bordered is-fullwidth smart-report-table'>
              <thead>
                <tr>
                  <th>Hub Name</th>
                  {numberArray.map((item: any) => (
                    <>
                      <th>{item}</th>
                    </>
                  ))}

                </tr>
              </thead>
              <tbody>
                {hubs && hubs.map((hub) => (

                  <tr>
                    <td >{hub.hub_name}</td>
                    {hub && hub?.hubs_data?.map((data: any) => (
                      <td >{data !== 0 && (<span className='is-size-7'>{data}</span>)} {data === 0 && (<span className='has-text-danger'>+</span>)}</td>
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
