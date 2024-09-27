import { Moment } from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SmartCalender, SmartSoftSelect } from "soft_digi";
const VehiclesReportTable = () => {
  const { type } = useParams<{ type: string }>();
  const [currentMonth, setCurrentMonth] = useState<Moment>();
  const [hub, setHub] = useState<any>();

  useEffect(() => {
    console.log("selected year ", currentMonth?.year(), " month ", currentMonth?.month())
  }, [currentMonth]);



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
    const count_check = consumption.find((item) => item.date === date);
    return <div className="calender-div">
      {count_check && count_check.count > 0 ?
        <div>{count_check.count}</div> :
        <div><i className="fa fa-plus"></i></div>}
    </div>
  };




  const titleDisp = () => {
    return (
      <div className="is-flex is-justify-content-space-between	is-align-items-center">
        <div className="is-size-4 site-title"> Consumption Report</div>
        <div className="">
          <SmartSoftSelect options={[]} placeHolder="Select hub" value={hub} onChange={(value) => setHub(value)} />
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

export default VehiclesReportTable;
