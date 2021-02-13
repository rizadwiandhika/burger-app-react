import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = ( props ) => (
    <ul className={ classes.NavigationItems }>
        {/* Kalo boolean bisa langsung cuma active aja  */}
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/" >Checkout</NavigationItem>
    </ul>
)

export default navigationItems