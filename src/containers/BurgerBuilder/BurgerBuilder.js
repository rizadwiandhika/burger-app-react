import React, { Component } from 'react'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import axiosOrder from '../../axios-order'
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';

// Semua kapital itu untuk global variabel konstan
const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients : null,
        totalPrice : 4,
        purchaseable : false,
        purchasing : false,
        loading : false,
        error : false
    }
    
    componentDidMount() {
        axiosOrder
            .get( '/ingredients.json' )
            .then( response => {
                this.setState({
                    ingredients : response.data,
                    purchaseable : true
                })
            } )
            .catch( error => {
                this.setState({ error : true })
            } )
    }

    updatePurchaseState() {
        this.setState( (prevState, currProps) => {
            let numberOfIngrediets = 0
            const ingredients = { ...prevState.ingredients }

            for ( const key in ingredients ) {
                numberOfIngrediets += ingredients[key]
            }

            return { purchaseable : numberOfIngrediets > 0 }
        } )
    }

    purchaseHandler = () => {
        this.setState({ purchasing : true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing : false })
    }

    purchaseContinueHandler = () => {
        this.setState({ loading : true })
        // Untuk firebase, nama node lalu .json
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
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
        axiosOrder
        .post( '/orders.json', order )
        .then( response => {
            alert( 'Sit and wait !! your order is being proccessed :)' )
            this.setState({ 
                loading : false,
                purchasing : false
            })
        })
        .catch( error => {
            // alert( 'Sorry, your order cannot be proccessed..' )
            console.log( 'Dari catch: ' + error )
            this.setState({ 
                loading : false,
                purchasing : false
            })
        } )
    }

    addIngredientHandler = (type) => {
        /** Ingat setState tidak dijamin langsung ter-update statenya
         * Mangkanya di updatePurchaseState() buat updatenya pake yang cara fungsi
         * Karena di sana kita bener-bener butuh state yang terbaru
         * which is state terbaru dimaksud adalah setelah ingrediemts diupdate disini
        */
        this.setState( (prevState, currProps) => {
            let updatedIngredient = { ...prevState.ingredients }
            const updatedCount = prevState.ingredients[type] + 1

            updatedIngredient[type] = updatedCount
            const updatedPrice = prevState.totalPrice + INGREDIENT_PRICES[type]

            return {
                ingredients : updatedIngredient,
                totalPrice : updatedPrice,
            }
        } )

        this.updatePurchaseState()
    }
    
    removeIngredientHandler = (type) => {
        let updatedIngredient = null

        this.setState( (prevState, currProps) => {
            let updatedCount = prevState.ingredients[type] - 1
            let updatedPrice = prevState.totalPrice - INGREDIENT_PRICES[type]
            
            if ( updatedCount < 0 )   return

            updatedIngredient = { ...prevState.ingredients }
            updatedIngredient[type] = updatedCount

            return {
                ingredients : updatedIngredient,
                totalPrice : updatedPrice
            }
        } ) 

        this.updatePurchaseState()
    }

    render() {
        const disabledInfo = { ...this.state.ingredients }
        let burger = this.state.error ? <h1 style={{ textAlign: 'center' }}>Cannot load ingredients</h1> : <Spinner />
        let orderSummary = null

        /** Dia gak bakal masuk kalo disabledInfo nya null */
        for ( const key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        if ( this.state.ingredients ) {
            burger = (
                <>
                    <Burger ingredients={ this.state.ingredients } />
                    <BuildControls 
                        addIngredients={ this.addIngredientHandler }
                        removeIngredients={ this.removeIngredientHandler }
                        disabledInfo={ disabledInfo }
                        price={ this.state.totalPrice }
                        purchaseable={ this.state.purchaseable }
                        ordered={ this.purchaseHandler }/>
                </>
            )

            orderSummary = <OrderSummary 
                                purchaseCancel={ this.purchaseCancelHandler }
                                purchaseContinue={ this.purchaseContinueHandler }
                                price={ this.state.totalPrice }
                                ingredients={ this.state.ingredients }
                                />
        }

        if ( this.state.loading ) {
            orderSummary = <Spinner />
        }

        return (
            <>
                <Modal 
                    loading={ this.state.loading }
                    show={ this.state.purchasing }
                    modalClosed={ this.purchaseCancelHandler }>
                    { orderSummary }
                </Modal>
                { burger }
            </>
        )
    }

}

export default withErrorHandling( BurgerBuilder, axiosOrder ) 