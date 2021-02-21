import React from 'react'
import classes from './Order.module.css';

// {detail : { ingredients : { salad, bacon, meat, cheese }, price}}
const order = ({ customerData, price, ingredients }) => {
    
    const ingredientList = []
    
    for ( const igName in ingredients ) {
        if (Object.hasOwnProperty.call(ingredients, igName)) {
            const mount = ingredients[igName];
            const formatted = (
                <span 
                    key={ igName }
                    className={ classes.IngrredientBox }
                    >{ igName } ({ mount })</span>
            )
            ingredientList.push( formatted )
        }
    }

    return (
        <div className={ classes.Order }>
            <h4>{ /* customerData.name */ }</h4>
            <p>Ingredients : { ingredientList } </p>  
            <p style={{ textAlign: 'center', marginTop: '1.5em' }}>Price : <strong>${price}</strong></p>  
        </div>
    )
}


export default order
