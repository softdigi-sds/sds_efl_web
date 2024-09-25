const ORDER_URLS = {
    INSERT: "/business/orders/insert",
    GET_ALL: "/services/request/get_all/admin",
    GET_ALL_CUSTOMER: "/business/orders/get_orders",
    UPDATE: "/business/orders/update",
    GET_ONE: "/business/orders/get_one",
}

const ORDER_ITEMS_URLS = { 
    GET_ALL: "/business/orders_items/get_all",
    GET_ONE: "/business/orders_items/get_one",
    UPDATE_CANCEL:"/business/orders_items/update_user_cancel",
    ORDER_RETURN:"/business/orders_items/update_return_order"
}


const SERVICES_COMPLAINT_URLS = {
    INSERT: "/services/complain/insert",
    GET_ALL_ADMIN: "/services/complain/get_all/admin",
    GET_ALL_USER: "/services/complain/get_all_user",
    UPDATE: "/services/complain/update",
    GET_ONE: "/services/complain/get_one",
}

const CUSTOMER_WISHLIST_URLS = {
    GET_USER_WISHLIST:"business/wish_cart/get_all",
    UPDTAE_WISHLIST:"business/wish_cart/update",
    DELETE_WISHLIST:"business/wish_cart/delete_one",
    UPDATE_QUANTITY:"business/wish_cart/update_quantity",
    GET_ONE_IMAGE:"/business/wish_cart/get_image_offer",
    UPDATE_SINGLE_QUANTITY:"business/wish_cart/update_single_quant",
}

export {
    ORDER_URLS,
    CUSTOMER_WISHLIST_URLS,
    ORDER_ITEMS_URLS,
    SERVICES_COMPLAINT_URLS
}