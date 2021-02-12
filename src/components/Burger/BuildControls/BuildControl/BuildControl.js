import React, { useContext as UseContext } from 'react';
import classes from './BuildControl.module.css';

const buildControl = ( props ) => {

    return (
        <div className={ classes.BuildControl }>
            <div className={ classes.Label }>{ props.label }</div>
            <button 
                className={ classes.Less }
                onClick={ props.remove }
                disabled={ props.disabled }>Less</button>
            <button 
                className={ classes.More }
                onClick={ props.add }>More</button>
        </div>
    );
}

export default buildControl;
