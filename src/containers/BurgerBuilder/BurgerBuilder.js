import React, { Component } from 'react'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosOrder from '../../axios-order';

// Semua kapital itu untuk global variabel konstan
const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients : {
            salad : 0,
            bacon : 0, 
            cheese : 0,
            meat : 0
        },
        totalPrice : 4,
        purchaseable : false,
        purchasing : false
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
            .then( response => console.log( response ) )
            .catch( error => console.log( error ) )
            
        this.setState({ purchasing : false })
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

        for ( const key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <>
                <Modal 
                    show={ this.state.purchasing }
                    modalClosed={ this.purchaseCancelHandler }>
                    <OrderSummary 
                        purchaseCancel={ this.purchaseCancelHandler }
                        purchaseContinue={ this.purchaseContinueHandler }
                        price={ this.state.totalPrice }
                        ingredients={ this.state.ingredients }
                         />
                </Modal>
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
    }

}

export default BurgerBuilder