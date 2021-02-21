import React, { Component } from 'react'
import axiosOrder from '../../../axios-order'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import classes from './ContactData.module.css'

class ContactData extends Component {

    state = {
        orderForm : {
            name : this.setInput('input', '', false,
                        { type : 'text', placeholder : 'Enter your name' }, 
                        { shouldBeChecked : true, required : true, alphabetOnly : true },
                        'Please input correct name'),

            street : this.setInput('input', '', false,
                        { type : 'text', placeholder : 'Street' }, 
                        { shouldBeChecked : true, required : true, }),

            zipCode : this.setInput('input', '', false,
                        { type : 'text', placeholder : 'Postal code' }, 
                        { shouldBeChecked : true, required : true, minLength : 5, maxLength : 5 },
                        'Postal code should be 5 characters'),

            country : this.setInput('input', '', false,
                        { type : 'text', placeholder : 'Country' }, 
                        { shouldBeChecked : true, required : true, }),

            email : this.setInput('input', '', false,
                        { type : 'email', placeholder : 'email@example.com' },
                        { shouldBeChecked : true, required : true, emailFormat : true },
                        'Email is invalid'),

            deliveryMethod : this.setInput('select', 'fastest', false,
                                { options : [
                                        {value : 'fastest', displayValue : 'Fastest' },
                                        {value : 'cheapest', displayValue : 'Cheapest' }
                                    ]
                                },
                                { shouldBeChecked : false })
        },
        formIsValid : false,
        loading : false
    }

    /** Sebenernya buat check validasi form ada library-nya 
     * salah satunya "formik".
     * Di React gak ada built-in form vaildation seperti library Vue, Angular, dll.
    */
    setInput(elementType='input', value='', touched=false,
                config={}, 
                validation={shouldBeChecked : false},
                invalidMessage='Input is not valid' ) {

        let minReqValidation = {}

        if ( validation.shouldBeChecked ) {
            minReqValidation = {
                ...validation,
                status : false
            }
        } else {
            touched = true
            minReqValidation = {
                shouldBeChecked : false,
                status : true
            }
        }

        return {
            elementType : elementType,
            value : value,
            touched : touched,
            elementConfig : config,
            validation : minReqValidation,
            invalidMessage : invalidMessage
        }
    }

    /** Sebenernya buat check validasi form ada library-nya 
    * salah satunya "formik".
    * Di React gak ada built-in form vaildation seperti library Vue, Angular, dll.
    */
    checkValidity(value, rules) {
        if ( ! rules.shouldBeChecked ) {
            return true
        }

        let isValid = true

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid
        }

        if ( rules.alphabetOnly ) {
            isValid = this.allLetter( value ) && isValid
        }

        if ( rules.emailFormat ) {
            isValid = this.validateEmail( value ) && isValid
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid
    }

    allLetter( text ) { 
        let letters = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/ // Ini adalah regex

        if ( text.match( letters ) ) { 
            return true
        }
        return false
    }

    validateEmail( email )  {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if ( emailRegex.test( email ) ) {
            return true
        }
        return false
    }

    formChangeHandler = (key, event) => {
        this.setState( prevState => {
            const newOrderForm = {...prevState.orderForm}
            const newSelectedInput = {...newOrderForm[key]}
            
            newSelectedInput.touched = true
            newSelectedInput.value = event.target.value
            newSelectedInput.validation.status = this.checkValidity( 
                                                    newSelectedInput.value, newSelectedInput.validation )
            // 
            newOrderForm[key] = newSelectedInput
            
            let formValid = true
            for( const formField in newOrderForm ) {
                formValid = newOrderForm[formField].validation.status && formValid
            }

            // newOrderForm[key] = this.setInput( elType, event.target.value, elConfig )

            return { orderForm : newOrderForm, formIsValid : formValid }
        } )
    }

    /** Kalo ada <button> dalam <form> saat kita klik
     * nanti jadinya bakal nge-reload app kita. jadinya perlu kita
     * preventDefault(). 
    */
    orderHandler = (event) => {

        event.preventDefault()
        this.setState({ loading : true })

        /** In production We should definitely calculate price on the server
         * because we probably have our product stored in server 
         * AND MAKE SURE USER ISN'T MANIPULATING THE CODE
        */
        const formData = {}

        for ( const information in this.state.orderForm ) {
            formData[information] = this.state.orderForm[information].value
        }

        const order = {
            orderDara : formData,
            ingredients : this.props.ingredients,
            price : this.props.price
        }

        // Untuk firebase, nama node lalu .json
        axiosOrder
            .post( '/orders.json', order )
            .then( response => {
                // alert( 'Yeay!! Your order is being proccessed :)' )
                this.setState({ loading : false })
                // this.props.history.push('/')
            })
            .catch( error => {
                console.log( 'Dari catch: ' + error )
                alert( 'Whoops, cannot proccess the order request :(' )
                this.setState({ loading : false })
            } )
    }

    cancelHandler = (event) => {
        event.preventDefault()
    }

    render() {
        let inputs = []

        for ( const key in this.state.orderForm ) {

            const input = this.state.orderForm[key]
            const formated = <Input  
                                key={ key }
                                inpKey={ key }
                                elementType={ input.elementType } 
                                elementConfig={ input.elementConfig }
                                value={ input.value }
                                touched={ input.touched }
                                invalid={ ! input.validation.status }
                                invalidMessage={ input.invalidMessage }
                                changed={ this.formChangeHandler } />

            inputs.push( formated )
        }

        let form = (
            <form>
                { inputs }
                <Button 
                    disabled={ ! this.state.formIsValid } 
                    btnType="Success" 
                    clicked={ this.orderHandler.bind( this ) }>
                    Order Now
                </Button>
            </form>
        )

        if ( this.state.loading ) form = <Spinner />

        return (
            <div className={ classes.ContactData }>
                <h4>Fill the data below for ordering: </h4>           
                { form }
            </div>
        )
    }

    
}

export default ContactData
