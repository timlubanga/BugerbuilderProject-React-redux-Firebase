import React from 'react';
import styles from './Order.module.css';
const order=(props)=>{
//const ingredientList=[];
    // for (let keys in props.ingredient){
    //     ingredientList.push({name:keys,amount:props.ingredient[keys]})
    // }

   const ingredinet= Object.keys(props.ingredient).map(el=>{
            return{name:el, amount:props.ingredient[el]}
   })


//ingredientslist=[{name:bacon,amount:3},{name:bacon,amount:3}]

const ingredientOutput=ingredinet.map(el=>{
    return <span className={styles.SPAN} key={el.name} style={{display:"inline-block",
    textTransform:"capitalize",
    border:"solid 1px gray",
     marginRight:"5px", padding:"3px", backgroundColor:"darkorange", boxShadow:"1px 2px 5px gray"}}>{el.name} ({el.amount})</span>
})


  return (<div className={styles.Order}>
            <p>Ingredients:{ingredientOutput}</p>
            <p>Price:<strong> USD {props.price}</strong></p>
        </div>);
}


export default order;