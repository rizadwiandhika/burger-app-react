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
        purchasing : false,
        error : false,
        loading : false,
    }
    
    componentDidMount() {
        this.props.onResetBurger()
        /* axiosOrder
            .get( '/ingredients.json' )
            .then( response => {
                console.log('Then')
                // this.setState({
                //     ingredients : response.data,
                //     purchaseable : true
                // })
                this.props.onSetBurger( response.data )
                this.setState({ purchaseable: true })
            } )
            .catch( error => {
                console.log('Catch')
                this.setState({ error : true })
            } ) */
    }

    purchaseHandler = () => {
        this.setState({ purchasing : true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing : false })
    }

    /** In production We should definitely calculate price on the server
     * because we probably have our product stored in server 
     * AND MAKE SURE USER ISN'T MANIPULATING THE CODE
    */
    purchaseContinueHandler = () => {
        this.props.history.push( '/checkout' )
    }

    updatePurchaseable() {
        let numberOfIngrediets = 0
        for ( const key in this.props.ingredients ) {
            numberOfIngrediets += this.props.ingredients[key]
        }
        const isPurchaseable = numberOfIngrediets > 0
        return isPurchaseable
    }

    render() {

        const disabledInfo = { ...this.props.ingredients }
        let orderSummary = null
        let burger = null
        /* let burger = this.state.error 
                        ? <h1 style={{ textAlign: 'center' }}>Cannot load ingredients</h1> 
                        : <Spinner /> */
        
        /** Dia gak bakal masuk kalo disabledInfo nya null */
        for ( const key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        if (  this.props.ingredients ) {
            burger = (
                <>
                    <Burger ingredients={ this.props.ingredients } />
                    <BuildControls 
                        addIngredients={ this.props.onAddedIngredient }
                        removeIngredients={ this.props.onRemovedIngredient }
                        disabledInfo={ disabledInfo }
                        price={ this.props.price }
                        purchaseable={ this.updatePurchaseable() }
                        ordered={ this.purchaseHandler }/>
                </>
            )

            orderSummary = <OrderSummary 
                                purchaseCancel={ this.purchaseCancelHandler }
                                purchaseContinue={ this.purchaseContinueHandler }
                                price={ this.props.price }
                                ingredients={ this.props.ingredients }
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
        ingredients: state.ingredients,
        price: state.price
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResetBurger: () => dispatch({ type: act.RESET_BURGER }),
        onAddedIngredient: item => dispatch({ 
            type: act.ADD_INGREDIENT, payload: { item: item }
        }),
        onRemovedIngredient: item => dispatch({ 
            type: act.REMOVE_INGREDIENT, payload: { item: item }
        })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling( BurgerBuilder, axiosOrder ))