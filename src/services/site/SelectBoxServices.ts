import { ROLE_URLS, STATE_URLS, USER_URLS } from "../../api/AdminUrls";
import {
  CUSTOMER_URLS,
  HUBS_URLS,
  OFFICE_URLS,
  VENDERS_URLS,
} from "../../api/UserUrls";
import { get, post } from "../smartApiService";

/**
 *
 * @param url s
 * @param call_back
 * @returns
 */
const admin_generic_select = (url: string, call_back: any) => {
  const handleError = (errorMessage: any) => {};
  const subscription = get(url).subscribe((response) => {
    call_back(response.data);
  });
  return () => {
    subscription.unsubscribe();
  };
};
const admin_generic_select_post = (url: string, _data: any, call_back: any) => {
  const handleError = (errorMessage: any) => {};
  const subscription = post(url, _data, { handleError: handleError }).subscribe(
    (response) => {
      call_back(response.data);
    }
  );
  return () => {
    subscription.unsubscribe();
  };
};
/**
 *
 * @param call_back
 * @returns
 */

const user_get_select = (call_back: any) => {
  let url = USER_URLS.GET_ALL_SELECT;
  admin_generic_select(url, call_back);
};
const role_get_select = (call_back: any) => {
  let url = ROLE_URLS.GET_ALL_SELECT;
  admin_generic_select(url, call_back);
};
const admin_states_select = (call_back: any) => {
  let url = STATE_URLS.GET_ALL_SELECT_STATES;
  admin_generic_select(url, call_back);
};

const hubs_get_all_select = (call_back: any) => {
  let url = HUBS_URLS.GET_ALL_SELECT;
  admin_generic_select(url, call_back);
};
const office_get_all_select = (call_back: any) => {
  let url = OFFICE_URLS.GET_ALL_SELECT;
  admin_generic_select(url, call_back);
};
const vendors_get_all_select = (call_back: any) => {
  let url = CUSTOMER_URLS.GET_ALL_SELECT;
  admin_generic_select(url, call_back);
};
const company_get_all_select = (hub_id: any, call_back: any) => {
  let url = VENDERS_URLS.GET_ALL_SELECT;
  admin_generic_select_post(url, { hub_id: hub_id }, call_back);
};
const company_address_all_select = (customer_id: any, call_back: any) => {
  let url = CUSTOMER_URLS.GET_ALL_SELECT_ADDRESS;
  admin_generic_select_post(url, { customer_id: customer_id }, call_back);
};

export {
  admin_states_select,
  hubs_get_all_select,
  role_get_select,
  user_get_select,
  office_get_all_select,
  vendors_get_all_select,
  company_get_all_select,
  company_address_all_select,
};
