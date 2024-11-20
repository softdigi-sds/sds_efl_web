import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { SmartSoftButton } from "soft_digi";
import { METER_READINGS_URLS, VEHICLES_URL } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { changeDateTimeZone } from "../../services/core/CommonService";
import { isDateWithinDays } from "../../services/site/DateService";
import { post } from "../../services/smartApiService";
import MeterReadingForm from "./MeterReadingForm";
import ImportReportTable from "./ImportReportTable";


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

      setNumberArray(months);
      // setNumberArray(response.data.dates);
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
  }, [startYear]);

  const openMeterForm = (dataIn:any) => {
    // console.log("dataIn", dataIn);
    let options = {
      title:<>{"Meter Addition"}</> ,
      content: (
        <MeterReadingForm
          dataIn={{dataIn}}
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
  const viewEditForm = (id: any) => {
    // console.log("id",id)
    const subscription = post(METER_READINGS_URLS.GET_ONE, { id: id }).subscribe(
      (response: any) => {
        openMeterForm(response.data);
        console.log("data received",response.data)
      }
    );
    return () => {
      subscription.unsubscribe();
    };
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
  const openImportForm = (date: any) => {
    let options = {
      title: "Importing Form",
      content: <ImportReportTable loadTableData={loadData} />,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };

  return (
    <div className="p-2 card">
      <div className="columns is-multiline">
        <div className="column is-5 ">
          <div className="is-flex is-justify-content-space-between is-align-items-center">
            <h2 className="mt-1 is-size-4 site-title has-text-weight-bold">
              Meter Reading Report
            </h2>
          </div>
        </div>
        <div className="column is-4">
          <div className="is-flex ">
          <p
                className="has-text-link mr-2 mt-2 is-clickable"
                onClick={() => openImportForm(data)}
              >
                {" "}
                <i className="fa fa-download is-size-3" aria-hidden="true"></i>
              </p>
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
              <div className="mt-2 is-size-6 is-pulled-right">
                {dateRange()}
              </div>
            </div>
            <SmartSoftButton
              label="Add"
              onClick={ openMeterForm}
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
                  filteredData.map((hub) => {
                    // console.log("hubs",hub)
                    return(
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
                      {numberArray.map((item: any, index) => {
                        // console.log("Meter Data ",filteredData)
                        let _count = getDayobj(item, hub.meter_data);
                        return _count && _count.meter_reading ? (
                          <td key={index} className="has-text-centered">
                            <span className="" onClick={()=>viewEditForm(_count.ID)}>
                              {_count.meter_reading}
                              <div className="">{_count.cms_reading}</div>
                              <hr />
                              <span
                                style={{
                                  color:
                                    _count.deviation > 10 ? "red" : "green",
                                }}
                              >
                                {_count.deviation}
                              </span>
                            </span>
                          </td>
                        ) : (
                          <td key={index}>
                            <span className="sd-cursor has-text-white"></span>
                          </td>
                        );
                      })}
                    </tr>
)})}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeterReadingReport;
