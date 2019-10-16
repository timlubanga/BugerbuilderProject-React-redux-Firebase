import React from 'react';
import styles  from './Buger.module.css';
import Bugeringredient from './BugerIngredient/Bugeringredient';
const burger=(props)=>{
    let addedingredients=Object.keys(props.ingredients).map(ingre=>{ 
        return[...Array(props.ingredients[ingre])].map((_,inde)=>{
           return <Bugeringredient key={ingre+inde} type={ingre}/>
        })
    }).reduce((acc,initialValue)=>{
           return acc.concat(initialValue)
    },[]);
    //concat merges array into one
    

    if (addedingredients.length===0){
        addedingredients=<p>Please add ingredients</p>
    }
    return (<div className={styles.Buger}>
            <Bugeringredient type="bread-top"></Bugeringredient>
             {addedingredients}
            <Bugeringredient type="bread-bottom"></Bugeringredient>
    </div>
        );
}


export default burger;