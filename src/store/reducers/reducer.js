import { actions as act } from '../actions';

const INGREDIENT_PRICES = {
    bacon : 0.7,
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
}

const initialState = {
    ingredients: {
        bacon : 0,
        salad : 0,
        cheese : 1,
        meat : 1,
    },
    price: 4.0
}

const reducer = (state = initialState, action) => {

    switch( action.type ) {
        case act.RESET_BURGER:
            return {
                ...initialState, 
                ingredients: {
                    ...initialState.ingredients
                }
            }
        
        case act.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.item]: state.ingredients[action.payload.item] += 1
                    // [action.payload.item] adalah fitur ES6 yaitu dynamic property name
                },
                price: state.price + INGREDIENT_PRICES[action.payload.item]
            }

        case act.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.item]: state.ingredients[action.payload.item] -= 1
                },
                price: state.price - INGREDIENT_PRICES[action.payload.item]
            }
    }

    return state
}

export default reducer