import React, { Component, useEffect as UseEffect } from 'react'
import Button from '../../UI/Button/Button';

const orderSummary = ( props ) => {

    const ingredientsSummary = Object.keys( props.ingredients ).map( key => (
        <li key={ key }>
            <span style={ {textTransform: 'capitalize'} }>{ key }</span>: { props.ingredients[key] }
        </li>
    ))

    return (
        <>
            <h3>Your order</h3>
            <p>A delicious Burger with ingredients: </p>
            <ul>
                { ingredientsSummary }
            </ul>
            <h5>Total price: ${ props.price.toFixed(2) }</h5>
            <p>Continue to checkout ?</p>
            <Button btnType="Danger" clicked={ props.purchaseCancel }>Cancel</Button>
            <Button btnType="Success" clicked={ props.purchaseContinue }>Submit</Button>
        </>
    )
}

export default orderSummary
