export const IMAGE_URL = "../../images/products/";
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
