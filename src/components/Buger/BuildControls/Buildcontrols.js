import React from 'react';
import styles from './Buildcontrols.module.css';
import BuildControl from './BuildControl/BuildControl';

const Controls=[
                 {Label:"Salad",type:"salad"},
                 {Label:"Meat",type:"meat"},
                 {Label:"Bacon",type:"bacon"},
                 {Label:"Cheese",type:"cheese"}

               ]
const buildcontrols=(props)=>{

    const ingredients= Controls.map(control=>{
        return <BuildControl key={control.Label} Label={control.Label}
                 added={()=>props.added(control.type)} 
                 remove={()=>props.remove(control.type)}
                 setMoreDisabled={props.setMoreDisabled[control.type]}
                 setDisabled={props.setDisabled[control.type]}/>
    })
    return (<div className={styles.BuildControls}>
            <p>Price:$<strong>{props.totalPrice.toFixed(2)}</strong></p>
            <div style={{border:"white 1px solid", borderRadius:"5px",marginBottom:"20px"}}>
                 {ingredients}
             </div>
            <button className={styles.OrderButton}
             onClick={props.purchase} 
             disabled={!props.disableButton} >ORDER NOW</button>

    </div>); 
}


export default buildcontrols;