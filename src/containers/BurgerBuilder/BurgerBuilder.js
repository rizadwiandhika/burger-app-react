import React, { Component } from 'react'
import axiosOrder from '../../axios-order'
import qs from 'query-string';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling'
import { connect } from 'react-redux'
import { actions as act } from '../../store/actions';

import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';

// Semua kapital itu untuk global variabel konstan


class BurgerBuilder extends Component {
    
    state = {
        purchaseable : false,
        purchasing : false,
        loading : true,
        error : false
    }
    
    componentDidMount() {
        axiosOrder
            .get( '/ingredients.json' )
            .then( response => {
                console.log('Then')
                /* this.setState({
                    ingredients : response.data,
                    purchaseable : true
                }) */
                this.props.onSetBurger( response.data )
                this.setState({ purchaseable: true, loading: false })
            } )
            .catch( error => {
                console.log('Catch')
                this.setState({ error : true })
            } )
    }

    purchaseHandler = () => {
        this.setState({ purchasing : true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing : false })
    }

    purchaseContinueHandler = () => {
        /** In production We should definitely calculate price on the server
         * because we probably have our product stored in server 
         * AND MAKE SURE USER ISN'T MANIPULATING THE CODE
        */
        /* const order = {
            ingredients: { ...this.props.igs },
            price : this.props.prc
        } */

        this.props.history.push({
            pathname : '/checkout',
            /* search : qs.stringify( order ),
            state : order */
        })
    }

    updatePurchaseState() {
        let numberOfIngrediets = 0

        for ( const key in this.props.bg.ingredients ) {
            numberOfIngrediets += this.props.bg.ingredients[key]
        }

        this.setState({ purchaseable: numberOfIngrediets > 0 })
        /* this.setState( (prevState, currProps) => {
            let numberOfIngrediets = 0
            const ingredients = { ...prevState.ingredients }

            for ( const key in ingredients ) {
                numberOfIngrediets += ingredients[key]
            }

            return { purchaseable : numberOfIngrediets > 0 }
        } ) */
    }

    addIngredientHandler = (type) => {
        // Ingat setState tidak dijamin langsung ter-update statenya
        // Mangkanya di updatePurchaseState() buat updatenya pake yang cara fungsi
        // Karena di sana kita bener-bener butuh state yang terbaru
        // which is state terbaru dimaksud adalah setelah ingrediemts diupdate disini
       
        this.props.onAddedIngredient(type) // apakah ini async ?

        /* this.setState( (prevState, currProps) => {
            let updatedIngredient = { ...prevState.ingredients }
            const updatedCount = prevState.ingredients[type] + 1

            updatedIngredient[type] = updatedCount
            const updatedPrice = prevState.totalPrice + INGREDIENT_PRICES[type]

            return {
                ingredients : updatedIngredient,
                totalPrice : updatedPrice,
            }
        } ) */

        this.updatePurchaseState()
    }
    
    removeIngredientHandler = (type) => {

        this.props.onRemovedIngredient(type) // apakah ini async ?

        /* let updatedIngredient = null

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
        } )  */

        this.updatePurchaseState()
    }

    render() {

        // const disabledInfo = { ...this.state.ingredients }
        const disabledInfo = { ...this.props.bg.ingredients }
        let burger = this.state.error ? <h1 style={{ textAlign: 'center' }}>Cannot load ingredients</h1> : <Spinner />
        let orderSummary = null

        /** Dia gak bakal masuk kalo disabledInfo nya null */
        for ( const key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        // this.state.ingredients
        if (  this.props.bg.ingredients ) {
            burger = (
                <>
                    <Burger ingredients={ /* this.state.ingredients  */  this.props.bg.ingredients } />
                    <BuildControls 
                        addIngredients={ this.addIngredientHandler }
                        removeIngredients={ this.removeIngredientHandler }
                        disabledInfo={ disabledInfo }
                        price={ this.props.bg.price }
                        purchaseable={ this.state.purchaseable }
                        ordered={ this.purchaseHandler }/>
                </>
            )

            orderSummary = <OrderSummary 
                                purchaseCancel={ this.purchaseCancelHandler }
                                purchaseContinue={ this.purchaseContinueHandler }
                                price={ this.props.bg.price }
                                ingredients={ /* this.state.ingredients */ this.props.bg.ingredients }
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

const mapStateToProps = state => {
    return {
        bg: state.burger
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetBurger: igs => dispatch({ type: act.SET_BURGER, igs: igs }),
        onAddedIngredient: item => dispatch({ type: act.ADD_INGREDIENT, item: item }),
        onRemovedIngredient: item => dispatch({ type: act.REMOVE_INGREDIENT, item: item }),
        // onUpdatePurchase: () => dispatch({ type: act.UPDATE_PURCHASE }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling( BurgerBuilder, axiosOrder ))