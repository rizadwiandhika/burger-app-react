import React from 'react'

/** React.createContext() memungkinkan kita initialize context
 * dengan default value. Context itu (can be said) Javascript GLOBAL Object
 * kita yang menentukan pada file mana aja object ini mau dipakai.
 * Technically gak harus object, bisa aja valuenya array, string, dll.
 * 
 * Kalo kita initialize, maka dari IDE bakal ada auto completion.
*/
const layoutContext = React.createContext({
    closeBackDrop : () => {}
})

export default layoutContext