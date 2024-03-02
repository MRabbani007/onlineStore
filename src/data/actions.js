export const ACTIONS = {
  PRODUCTS_SEARCH: "PRODUCTS_SEARCH",
  PRODUCTS_GET: "PRODUCTS_GET",
  PRODUCTS_UPDATE: "PRODUCTS_UPDATE",
  PRODUCTS_CREATE: "PRODUCTS_CREATE",
  PRODUCTS_REMOVE: "PRODUCTS_REMOVE",
  CART_GET: "CART_GET",
  CART_ADD: "CART_ADD",
  CART_REMOVE: "CART_REMOVE",
  CART_UPDATE_ITEM: "CART_UPDATE_ITEM",
  CART_UPDATE_QUANTITY: "CART_UPDATE_QUANTITY",
  ORDER_CREATE: "ORDER_CREATE",
  ORDER_GET: "ORDER_GET",
  ORDER_REMOVE: "ORDER_REMOVE",
  SIGNIN: "SIGNIN",
  SIGNUP: "SIGNUP",
  ADMIN_ORDER_GET: "ADMIN_ORDER_GET",
};

export const SERVER = {
  PRODUCTS_SEARCH: "/products/search",
  PRODUCTS_SUPPLIER: "/products/supplier",
  PRODUCTS_GET: "/products/get",
  PRODUCTS_UPDATE: "/products/update",
  PRODUCTS_CREATE: "/products/create",
  PRODUCTS_REMOVE: "/products/remove",
  CART_GET: "/cart/get",
  CART_ADD: "/cart/add",
  CART_REMOVE: "/cart/remove",
  CART_UPDATE_ITEM: "/cart/updateItem",
  CART_UPDATE_QUANTITY: "/cart/updateQuantity",
  ORDER_GET: "/order/getuser",
  ORDER_CREATE: "/order/create",
  ORDER_REMOVE: "/order/remove",
  USER_SIGNIN: "/user/auth",
  USER_SIGNUP: "/user/register",
  USER_SIGNOUT: "/user/logout",
  GET_USER: "/user/admin",
  GET_USER_SETTINGS: "/user/settings",
  USER_EDIT_SETTINGS: "/user/settings",
  USER_PWD: "/user/pwd",
  ADMIN_CART_GET: "/cart/getAll",
  ADMIN_ORDER_GET: "/order/getall",
};

export const PRODUCT = {
  LOAD_PRODUCT: "LOAD_PRODUCT",
  LOCAL_LOAD: "LOCAL_LOAD",
  LOCAL_SAVE: "LOCAL_SAVE",
  PROD_CREATE: "PROD_CREATE",
  PROD_EDIT: "PROD_EDIT",
  PROD_REMOVE: "PROD_REMOVE",

  NAME: "NAME",
  PRICE: "PRICE",
  SUPPLIER: "SUPPLIER",
  RATINGS_STARS: "RATINGS_STARS",
  RATINGS_COUNT: "RATINGS_COUNT",
  REVIEWS: "REVIEWS",

  CATEGORY: "CATEGORY",

  IMAGE_REFERENCE: "IMAGE_REFERENCE",
  IMAGES_SET: "IMAGES_SET",
  IMAGES_ADD: "IMAGES_ADD",
  IMAGES_EDIT: "IMAGES_EDIT",
  IMAGES_REMOVE: "IMAGES_REMOVE",
  IMAGES_NAMES_SET: "IMAGES_NAMES_SET",
  IMAGES_NAMES_ADD: "IMAGES_NAMES_ADD",
  IMAGES_NAMES_EDIT: "IMAGES_NAMES_EDIT",
  IMAGES_NAMES_REMOVE: "IMAGES_NAMES_REMOVE",

  ARRAY_ADD: "ARRAY_ADD",
  ARRAY_REMOVE: "ARRAY_REMOVE",

  PROPERTIES_ADD: "PROPERTIES_ADD",
  PROPERTIES_EDIT: "PROPERTIES_EDIT",
  PROPERTIES_REMOVE: "PROPERTIES_REMOVE",
  VALUES_ADD: "VALUES_ADD",
  VALUES_EDIT: "VALUES_EDIT",
  VALUES_REMOVE: "VALUES_REMOVE",

  ABOUT_ADD: "ABOUT_ADD",
  ABOUT_EDIT: "ABOUT_EDIT",
  ABOUT_REMOVE: "ABOUT_REMOVE",
  DETAILS_ADD: "DETAILS_ADD",
  DETAILS_EDIT: "DETAILS_EDIT",
  DETAILS_REMOVE: "DETAILS_REMOVE",
};
