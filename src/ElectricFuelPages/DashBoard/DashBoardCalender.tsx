import React, { useEffect, useState } from "react";
import { SmartCalender } from "soft_digi";
import { Moment } from "moment";
import { CONSUMPTION_URL, VEHICLES_URL } from "../../api/UserUrls";
import { post } from "../../services/smartApiService";
import { roundNumber } from "../../services/core/CommonService";
import { getMonthStartAndEnd } from "../../services/site/DateService";

const DashBoardCalender = () => {
  const [currentMonth, setCurrentMonth] = useState<Moment>();
  const [dated, setDate] = useState<Date | null>(new Date());
  const [data, setData] = useState<any[]>();
  const [tabData, setTabData] = useState<Record<
  string,
  number | undefined
> | null>(null);
  const titleDisp = () => (
    <div className="columns is-multiline">
      <div className="column is-12">
        <div className="is-size-4 has-text-weight-bold"> Vehicles Report </div>
      </div>
    
    </div>
  );


  const loadTableData = () => {
    let URL = VEHICLES_URL.GET_ALL_DASH;
    let _dates = getMonthStartAndEnd(dated ? dated?.toISOString() : "");
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
    if(dated){
    loadTableData();
    }
  }, [dated]);

  // const content = (date: any) => {
  //   return <div className="calender-div"></div>;
  // };

 
  const content = (date: any) => {
    const count_check = data?.find((item) => item.date === date);
    // const last10Days = isDateWithinLastDays(date, 30);
    // const this_month = isCurrentMonth(new Date(date));
    //console.log(" this month ", this_month, "  dt ", date);

    return (
      <div className="calender-div">
        {count_check && count_check.count ==1 &&(
          <>
          <div className="has-background-primary">1</div>
          </>
        )
         
        }
           {count_check && count_check.count ==2 &&(
          <>
          <div className="has-background-waring">1</div>
          </>
        )
         
        }
           {count_check && count_check.count ==3 &&(
          <>
          <div className="has-background-danger">1</div>
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
