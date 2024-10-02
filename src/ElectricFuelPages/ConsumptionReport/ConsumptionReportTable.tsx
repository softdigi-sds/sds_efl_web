import { Moment } from "moment";
import { useEffect, useState } from "react";
import { SmartCalender, SmartSoftButton, SmartSoftSelect } from "soft_digi";
import { CONSUMPTION_URL } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { isCurrentMonth, isDateWithinLastDays } from "../../services/site/DateService";
import { hubs_get_all_select } from "../../services/site/SelectBoxServices";
import { post } from "../../services/smartApiService";
import ConsumptionReportForm from "./ConsumptionReportForm";
import ImportReportTable from "./ImportReportTable";

const ConsumptionReportTable = () => {
  const { openModal } = useSiteContext();
  const [currentMonth, setCurrentMonth] = useState<Moment>();
  const [hubs, setHubs] = useState<any>();
  const [hub, setHub] = useState<any>();
  const [data, setData] = useState<any[]>();
  // console.log("hub dat",hubs)

  /**
   *  loads the calander data for month change or hub chnage
   *
   * @returns
   */
  const loadCalenderData = () => {
    let _data = {
      hub_id: hub,
      year: currentMonth?.clone().year(),
      month: currentMonth?.clone().format("MM"),
    };
    let URL = CONSUMPTION_URL.GET_ALL_CALENDER;
    const subscription = post(URL, _data).subscribe((response) => {
      setData(response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  useEffect(() => {
    hubs_get_all_select(setHubs);
  }, []);

  useEffect(() => {
    // update the first when the ubs are loaded
    if (hubs && hubs.length > 0) {
      setHub(hubs[0]);
    }
  }, [hubs]);

  useEffect(() => {
    if (hub) {
      loadCalenderData();
    }
  }, [currentMonth, hub]);

  const openForm = (date: any) => {
    let options = {
      title: (
        <div>
          Hub: {hub?.label} Date : {date}
        </div>
      ),
      className: "sd-efl-modal",
      closeBody: false,
      content: (
        <ConsumptionReportForm
          loadTableData={loadCalenderData}
          date={date}
          hub_id={hub}
        />
      ),
    };
    openModal(options);
  };
  const openImportForm = (date: any) => {
    let options = {
      title: "Importing Form",
      content: <ImportReportTable loadTableData={loadCalenderData} />,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };

  const consumption: any[] = [
    {
      date: "2024-09-26",
      count: 100,
    },
    {
      date: "2024-09-27",
      count: 300,
    },
    {
      date: "2024-09-23",
      count: 600,
    },
    // Add more events
  ];

  // ** meeting display boss
  const content = (date: any) => {
    const count_check = data?.find((item) => item.date === date);
    const last10Days = isDateWithinLastDays(date,30);
    const this_month = isCurrentMonth(new Date(date));
    //console.log(" this month ", this_month, "  dt ", date);
    return (
      <div className="calender-div">
        {count_check && count_check.count > 0 ? (
          <div onClick={() => openForm(date)}>{count_check.count}</div>
        ) : (
          <div>
            {last10Days && (
              <i onClick={() => openForm(date)} className="fa fa-plus"></i>
            )}
          </div>
        )}
      </div>
    );
  };

  const titleDisp = () => {
    return (
      <div className="is-flex is-justify-content-space-between	is-align-items-center">
        <div className="is-size-4 site-title has-text-weight-bold"> Consumption Report</div>
        <SmartSoftButton
            label="Import"
            classList={["button", "ml-6  px-5 py-0 is-link is-normal"]}
            onClick={() => openImportForm(data)}
          />
        <div className="is-flex">
       

          <SmartSoftSelect
            options={hubs}
            placeHolder="Select hub"
            value={hub}
            onChange={(value) => setHub(value)}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <SmartCalender
        content={content}
        title={titleDisp()}
        setMonth={setCurrentMonth}
        className="sd_efl-calender"
      />
    </>
  );
};

export default ConsumptionReportTable;
