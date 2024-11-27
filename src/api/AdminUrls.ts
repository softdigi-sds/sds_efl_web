const ROLE_URLS = {
  INSERT: "/role/insert",
  GET_ALL: "/role/get_all",
  UPDATE: "/role/update",
  GET_ONE: "/role/get_one",
  DELETE: "/role/delete_one",
  GET_ALL_SELECT: "/role/get_all_select",
};

const USER_URLS = {
  INSERT: "/user/insert",
  GET_ALL: "/user/get_all",
  UPDATE: "/user/update",
  GET_ONE: "/user/get_one",
  DELETE: "/user/delete_one",
  GET_ALL_SELECT: "/user/get_all_select",
  ADMIN_RESET: "/user/admin_reset",
};
const STATE_URLS = {
  INSERT: "/state_db/insert",
  GET_ALL: "/state_db/get_all",
  UPDATE: "/state_db/update",
  GET_ONE: "/state_db/get_one",
  DELETE: "/state_db/delete_one",
  GET_ALL_SELECT_STATES: "/state_db/get_all_select",
};
const PASS_URL = {
  CHANGE_PASSWORD:" /user/user_reset"
}
export { ROLE_URLS, USER_URLS, STATE_URLS, PASS_URL };
