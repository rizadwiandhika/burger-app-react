import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const BURGER_BASE_PRICE = 2;

const INGREDIENT_PRICES = {
  bacon: 0.7,
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3
};

const initialState = {
  ingredients: null,
  price: 4.0,
  error: false,
  fetching: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return updateIngredients(state, action.ingredients);

    case actionTypes.FETCHING_INGREDIENTS:
      return updateObject(state, { fetching: true });

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });

    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action.item);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action.item);

    case actionTypes.UNSET_ERROR:
      return updateObject(state, { error: false });

    default:
      return state;
  }
};

export default reducer;

function updateIngredients(state, ingredients) {
  let price = BURGER_BASE_PRICE;
  const updatedIngredients = {
    bacon: ingredients.bacon,
    salad: ingredients.salad,
    cheese: ingredients.cheese,
    meat: ingredients.meat
  };

  for (const item in updatedIngredients) {
    price += INGREDIENT_PRICES[item] * updatedIngredients[item];
  }

  return updateObject(state, {
    ingredients: updatedIngredients,
    error: false,
    price: price,
    fetching: false
  });
}

function addIngredient(state, item) {
  const updatedIngredient = { [item]: state.ingredients[item] + 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

  const updatedPrice = state.price + INGREDIENT_PRICES[item];

  return updateObject(state, {
    ingredients: updatedIngredients,
    price: updatedPrice
  });
}

function removeIngredient(state, item) {
  const updatedIngredient = { [item]: state.ingredients[item] - 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

  const updatedPrice = state.price - INGREDIENT_PRICES[item];

  return updateObject(state, {
    ingredients: updatedIngredients,
    price: updatedPrice
  });
}
