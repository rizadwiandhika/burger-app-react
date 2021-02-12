import React from 'react'
import classes from './Logo.module.css';
import burgerImage from '../../assets/images/burger-logo.png'
/** Import sebenarnya hanya membuat webpack sadar bahwa kita pake file pada folder itu
 * In the end, struktur folder kita baka dicompile jadinya berbeda.
 * Kalo path nya langsung ditaruh di src gak akan bekerja karena struktur folder yang diubah tadi
 * 
 * Makanya kita butuh import file tersebut. Basically nanti
 * burgerImage itu adalah string
 */

const Logo = ( props ) => (
    <div className={ classes.Logo }>
        <img src={ burgerImage } />
    </div>
)

export default Logo
