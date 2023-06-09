const defaultState = JSON.parse(localStorage.getItem("basket")) ?? [];

const BASKET_DECREMENT = "BASKET_DECREMENT";
const BASKET_INCREMENT = "BASKET_INCREMENT";
const BASKET_ADD = "BASKET_ADD";
const BASKET_DEL = "BASKET_DEL";
const BASKET_CLEAR = "BASKET_CLEAR";

export const basketIncrementAction = (payload) => ({
  type: BASKET_INCREMENT,
  payload,
});

export const basketDecrementAction = (payload) => ({
  type: BASKET_DECREMENT,
  payload,
});

export const basketAddAction = (payload) => ({
  type: BASKET_ADD,
  payload,
});

export const basketDelAction = (payload) => ({
  type: BASKET_DEL,
  payload,
});

export const basketClearAction = (payload) => ({
  type: BASKET_CLEAR,
});

export const basketReducer = (state = defaultState, action) => {
  switch (action.type) {
    case BASKET_INCREMENT: {
      const product = state.find(({ id }) => id === action.payload);
      product.count++;
      return [...state];
    }
    case BASKET_DECREMENT: {
      const product = state.find(({ id }) => id === action.payload);
      product.count--;
      if (product.count === 0) {
        return state.filter((item) => item !== product);
      }
      return [...state];
    }
    case BASKET_ADD: {
      const product = state.find(({ id }) => id === action.payload);
      if (product === undefined) {
        return [...state, { id: action.payload, count: 1 }];
      } else {
        product.count++;
        return [...state];
      }
    }
    case BASKET_DEL: {
      return state.filter(({ id }) => id !== action.payload);
    }
    case BASKET_CLEAR: {
      return [];
    }
    default:
      return state;
  }
};
