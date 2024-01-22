// Function to convert stars number to array
export const genRatings = (product) => {
  let rating = product.rating.stars;
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

// Updated
export const getSelectProperties = (product) => {
  return product.properties.filter((property) => {
    return (
      property === "size" ||
      property === "style" ||
      property === "color" ||
      property === "image"
    );
  });
};

// Updated
export const parseImageColor = (product, image) => {
  let imagePropIndex = product.properties.findIndex((prop) => prop === "image");
  let colorPropIndex = product.properties.findIndex((prop) => prop === "color");
  let imageIndex = product.values[imagePropIndex].findIndex(
    (value) => value === image
  );
  let color = product.values[colorPropIndex][imageIndex];
  return color;
};

// Updated
export const parseColorImage = (product, color) => {
  let imagePropIndex = product.properties.findIndex((prop) => prop === "image");
  let colorPropIndex = product.properties.findIndex((prop) => prop === "color");
  let colorIndex = product.values[colorPropIndex].findIndex(
    (value) => value === color
  );
  let image = product.values[imagePropIndex][colorIndex];
  return image;
};
