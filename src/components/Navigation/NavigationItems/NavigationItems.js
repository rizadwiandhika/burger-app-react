import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const navigationItems = ( props ) => {

    /* My Approach for active link
    let builderActive = false
    let ordersActive = false

    switch ( props.active ) {
        case 'orders' :
            ordersActive = true
            break
        case '' :
            builderActive = true
            break
    } */

    return (
        <ul className={ classes.NavigationItems }>
            {/* Kalo boolean TRUE bisa langsung tulis nama attribute */}
            <NavigationItem tepat link="/" /*active={ builderActive }}*/ >Burger Builder</NavigationItem>
            <NavigationItem link="/orders" /*active={ ordersActive }*/ >Orders</NavigationItem>
        </ul>
    )
}

export default navigationItems
