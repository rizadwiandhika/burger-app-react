import React from 'react';
import { Redirect } from 'react-router-dom';
import classes from './Order.module.css';

// {detail : { ingredients : { salad, bacon, meat, cheese }, price}}
const order = (props) => {
  const ingredientList = [];
  const classList = [classes.Order];

  if (props.deleting) {
    classList.push(classes.Deleting);
  }

  for (const igName in props.ingredients) {
    if (Object.hasOwnProperty.call(props.ingredients, igName)) {
      const mount = props.ingredients[igName];
      const formatted = (
        <span key={igName} className={classes.IngrredientBox}>
          {igName} ({mount})
        </span>
      );
      ingredientList.push(formatted);
    }
  }

  return (
    <div className={classList.join(' ')}>
      <h4>{props.customerData.name}</h4>
      <p>Ingredients : {ingredientList} </p>
      <p style={{ textAlign: 'center', marginTop: '1.5em' }}>
        Price : <strong>${props.price}</strong>
      </p>
      <div className={classes.Action}>
        <button onClick={() => props.detail(props.id)}>Detail</button>
        <button onClick={() => props.delete(props.id)}>Delete</button>
      </div>
    </div>
  );
};

export default order;
