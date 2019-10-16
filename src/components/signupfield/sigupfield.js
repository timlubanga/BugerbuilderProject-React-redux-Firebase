
import React from 'react';
import styles from '../../containers/Signup/signup.module.css';
// import style from './signupfield.module.css';


const Signupfield=(props)=>{

    const classes=[styles.Form_input];

    if(!props.isValid && props.value.length>=1){
        classes.push(styles.Form_INVALID)
    }

let input=null;
    switch(props.elementType){
        case("input"):
            input= <input className={classes.join(" ")} onChange={props.changed} 
            value={props.value} 
            {...props.elementConfig} required >    
            </input>
            break;

        case("textarea"):
            input=<textarea className={classes.join(" ")} {...props.elementConfig} 
            value={props.value} 
            onChange={props.changed}/>
            break; 
        default:
            break;
    }

    return(
        <div className={styles.Form_group}>
            {input}
            <label className={styles.Form_label} >{props.label}</label>

        </div>
    )
}


export default Signupfield;