import axiosOrder from '../../axios-order';
import * as actionTypes from './actionTypes';

/** Cretae order related */
export const purchaseBurger = (order) => {
  return (dispatch, getStore) => {
    // Ini approach yang normal, ada 2 dispatch tapi yg 1 async
    dispatch(purchaseBurgerStart());

    // async code below here
    postToDatabase(order, dispatch);
  };
};

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
};

export const purchaseBurgerStart = () => {
  return { type: actionTypes.PURCHASE_BURGER_START };
};

export const purchaseBurgerSuccess = (id, order) => {
  return { type: actionTypes.PURCHASE_BURGER_SUCCESS, id: id, order: order };
};

export const purchaseBurgerFail = (error) => {
  return { type: actionTypes.PURCHASE_BURGER_FAIL, error: error };
};

export const postToDatabase = async (order, dispatch) => {
  try {
    const response = await axiosOrder.post('/orders.json', order);
    console.log(response.data); // hasilnya {name: "-MUUBSa8htdZjqAOj4Kl"}
    dispatch(purchaseBurgerSuccess(response.data.name, order));
  } catch (err) {
    dispatch(purchaseBurgerFail(err));
  }
};

/** Fetching orders related */
export const fetchOrders = () => {
  return (dispatch, getStore) => {
    // Ini approach yang normal, ada 2 dispatch tapi yg 1 async
    dispatch(fetchOrdersStart());

    // async code below here
    fetchOrdersFromDatabase(dispatch);
  };
};

export const fetchOrdersStart = () => {
  return { type: actionTypes.FETCH_ORDERS_START };
};

export const fetchOrdersSuccess = (orders) => {
  return { type: actionTypes.FETCH_ORDERS_SUCCESS, orders: orders };
};

export const fetchOrdersFail = (error) => {
  return { type: actionTypes.FETCH_ORDERS_FAIL, error: error };
};

export const fetchOrdersFromDatabase = async (dispatch) => {
  try {
    const response = await axiosOrder.get('/orders.json');
    const orders = [];

    for (const key in response.data) {
      orders.push({ id: key, ...response.data[key] });
    }

    dispatch(fetchOrdersSuccess(orders));
  } catch (err) {
    dispatch(fetchOrdersFail(err));
  }
};

/** Delete order */
export const deleteOrder = (id) => {
  return (dispatch, getStore) => {
    // Ini approach yang normal, ada 2 dispatch tapi yg 1 async
    dispatch(deleteOrderStart(id));

    // async code below here
    deleteOrderFromDatabase(id, dispatch);
  };
};

export const deleteOrderStart = (id) => {
  return { type: actionTypes.DELETE_ORDER_START, id: id };
};

export const deleteOrderSuccess = (id) => {
  return { type: actionTypes.DELETE_ORDER_SUCCESS, id: id };
};

export const deleteOrderFail = (error) => {
  return { type: actionTypes.DELETE_ORDER_FAIL, error: error };
};

export const deleteOrderFromDatabase = async (id, dispatch) => {
  try {
    const response = await axiosOrder.delete(`/orders/${id}.json`);
    console.log(response);
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    console.log(err);
    dispatch(deleteOrderFail(err));
  }
};
