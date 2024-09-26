import { STATE_URLS } from "../../api/AdminUrls";
import { get } from "../smartApiService";
type Callback<T> = (data: T) => void;
type ErrorMessage = string | any;

const admin_generic_select = <T>(url: string, call_back: Callback<T>) => {
  const handleError = (errorMessage: ErrorMessage) => {
    console.error('Error fetching data:', errorMessage); 
  };
  
  const subscription = get(url).subscribe(
    (response) => {
      call_back(response.data); 
    }
  );
  
  return () => {
    subscription.unsubscribe();
  };
}

const admin_states_select = (call_back: Callback<any>) => {
  const url = STATE_URLS.GET_ALL_SELECT_STATES;
  return admin_generic_select(url, call_back);
}

export {
  admin_states_select
};
