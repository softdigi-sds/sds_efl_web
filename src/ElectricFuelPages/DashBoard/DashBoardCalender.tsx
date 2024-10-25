import React, { useEffect, useState } from "react";
import { SmartCalender } from "soft_digi";
import { Moment } from "moment";
import { CONSUMPTION_URL, VEHICLES_URL } from "../../api/UserUrls";
import { post } from "../../services/smartApiService";
import { roundNumber } from "../../services/core/CommonService";
import { getMonthStartAndEnd } from "../../services/site/DateService";
import VendorsTable from "../Vendors/VendorsTable";
import { useSiteContext } from "../../contexts/SiteProvider";
import HubDetails from "./HubDetails";

const DashBoardCalender = () => {
  const [currentMonth, setCurrentMonth] = useState<Moment>();
  const [dated, setDate] = useState<Date >(new Date());
  const [tabData, setTabData] = useState<any[]>();
  const { openModal, closeModal } = useSiteContext();

  const titleDisp = () => (
    <div className="columns is-multiline">
      <div className="column is-12">
        <div className="is-size-4 has-text-weight-bold"> Vehicles Report </div>
      </div>
    
    </div>
  );

  // console.log("currentMonth",currentMonth)

  const loadTableData = () => {
    let URL = VEHICLES_URL.GET_ALL_DASH;
    let _dates = getMonthStartAndEnd(currentMonth ? currentMonth?.toISOString() : "");
    // console.log(_dates)
    let _data = {start_date:_dates.start,end_date:_dates.end};
    const subscription = post(URL,_data).subscribe((response) => {
      setTabData(response.data);
      console.log("Chart Data",response.data)
    });
    return () => {
      subscription.unsubscribe();
    };
  }

  useEffect(() => {
    if(currentMonth){
    loadTableData();
    }
  }, [currentMonth]);

  // const content = (date: any) => {
  //   return <div className="calender-div"></div>;
  // };

  const openForm = (dataIn: any) => {
    let options = {
      title:"Hub Details",
      content: <HubDetails startDate={dataIn}  />,
      width: 30,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };
 
  const content = (date: any) => {
    const count_check = tabData?.find((item) => item.date === date);
    // const last10Days = isDateWithinLastDays(date, 30);
    // const this_month = isCurrentMonth(new Date(date));
    //console.log(" this month ", this_month, "  dt ", date);
  

    return (
      <div className="calender-div">
        {count_check && count_check.status ===1 &&(
          <>
          <div className="has-background-primary"></div>
          </>
        )
         
        }
           {count_check && count_check.status ===2 &&(
          <>
          <div className="has-background-warning" onClick={()=>openForm(count_check.date)}></div>
          </>
        )
         
        }
           {count_check && count_check.status ===3 &&(
          <>
          <div className="has-background-danger"></div>
          </>
        )
         
        }
      </div>
    );
  };

  return (
    <>
     <div className="smart-elf-dashboard">
      <SmartCalender
        content={content}
        title={titleDisp()}
        setMonth={setCurrentMonth}
        className="sd_efl-calender"
      /></div>
    </>
  );
};

export default DashBoardCalender;
