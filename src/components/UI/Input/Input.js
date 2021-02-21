import React from 'react'
import classes from './Input.module.css'

/** Upload file ke firebase pake react
 * youtube: react-firebase-file-uploader
*/
const input = ( props ) => {
    let inputElement = null
    let validationMessage = null
    let inputElementClasses = [classes.InputElement]

    if ( props.invalid && props.touched ) {
        inputElementClasses.push( classes.Invalid )
        validationMessage = <p className={ classes.ValidationError }>{props.invalidMessage}</p>
    }
    /** Attribute non-reserved pada ORIGINAL HTML TAG harus lowercase
     * Pada versi React yang baru, penulisan HTML ditekankan lebih benar
     * jadinya gak boleh ada attribute HTML yang camelcase, harus lowercase
    */
    switch( props.elementType ) {
        case 'input' :
            inputElement = (
                <input {...props.elementConfig} 
                        className={ inputElementClasses.join(' ') } 
                        value={ props.value }
                        onChange={ event => { 
                            props.changed( props.fieldKey, event ) 
                        } }
                        />
            )
            break

        case 'select' :
            const options = props.elementConfig.options.map( op => (
                <option key={ op.value } value={ op.value }>{ op.displayValue }</option>
            ) )
            inputElement = (
                <select 
                    className={ inputElementClasses.join(' ') }
                    value={ props.value }
                    onChange={ event => { props.changed( props.fieldKey, event ) } }>
                    { options }
                </select>
            )
            break

        case 'textarea' :
            inputElement = (
                <textarea {...props.elementConfig} 
                        className={ inputElementClasses.join(' ') } 
                        value={ props.value }
                        onChange={ () => {} }/>
            )
            break
        
        default :
            inputElement = (
                <input {...props.elementConfig} 
                        className={ inputElementClasses.join(' ') } 
                        value={ props.value }
                        onChange={ () => {} }/>
            )
    }

    return (
        <div className={ classes.Input }>
            <label className={ classes.Label }>{ props.label }</label>
            { inputElement }
            { validationMessage }
        </div>
    )
}

export default input
