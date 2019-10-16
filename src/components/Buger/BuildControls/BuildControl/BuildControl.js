import React from 'react';
import  styles from './BuildControl.module.css'
const buildcontrol=(props)=>{
    return (<div className={styles.BuildControl}>
        <div className={styles.Label}> {props.Label}</div>
        <button className={styles.Less} onClick={props.remove} disabled={props.setDisabled}>Less</button>
        <button className={styles.More} onClick={props.added} disabled={props.setMoreDisabled} >More</button>
    </div>)
};

export default buildcontrol;