import { actions as act } from '../actions';

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
}

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        meat: 0,
        cheese: 0
    },
    price: 4.0
}

const reducer = (state = initialState, action) => {

    switch( action.type ) {
        case act.SET_BURGER:
            return {
                ...state,
                ingredients: { ...action.igs }
            }
    }

    return state
}

export default reducer