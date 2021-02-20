import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = ( props ) => {

    return (
        <div className={ classes.BuildControls }>
            <h4>Current price: $<strong>{ props.price.toFixed( 2 ) }</strong></h4>
            { controls.map( ctrl => (
                <BuildControl 
                    key={ ctrl.label } 
                    label={ ctrl.label } 
                    add={ () => props.addIngredients( ctrl.type ) }
                    remove={ () => props.removeIngredients( ctrl.type ) }
                    disabled={ props.disabledInfo[ctrl.type] }/>
            ) ) }
            <button 
                className={ classes.OrderButton }
                disabled={ ! props.purchaseable }
                onClick={ props.ordered }>Checkout</button>
        </div>
    );
}

export default buildControls;
