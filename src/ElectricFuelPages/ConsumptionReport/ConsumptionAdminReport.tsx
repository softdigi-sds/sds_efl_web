import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { SmartSoftButton } from "soft_digi";
import { CONSUMPTION_URL } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { changeDateTimeZone } from "../../services/core/CommonService";
import { isDateWithinDays } from "../../services/site/DateService";
import { post } from "../../services/smartApiService";
import VendorRatesTable from "../VendorRates/VendorRatesTable";
import ConsumptionReportForm from "./ConsumptionReportForm";
import ImportReportTable from "./ImportReportTable";
interface VehicleReportProps {
  stage: any;
  setStage: any;
}
const ConsumptionAdminReport: React.FC<VehicleReportProps> = ({
  stage,
  setStage,
}) => {
  const { openModal } = useSiteContext();
  const [numberArray, setNumberArray] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState(moment().date(21).startOf("day"));
  const [endDate, setEndDate] = useState(
    moment().add(1, "month").date(20).endOf("day")
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handelStage = () => {
    setStage("HUB");
  };

  const changeMonthNew = (direction: number) => {
    const newStartDate = moment(startDate).add(direction, "months").date(21);
    const newEndDate = moment(newStartDate)
      .add(1, "month")
      .date(20)
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
    let URL = CONSUMPTION_URL.GET_ALL_WITH_HUB;
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

  const changeMonth = (months: number) => {
    const newDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + months)
    );
    setCurrentDate(new Date(newDate));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const filteredData = data.filter((item) =>
    item.hub_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <ConsumptionReportForm
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
      content: <ImportReportTable loadTableData={loadData} />,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };
  const openVendorsView = (data: any) => {
    let options = {
      title: "Vendors Details",
      content: <VendorRatesTable hubId={data} />,
      width: 80,
    };
    openModal(options);
  };

  return (
    <div className="p-2 card pt-4">
      <div className="columns is-multiline is-vcentered">
        <div className="column is-3 ">
          <div className="is-flex is-justify-content-space-between	is-align-items-center">
            <h2 className=" mt-1 is-size-4 site-title has-text-weight-bold ">
              Consumption Report
            </h2>
          </div>
        </div>
        <div className="column is-5">
          <div className="is-flex">
            <div className="is-flex">
              <p
                className="has-text-link mr-2 mt-2 is-clickable"
                onClick={() => openImportForm(data)}
              >
                {" "}
                <i
                  className="fa fa-download is-size-3"
                  aria-hidden="true"
                ></i>
              </p>
              <p
                className="has-text-danger mt-2 is-clickable mr-2"
                onClick={() => openImportForm(data)}
              >
                {" "}
                {/* <i
                  className="fa fa-upload is-size-3"
                  aria-hidden="true"
                ></i> */}
              </p>
            </div>
            <div className="search-box sd-efl-input">
              <input
                className="input"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
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
                {filteredData &&
                  filteredData.map((hub) => (
                    <tr>
                      <td>
                        <div className="is-flex ">
                          <p>{hub.hub_name} </p>
                          <div className="ml-2">
                            {hub.vendor_count !== 0 ? (
                              <p
                                className="is-clickable has-text-link sd-cursor"
                                onClick={() => openVendorsView(hub.ID)}
                              >
                                {hub.vendor_count}
                              </p>
                            ) : (
                              <span>{hub.vendor_count}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      {numberArray.map((item: any) => {
                        let _count = getDayCount(item, hub.sub_data);
                        const isNotGreaterThanToday = isDateWithinDays(item, 0);
                        //console.log("DATe " , item , " f " , isNotGreaterThanToday);
                        //  return <td><span>{_count}</span></td>
                        return _count > 0 ? (
                          <td>
                            <span
                              className="sd-cursor has-text-danger"
                              onClick={() => openForm(item, hub)}
                            >
                              {_count}
                            </span>
                          </td>
                        ) : (
                          <td>
                            {isNotGreaterThanToday && (
                              <span
                                className="sd-cursor has-text-link is-size-5"
                                onClick={() => openForm(item, hub)}
                              >
                                +
                              </span>
                            )}
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

export default ConsumptionAdminReport;
