import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { SmartSoftButton } from "soft_digi";
import { METER_READINGS_URLS, VEHICLES_URL } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { changeDateTimeZone } from "../../services/core/CommonService";
import { isDateWithinDays } from "../../services/site/DateService";
import { post } from "../../services/smartApiService";
import MeterReadingForm from "./MeterReadingForm";

const MeterReadingReport = () => {
  const { openModal } = useSiteContext();
  const [numberArray, setNumberArray] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState<any[]>([]);
  // const [startDate, setStartDate] = useState(moment().date(20).startOf("day"));
  const [startYear, setStartYear] = useState(moment().year()); // Initialize with the current year

  const [endDate, setEndDate] = useState(
    moment().add(1, "month").date(19).endOf("day")
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handlePreviousYear = () => {
    setStartYear((prevYear) => prevYear - 1); // Decrease the year by 1
  };

  const handleNextYear = () => {
    setStartYear((prevYear) => prevYear + 1); // Increase the year by 1
  };

  const loadData = () => {
    let _data = {
      year: startYear,
      // end_date: changeDateTimeZone(endDate.toISOString(), "YYYY-MM-DD"),
    };
    let URL = METER_READINGS_URLS.GET_ALL;
    const subscription = post(URL, _data).subscribe((response) => {
      setData(response.data.data);
      //console.table(response.data);
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
  }, [startYear]);

  const openMeterForm = () => {
    let options = {
      title: "Meter Addition Form",
      content: (
        <MeterReadingForm
          dataIn={{}}
          loadTableData={loadData}
          currentDate={currentDate}
        />
      ),
      width: 40,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };

  const dateRange = () => {
    return (
      <div className="date-navigation">
        <span className="icon is-clickable" onClick={handlePreviousYear}>
          <i className="fa fa-arrow-left"></i>
        </span>
        <span className="mx-2">
          {startYear}
          {/* <i className="fa fa-calendar"></i> */}
        </span>
        <span className="icon is-clickable" onClick={handleNextYear}>
          <i className="fa fa-arrow-right"></i>
        </span>
      </div>
    );
  };

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
        <div className="column is-3">
          <div className="is-flex is-justify-content-flex-end">
            <div className="has-text-centered">
           
            <div className="mt-2 is-size-6 is-pulled-right">{dateRange()}</div>
           
            </div>
            <SmartSoftButton
                label="Add"
                onClick={() => openMeterForm()}
                leftIcon="fa fa-plus"
                classList={["smart-third-button"]}
              />
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
                      <th>{item}</th>
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
                      
                      {numberArray.map((item: any) => {
                        let _count = getDayobj(item, hub.meter_data);
                        return _count && _count.meter_reading ? (
                          <td>
                            <span className="sd-cursor has-text-danger">
                              {_count.meter_reading}
                            </span>
                          </td>
                        ) : (
                          <td>
                            <span className="sd-cursor has-text-white">+</span>
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
