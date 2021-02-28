import React, { Component } from 'react';
import axiosOrder from '../../axios-order';
import qs from 'query-string';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';
import { connect } from 'react-redux';

// Btw kalo file index itu bisa di-omit "index" nya
import {
  addIngredient,
  removeIngredient,
  initIngredients,
  unsetError,
  purchaseInit
} from '../../store/actions';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

// Semua kapital itu untuk global variabel konstan

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    if (navigator.onLine && this.props.error) {
      this.props.onUnsetError();
    }

    this.props.onInitIngredients();
  }

  componentWillUnmount() {
    // this.props.onUnsetError();
  }

  purchaseHandler = () => {
    this.props.onInitPurchased();
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  /** In production We should definitely calculate price on the server
   * because we probably have our product stored in server
   * AND MAKE SURE USER ISN'T MANIPULATING THE CODE
   */
  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  updatePurchaseable() {
    let numberOfIngrediets = 0;

    for (const key in this.props.ingredients) {
      numberOfIngrediets += this.props.ingredients[key];
    }

    return numberOfIngrediets > 0;
  }

  render() {
    const disabledInfo = { ...this.props.ingredients };
    let orderSummary = null;
    let burger = <Spinner />;

    if (this.props.error) {
      burger = <h1 style={{ textAlign: 'center' }}>Cannot load ingredients</h1>;
    }

    /** Dia gak bakal masuk kalo disabledInfo nya null */
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    if (this.props.ingredients && !this.props.fetching) {
      burger = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredients={this.props.onAddedIngredient}
            removeIngredients={this.props.onRemovedIngredient}
            disabledInfo={disabledInfo}
            price={this.props.price}
            purchaseable={this.updatePurchaseable()}
            ordered={this.purchaseHandler}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.price}
          ingredients={this.props.ingredients}
        />
      );
    }

    return (
      <>
        <Modal
          loading={this.state.loading}
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    error: state.burgerBuilder.error,
    fetching: state.burgerBuilder.fetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitIngredients: () => dispatch(initIngredients()),
    onAddedIngredient: (item) => dispatch(addIngredient(item)),
    onRemovedIngredient: (item) => dispatch(removeIngredient(item)),
    onInitPurchased: () => dispatch(purchaseInit()),
    onUnsetError: () => dispatch(unsetError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(BurgerBuilder, axiosOrder));
