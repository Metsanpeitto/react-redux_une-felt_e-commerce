import {
  FETCH_SINGLE_PRODUCT,
  CHANGE_CURRENCY,
  RECEIVE_PRODUCTS,
  RECEIVE_PRODUCT,
  SEARCH_PRODUCT,
} from "../constants/ActionTypes";

const initialState = {
  product: [],
  products: [],
  symbol: "$",
  product_details: [],
  history: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        products: action.products,
        history: state.history,
      };

    case RECEIVE_PRODUCT:
      return {
        ...state,
        product: action.product,
        history: state.history,
      };

    case FETCH_SINGLE_PRODUCT:
      if (
        state.products.findIndex(
          (product) => product.id === action.productId
        ) !== -1
      ) {
        const singleItem = state.products.reduce((itemAcc, product) => {
          return product;
        }, []);
        return {
          ...state,
          product_details: singleItem,
          history: state.history,
        };
      }
      break;

    case SEARCH_PRODUCT:
      var item = {};
      state.products.map((product) => {
        var thisName = product.name.toUpperCase();
        var receivedName = action.productName.toUpperCase();

        if (thisName.includes(receivedName)) {
          item = { product, history: state.history };
          return (item = product);
        } else return null;
      });

      if (item.name) {
        return {
          ...state,
          product_details: item,
        };
      } else
        return {
          ...state,
          product_details: "notFound",
        };

    case CHANGE_CURRENCY:
      return {
        ...state,
        symbol: action.symbol,
      };
    default:
      return state;
  }
};
export default productReducer;
