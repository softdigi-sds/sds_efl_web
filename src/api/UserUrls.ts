const OFFICE_URLS = {
    INSERT: "/efloffice/insert",
    GET_ALL: "/efloffice/get_all",
    UPDATE: "/efloffice/update",
    GET_ONE: "/efloffice/get_one",
    DELETE:"/efloffice/delete_one",
    GET_ALL_SELECT:"/efloffice/get_all_select"
  

    
}; 
const HUBS_URLS = {
    INSERT: "/hubs/insert",
    GET_ALL: "/hubs/get_all",
    UPDATE: "/hubs/update",
    GET_ONE: "/hubs/get_one",
    DELETE:"/hubs/delete_one",
    GET_ALL_SELECT:"/hubs/get_all_select"
    
};
const HUB_GROUPS_URLS = {
    INSERT: "/hubgroups/insert",
    GET_ALL: "/hubgroups/get_all",
    UPDATE: "/hubgroups/update",
    GET_ONE: "/hubgroups/get_one",
    DELETE:"/hubgroups/delete_one",
    
};
const VENDERS_URLS = {
    INSERT: "/vendors/insert",
    GET_ALL: "/vendors/get_all",
    UPDATE: "/vendors/update",
    GET_ONE: "/vendors/get_one",
    DELETE:"/vendors/delete_one",
 GET_ALL_SELECT:"/vendors/get_all_select"
    
};
const VENDER_RATE_URLS = {
    INSERT: "/vendor_rate/insert",
    GET_ALL: "/vendor_rate/get_all",
    UPDATE: "/vendor_rate/update",
    GET_ONE: "/vendor_rate/get_one",
    DELETE:"/vendor_rate/delete_one",
    
};
const CONSUMPTION_URL ={
    INSERT: "/efl_consumption/insert",
    GET_ALL: "/efl_consumption/get_all",
    UPDATE: "/efl_consumption/update",
    GET_ONE: "/efl_consumption/get_one",
    DELETE:"/efl_consumption/delete_one",
    GET_ALL_CALENDER:"/efl_consumption/get_consumption_data"
}
const VEHICLES_URL ={
    INSERT: "/efl_vehicles/insert",
    GET_ALL: "/efl_vehicles/get_all",
    UPDATE: "/efl_vehicles/update",
    GET_ONE: "/efl_vehicles/get_one",
    DELETE:"/efl_vehicles/delete_one",
    GET_ALL_CALENDER:"/efl_vehicles/get_parking_data"
}

export {
    HUBS_URLS,
    HUB_GROUPS_URLS, OFFICE_URLS, VENDERS_URLS,
    VENDER_RATE_URLS,
    CONSUMPTION_URL,
    VEHICLES_URL
};

