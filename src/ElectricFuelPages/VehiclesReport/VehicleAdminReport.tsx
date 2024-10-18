import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SmartSoftButton, SmartSoftSelect } from "soft_digi";
import { VEHICLES_URL } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { changeDateTimeZone } from "../../services/core/CommonService";
import { isDateWithinDays } from "../../services/site/DateService";
import { post } from "../../services/smartApiService";
import VehicleReportFrom from "./VehicleReportFrom";
import ImportVehiclesReport from "./ImportVehiclesReport";
interface VehicleReportProps {
  stage:any,
  setStage:any
  }
const VehicleAdminReport:React.FC<VehicleReportProps> = ({stage,setStage}) => {
  const { openModal } = useSiteContext();
  const [numberArray, setNumberArray] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState(moment().date(20).startOf("day"));
  const [endDate, setEndDate] = useState(
    moment().add(1, "month").date(19).endOf("day")
  );
  const handelStage =()=>{
    setStage("HUB");
  }

  const changeMonthNew = (direction: number) => {
    const newStartDate = moment(startDate).add(direction, "months").date(20);
    const newEndDate = moment(newStartDate)
      .add(1, "month")
      .date(19)
      .endOf("day");
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  // Format the date
  const formatDateNew = (date: Moment): string => date.format("DD-MM-YYYY");


  const loadData = () => {
    //console.log("year", currentMonth?.month());
    let _data = {
      start_date: changeDateTimeZone(startDate.toISOString(), "YYYY-MM-DD"),
      end_date: changeDateTimeZone(endDate.toISOString(), "YYYY-MM-DD"),
    };
    let URL = VEHICLES_URL.GET_ALL_WITH_HUB;
    const subscription = post(URL, _data).subscribe((response) => {
      setData(response.data.data);
      setNumberArray(response.data.dates);
      //updateNumberOfDays();
    });
    return () => {
      subscription.unsubscribe();
    };
  };




  useEffect(() => {
    loadData();
  }, [startDate]);

  const hubs = [
    {
      hubs_data: [
        1, 0, 3, 0, 5, 6, 7, 0, 9, 10, 0, 12, 13, 0, 15, 16, 0, 18, 19, 0, 21,
        0, 23, 24, 0, 26, 27, 0, 29, 30,
      ],
      hub_name: "Chennai",
    },
    {
      hubs_data: [
        0, 2, 0, 4, 5, 6, 0, 8, 9, 10, 0, 12, 13, 0, 15, 16, 17, 0, 19, 0, 21,
        22, 0, 24, 25, 0, 27, 28, 29, 0,
      ],
      hub_name: "Mumbai",
    },
    {
      hubs_data: [
        1, 0, 3, 4, 0, 6, 7, 8, 0, 10, 11, 0, 13, 14, 0, 16, 0, 18, 19, 0, 21,
        22, 0, 24, 25, 26, 0, 28, 0, 30,
      ],
      hub_name: "Bengaluru",
    },
    {
      hubs_data: [
        1, 2, 3, 0, 5, 6, 0, 8, 9, 0, 11, 12, 0, 14, 15, 0, 17, 18, 19, 0, 21,
        0, 23, 24, 25, 0, 27, 28, 0, 30,
      ],
      hub_name: "Delhi",
    },
    {
      hubs_data: [
        1, 0, 3, 4, 0, 6, 7, 8, 9, 0, 11, 12, 13, 0, 15, 16, 17, 0, 19, 20, 0,
        22, 23, 0, 25, 26, 0, 28, 29, 0,
      ],
      hub_name: "Kolkata",
    },
    {
      hubs_data: [
        0, 2, 3, 4, 5, 0, 7, 8, 0, 10, 11, 0, 13, 14, 0, 16, 17, 18, 0, 20, 0,
        22, 23, 24, 0, 26, 27, 28, 0, 30,
      ],
      hub_name: "Hyderabad",
    },
    {
      hubs_data: [
        1, 0, 3, 4, 0, 6, 7, 8, 0, 10, 11, 0, 13, 14, 15, 0, 17, 18, 0, 20, 0,
        22, 23, 0, 25, 26, 0, 28, 29, 30,
      ],
      hub_name: "Ahmedabad",
    },
    {
      hubs_data: [
        0, 2, 3, 0, 5, 6, 7, 8, 0, 10, 11, 0, 13, 14, 15, 16, 0, 18, 19, 0, 21,
        22, 0, 24, 25, 26, 0, 28, 29, 0,
      ],
      hub_name: "Pune",
    },
    {
      hubs_data: [
        1, 0, 3, 4, 0, 6, 7, 0, 9, 10, 0, 12, 13, 0, 15, 16, 0, 18, 19, 0, 21,
        0, 23, 24, 25, 0, 27, 28, 0, 30,
      ],
      hub_name: "Jaipur",
    },
    {
      hubs_data: [
        0, 2, 3, 0, 5, 6, 7, 8, 0, 10, 11, 0, 13, 14, 0, 16, 17, 0, 19, 20, 0,
        22, 23, 24, 0, 26, 27, 28, 0, 30,
      ],
      hub_name: "Lucknow",
    },
  ];

  const changeMonth = (months: number) => {
    const newDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + months)
    );
    setCurrentDate(new Date(newDate));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const monthYear = () => {
    return (
      <div className="date-navigation">
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
    );
  };

  const dateRange = () => {
    return (
      <div className="date-navigation">
        <span onClick={() => changeMonthNew(-1)} className="icon is-clickable">
          <i className="fa fa-arrow-left"></i>
        </span>
        <span className="mx-2">
          {`${formatDateNew(startDate)} to ${formatDateNew(endDate)}`}{" "}
          <i className="fa fa-calendar"></i>
        </span>
        <span onClick={() => changeMonthNew(1)} className="icon is-clickable">
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

  const openForm = (date: any, hub: any) => {
    let options = {
      title: (
        <div>
          {" "}
          Hub: {hub?.hub_id}{" "}
          <span className="has-text-black ml-6">
            Date : {changeDateTimeZone(date, "DD-MM-YYYY")}
          </span>{" "}
        </div>
      ),
      className: "sd-efl-modal",
      closeBody: false,
      content: (
        <VehicleReportFrom
          loadTableData={loadData}
          date={date}
          hub_id={{ value: hub.ID }}
        />
      ),
    };
    openModal(options);
  };
  const openImportForm = (date: any) => {
    let options = {
      title: "Importing Form",
      content: <ImportVehiclesReport loadTableData={loadData} />,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };

  return (
    <div className="p-2 card">
      <div className="columns is-multiline">
        <div className="column is-4 ">
          <div className="is-flex is-justify-content-space-between	is-align-items-center">

       
          <h2 className=" mt-1 is-size-4 site-title has-text-weight-bold ">
            Vehicle Report 
          </h2>
          <div className="is-flex">

        
          <p className="has-text-link mr-2 mt-2 is-clickable"   onClick={() => openImportForm(data)}>  <i className="fa fa-cloud-upload is-size-3" aria-hidden="true"></i></p>
          <p className="has-text-danger mt-2 is-clickable"   onClick={() => openImportForm(data)}>  <i className="fa fa-cloud-download is-size-3" aria-hidden="true"></i></p>
          </div>
          </div>
        </div>
        <div className="column is-4">
          <div className="is-flex">
            <div className="search-box sd-efl-input">
              <input className="input" type="text" placeholder="Search" />
            </div>
            <SmartSoftButton
             label="Hub Report"
            classList={["button", " px-5 py-0 is-link is-normal ml-2"]}
            // leftIcon="fa fa-file-excel-o"
            onClick={() => handelStage()}
          />
          </div>
        </div>
        <div className="column is-4 ">
          <div className="is-flex is-justify-content-flex-end">
          <div className="mt-2 is-size-6 is-pulled-right"> {dateRange()}</div>
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
                      <th>{changeDateTimeZone(item, "DD")}</th>
                    </>
                  ))}
                   <th>Total Average</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((hub) => (
                    <tr>
                      <td>{hub.hub_name} ({hub.vendor_count})</td>
                      {numberArray.map((item: any) => {
                        let _count = getDayCount(item, hub.sub_data);
                        const isNotGreaterThanToday = isDateWithinDays(item,0);
                        //console.log("DATe " , item , " f " , isNotGreaterThanToday);
                        //  return <td><span>{_count}</span></td>
                        return _count > 0 ? (
                          <td>
                            <span onClick={() => openForm(item, hub)}>
                              {_count}
                            </span>
                          </td>
                        ) : (
                          <td>
                            {isNotGreaterThanToday && <span onClick={() => openForm(item, hub)}>+</span> }
                          </td>
                        );
                      })}
                      <td>{hub.average}</td>
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

export default VehicleAdminReport;
