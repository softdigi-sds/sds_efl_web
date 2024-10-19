import { useEffect, useState } from "react";
import {
  SmartFormInterFace,
  SmartSoftButton,
  SmartTable,
  SmartTableNewInterface,
} from "soft_digi";
import { METER_READINGS_URLS } from "../../api/UserUrls";
import { useSiteContext } from "../../contexts/SiteProvider";
import { post } from "../../services/smartApiService";
import MeterReadingForm from "./MeterReadingForm";

const MeterReading = () => {
  const { openModal } = useSiteContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState([]);

  const changeMonth = (months: number) => {
    const newDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + months)
    );
    setCurrentDate(new Date(newDate));
    console.log("New date: ", newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const loadTableData = () => {
    let _data = {
      year: currentDate.getFullYear(),

      month: currentDate.getMonth() + 1,
    };
    // console.log("year:",_data.year)
    //console.log("month:",_data.month)
    let URL = METER_READINGS_URLS.GET_ALL;
    const subscription = post(URL, _data).subscribe((response) => {
      setData(response.data);
    });
    return () => {
      subscription.unsubscribe();
    };
  };
  useEffect(() => {
    loadTableData();
  }, [currentDate]);

  const dummy_data = [
    {
      s_no: 1,
      office_city: "New York",
      sd_hub_id: "NY Hub",
      pin_code: "10001",
      address_one: "0",
      status: "5%",
    },
    {
      s_no: 2,
      office_city: "Los Angeles",
      sd_hub_id: "LA Hub",
      pin_code: "90001",
      address_one: "0",
      status: "2%",
    },
    {
      s_no: 3,
      office_city: "Chicago",
      sd_hub_id: "Chicago Hub",
      pin_code: "60601",
      address_one: "0",
      status: "3%",
    },
    {
      s_no: 4,
      office_city: "Houston",
      sd_hub_id: "Houston Hub",
      pin_code: "77001",
      address_one: "1",
      status: "1%",
    },
    {
      s_no: 5,
      office_city: "San Francisco",
      sd_hub_id: "SF Hub",
      pin_code: "94101",
      address_one: "1",
      status: "4%",
    },
  ];

  const openMeterForm = (data: any) => {
    let options = {
      title: "Meter Addition Form",
      content: (
        <MeterReadingForm
          dataIn={data}
          loadTableData={loadTableData}
          currentDate={currentDate}
        />
      ),
      width: 40,
      className: "sd-efl-modal",
      closeBody: false,
    };
    openModal(options);
  };

  const meterReading = (row: any) => {
    return row.meter_start && row.meter_start > 0 ? (
      <>
        <div className="has-text-centered">
          <span>{row.meter_reading}</span>
        </div>
      </>
    ) : (
      <div className="has-text-centered">
        <SmartSoftButton
          label="Add"
          onClick={() => openMeterForm(row)}
          classList={["button is-small is-primary is-light"]}
        />
      </div>
    );
  };

  const columns: SmartTableNewInterface.SmartTableNewColumnConfig[] = [
    { title: "S.NO", index: "s_no", type: "sno" },
    // { title: "Office City", index: "office_city" },
    { title: "Hub", index: "hub_id" },
    { title: "CMS Reading", index: "cms_reading" },
    {
      title: "Meter Reading",
      index: "address_one",
      valueFunction: meterReading,
      width: "15",
    },
    { title: "Deviation", index: "deviation" },
  ];

  const tableTop: SmartTableNewInterface.SmartTableNewTopProps[] = [
    {
      type: "CUSTOM",
      widthClass: "is-4",
      custom: <p className="is-size-4">Meter Reading</p>,
    },
    {
      type: "SEARCH",
      widthClass: "is-4",
      align: "RIGHT",
    },
    {
      type: "BUTTONS",
      widthClass: "is-1",
      align: "RIGHT",
      buttons: [{ type: "FILTER" }],
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
  const filterFields: SmartFormInterFace.SmartFormElementProps[] = [
    {
      type: "TEXT_BOX",
      width: "12",
      name: "hub_id",
      element: {
        label: "Hub Id",
      },
    },
    {
      type: "TEXT_BOX",
      width: "12",
      name: "vendor_company",
      element: {
        label: "Meter Reading",
      },
    },
  ];
  return (
    <>
      <div className="smart-elf-table">
        <SmartTable
          columns={columns}
          data={data}
          tableTop={tableTop}
          filterFields={filterFields}
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
