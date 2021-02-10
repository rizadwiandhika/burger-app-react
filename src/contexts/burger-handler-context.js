import React from 'react';

const burgerHandlerContext = React.createContext({
    addIngredient : () => {},
    removeIngredient : () => {},
})

export default burgerHandlerContext