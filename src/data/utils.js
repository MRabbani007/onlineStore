export const IMAGE_URL = "/src/assets/products/";
export const IMAGE_URL_DEALS = "/images/deals/";
export const IMAGE_URL_BG = "/src/assets/background/";
export const IMAGE_URL_LOGO = "/images/brand_logos/logo-";
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
