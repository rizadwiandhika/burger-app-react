import React from 'react'
import { useEffect as UseEffect } from 'react';
import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.module.css'


const modal = ( props ) => {

    return (
        <>
            <Backdrop show={ props.show } clicked={ props.modalClosed } />
            <div 
                className={ classes.Modal }
                style={{ 
                    transform : props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity : props.show ? '1' : '0' 
                }}>
                { props.children }
            </div>
        </>
    )
}

/** React.memo itu equivalen dengan PureComponent
 * Kita bisa kasih second argumen untuk custom comparation function
 * yang menerima old props dan new props.
 * 
 * https://stackoverflow.com/questions/63470738/stop-re-rendering-the-react-functional-component
*/
export default React.memo( modal, (oldProps, newProps) => {
    // Bedanya jika return "true" maka UPDATE CANCELED

    const update = false

    if ( oldProps.show === newProps.show && oldProps.loading === newProps.loading ) {
        return ! update
    }

    return update
} )