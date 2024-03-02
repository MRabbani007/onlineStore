// Images stored under public folder
export const IMAGE_URL = "images/products/";
export const IMAGE_URL_DEALS = "images/deals/";
export const IMAGE_URL_BG = "images/background/";
export const IMAGE_URL_LOGO = "images/brand_logos/logo-";

export const FLAG_URL = "src/assets/flags/";

// Items per page
export const ITEMS_PER_PAGE = 10;

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

const weekdayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const genDate = (offset = 0) => {
  let date = new Date();
  date.setDate(date.getDate() + offset);
  return {
    day: weekdayShort[date.getDay()],
    date: date.getDate(),
    month: monthShort[date.getMonth()],
  };
};
