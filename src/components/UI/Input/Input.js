import React from 'react';
import styles from '../../../containers/Checkout/Contact-data/Contact-data.module.css';
import styling from './Input.module.css';

const Input=(props)=>{
    let InputElement=null;
    const classes=[styles.Form_input];

    if(props.Invalid && props.value.length !==0){
        classes.push(styling.Invalid)
    }
    else{
        
    }

    switch(props.elementType){
        case("input"):
        InputElement= <input className={classes.join(" ")} {...props.elementConfig} value={props.value} required autoComplete="off" onChange={props.changed} />
        break;
        case("textarea"):
        InputElement=<textarea {...props.elementConfig} value={props.value} onChange={props.changed}/>
        break; 
        case("select"):
        InputElement=<select 
                className={classes.join(" ")} onChange={props.changed} required>
            {
                [...props.elementConfig.options].map(el=>{
                 return <option key={el.value} value={el.value} >
                 {el.displayValue}  
                 </option>
            })
            }

            </select>
            break;
       
        default:
            InputElement=<input className={classes.join(" ")} {...props.elementConfig} value={props.value} required autoComplete="off"/>

    }
    return(
        
        <div className={styles.Form_group}>
            {InputElement}
            <label className={styles.Form_label} >{props.label}</label>

        </div>
    );
};


export default Input;