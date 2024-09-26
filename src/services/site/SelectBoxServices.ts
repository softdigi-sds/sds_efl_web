
import { ROLE_URLS, STATE_URLS, USER_URLS } from "../../api/AdminUrls";
import { get, post } from "../smartApiService";

/**
 * 
 * @param url s
 * @param call_back 
 * @returns 
 */
const admin_generic_select=(url:string,call_back:any)=>{
  const handleError = (errorMessage:any) => {}; 
  const subscription =get(url,).subscribe(
      (response) => {
          call_back(response.data);   
      }
    );
    return () => {
      subscription.unsubscribe();
    };
}
const admin_generic_select_post=(url:string,sector:any,call_back:any)=>{
  const handleError = (errorMessage:any) => {}; 
  const subscription =post(url,sector, handleError).subscribe(
      (response) => {
          call_back(response.data);   
      }
    );
    return () => {
      subscription.unsubscribe();
    };
}
/**
 * 
 * @param call_back 
 * @returns 
 */


const user_get_select=(call_back:any)=>{
  let url = USER_URLS.GET_ALL_SELECT;
  admin_generic_select(url,call_back);
}
const role_get_select=(call_back:any)=>{
    let url = ROLE_URLS.GET_ALL_SELECT;
    admin_generic_select(url,call_back);
  }
  const admin_states_select=(call_back:any)=>{
    let url = STATE_URLS.GET_ALL_SELECT_STATES;
    admin_generic_select(url,call_back);
  }

export {
    user_get_select,role_get_select,admin_states_select
};
