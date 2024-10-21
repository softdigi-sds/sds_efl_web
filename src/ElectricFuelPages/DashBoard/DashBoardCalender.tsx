import React, { useState } from "react";
import { SmartCalender } from "soft_digi";
import { Moment } from "moment";

const DashBoardCalender = () => {
  const [currentMonth, setCurrentMonth] = useState<Moment>();
  const [dated, setDate] = useState<Date | null>(new Date());
  const titleDisp = () => (
    <div className="columns is-multiline">
      <div className="column is-12">
        <div className="is-size-4 has-text-weight-bold"> Vehicles Report </div>
      </div>
    
    </div>
  );

  const content = (date: any) => {
    return <div className="calender-div"></div>;
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
