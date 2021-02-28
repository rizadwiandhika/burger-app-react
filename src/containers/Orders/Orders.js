import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders, deleteOrder } from '../../store/actions';
import axiosOrder from '../../axios-order';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  orderDetailHandler = (id) => {
    this.props.history.push('/orders/' + id);
  };

  orderDeleteHandler = (id) => {
    if (window.confirm("Are you sure wan't to delete? ")) {
      this.props.onDeleteOrder(id);
    }
  };

  render() {
    let error = null;
    let orders = <Spinner />;

    if (!this.props.loading) {
      if (this.props.orders.length > 0) {
        orders = this.props.orders.map((order) => {
          const deleting = this.props.deletingId === order.id ? true : false;

          return (
            <Order
              key={order.id}
              id={order.id}
              deleting={deleting}
              customerData={order.orderData}
              ingredients={order.ingredients}
              price={order.price.toFixed(2)}
              detail={this.orderDetailHandler}
              delete={this.orderDeleteHandler}
            />
          );
        });
      } else {
        orders = (
          <h2 style={{ textAlign: 'center', marginTop: '15vh' }}>
            There's no order yet..
          </h2>
        );
      }
    }

    if (this.props.fetchErr) {
      orders = null;
      console.log(typeof this.props.fetchErr);
      console.log(this.props.fetchErr);
      console.log(this.props.fetchErr.Error);
      error = (
        <>
          <h1 style={{ textAlign: 'center' }}>
            Failed fetching data from database
          </h1>
          <p style={{ fontSize: '16px', textAlign: 'center' }}>
            {this.props.fetchErr.toString()}
          </p>
        </>
      );
    }

    return (
      <div>
        {orders}
        {error}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    deletingId: state.order.deletingId,
    fetchErr: state.order.errorFetchingOrders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(fetchOrders()),
    onDeleteOrder: (id) => dispatch(deleteOrder(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(Orders, axiosOrder));
