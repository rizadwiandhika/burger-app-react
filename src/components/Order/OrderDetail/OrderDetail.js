import React, { useState as UseState, useEffect as UseEffect } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../../store/actions';

import Spinner from '../../UI/Spinner/Spinner';
import Burger from '../../Burger/Burger';
import classes from './OrderDetail.module.css';

const orderDetail = (props) => {
  const [content, setContent] = UseState(null);

  UseEffect(() => {
    props.onFetchOrders();
  }, []);

  UseEffect(() => {
    const selectedId = props.match.params.id;
    const order = props.orders.filter((ord) => ord.id === selectedId)[0];
    let updatedContent = (
      <>
        <h1 style={{ textAlign: 'center' }}>Order not Found :(</h1>
        <h3 style={{ textAlign: 'center', fontWeight: 'normal' }}>
          There's no order with id:{' '}
          <span style={{ fontStyle: 'italic' }}>{selectedId}</span>
        </h3>
      </>
    );

    if (!content) {
      updatedContent = <Spinner />;
      setContent(updatedContent);
      return;
    }

    if (order) {
      const ingredientList = [];

      for (const igName in order.ingredients) {
        if (Object.hasOwnProperty.call(order.ingredients, igName)) {
          const mount = order.ingredients[igName];
          const formatted = (
            <span key={igName} className={classes.IngrredientBox}>
              {igName} ({mount})
            </span>
          );
          ingredientList.push(formatted);
        }
      }

      updatedContent = (
        <>
          <Burger ingredients={order.ingredients} />
          <p style={{ textAlign: 'center', marginTop: '1.5em' }}>
            Price : <strong>${order.price.toFixed(2)}</strong>
          </p>
          <div className={classes.Order}>
            <h4 style={{ textTransform: 'capitalize' }}>
              {order.orderData.name}{' '}
              <span style={{ textTransform: 'none' }}>
                ({order.orderData.email})
              </span>{' '}
              - {order.orderData.deliveryMethod}
            </h4>
            {/* <h4>Delivery Method: </h4> */}
            <p>Ingredients : {ingredientList} </p>
            <ul>
              <li>Country: {order.orderData.country}</li>
              <li>Address: {order.orderData.street}</li>
              <li>Zip Code: {order.orderData.zipCode}</li>
            </ul>
          </div>
        </>
      );
    }

    setContent(updatedContent);
  }, [props.orders]);

  return content;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(fetchOrders())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(orderDetail);
