import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import OrderDetail from './components/Order/OrderDetail/OrderDetail';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import axiosOrder from './axios-order';

class App extends Component {
  /** Routing itu GAK MEMPENGARUHI/trigger Lifecycle
   * App.js ini (tadinya) bisa ter-trigger update cycle setiap ganti URL
   * karena tadinya dia menerima props dari Router (withRouter).
   * Clearly kalo URL berubah, props juga berubah jadinya trigger Update cycle.
   */

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/orders/:id" component={OrderDetail} />
            <Route path="/orders" component={Orders} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
// export default withRouter( App );
