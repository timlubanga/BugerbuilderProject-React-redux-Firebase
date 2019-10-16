import React from 'react';
import styles from './Button.module.css';

const button=(props)=>{
    
    return(
        <button style={props.setDisable ? {color:"lightgray"}:null} className={[styles.Button,styles[props.btntype]].join(' ')} onClick={props.clicked} disabled={props.setDisable}>
        {props.children}</button>
    );
}





export default button;