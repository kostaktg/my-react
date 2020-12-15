import React from 'react';
import Aux from '../../../hoc/AuxMy';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(ingKey => {
        return (
        <li key={ingKey}>
            <span style={{textTransform: 'capitalize'}}> {ingKey} </span>: {props.ingredients[ingKey]} 
        </li> );
    })
    return (
    <Aux>
        <h3>Your Order</h3>
        <p> A delicius burger whit theS fallowing ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p>Continue to Checkout?</p>
    </Aux>
    );
    

};

export default orderSummary;