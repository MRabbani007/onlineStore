import { PRODUCT } from "../data/actions";

export const productReducer = (state, { type, payload }) => {
  try {
    switch (type) {
      case PRODUCT.LOAD_PRODUCT: {
        return { ...payload };
      }
      case PRODUCT.NAME: {
        return { ...state, name: payload };
      }
      case PRODUCT.CATEGORY: {
        return { ...state, category: payload };
      }
      case PRODUCT.PRICE: {
        return { ...state, priceCents: payload };
      }
      case PRODUCT.SUPPLIER: {
        return { ...state, supplier: payload };
      }
      case PRODUCT.RATINGS_STARS: {
        const rating = { count: state.rating.count, stars: payload };
        return { ...state, rating };
      }
      case PRODUCT.RATINGS_COUNT: {
        const rating = { count: payload, stars: state.rating.stars };
        return { ...state, rating };
      }
      case PRODUCT.REVIEWS: {
        return { ...state, reviews: payload };
      }
      case PRODUCT.IMAGES_SET: {
        return { ...state, images: [[]], imagesNames: [] };
      }
      case PRODUCT.IMAGES_NAMES_SET: {
        return { ...state, imagesNames: payload };
      }
      case PRODUCT.IMAGES_ADD: {
        const temp = state.images[payload?.arrayIndex].push(payload?.value);
        return {
          ...state,
        };
      }
      case PRODUCT.IMAGES_REMOVE: {
        state.images[payload.arrayIndex].splice(payload.imageIndex, 1);
        return { ...state };
      }
      case PRODUCT.IMAGES_EDIT: {
        state.images[payload.arrayIndex].splice(
          payload.imageIndex,
          1,
          payload.value
        );
        return { ...state };
      }
      case PRODUCT.IMAGE_REFERENCE: {
        return { ...state, imagesBasedOn: payload };
      }
      case PRODUCT.ARRAY_ADD: {
        state.images.push([]);
        state.imagesNames.push(payload);
        console.log(state.images, state.imagesNames);
        return { ...state };
      }
      case PRODUCT.ARRAY_REMOVE: {
        state.images.splice(payload, 1);
        state.imagesNames.splice(payload, 1);
        return { ...state };
      }
      case PRODUCT.ABOUT_ADD: {
        state.about.push(payload);
        return { ...state };
      }
      case PRODUCT.ABOUT_REMOVE: {
        state.about.splice(payload, 1);
        return { ...state };
      }
      case PRODUCT.ABOUT_EDIT: {
        state.about.splice(payload.index, 1, payload.value);
        return { ...state };
      }
      case PRODUCT.DETAILS_ADD: {
        state.details.push(payload);
        return { ...state };
      }
      case PRODUCT.DETAILS_REMOVE: {
        state.details.splice(payload, 1);
        return { ...state };
      }
      case PRODUCT.DETAILS_EDIT: {
        state.details.splice(payload.index, 1, payload.value);
        return { ...state };
      }
      case PRODUCT.PROPERTIES_ADD: {
        state.properties.push(payload);
        state.values.push([]);
        return { ...state };
      }
      case PRODUCT.PROPERTIES_REMOVE: {
        state.properties.splice(payload, 1);
        state.values.splice(payload, 1);
        console.log(state.properties);
        return { ...state };
      }
      case PRODUCT.PROPERTIES_EDIT: {
        state.properties.splice(payload.propIndex, 1, payload.value);
        return { ...state };
      }
      case PRODUCT.VALUES_ADD: {
        state.values[payload.data].push(payload.value);
        return { ...state };
      }
      case PRODUCT.VALUES_REMOVE: {
        state.values[payload.propIndex].splice(payload.valueIndex, 1);
        return { ...state };
      }
      case PRODUCT.VALUES_EDIT: {
        state.values[payload.propIndex].splice(
          payload.valueIndex,
          1,
          payload.newValue
        );
        return { ...state };
      }
      default: {
        return state;
      }
    }
  } catch (error) {
    console.log(error);
    alert("error " + type);
  }
};
