import React from 'react'
import { withRouter } from 'react-router-dom';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css'

const sideDrawer = ( props ) => {

    const attachedClasses = [classes.SideDrawer, classes.Close]
    
    if ( props.open ) attachedClasses[1] = classes.Open

    return (
        <>
            <Backdrop show={ props.open } clicked={ props.closed }/>
            <div className={ attachedClasses.join( ' ' ) }>
                {/* <Logo height="11%" /> */}
                <div 
                    className={ classes.Logo }
                    onClick={ () => {
                        props.closed()
                        props.history.push('/')
                    } }>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    )
}

export default withRouter( sideDrawer )
