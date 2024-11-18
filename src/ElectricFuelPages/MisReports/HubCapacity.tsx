import { useEffect, useState } from "react";
import { VEHICLES_URL } from "../../api/UserUrls";
import { post } from "../../services/smartApiService";

interface Props {
  year?: string;
}

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const HubCapacity: React.FC<Props> = ({ year }) => {
  const [numberArray, setNumberArray] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const loadData = () => {
    let _data = {
      year: year,
      // end_date: changeDateTimeZone(endDate.toISOString(), "YYYY-MM-DD"),
    };
    let URL = VEHICLES_URL.GET_ALL_HUB_CAPACITY;
    const subscription = post(URL, _data).subscribe((response) => {
      setData(response.data.data);
      setNumberArray(response.data.dates);

    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.hub_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.office_city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    loadData();
  }, [year]);



  const getDayobj = (date: string, subData: any[]) => {
    if (subData && subData.length > 0) {
      let _date_obj: any = subData.find((obj) => obj.month == date);
      return _date_obj;
    }
    return 0;
  };

  return (
    <div className="p-2 card">
      <div className="columns is-multiline">
        <div className="column is-6 ">
          <div className="is-flex is-justify-content-space-between is-align-items-center">
            <h2 className="mt-1 is-size-5 site-title has-text-weight-bold">
              Hub Capacity
            </h2>
          </div>
        </div>
        <div className="column is-6">
          <div className="is-flex ">
            <div className="search-box sd-efl-input">
              <input
                className="input"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="column is-12">
          <div className="scrollable-table">
            <table className="table is-bordered is-fullwidth smart-report-table">
              <thead>
                <tr>
                  <th>Hub Name</th>
                  <th>Hub Capacity</th>

                  {numberArray.map((item: any) => (
                    <>
                      <th>{item}</th>
                    </>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData &&
                  filteredData.map((hub) => (
                    <tr key={hub.hub_name}>
                      {" "}
                      {/* Add a key prop to avoid React warnings */}
                      <td>
                        <div className="is-flex ">
                          <p>{hub.hub_name}</p>
                        </div>
                        <label className="is-size-7 has-text-info">
                          ({hub.office_city})
                        </label>
                      </td>
                      <td>
                        <p>{hub.hub_capacity}</p>
                      </td>
                      {numberArray.map((item: any, index) => {
                        let _count = getDayobj(item, hub.bill_data);
                        return (
                          <td key={index} className="has-text-centered">
                            <span className={_count._average < hub.hub_capacity ? "has-text-danger" : "has-text-success" }>                            
                              {_count._average}                             
                            </span>
                          </td>
                        ) 
                      })}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubCapacity;
