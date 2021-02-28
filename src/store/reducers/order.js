import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  deletingId: '',
  errorFetchingOrders: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Setiap click order now pada BurgerBuilder
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });

    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true });

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, { loading: false });

    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, { loading: true });

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);

    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);

    case actionTypes.DELETE_ORDER_START:
      return updateObject(state, { deletingId: action.id });

    case actionTypes.DELETE_ORDER_SUCCESS:
      return deleteOrderSuccess(state, action);

    case actionTypes.DELETE_ORDER_FAIL:
      return updateObject(state, { deletingId: '' });

    default:
      return state;
  }
};

export default reducer;

function purchaseBurgerSuccess(state, { id, order }) {
  const newOrder = updateObject(order, { id: id });

  return updateObject(state, {
    // Ini biar di Chekcout.js bakal auto ke-redirect jika sudah di-post
    purchased: true,
    loading: false,
    orders: state.orders.concat(newOrder)
  });
}

function fetchOrdersSuccess(state, { orders }) {
  return updateObject(state, {
    orders: orders,
    loading: false,
    errorFetchingOrders: null
  });
}

function fetchOrdersFail(state, { error }) {
  return updateObject(state, {
    loading: false,
    errorFetchingOrders: error
  });
}

function deleteOrderSuccess(state, { id }) {
  const updatedOrders = [...state.orders.filter((ord) => ord.id !== id)];
  return updateObject(state, { orders: updatedOrders, deletingId: '' });
}
