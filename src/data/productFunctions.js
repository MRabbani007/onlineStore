import { products } from "./productData";
import { fetchProduct } from "./productServerFunctions";
import axios from "axios";

export const compileProperties = (product) => {
  let properties = new Set();
  product.variants.forEach((variant) => {
    variant.forEach((property) => {
      properties.add(property.prop);
    });
  });
  return [...properties];
};

export const compilePropertyValues = (product, propertyIndex) => {
  let values = new Set();
  product.variants.forEach((variant) => {
    // if (variant[propertyIndex].prop === "image") {
    // }
    let propertyValues = variant[propertyIndex].value;
    propertyValues.forEach((temp) => {
      if (Array.isArray(temp)) {
        values.add(temp[0]);
        // temp.forEach((temp2) => {
        //   values.add(temp2);
        // });
      } else {
        values.add(temp);
      }
    });
  });
  return [...values];
};

export const compileAllProperties = (product) => {
  let properties = compileProperties(product);
  let values = [];
  properties.map((property, index) => {
    values.push({
      prop: property,
      values: compilePropertyValues(product, index),
    });
  });
  return values;
};

export const getProductIndex = (productID) => {
  let index = -1;
  products.forEach((product, idx) => {
    if (product.id === productID) {
      index = idx;
    }
  });
  return index;
};

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

export const findImagesIndex = (product) => {
  let index = product.properties.findIndex((property) => property === "image");
  return index;
};

export const getProductImages = (product) => {
  if (product.images.length !== 0) {
    return product.images;
  } else {
    const idx = findImagesIndex(product);
    let productImages = [];
    if (idx >= 0) {
      productImages = product.values[idx];
    }
    return productImages;
  }
};

export const getProductPrice = (product) => {
  let priceWhole = 0;
  let priceFraction = 0;
  if (product) {
    priceWhole = Math.floor(product.priceCents / 100);
    priceFraction =
      product.priceCents - Math.floor(product.priceCents / 100) * 100;
  }
  return { priceWhole, priceFraction };
};

export const genPrice = (priceCents) => {
  let priceWhole = 0;
  let priceFraction = 0;
  if (priceCents) {
    priceWhole = Math.floor(priceCents / 100);
    priceFraction = priceCents - Math.floor(priceCents / 100) * 100;
  }
  return { priceWhole, priceFraction };
};

export const findPropertyIndex = (product, property) => {
  let index = -1;
  product.variants[0].map((productProperty, idx) => {
    if (productProperty.prop === property) {
      index = idx;
    }
  });
  return index;
};

export const findVariant = (product, variant, property, value) => {
  let propertyIndex = findPropertyIndex(product, property);
  let variantIndex = -1;
  let tempIndex = -1;
  // check if property value found available in current variant
  let temp = product.variants[variant][propertyIndex].value.findIndex(
    (propertyValue) => propertyValue === value
  );
  // else search in all variants
  if (temp < 0) {
    product.variants.forEach((variant, index) => {
      if (variantIndex < 0) {
        tempIndex = variant[propertyIndex].value.findIndex(
          (propertyValue) => propertyValue === value
        );
        if (tempIndex >= 0) {
          variantIndex = index;
        }
      }
    });
  } else {
    variantIndex = variant;
  }
  return variantIndex;
};

export const findPropertyValue = (product, variant, property, value) => {
  let valueIndex = -1;
  product.variants[variant].forEach((VariantProperty) => {
    if (valueIndex < 0) {
      if (VariantProperty.prop === property) {
        VariantProperty.value.forEach((propertyValue, index) => {
          if (propertyValue[0] === value) {
            valueIndex = index;
          }
        });
      }
    }
  });
  return valueIndex;
};

export const variantContains = (product, variant, property, value) => {
  let propIndex = findPropertyIndex(product, property);
  let variantPropValues = product.variants[variant][propIndex].value;
  if (variantPropValues.find((propValue) => propValue === value)) {
    return true;
  } else {
    return false;
  }
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

export const searchProductName = (productName = "") => {
  let relevantProducts = [];
  products.forEach((product) => {
    if (product.name.toLowerCase().includes(productName.toLowerCase())) {
      relevantProducts.push(product);
    }
  });
  return relevantProducts;
};

export const searchProducts = (searchCat = "", searchQuery = "") => {
  let displayProducts = [];
  if (searchCat === "all") {
    displayProducts = searchProductName(searchQuery);
  } else {
    if (searchQuery === "") {
      if (searchCat === "") {
        displayProducts = products;
      } else {
        // if empty return all products in category
        products.forEach((product) => {
          if (
            product.category
              .toLowerCase()
              .replace("-", " ")
              .includes(searchCat.toLowerCase())
          ) {
            displayProducts.push(product);
          }
        });
      }
    } else {
      // search matching text in category
      products.forEach((product) => {
        if (product.category.toLowerCase().includes(searchCat.toLowerCase())) {
          if (product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            displayProducts.push(product);
          }
        }
      });
    }
  }
  return displayProducts;
};
