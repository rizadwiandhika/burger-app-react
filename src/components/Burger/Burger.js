import React, { useEffect as UseEffect } from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css'

const burger = ( props ) => {

    let transformedIngredients = (
        Object.keys( props.ingredients ).map( igKey => {
            return (
                [...Array(props.ingredients[igKey])].map( (_, i) => {
                    return <BurgerIngredient 
                                key={ igKey + i }
                                type={ igKey } />
                } )
            )
        } )
    )

    const numberOfIngredients = transformedIngredients.reduce( (acc, curr) => {
        return acc.concat( curr )
    } ).length

    if ( numberOfIngredients === 0 ) {
        transformedIngredients = <h4>Please add the ingredients!</h4>
    }


    return (
        <div className={ classes.Burger }>
            <BurgerIngredient type="bread-top" />
            { /** Isinya ternyata bisa juga list of JSX list (list 2 dimensi) */
                transformedIngredients }
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

/** BTW Disini memo gak akan pernah bekerja
 * Karena component ini bergantung pada props.ingredients
 * dan ingredients tersebut selalu diganti (alamatnya setiap kali setState()).
 * 
 * Ini gua berasumsi bahwa pembandingan object hanya sekedar ===
 * Bukan bener-bener dicek value objectnya.
 * Terbukti dari ini dan juga pada Cockpit.js (yang tadinya dipassingkan persons bukan persons.length)
*/
export default React.memo( burger )
