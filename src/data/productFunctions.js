// Function to convert stars number to array
export const genRatings = (rating) => {
  let stars = [..."f".repeat(Math.floor(rating))];
  if (rating * 10 - Math.floor(rating) * 10) {
    stars.push("h");
  } else {
    stars = [...stars, ..."e".repeat(5 - stars.length)];
  }
  return stars;
};

// Function to break product price into whole and fraction
export const genPrice = (priceCents) => {
  let priceWhole = 0;
  let priceFraction = 0;
  if (priceCents) {
    priceWhole = Math.floor(priceCents / 100);
    priceFraction = priceCents - Math.floor(priceCents / 100) * 100;
  }
  return { priceWhole, priceFraction };
};
