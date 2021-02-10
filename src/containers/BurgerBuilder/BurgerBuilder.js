import React, { Component } from 'react'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';

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
        totalPrice : 4
    }

    addIngredientHandler = (type) => {
        this.setState( (prevState, currProps) => {
            const updatedIngredient = { ...prevState.ingredients }
            const updatedCount = prevState.ingredients[type] + 1

            updatedIngredient[type] = updatedCount
            const updatedPrice = prevState.totalPrice + INGREDIENT_PRICES[type]

            return {
                ingredients : updatedIngredient,
                totalPrice : updatedPrice,
                isIngredientsChanged : true
            }
        } ) 
    }
    
    removeIngredientHandler = (type) => {
        this.setState( (prevState, currProps) => {
            let isChanged = true
            let updatedCount = prevState.ingredients[type] - 1
            let updatedPrice = prevState.totalPrice - INGREDIENT_PRICES[type]
            
            if ( updatedCount < 0 )   return {}

            const updatedIngredient = { ...prevState.ingredients }
            updatedIngredient[type] = updatedCount

            return {
                ingredients : updatedIngredient,
                totalPrice : updatedPrice,
                isIngredientsChanged : isChanged
            }
        } ) 
    }

    render() {
        return (
            <>
                <Burger ingredients={ this.state.ingredients } />
                <BuildControls 
                    addIngredients={ this.addIngredientHandler }
                    removeIngredients={ this.removeIngredientHandler }/>
            </>
        )
    }

}

export default BurgerBuilder