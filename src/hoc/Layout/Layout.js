import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LayoutContext from '../../context/layout-context';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import classes from './Layout.module.css'

class Layout extends Component {

    state = {
        showSideDrawer : false
    }

    sideDrawerClosedHandler = () => {
        console.log('close')
        this.setState({showSideDrawer : false})
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState, currProps) => {
            return { showSideDrawer : ! prevState.showSideDrawer }
        })
    }

    render() {
        /* const activeNav = [...this.props.history.location.pathname]
        activeNav.splice(0, 1) */
        
        return (
            <>
                <Toolbar 
                    /* activeNav={ activeNav.join('') } */ 
                    toggleSideDrawer={ this.sideDrawerToggleHandler } />

                <LayoutContext.Provider value={{ closeBackDrop : this.sideDrawerClosedHandler }}>
                    <SideDrawer 
                        open={ this.state.showSideDrawer }
                        closed={ this.sideDrawerClosedHandler } />
                </LayoutContext.Provider>

                <main className={ classes.Content }>
                    { this.props.children }
                </main>
            </>
        )
    }
}

export default withRouter(Layout)