const CUSTOMER_OFFERS = {
    GET_ALL:"/business/offers/get_all_offer",
    GET_ONE:"/business/offers/get_one",
    INSERT_LIKE:"/business/likes/insert",
    ADD_TO_CART:"/business/wish_cart/insert",
    GET_ONE_IMAGE:"/business/offers/get_image_offer",
    GET_PROMOS:"/business/market_offers/get_promos",
    GET_ALL_IMAGES:"/business/offers/get_all_images",
    GET_ONE_IMAGE_ID:"/business/offers/get_image_offer_id",
      
    // GET_ONE:"admin/loyalty/get_one",
    // INSERT:"admin/loyalty/insert",
    // UPDATE:"admin/loyalty/update",
    // DELETE:"admin/loyalty/delete_one",
    // GET_ALL_SELECT:"admin/loyalty/get_all_select"
};

const ADMIN_OPERATIONS_SECTOR = {
    GET_ALL:"admin/sector/get_all",
    GET_ONE:"admin/sector/get_one",
    GET_IMAGE_PURCHASE:"admin/sector/get_image_purchase",
    GET_IMAGE_REDEEM:"admin/sector/get_image_redeem",   
};

const CUSTOMER_MY_ACCOUNT = {
    GET_PROFILE:"user/get_one_profile",
    UPDATE_PROFILE:"user/update_cus_profile",
    GET_PROFILE_IMAGE:"/user/get_user_image",
    SENT_OTP_EMAIL:"/auth/send_otp_email",
    SEND_OTP_EMAIL_NEW:"/auth/send_otp_email_new",
    SEND_OTP_MOBILE:"/auth/send_otp_mobile",
    SEND_OTP_MOBILE_NEW:"/auth/send_otp_mobile_new",
    UPDATE_EMAIL_ID:"/user/update_email_id",
    UPDATE_MOBILE_NUMBER:"/user/update_mobile_no",
    DELIVERY_ADDRESS_INSERT:"/user/insert_addr",
    DELETE_ACCOUNT:"/user/delete_account"
}

const CUSTOMER_HELP_URLS = {
    GET_BUSINESS_NAME:"/user/get_all_select_business",
    INSERT_MISSING_CROPS:"/business/missing_crops/insert",
    SUBSCRIPTION_INSERT:"/admin/subscription/insert"
}

const CUSTOMER_MORE_URLS = {
    INSERT_MATE:"/user/mate/insert",
    GET_MATE:"/user/mate/get_one"
}


export {
    CUSTOMER_OFFERS,
    ADMIN_OPERATIONS_SECTOR,
    CUSTOMER_MY_ACCOUNT,
    CUSTOMER_HELP_URLS,
    CUSTOMER_MORE_URLS
  
}
