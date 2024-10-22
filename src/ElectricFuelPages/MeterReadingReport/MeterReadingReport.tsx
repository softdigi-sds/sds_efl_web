import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { SmartSoftButton } from "soft_digi";
import { VEHICLES_URL } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { changeDateTimeZone } from "../../services/core/CommonService";
import { isDateWithinDays } from "../../services/site/DateService";
import { post } from "../../services/smartApiService";

const MeterReadingReport = () => {
  const { openModal } = useSiteContext();
  const [numberArray, setNumberArray] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState(moment().date(20).startOf("day"));
  const [endDate, setEndDate] = useState(
    moment().add(1, "month").date(19).endOf("day")
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

 


  const loadData = () => {
    let _data = {
      start_date: changeDateTimeZone(startDate.toISOString(), "YYYY-MM-DD"),
      end_date: changeDateTimeZone(endDate.toISOString(), "YYYY-MM-DD"),
    };
    let URL = VEHICLES_URL.GET_ALL_WITH_HUB;
    const subscription = post(URL, _data).subscribe((response) => {
      setData(response.data.data);
      console.table(response.data);
      setNumberArray(response.data.dates);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.hub_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    loadData();
  }, [startDate]);

  const dateRange = () => {
    return (
      <div className="date-navigation">
        <span  className="icon is-clickable">
          <i className="fa fa-arrow-left"></i>
        </span>
        <span className="mx-2">
          <i className="fa fa-calendar"></i>
        </span>
        <span  className="icon is-clickable">
          <i className="fa fa-arrow-right"></i>
        </span>
      </div>
    );
  };

  const getDayCount = (date: string, subData: any[]) => {
    if (subData && subData.length > 0) {
      let _date_obj: any = subData.find((obj) => obj.date == date);
      return _date_obj && _date_obj?.count ? _date_obj.count : 0;
    }
    return 0;
  };

  return (
    <div className="p-2 card">
      <div className="columns is-multiline">
        <div className="column is-6 ">
          <div className="is-flex is-justify-content-space-between is-align-items-center">
            <h2 className="mt-1 is-size-4 site-title has-text-weight-bold">
              Meter Reading Report
            </h2>
          </div>
        </div>
        <div className="column is-3">
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
        <div className="column is-3 ">
          <div className="is-flex is-justify-content-flex-end">
            <div className="mt-2 is-size-6 is-pulled-right">{dateRange()}</div>
          </div>
        </div>

        <div className="column is-12">
          <div className="scrollable-table">
            <table className="table is-bordered is-fullwidth smart-report-table">
              <thead>
                <tr>
                  <th>Hub Name</th>
                  
                  {numberArray.map((item: any) => (
                    <>
                      <th>{moment(item).format("MMMM")}</th>
                    </>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData &&
                  filteredData.map((hub) => (
                    <tr>
                      <td>
                        <div className="is-flex ">
                          <p>{hub.hub_name}</p>
                         
                        </div>
                      </td>
                      <td>{hub.average}</td>
                      {numberArray.map((item: any) => {
                        let _count = getDayCount(item, hub.sub_data);
                        const isNotGreaterThanToday = isDateWithinDays(item, 0);

                        return _count > 0 ? (
                          <td>
                            <span className="sd-cursor has-text-danger">
                              {_count}
                            </span>
                          </td>
                        ) : (
                          <td className={isNotGreaterThanToday ? "" : ""}>
                            {isNotGreaterThanToday && (
                              <span className="sd-cursor has-text-white">+</span>
                            )}
                          </td>
                        );
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

export default MeterReadingReport;
