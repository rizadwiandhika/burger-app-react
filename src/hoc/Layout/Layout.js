import React, { Component } from 'react'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import classes from './Layout.module.css'

class Layout extends Component {

    state = {
        showSideDrawer : false
    }

    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer : false})
    }

    SideDrawerToggleHandler = () => {
        this.setState( (prevState, currProps) => {
            return { showSideDrawer : ! prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <>
                <Toolbar toggleSideDrawer={ this.SideDrawerToggleHandler } />
                <SideDrawer 
                    open={ this.state.showSideDrawer }
                    closed={ this.SideDrawerClosedHandler } />
                <main className={ classes.Content }>
                    { this.props.children }
                </main>
            </>
        )
    }
}

export default Layout