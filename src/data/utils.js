// Images stored under public folder
export const IMAGE_URL = "images/products/";
export const IMAGE_URL_DEALS = "images/deals/";
export const IMAGE_URL_BG = "images/background/";
export const IMAGE_URL_LOGO = "images/brand_logos/logo-";

export const FLAG_URL = "src/assets/flags/";

// Items per page
export const ITEMS_PER_PAGE = 10;
// Server URL
export const SERVER_URL = "https://online-store-server-iu6b.onrender.com";
export const SERVER_URL_DEV = "http://localhost:3000";

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const genDate = (offset = 0) => {
  let date = new Date();
  date.setDate(date.getDate() + offset);
  return (
    "" +
    weekday[date.getDay()] +
    ", " +
    date.getDate() +
    " " +
    month[date.getMonth()]
  );
};
