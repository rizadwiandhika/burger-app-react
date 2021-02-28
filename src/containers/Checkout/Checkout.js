import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'query-string';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    // error handling: redirect kalo igs kosong
    // Note bahwa banyak cara lain untuk handling kasus ini
    let summary = <Redirect to="/" />;

    if (this.props.ingredients) {
      let purchasedRedirect = null;

      if (this.props.purchased) {
        purchasedRedirect = <Redirect to="/" />;
      }

      summary = (
        <>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            cancel={this.cancelCheckoutHandler}
            continue={this.continueCheckoutHandler}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </>
      );
    }

    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
