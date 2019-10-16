import React from 'react';
import Aux from './../../../hoc/Aux';
import './Ordersummary.module.css';
import Button from '../../UI/Button/Button';

const orderSummary=(props)=>{
    const ingredientSumary=Object.keys(props.ingredients).map(el=>{
        return (<tr key={el}>
            <td> <span style={{textTransform:"capitalize"}}>{el}</span></td>
            <td>{props.ingredients[el]} </td>
        </tr> 
        
        );
    }
        )
    return(<Aux>
        <h3>A summary of your order</h3>
        <p>Below are the ingredients your selected</p>
        <table>
            <tbody>
            <tr>
                <th>Ingredient</th>
                <th>Quantity</th>
            </tr>
            {ingredientSumary}
            </tbody>
        </table>
        <p>Total price:<strong>{props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btntype="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
        <Button btntype="Success" clicked={props.purchaseContinued}>Continue</Button>

    </Aux>)
}

export default orderSummary;