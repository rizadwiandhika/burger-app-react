import React, { useContext as UseContext } from 'react'
import { NavLink, Link } from 'react-router-dom';
import classes from './NavigationItem.module.css';
import LayoutContext from '../../../../context/layout-context'

const navigationItem = ( props ) => {
    
    const layoutContext = UseContext( LayoutContext )

    return (
        <li className={ classes.NavigationItem }>
            <NavLink 
                onClick={ layoutContext.closeBackDrop }
                exact={ props.tepat }
                to={ props.link }
                activeClassName={ classes.active }
                /* className={ props.active ? classes.active : '' } */>
                { props.children }
            </NavLink>
        </li>
    )
}

export default navigationItem
