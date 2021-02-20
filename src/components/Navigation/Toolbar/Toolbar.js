import React from 'react'
import { withRouter } from 'react-router-dom'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.module.css'


const toolbar = ( props ) => (
    <header className={ classes.Toolbar }>
        <DrawerToggle clicked={ props.toggleSideDrawer } />
        
        {/* <Logo height="80%" /> */}
        <div 
            className={ classes.Logo }
            onClick={ () => props.history.push('/') }>
            <Logo />
        </div>

        <nav className={ classes.DeviceOnly }>
            <NavigationItems /* active={ props.activeNav } */ />
        </nav>
    </header>
)

export default withRouter( toolbar )
