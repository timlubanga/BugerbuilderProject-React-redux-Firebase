import React from 'react';
import styles from './Modal.module.css';
import Aux from './../../../hoc/Aux';
import Backdrop from '../../Order/Backdrop/Backdrop';

const modal=(props)=>{
    return (
    <Aux>
        <Backdrop show={props.show} handleShow={props.handleShow}/>
        <div className={styles.Modal} 
        style={{transform:props.show ? 'translate(0)' :"translate(-200vh)",
             opacity:props.show ? "1" : "0"}}>
               
            {props.children}            
        </div>
    </Aux>
    
    );
}



export default modal;