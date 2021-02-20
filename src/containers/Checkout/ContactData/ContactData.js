import React, { Component } from 'react'
import axiosOrder from '../../../axios-order'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css'

class ContactData extends Component {

    state = {
        name : '',
        email : '',
        address : {
            street : '',
            postalCode : ''
        },
        loading : false
    }

    /** Kalo ada <button> dalam <form> saat kita klik
     * nanti jadinya bakal nge-reload app kita. jadinya perlu kita
     * preventDefault(). 
    */
    orderHandler = () => {
        this.setState({ loading : true })

        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            /** In production We should definitely calculate price on the server
             * because we probably have our product stored in server 
             * AND MAKE SURE USER ISN'T MANIPULATING THE CODE
            */
            customer : {
                name : 'Riza Dwi Andhika',
                address : {
                    street : 'Jalan Ahmad Dahlan',
                    zipCode : 50113,
                    country : 'Indoneisa'
                },
                email : 'rizadwi@gmail.com'
            },
            deliveryMethod : 'fastest'
        }
        // Untuk firebase, nama node lalu .json
        axiosOrder
            .post( '/orders.json', order )
            .then( response => {
                alert( 'Yeay!! Your order is being proccessed :)' )
                this.setState({ loading : false })
                this.props.history.push('/')
            })
            .catch( error => {
                console.log( 'Dari catch: ' + error )
                alert( 'Whoops, cannot proccess the order request :(' )
                this.setState({ loading : false })
            } )
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your name" />
                <input type="email" name="email" placeholder="Email" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postal" placeholder="Postal code" />
            </form>
        )

        if ( this.state.loading ) form = <Spinner />

        return (
            <div className={ classes.ContactData }>
                <h4>Fill the data below for ordering: </h4>           
                { form }
                <div className={ classes.Confirmation }>
                    <Button btnType="Danger" clicked={ () => {} }>Cancel</Button>
                    <Button btnType="Success" clicked={ this.orderHandler }>Order Now</Button>
                </div>
            </div>
        )
    }
}

export default ContactData
