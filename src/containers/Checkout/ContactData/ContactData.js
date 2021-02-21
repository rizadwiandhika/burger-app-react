import React, { Component } from 'react'
import axiosOrder from '../../../axios-order'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import classes from './ContactData.module.css'

class ContactData extends Component {

    state = {
        orderForm : {
            name : this.setInput('input', '',
                        { type : 'text', placeholder : 'Enter your name' }, 
                        { required : true, alphabetOnly : true },
                        'Please input correct name'),

            street : this.setInput('input', '',
                        { type : 'text', placeholder : 'Street' }, 
                        { required : true, }),

            zipCode : this.setInput('input', '',
                        { type : 'text', placeholder : 'Postal code' }, 
                        { required : true, minLength : 5, maxLength : 5 },
                        'Postal code should be 5 characters'),

            country : this.setInput('input', '',
                        { type : 'text', placeholder : 'Country' }, 
                        { required : true, }),

            email : this.setInput('input', '',
                        { type : 'email', placeholder : 'email@example.com' },
                        { required : true, emailFormat : true },
                        'Email is invalid'),

            deliveryMethod : this.setInput('select', 'fastest',
                                { options : [
                                        {value : 'fastest', displayValue : 'Fastest' },
                                        {value : 'cheapest', displayValue : 'Cheapest' }
                                    ]
                                })
        },
        isFormValid : false,
        loading : false
    }

    /** Sebenernya buat check validasi form ada library-nya 
     * salah satunya "formik".
     * Di React gak ada built-in form vaildation seperti library Vue, Angular, dll.
    */
    setInput(elementType = 'input', initValue = 'default', elementConfig = null, 
            validation = null, invalidMessage = 'Input is not valid') {

        return {
            elementType : elementType,
            value : initValue,
            elementConfig : elementConfig,
            validation : validation,
            valid : validation ? false : true,
            invalidMessage : invalidMessage,
            touched : false,
        }
    }

    /** Sebenernya buat check validasi form ada library-nya 
    * salah satunya "formik".
    * Di React gak ada built-in form vaildation seperti library Vue, Angular, dll.
    */
    checkValidity(value, rules) {
        if ( ! rules ) {
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

   

    formChangeHandler = (selectedFieldKey, event) => {
        this.setState( prevState => {
            const updatedForm = {...prevState.orderForm}
            const selectedField = {...updatedForm[selectedFieldKey]}
            
            selectedField.touched = true
            selectedField.value = event.target.value
            selectedField.valid = this.checkValidity( 
                                    selectedField.value, selectedField.validation )
            // 
            updatedForm[selectedFieldKey] = selectedField
            
            let formValid = true
            for( const fieldKey in updatedForm ) {
                formValid = updatedForm[fieldKey].valid && formValid
            }

            return { orderForm : updatedForm, isFormValid : formValid }
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
        const fields = {}

        for ( const fieldKey in this.state.orderForm ) {
            fields[fieldKey] = this.state.orderForm[fieldKey].value
        }

        const order = {
            orderDara : fields,
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

    /* {
        elementType : elementType,
        value : initValue,
        elementConfig : elementConfig,
        validation : validation,
        valid : validation ? true : false,
        invalidMessage : invalidMessage,
        touched : false,
    } */

    render() {
        let inputs = []

        for ( const fieldKey in this.state.orderForm ) {

            const field = this.state.orderForm[fieldKey]
            const formated = <Input  
                                key={ fieldKey }
                                fieldKey={ fieldKey }
                                elementType={ field.elementType } 
                                elementConfig={ field.elementConfig }
                                value={ field.value }
                                touched={ field.touched }
                                invalid={ ! field.valid }
                                invalidMessage={ field.invalidMessage }
                                changed={ this.formChangeHandler } />

            inputs.push( formated )
        }

        let form = (
            <form>
                { inputs }
                <Button 
                    disabled={ ! this.state.isFormValid } 
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
