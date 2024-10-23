const OFFICE_URLS = {
  INSERT: "/efloffice/insert",
  GET_ALL: "/efloffice/get_all",
  UPDATE: "/efloffice/update",
  GET_ONE: "/efloffice/get_one",
  DELETE: "/efloffice/delete_one",
  GET_ALL_SELECT: "/efloffice/get_all_select",
};
const HUBS_URLS = {
  INSERT: "/hubs/insert",
  GET_ALL: "/hubs/get_all",
  UPDATE: "/hubs/update",
  GET_ONE: "/hubs/get_one",
  DELETE: "/hubs/delete_one",
  GET_ALL_SELECT: "/hubs/get_all_select",
  STATUS_UPDATE: "hubs/status_update",
};
const HUB_GROUPS_URLS = {
  INSERT: "/hubgroups/insert",
  GET_ALL: "/hubgroups/get_all",
  UPDATE: "/hubgroups/update",
  GET_ONE: "/hubgroups/get_one",
  DELETE: "/hubgroups/delete_one",
};
const VENDERS_URLS = {
  INSERT: "/vendors/insert",
  GET_ALL: "/vendors/get_all",
  UPDATE: "/vendors/update",
  GET_ONE: "/vendors/get_one",
  DELETE: "/vendors/delete_one",
  GET_ALL_SELECT: "/vendors/get_all_select",
  STATUS_UPDATE: "vendors/status_update",
};
const VENDER_RATE_URLS = {
  INSERT: "/vendor_rate/insert",
  GET_ALL: "/vendor_rate/get_all",
  UPDATE: "/vendor_rate/update",
  GET_ONE: "/vendor_rate/get_one",
  DELETE: "/vendor_rate/delete_one",
};
const CONSUMPTION_URL = {
  INSERT: "/efl_consumption/insert",
  GET_ALL: "/efl_consumption/get_all",
  UPDATE: "/efl_consumption/update",
  GET_ONE: "/efl_consumption/get_one",
  DELETE: "/efl_consumption/delete_one",
  GET_ALL_CALENDER: "/efl_consumption/get_all_consumption_data",
  GET_ALL_WITH_HUB:"/efl_consumption/get_all_consumption_data_hub",
  GET_ALL_CALENDER_GET_ONE: "/efl_consumption/get_one_consumption_data",
  IMPORT_EXCEL: "/efl_consumption/import_excel",
};
const VEHICLES_URL = {
  INSERT: "/efl_vehicles/insert",
  GET_ALL: "/efl_vehicles/get_all",
  UPDATE: "/efl_vehicles/update",
  GET_ONE: "/efl_vehicles/get_one",
  DELETE: "/efl_vehicles/delete_one",
  GET_ALL_CALENDER: "/efl_vehicles/get_all_parking_data",
  GET_ALL_WITH_HUB:"/efl_vehicles/get_all_parking_data_hub",
  GET_ALL_CALENDER_GET_ONE: "/efl_vehicles/get_one_parking_data",
  IMPORT_EXCEL: "/efl_vehicles/import_excel",
  GET_ALL_DASH:"/efl_vehicles/get_report_dashboard",
  GET_ALL_DATE:"/efl_vehicles/get_report_date"
};

const INVOICE_URLS = {
  GENERATE: "/invoice/generate_invoice",
  REFRESH: "/invoice/update_invoice",
  GET_ONE_DETAILS: "/invoice/get_one_details",
  INSERT: "/efl_vehicles/insert",
  GET_ALL_BILLS: "/bill/get_all",
  GET_ONE_BILL: "bill/get_one",
  EXPORT_EXCEL: "bill/export_excel",
  IMPORT_ZIP: "bill/import_zip",
  DOWNLOAD_INVOICE: "invoice/download_invoice",
  DELETE: "bill/delete_one",
};
const METER_READINGS_URLS = {
  INSERT: "/meter_readings/insert",
  GET_ALL:"/meter_readings/get_all"

};

export {
  CONSUMPTION_URL,
  HUBS_URLS,
  HUB_GROUPS_URLS,
  INVOICE_URLS, METER_READINGS_URLS, OFFICE_URLS,
  VEHICLES_URL,
  VENDERS_URLS,
  VENDER_RATE_URLS
};

