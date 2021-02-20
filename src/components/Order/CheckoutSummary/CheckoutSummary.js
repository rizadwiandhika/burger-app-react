import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css'

const checkoutSummary = ( props ) => {
    return (
        <div className={ classes.CheckoutSummary }>
            <h1 style={{ textAlign: 'center' }}>Here's your order: </h1>
            <Burger ingredients={ props.ingredients } />
            <Button btnType="Danger" clicked={ props.cancel }>Cancel</Button>
            <Button btnType="Success" clicked={ props.continue }>Continue</Button>
        </div>
    )
}

export default checkoutSummary
