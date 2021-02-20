import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import qs from 'query-string'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    
    state = {
        ingredients : {
            salad : 0,
            meat : 0,
            cheese : 0,
            bacon : 0
        },
        totalPrice : 0
    }
    
    componentDidMount() {
        if ( this.props.history.location.search ) {
            const params = qs.parse( this.props.location.search )
            const ig = {}

            for ( const key in params ) {
                params[key] = Number( params[key] )
                if ( key === 'price' ) continue
                ig[key] = params[key]
            }

            this.setState({ ingredients : ig, totalPrice : params.price })
        }
    }

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
                    ingredients={ this.state.ingredients } 
                    cancel={ this.cancelCheckoutHandler }
                    continue={ this.continueCheckoutHandler }/>
                <Route 
                    path={ this.props.match.path + '/contact-data' } 
                    render={ props => (
                        <ContactData 
                            {...props}
                            ingredients={ this.state.ingredients }
                            price={ this.state.totalPrice } />
                    ) } />
            </>
        )
    }
}

export default Checkout
