import * as actionTypes from './actionTypes';
import axiosOrder from '../../axios-order';

export const addIngredient = (item) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    item: item
  };
};

export const removeIngredient = (item) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    item: item
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchingIngredients = () => {
  return { type: actionTypes.FETCHING_INGREDIENTS };
};

export const fetchIngredientsFailed = () => {
  return { type: actionTypes.FETCH_INGREDIENTS_FAILED };
};

export const fetchIngredients = async (dispatch) => {
  try {
    const ingredients = await axiosOrder.get('/ingredients.json');
    dispatch(setIngredients(ingredients.data));
  } catch (err) {
    console.log('Cannot fetch data :( ', err);
    dispatch(fetchIngredientsFailed());
  }
};

export const initIngredients = () => {
  return (dispatch, getState) => {
    dispatch(fetchingIngredients());
    // Asynch code here
    fetchIngredients(dispatch);
  };
};

export const unsetError = () => {
  return { type: actionTypes.UNSET_ERROR };
};
