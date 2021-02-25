import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import qs from 'query-string'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    cancelCheckoutHandler = () => {
        this.props.history.goBack()
    }

    continueCheckoutHandler = () => {
        this.props.history.replace( '/checkout/contact-data' )
    }

    render() {
        return (
            <>
                <CheckoutSummary 
                    ingredients={ this.props.ingredients } 
                    cancel={ this.cancelCheckoutHandler }
                    continue={ this.continueCheckoutHandler }/>
                <Route 
                    path={ this.props.match.path + '/contact-data' } 
                    component={ ContactData } />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}

export default  connect( mapStateToProps )( Checkout )
