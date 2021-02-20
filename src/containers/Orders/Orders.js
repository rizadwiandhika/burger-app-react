import React, { Component } from 'react'
import axiosOrder from '../../axios-order'
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders : [],
        loading : true,
        error : false
    }

    componentDidMount() {
        axiosOrder
            .get('/orders.json')
            .then( response => {
                const raw = response.data
                const orders = []

                for ( const key in raw ) {
                    if ( Object.hasOwnProperty.call(raw, key) ) {
                        const element = raw[key];
                        orders.push({ id : key, ...element })
                    }
                }

                this.setState({ orders : orders, loading : false })
            } )
            .catch( error => {
                console.log('Error getting orders :(')
                this.setState({ error : true, loading : false })
            } )
    }

    render() {

        let error = null
        let orders = <Spinner />

        if ( ! this.state.loading ) {
            orders = this.state.orders.map( order => (
                <Order key={ order.id } ingredients={ order.ingredients } price={ order.price } />
            ) )
        }

        if ( this.state.error ) {
            error = <h1 style={{ textAlign : 'center' }}>Failed fetching data from database</h1>
        }

        return (
            <div>
                { orders }
                { error }
            </div>
        )
    }
}

export default withErrorHandling(Orders, axiosOrder)
