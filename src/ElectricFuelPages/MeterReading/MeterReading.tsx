import React, { useEffect, useState } from "react";
import { SmartSoftButton, SmartTable, SmartTableNewInterface } from "soft_digi";
import MeterReadingForm from "./MeterReadingForm";
import { useSiteContext } from "../../contexts/SiteProvider";
import { post } from "../../services/smartApiService";
import { CONSUMPTION_URL, METER_READINGS_URLS } from "../../api/UserUrls";

const MeterReading = () => {
  const { openModal } = useSiteContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState([]);

  const changeMonth = (months: number) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + months));
    setCurrentDate(new Date(newDate));
    console.log("New date: " ,newDate)
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const loadCalenderData = () => {
    let _data = {
    
      year: currentDate.getFullYear(),
      
      month: currentDate.getMonth() + 1
    };
    console.log("year:",_data.year)
    console.log("month:",_data.month)
    let URL = METER_READINGS_URLS.GET_ALL;
    const subscription = post(URL, _data).subscribe((response) => {
      setData(response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };
  useEffect(() => {
   
      loadCalenderData();
    
  }, [currentDate]);

  const dummy_data = [
    {
      s_no: 1,
      office_city: "New York",
      state_name: "NY Hub",
      pin_code: "10001",
      address_one: "0",
      status: "5%",
    },
    {
      s_no: 2,
      office_city: "Los Angeles",
      state_name: "LA Hub",
      pin_code: "90001",
      address_one: "0",
      status: "2%",
    },
    {
      s_no: 3,
      office_city: "Chicago",
      state_name: "Chicago Hub",
      pin_code: "60601",
      address_one: "0",
      status: "3%",
    },
    {
      s_no: 4,
      office_city: "Houston",
      state_name: "Houston Hub",
      pin_code: "77001",
      address_one: "1",
      status: "1%",
    },
    {
      s_no: 5,
      office_city: "San Francisco",
      state_name: "SF Hub",
      pin_code: "94101",
      address_one: "1",
      status: "4%",
    },
  ];

  const openMeterForm = (data: any) => {
    let options = {
      title: "Meter Addition Form",
      content: <MeterReadingForm />,
      width: 40,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };

  const meterReading = (row: any) => {
    if (row.address_one === "0") {
      return (
        <div className="has-text-centered">
          <SmartSoftButton
            label="Add"
            onClick={() => openMeterForm({})}
            classList={["button is-small is-primary is-light"]}
          />
        </div>
      );
    } else if (parseInt(row.address_one) > 0) {
      return(
        <>
        <div className="has-text-centered" >
          <span >{row.address_one}</span>
        </div>
        </>
      )
      
    }
    return null;
  };

  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno" },
    { title: "Office City", index: "office_city" },
    { title: "Hub", index: "state_name" },
    { title: "CMS Reading", index: "pin_code" },
    { title: "Meter Reading", index: "address_one", valueFunction: meterReading,width:"15" },
    { title: "Deviation", index: "status" },
  ];


  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-5",
      custom: <p className="is-size-4">Meter Reading</p>,
    },
    {
      type: "SEARCH",
      widthClass: "is-4",
      align: "RIGHT",
    },
    {
      type: "CUSTOM",
      widthClass: "is-3",
      align: "RIGHT",
      custom: (
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
      ),
    },
  ];

  return (
    <>
      <div className="smart-elf-table">
        <SmartTable
          columns={columns}
          data={data}
          tableTop={tableTop}
          tableProps={{
            className: "is-hoverable is-bordered is-striped smart-efl-table",
            isResponsive: true,
            searchPlaceHolder: "Search",
          }}
          paginationProps={{
            pageSize: 10,
          }}
        />
      </div>
    </>
  );
};

export default MeterReading;
