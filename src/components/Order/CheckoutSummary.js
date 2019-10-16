import React from 'react';
import Burger from '../Buger/Buger';
import Styles from './CheckoutSummary.module.css';
import Button from '../UI/Button/Button';

const CheckoutSummary=(props)=>{
    const disable=Object.values(props.ingredients).reduce((acc,value)=>{
        return acc+value;
    },0)
    return (
        <div className={Styles.CheckoutSummary}>
            <h1>We hope it tastes well:</h1>
            <div style={{width:"100%", height:"300px", margin:"auto"}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <div style={{backgroundColor:"#3333"}}>

                <Button btntype="Danger" clicked={props.cancelled}>
                    <span style={{ display:"inline-block",fontSize:"24px",
                    paddingRight:"10px",fontWeight:"200",
                    boxSizing:"border-box"}}>&times;</span>Cancel</Button>

                <Button btntype="Success" clicked={props.successful} setDisable={disable<=0}>Continue
                    <span style={{fontSize:"24px"}}>&rarr;
                    </span>
                </Button>
            </div>
        
        </div>
    );
}


export default CheckoutSummary;